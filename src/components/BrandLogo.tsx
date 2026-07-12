import headerLogo from "@/assets/washking-logo.png";
import headerLogoAvif from "@/assets/washking-logo.avif";
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
        className="relative block h-[50px] w-14 shrink-0 overflow-hidden sm:w-16"
        aria-hidden="true"
      >
        <OptimizedImage
          avifSrc={headerLogoAvif}
          src={headerLogo}
          alt=""
          width={500}
          height={500}
          loading="eager"
          decoding="async"
          className="absolute left-1/2 top-0 h-auto w-16 -translate-x-1/2 [clip-path:inset(0_0_25%_0)]"
        />
      </span>

      <span className="hidden min-w-0 flex-col text-left leading-none min-[360px]:flex">
        <span className="whitespace-nowrap font-display text-sm font-extrabold text-washking-brown sm:text-base">
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
