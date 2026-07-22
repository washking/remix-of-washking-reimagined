import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger start, in ms. */
  delay?: number;
}

// Scroll-reveal for BELOW-THE-FOLD content only. Prerender-safe by design:
// the server renders children fully visible, and the hiding class is added
// client-side after mount — and only when the element is still below the
// viewport — so LCP/prerendered content can never flash hidden. No-op under
// prefers-reduced-motion.
const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.style.transitionDelay = `${delay}ms`;
    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("reveal-shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
