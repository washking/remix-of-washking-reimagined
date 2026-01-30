import { motion } from "framer-motion";

interface BubbleProps {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  opacity?: number;
}

const Bubble = ({ size, x, y, delay, duration, opacity = 0.6 }: BubbleProps) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,${opacity}) 60%, rgba(200,230,255,${opacity * 0.8}))`,
      boxShadow: `
        inset -2px -2px 4px rgba(255,255,255,0.8),
        inset 2px 2px 4px rgba(200,230,255,0.3),
        0 2px 8px rgba(0,0,0,0.05)
      `,
    }}
    animate={{
      y: [0, -15, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

interface FoamBubblesProps {
  variant?: "hero" | "section" | "light";
  density?: "low" | "medium" | "high";
}

const FoamBubbles = ({ variant = "section", density = "medium" }: FoamBubblesProps) => {
  const bubbleConfigs = {
    low: [
      { size: 60, x: "5%", y: "10%", delay: 0, duration: 4, opacity: 0.5 },
      { size: 80, x: "85%", y: "15%", delay: 1, duration: 5, opacity: 0.4 },
      { size: 40, x: "15%", y: "70%", delay: 2, duration: 3.5, opacity: 0.5 },
      { size: 55, x: "90%", y: "65%", delay: 0.5, duration: 4.5, opacity: 0.45 },
    ],
    medium: [
      { size: 70, x: "3%", y: "8%", delay: 0, duration: 4, opacity: 0.55 },
      { size: 45, x: "12%", y: "25%", delay: 1.5, duration: 3.5, opacity: 0.5 },
      { size: 90, x: "88%", y: "12%", delay: 0.8, duration: 5, opacity: 0.45 },
      { size: 35, x: "92%", y: "35%", delay: 2, duration: 3, opacity: 0.5 },
      { size: 55, x: "8%", y: "75%", delay: 0.3, duration: 4.2, opacity: 0.5 },
      { size: 65, x: "85%", y: "70%", delay: 1.2, duration: 4.8, opacity: 0.45 },
      { size: 30, x: "25%", y: "85%", delay: 2.5, duration: 3.2, opacity: 0.55 },
      { size: 40, x: "75%", y: "88%", delay: 1.8, duration: 3.8, opacity: 0.5 },
    ],
    high: [
      { size: 80, x: "2%", y: "5%", delay: 0, duration: 4.5, opacity: 0.5 },
      { size: 50, x: "10%", y: "20%", delay: 1, duration: 3.5, opacity: 0.55 },
      { size: 35, x: "18%", y: "40%", delay: 2.2, duration: 3, opacity: 0.5 },
      { size: 100, x: "90%", y: "8%", delay: 0.5, duration: 5.5, opacity: 0.4 },
      { size: 45, x: "95%", y: "30%", delay: 1.8, duration: 3.8, opacity: 0.5 },
      { size: 60, x: "88%", y: "55%", delay: 0.3, duration: 4.2, opacity: 0.45 },
      { size: 70, x: "5%", y: "65%", delay: 1.5, duration: 4.8, opacity: 0.5 },
      { size: 40, x: "15%", y: "82%", delay: 2.8, duration: 3.2, opacity: 0.55 },
      { size: 55, x: "80%", y: "78%", delay: 0.8, duration: 4, opacity: 0.5 },
      { size: 30, x: "50%", y: "5%", delay: 2, duration: 3.5, opacity: 0.45 },
      { size: 25, x: "70%", y: "90%", delay: 1.2, duration: 3, opacity: 0.55 },
    ],
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbleConfigs[density].map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
      
      {/* Foam wave at bottom */}
      {variant === "hero" && (
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute bottom-0 left-0 w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="foamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="100" rx="120" ry="60" fill="url(#foamGradient)" />
          <ellipse cx="280" cy="105" rx="100" ry="50" fill="url(#foamGradient)" />
          <ellipse cx="450" cy="95" rx="130" ry="65" fill="url(#foamGradient)" />
          <ellipse cx="650" cy="108" rx="90" ry="45" fill="url(#foamGradient)" />
          <ellipse cx="820" cy="98" rx="140" ry="70" fill="url(#foamGradient)" />
          <ellipse cx="1020" cy="105" rx="110" ry="55" fill="url(#foamGradient)" />
          <ellipse cx="1200" cy="95" rx="125" ry="62" fill="url(#foamGradient)" />
          <ellipse cx="1380" cy="102" rx="100" ry="50" fill="url(#foamGradient)" />
        </svg>
      )}
    </div>
  );
};

export default FoamBubbles;
