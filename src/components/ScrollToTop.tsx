import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let cancelled = false;
    const scrollToRouteTarget = () => {
      if (cancelled) return;

      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      window.scrollTo({ top: 0 });
    };

    const initialTimeout = window.setTimeout(scrollToRouteTarget, hash ? 100 : 0);
    const settledTimeout = hash
      ? window.setTimeout(scrollToRouteTarget, 500)
      : undefined;

    if (hash && document.fonts) {
      void document.fonts.ready.then(scrollToRouteTarget);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(initialTimeout);
      if (settledTimeout) window.clearTimeout(settledTimeout);
    };
  }, [hash, pathname]);

  return null;
};

export default ScrollToTop;
