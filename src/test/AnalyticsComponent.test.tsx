import { act, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Analytics from "@/components/Analytics";

// Covers the real engagement pipeline; the POC no-op is covered in
// pocModeStub.test.ts.
vi.mock("@/lib/pocMode", () => ({ POC_MODE: false }));

describe("Analytics lifecycle", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("closes the prior page before tracking a location route", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    vi.stubGlobal("fetch", fetchMock);
    window.history.replaceState({}, "", "/");

    const view = render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Analytics />
      </BrowserRouter>,
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    act(() => {
      window.history.pushState({}, "", "/location/somerset");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    await waitFor(() => expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(4));

    const events = fetchMock.mock.calls.map((call) => JSON.parse(call[1].body as string));
    expect(events.map((event) => event.event_name)).toEqual([
      "page_view",
      "page_exit",
      "page_view",
      "location_view",
    ]);
    expect(events[1]).toMatchObject({ event_name: "page_exit", path: "/" });
    expect(events[2]).toMatchObject({ event_name: "page_view", path: "/location/somerset" });
    expect(events[3]).toMatchObject({
      event_name: "location_view",
      location_slug: "somerset",
    });

    view.unmount();
  });
});
