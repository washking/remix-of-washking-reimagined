import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { track, type TrackOptions } from "@/lib/analytics";
import { getClickAnalyticsEvents } from "@/lib/clickAnalytics";

const HEARTBEAT_MS = 30_000;
const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

type PageEngagement = {
  path: string;
  startedAt: number;
  visibleAt: number | null;
  visibleMs: number;
  maxScrollDepth: number;
  milestones: Set<number>;
  closed: boolean;
};

const clock = () => performance.now();

function navigationType(): string {
  try {
    return performance.getEntriesByType("navigation")[0] instanceof PerformanceNavigationTiming
      ? (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type
      : "navigate";
  } catch {
    return "navigate";
  }
}

function startPage(path: string): PageEngagement {
  const now = clock();
  return {
    path,
    startedAt: now,
    visibleAt: document.visibilityState === "visible" ? now : null,
    visibleMs: 0,
    maxScrollDepth: 0,
    milestones: new Set<number>(),
    closed: false,
  };
}

function engagementMeta(page: PageEngagement, reason: string) {
  const now = clock();
  const currentVisibleMs = page.visibleAt == null ? 0 : now - page.visibleAt;
  const visibleMs = Math.max(0, Math.round(page.visibleMs + currentVisibleMs));

  return {
    // duration_ms intentionally means active, visible time. elapsed_ms preserves
    // total wall-clock time without treating a background tab as engagement.
    duration_ms: visibleMs,
    visible_ms: visibleMs,
    elapsed_ms: Math.max(0, Math.round(now - page.startedAt)),
    max_scroll_depth: page.maxScrollDepth,
    reason,
  };
}

function emitEngagement(
  eventName: "page_exit" | "page_heartbeat",
  page: PageEngagement,
  reason: string,
  options: TrackOptions = {},
) {
  track(eventName, engagementMeta(page, reason), { ...options, path: page.path });
}

function closePage(page: PageEngagement, reason: string, transport: TrackOptions["transport"] = "fetch") {
  if (page.closed) return;
  page.closed = true;
  emitEngagement("page_exit", page, reason, { transport });
}

function scrollDepth(): number {
  const root = document.documentElement;
  const available = Math.max(0, root.scrollHeight - window.innerHeight);
  if (available === 0) return 0;
  return Math.min(100, Math.max(0, Math.round((window.scrollY / available) * 100)));
}

/**
 * Mounted once in the Layout. Captures route views, conversion clicks, and
 * visibility-aware page engagement. It renders nothing and never blocks UI work.
 */
export default function Analytics() {
  const { pathname } = useLocation();
  const page = useRef<PageEngagement | null>(null);

  useEffect(() => {
    const previous = page.current;
    if (previous?.path === pathname) return;

    if (previous) closePage(previous, "route_change");

    const current = startPage(pathname);
    page.current = current;
    track("page_view", { navigation_type: previous ? "spa" : navigationType() }, { path: pathname });

    if (/^\/location\/[^/]+/.test(pathname)) {
      track("location_view", {}, { path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      getClickAnalyticsEvents(anchor).forEach(({ eventName, meta }) => {
        track(eventName, meta);
      });
    };

    const onScroll = () => {
      const current = page.current;
      if (!current || current.closed) return;

      const depth = scrollDepth();
      current.maxScrollDepth = Math.max(current.maxScrollDepth, depth);
      for (const milestone of SCROLL_MILESTONES) {
        if (depth < milestone || current.milestones.has(milestone)) continue;
        current.milestones.add(milestone);
        track(
          "scroll_depth",
          { depth_percent: milestone, max_scroll_depth: depth },
          { path: current.path },
        );
      }
    };

    const onVisibilityChange = () => {
      const current = page.current;
      if (!current || current.closed) return;
      const now = clock();

      if (document.visibilityState === "hidden") {
        if (current.visibleAt != null) {
          current.visibleMs += now - current.visibleAt;
          current.visibleAt = null;
        }
        emitEngagement("page_heartbeat", current, "visibility_hidden", { transport: "beacon" });
      } else if (current.visibleAt == null) {
        current.visibleAt = now;
      }
    };

    const onPageHide = (event: PageTransitionEvent) => {
      const current = page.current;
      if (!current || current.closed) return;

      if (event.persisted) {
        emitEngagement("page_heartbeat", current, "back_forward_cache", { transport: "beacon" });
      } else {
        closePage(current, "page_hide", "beacon");
      }
    };

    const onPageShow = (event: PageTransitionEvent) => {
      const current = page.current;
      if (!event.persisted || !current || current.closed || current.visibleAt != null) return;
      current.visibleAt = clock();
    };

    const heartbeat = window.setInterval(() => {
      const current = page.current;
      if (!current || current.closed || document.visibilityState !== "visible") return;
      emitEngagement("page_heartbeat", current, "interval");
    }, HEARTBEAT_MS);

    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
