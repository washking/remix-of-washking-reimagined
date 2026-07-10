// First-party, anonymous interaction analytics for washking.net.
// Sends events to the ingest-web-event edge function; the data is viewable in the
// WashKing Communicator admin dashboard. No PII — just an anonymous visitor id.
// Safe during SSG: every function no-ops when there's no browser environment.
import { WEB_EVENTS_URL } from "./site";

const TOKEN = import.meta.env.VITE_WEB_EVENTS_TOKEN as string | undefined;
const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined";

function persistentId(key: string, storage: Storage): string {
  try {
    let v = storage.getItem(key);
    if (!v) {
      v = crypto.randomUUID();
      storage.setItem(key, v);
    }
    return v;
  } catch {
    return crypto.randomUUID();
  }
}

// Entry campaign params, kept for the whole session so all events attribute to it.
function utms(): Record<string, string | undefined> {
  try {
    const stored = sessionStorage.getItem("wk_utm");
    if (stored) return JSON.parse(stored);
    const p = new URLSearchParams(window.location.search);
    const u = {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
    };
    if (u.utm_source || u.utm_medium || u.utm_campaign) {
      sessionStorage.setItem("wk_utm", JSON.stringify(u));
    }
    return u;
  } catch {
    return {};
  }
}

function baseFields() {
  const loc = window.location.pathname.match(/^\/location\/([^/]+)/);
  return {
    anon_id: persistentId("wk_anon", localStorage),
    session_id: persistentId("wk_sess", sessionStorage),
    path: window.location.pathname,
    location_slug: loc ? loc[1] : undefined,
    referrer: document.referrer || undefined,
    device: window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop",
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    ...utms(),
  };
}

/** Fire-and-forget event. Never throws — analytics must not break the page. */
export function track(event_name: string, meta: Record<string, unknown> = {}): void {
  if (!isBrowser) return;
  try {
    const body = JSON.stringify({ ...baseFields(), event_name, meta });
    // fetch + keepalive survives navigation (like sendBeacon) but, unlike sendBeacon,
    // completes correctly through the CORS preflight that a JSON body / token header
    // requires. Fire-and-forget; errors are swallowed.
    fetch(WEB_EVENTS_URL, {
      method: "POST",
      mode: "cors",
      keepalive: true,
      headers: { "content-type": "application/json", ...(TOKEN ? { "x-web-token": TOKEN } : {}) },
      body,
    }).catch(() => {});
  } catch {
    /* swallow — never break the page for analytics */
  }
}
