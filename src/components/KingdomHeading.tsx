import { Crown } from "lucide-react";

type KingdomHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
  align?: "left" | "center";
  className?: string;
};

const KingdomHeading = ({
  eyebrow,
  title,
  description,
  inverse = false,
  align = "center",
  className = "",
}: KingdomHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      <div className={`mb-3 flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}>
        <span className={`h-px w-8 ${inverse ? "bg-white/35" : "bg-washking-brown/25"}`} aria-hidden="true" />
        <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${inverse ? "border-white/30 bg-washking-yellow text-washking-brown" : "border-washking-brown/15 bg-washking-yellow text-washking-brown"}`}>
          <Crown className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className={`h-px w-8 ${inverse ? "bg-white/35" : "bg-washking-brown/25"}`} aria-hidden="true" />
      </div>
      <p
        className={`bg-wood inline-block -rotate-1 rounded-md border px-3.5 py-1.5 font-body text-xs font-extrabold text-white shadow-sm sm:text-sm ${
          inverse ? "border-white/25" : "border-washking-brown/30"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`mt-2 font-display text-3xl sm:text-4xl ${inverse ? "text-white" : "text-washking-brown"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed sm:text-lg ${inverse ? "text-white/90" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default KingdomHeading;
