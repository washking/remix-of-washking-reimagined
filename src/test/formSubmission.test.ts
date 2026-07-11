import { afterEach, describe, expect, it, vi } from "vitest";
import { submitWebsiteForm } from "@/lib/formSubmission";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("website form delivery", () => {
  it("succeeds when either delivery provider accepts the message", async () => {
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
  });

  it("returns after a fast success even when the other provider stalls", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch")
      .mockImplementationOnce((_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Request aborted", "AbortError"));
          });
        }),
      )
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    await expect(
      submitWebsiteForm({
        source: "contact_form",
        subject: "Contact",
        data: { name: "Taylor" },
        timeoutMs: 25,
      }),
    ).resolves.toEqual({ deliveredBy: "formspree" });
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
    await submission;
  });
});
