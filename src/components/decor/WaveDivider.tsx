import { cn } from "@/lib/utils";

interface WaveDividerProps {
  /** Color the wave with a text-* token class, e.g. "text-washking-sky". */
  className?: string;
  /** Point the wave crests downward (use at the bottom edge of a band). */
  flip?: boolean;
}

// Soap-wave section divider. Decorative only; the wave inherits currentColor
// so callers pick the band color with text-washking-* classes.
const WaveDivider = ({ className, flip = false }: WaveDividerProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 64"
    preserveAspectRatio="none"
    className={cn("block h-8 w-full sm:h-12", flip && "rotate-180", className)}
  >
    <path
      fill="currentColor"
      d="M0 34 C 110 6, 230 2, 350 24 C 470 46, 590 58, 720 42 C 850 26, 970 6, 1090 18 C 1210 30, 1330 54, 1440 34 L 1440 64 L 0 64 Z"
    />
  </svg>
);

export default WaveDivider;
