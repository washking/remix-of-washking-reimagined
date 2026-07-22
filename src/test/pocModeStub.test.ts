import { beforeEach, describe, expect, it, vi } from "vitest";
import { POC_MODE } from "@/lib/pocMode";
import { submitWebsiteForm } from "@/lib/formSubmission";
import { track } from "@/lib/analytics";

// Guards the poc/refresh-v2 branch promise: with POC_MODE on, no network call
// may ever reach Formspree, Webchily, or the analytics ingest endpoint.
describe("POC mode stubs", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps POC_MODE enabled on this branch", () => {
    expect(POC_MODE).toBe(true);
  });

  it("reports form success without any network request", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const submission = submitWebsiteForm({
      source: "contact_form",
      subject: "Contact",
      data: { name: "Taylor" },
    });
    await vi.advanceTimersByTimeAsync(600);

    await expect(submission).resolves.toEqual({ deliveredBy: "poc-stub" });
    expect(fetchMock).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("suppresses analytics events entirely", () => {
    const fetchMock = vi.fn();
    const beaconMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal("fetch", fetchMock);
    Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beaconMock });

    track("page_view");
    track("page_exit", { duration_ms: 1000 }, { transport: "beacon" });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(beaconMock).not.toHaveBeenCalled();
  });
});
