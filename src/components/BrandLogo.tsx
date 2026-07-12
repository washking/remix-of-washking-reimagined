import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import footerLogo from "@/assets/washking-hero-logo.png";
import footerLogoAvif from "@/assets/washking-hero-logo.avif";
import OptimizedImage from "@/components/OptimizedImage";

type BrandLogoProps = {
  variant?: "header" | "footer";
};

const BrandLogo = ({ variant = "header" }: BrandLogoProps) => {
  const isFooter = variant === "footer";

  if (isFooter) {
    return (
      <OptimizedImage
        avifSrc={footerLogoAvif}
        src={footerLogo}
        alt="Wash King Car Wash"
        width={1185}
        height={1400}
        loading="lazy"
        decoding="async"
        className="block h-28 w-auto sm:h-32"
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="relative block h-12 w-12 shrink-0 overflow-hidden sm:w-14"
        aria-hidden="true"
      >
        <OptimizedImage
          avifSrc={lionMascotAvif}
          src={lionMascot}
          alt=""
          width={1132}
          height={1920}
          loading="eager"
          decoding="async"
          className="absolute left-1/2 top-0 h-auto w-10 -translate-x-1/2 sm:w-11"
        />
      </span>

      <span className="flex min-w-0 flex-col text-left leading-none">
        <span className="whitespace-nowrap font-display text-sm font-black text-washking-brown sm:text-base">
          WASH KING
        </span>
        <span className="mt-1 whitespace-nowrap font-body text-[10px] font-extrabold text-washking-sky sm:text-xs">
          CAR WASH
        </span>
      </span>
    </span>
  );
};

export default BrandLogo;
