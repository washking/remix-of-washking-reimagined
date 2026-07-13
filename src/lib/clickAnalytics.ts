export type ClickAnalyticsEvent = {
  eventName: string;
  meta: Record<string, string>;
};

const eventMeta = (anchor: HTMLAnchorElement) => {
  const meta: Record<string, string> = {};
  const label = (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);

  if (label) meta.label = label;
  if (anchor.dataset.locationSlug) meta.target_location = anchor.dataset.locationSlug;
  if (anchor.dataset.planName) meta.plan = anchor.dataset.planName;
  if (anchor.dataset.analyticsSource) meta.source = anchor.dataset.analyticsSource;

  return meta;
};

export const getClickAnalyticsEvents = (
  anchor: HTMLAnchorElement,
): ClickAnalyticsEvent[] => {
  const href = anchor.getAttribute("href") || "";
  const customEvent = anchor.dataset.analytics;
  const meta = eventMeta(anchor);
  const events: ClickAnalyticsEvent[] = [];

  // A click is one customer action. Explicit instrumentation wins over URL
  // inference so membership links do not inflate the dashboard with both a CTA
  // click and a portal-open event for the same interaction.
  if (customEvent) return [{ eventName: customEvent, meta }];

  if (href.includes("customerportal.nxtwash.com")) {
    events.push({ eventName: "portal_open", meta });
  } else if (href.includes("google.com/maps/dir")) {
    events.push({ eventName: "directions_click", meta });
  } else if (href.startsWith("tel:")) {
    events.push({ eventName: "phone_click", meta });
  } else if (href.startsWith("mailto:")) {
    events.push({ eventName: "email_click", meta });
  } else if (href.startsWith("/location/")) {
    events.push({ eventName: "location_select", meta });
  }

  return events;
};
