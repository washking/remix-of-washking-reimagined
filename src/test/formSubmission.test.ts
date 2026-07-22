import { afterEach, describe, expect, it, vi } from "vitest";
import { submitWebsiteForm } from "@/lib/formSubmission";

// These tests cover the real delivery pipeline; the POC stub path is covered in
// pocModeStub.test.ts.
vi.mock("@/lib/pocMode", () => ({ POC_MODE: false }));

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("website form delivery", () => {
  it("uses Formspree only after the primary provider fails", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    await expect(
      submitWebsiteForm({
        source: "contact_form",
        subject: "Contact",
        data: { name: "Taylor" },
      }),
    ).resolves.toEqual({ deliveredBy: "formspree" });

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    const primaryBody = JSON.parse(String(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body));
    const fallbackBody = JSON.parse(String(vi.mocked(globalThis.fetch).mock.calls[1][1]?.body));
    expect(primaryBody.external_submission_id).toBeTruthy();
    expect(fallbackBody.external_submission_id).toBe(primaryBody.external_submission_id);
  });

  it("does not call the fallback after a primary success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(new Response(null, { status: 200 }));

    await expect(
      submitWebsiteForm({
        source: "contact_form",
        subject: "Contact",
        data: { name: "Taylor" },
      }),
    ).resolves.toEqual({ deliveredBy: "webchily" });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("fails only when both delivery providers fail", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    await expect(
      submitWebsiteForm({
        source: "contact_form",
        subject: "Contact",
        data: { name: "Taylor" },
      }),
    ).rejects.toThrow("Form delivery failed");
  });

  it("aborts stalled providers instead of leaving the form pending", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch").mockImplementation((_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Request aborted", "AbortError"));
        });
      }),
    );

    const submission = expect(
      submitWebsiteForm({
        source: "contact_form",
        subject: "Contact",
        data: { name: "Taylor" },
        timeoutMs: 25,
      }),
    ).rejects.toThrow("Form delivery failed");

    await vi.advanceTimersByTimeAsync(25);
    await vi.advanceTimersByTimeAsync(25);
    await submission;
  });
});
