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

  if (customEvent) events.push({ eventName: customEvent, meta });

  if (href.includes("customerportal.nxtwash.com") && customEvent !== "portal_open") {
    events.push({ eventName: "portal_open", meta });
  } else if (
    href.includes("google.com/maps/dir") &&
    customEvent !== "directions_click"
  ) {
    events.push({ eventName: "directions_click", meta });
  } else if (href.startsWith("mailto:") && customEvent !== "email_click") {
    events.push({ eventName: "email_click", meta });
  } else if (href.startsWith("/location/") && customEvent !== "location_select") {
    events.push({ eventName: "location_select", meta });
  }

  return events;
};
