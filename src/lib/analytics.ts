// First-party, anonymous interaction analytics for washking.net.
// Sends events to the ingest-web-event edge function; the data is viewable in the
// WashKing Communicator admin dashboard. No PII — just an anonymous visitor id.
// Safe during SSG: every function no-ops when there's no browser environment.
import { WEB_EVENTS_URL } from "./site";
import { POC_MODE } from "./pocMode";

const TOKEN = import.meta.env.VITE_WEB_EVENTS_TOKEN as string | undefined;
const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined";
const memoryIds = new Map<string, string>();
let eventSequence = 0;

type StorageKind = "local" | "session";

export type TrackOptions = {
  path?: string;
  transport?: "fetch" | "beacon";
};

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.floor(Math.random() * 16);
      return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
    });
  }
}

function persistentId(key: string, kind: StorageKind): string {
  const cached = memoryIds.get(key);
  if (cached) return cached;

  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    let v = storage.getItem(key);
    if (!v) {
      v = newId();
      storage.setItem(key, v);
    }
    memoryIds.set(key, v);
    return v;
  } catch {
    const fallback = newId();
    memoryIds.set(key, fallback);
    return fallback;
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

function baseFields(pathOverride?: string) {
  const path = pathOverride || window.location.pathname;
  const loc = path.match(/^\/location\/([^/]+)/);
  let referrer: string | undefined;
  try {
    const source = document.referrer ? new URL(document.referrer) : null;
    // Query strings can contain ad IDs or customer-entered values. Source and
    // pathname are enough for attribution, so never send the query or hash.
    referrer = source ? `${source.origin}${source.pathname}` : undefined;
  } catch {
    referrer = undefined;
  }

  return {
    anon_id: persistentId("wk_anon", "local"),
    session_id: persistentId("wk_sess", "session"),
    path,
    location_slug: loc ? loc[1] : undefined,
    site_host: window.location.hostname,
    referrer,
    device: window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop",
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    ...utms(),
  };
}

/** Fire-and-forget event. Never throws — analytics must not break the page. */
export function track(
  event_name: string,
  meta: Record<string, unknown> = {},
  options: TrackOptions = {},
): void {
  if (!isBrowser) return;
  if (POC_MODE) {
    console.debug("[poc] analytics suppressed:", event_name);
    return;
  }
  try {
    const body = JSON.stringify({
      ...baseFields(options.path),
      event_name,
      web_token: TOKEN,
      meta: {
        ...meta,
        client_ts_ms: Date.now(),
        sequence: ++eventSequence,
      },
    });

    // A text/plain body is a CORS-simple request. That matters during page exit,
    // where there may not be enough time for a preflight followed by a POST.
    if (options.transport === "beacon" && typeof navigator.sendBeacon === "function") {
      const accepted = navigator.sendBeacon(
        WEB_EVENTS_URL,
        new Blob([body], { type: "text/plain;charset=UTF-8" }),
      );
      if (accepted) return;
    }

    fetch(WEB_EVENTS_URL, {
      method: "POST",
      mode: "cors",
      keepalive: true,
      headers: { "content-type": "text/plain;charset=UTF-8" },
      body,
    }).catch(() => {});
  } catch {
    /* swallow — never break the page for analytics */
  }
}
