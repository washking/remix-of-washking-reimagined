import { describe, expect, it } from "vitest";
import { getClickAnalyticsEvents } from "@/lib/clickAnalytics";

const anchor = (href: string, text = "Action") => {
  const element = document.createElement("a");
  element.href = href;
  element.textContent = text;
  return element;
};

describe("click analytics", () => {
  it("uses the explicit plan event without double-counting the portal URL", () => {
    const element = anchor(
      "https://customerportal.nxtwash.com/washkingcarwash",
      "Join Unlimited",
    );
    element.dataset.analytics = "plan_select";
    element.dataset.locationSlug = "somerset";
    element.dataset.planName = "BRONZE";

    expect(getClickAnalyticsEvents(element)).toEqual([
      {
        eventName: "plan_select",
        meta: {
          label: "Join Unlimited",
          target_location: "somerset",
          plan: "BRONZE",
        },
      },
    ]);
  });

  it.each([
    ["https://www.google.com/maps/dir/?api=1", "directions_click"],
    ["tel:+18555551212", "phone_click"],
    ["mailto:contact@washking.net", "email_click"],
    ["/location/vineland", "location_select"],
  ])("infers %s as %s", (href, eventName) => {
    expect(getClickAnalyticsEvents(anchor(href))).toEqual([
      { eventName, meta: { label: "Action" } },
    ]);
  });
});
