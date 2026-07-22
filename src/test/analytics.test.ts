import { beforeEach, describe, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics";

// These tests cover the real transport; the POC no-op path is covered in
// pocModeStub.test.ts.
vi.mock("@/lib/pocMode", () => ({ POC_MODE: false }));

describe("analytics transport", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("keeps anonymous and session IDs stable across events", () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    vi.stubGlobal("fetch", fetchMock);

    track("page_view");
    track("contact_open", { source: "test" });

    const first = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    const second = JSON.parse(fetchMock.mock.calls[1][1].body as string);

    expect(first.anon_id).toBe(second.anon_id);
    expect(first.session_id).toBe(second.session_id);
    expect(first.meta.sequence).toBeLessThan(second.meta.sequence);
    expect(first.site_host).toBe(window.location.hostname);
  });

  it("uses sendBeacon for exit events and preserves the page path", () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    const beaconMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal("fetch", fetchMock);
    Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beaconMock });

    track("page_exit", { duration_ms: 12_000 }, { path: "/location/somerset", transport: "beacon" });

    expect(beaconMock).toHaveBeenCalledOnce();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(beaconMock.mock.calls[0][0]).toContain("ingest-web-event");
  });
});
