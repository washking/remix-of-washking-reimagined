import { cn } from "@/lib/utils";

interface BubbleSpec {
  left: string;
  bottom: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  rise: string;
}

// Fixed bubble layouts so server-rendered markup matches hydration exactly —
// never randomize these at render time.
const SUBTLE: BubbleSpec[] = [
  { left: "8%", bottom: "10%", size: 14, delay: 0, duration: 11, opacity: 0.3, rise: "7rem" },
  { left: "22%", bottom: "0%", size: 22, delay: 3.5, duration: 13, opacity: 0.25, rise: "9rem" },
  { left: "55%", bottom: "5%", size: 10, delay: 1.5, duration: 10, opacity: 0.3, rise: "6rem" },
  { left: "78%", bottom: "12%", size: 18, delay: 5, duration: 12, opacity: 0.25, rise: "8rem" },
  { left: "92%", bottom: "2%", size: 12, delay: 2.5, duration: 11, opacity: 0.3, rise: "7rem" },
];

const LIVELY: BubbleSpec[] = [
  ...SUBTLE,
  { left: "14%", bottom: "18%", size: 26, delay: 6, duration: 14, opacity: 0.3, rise: "10rem" },
  { left: "38%", bottom: "8%", size: 16, delay: 4, duration: 12, opacity: 0.35, rise: "8rem" },
  { left: "66%", bottom: "15%", size: 30, delay: 8, duration: 15, opacity: 0.25, rise: "11rem" },
  { left: "85%", bottom: "20%", size: 20, delay: 1, duration: 13, opacity: 0.3, rise: "9rem" },
];

interface BubbleFieldProps {
  /** "subtle" (5 bubbles) for accents, "lively" (9) for celebration moments. */
  density?: "subtle" | "lively";
  /** Bubble tint class, defaults to soapy white. */
  bubbleClassName?: string;
  className?: string;
}

// Decorative rising soap bubbles. Purely visual: aria-hidden, no pointer
// events, and hidden entirely under prefers-reduced-motion (see index.css).
// Never wrap LCP/above-the-fold content in one of these — position it behind
// below-the-fold sections only.
const BubbleField = ({
  density = "subtle",
  bubbleClassName = "border border-white/50 bg-white/30",
  className,
}: BubbleFieldProps) => (
  <div
    aria-hidden="true"
    className={cn("bubble-field pointer-events-none absolute inset-0 overflow-hidden", className)}
  >
    {(density === "subtle" ? SUBTLE : LIVELY).map((bubble, index) => (
      <span
        key={index}
        className={cn("absolute rounded-full", bubbleClassName)}
        style={{
          left: bubble.left,
          bottom: bubble.bottom,
          width: bubble.size,
          height: bubble.size,
          "--bubble-delay": `${bubble.delay}s`,
          "--bubble-duration": `${bubble.duration}s`,
          "--bubble-opacity": bubble.opacity,
          "--bubble-rise": bubble.rise,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

export default BubbleField;
