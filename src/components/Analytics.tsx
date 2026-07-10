import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@/lib/analytics";

/**
 * Mounted once in the Layout. Fires a page_view (and location_view on location
 * pages) on every route change, and a delegated listener captures outbound CTA
 * clicks (membership portal, phone) without touching each button. Renders nothing.
 */
export default function Analytics() {
  const { pathname } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    track("page_view");
    // location_slug is derived from the path inside baseFields(), so both
    // page_view and location_view on a location page carry it automatically.
    if (/^\/location\/[^/]+/.test(pathname)) track("location_view");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const label = (anchor.textContent || "").trim().slice(0, 60);
      if (href.includes("customerportal.nxtwash.com")) {
        track("portal_open", { href, label });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { href, label });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
