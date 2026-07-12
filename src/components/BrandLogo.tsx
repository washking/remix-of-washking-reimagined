import logo from "@/assets/washking-logo.png";
import logoAvif from "@/assets/washking-logo.avif";
import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import OptimizedImage from "@/components/OptimizedImage";

type BrandLogoProps = {
  variant?: "header" | "footer";
};

const BrandLogo = ({ variant = "header" }: BrandLogoProps) => {
  const isFooter = variant === "footer";
  const imageSrc = isFooter ? logo : lionMascot;
  const imageAvifSrc = isFooter ? logoAvif : lionMascotAvif;

  return (
    <span className={`inline-flex items-center ${isFooter ? "gap-3" : "gap-2"}`}>
      <span
        className={`relative block shrink-0 overflow-hidden ${
          isFooter ? "h-14 w-20" : "h-12 w-12 sm:w-14"
        }`}
        aria-hidden="true"
      >
        <OptimizedImage
          avifSrc={imageAvifSrc}
          src={imageSrc}
          alt=""
          width={isFooter ? 500 : 1132}
          height={isFooter ? 511 : 1920}
          loading={isFooter ? "lazy" : "eager"}
          decoding="async"
          className={`absolute left-1/2 top-0 h-auto -translate-x-1/2 ${
            isFooter ? "w-20" : "w-10 sm:w-11"
          }`}
        />
      </span>

      <span className="flex min-w-0 flex-col text-left leading-none">
        <span
          className={`whitespace-nowrap font-display font-black ${
            isFooter ? "text-xl text-white" : "text-sm text-washking-brown sm:text-base"
          }`}
        >
          WASH KING
        </span>
        <span
          className={`mt-1 whitespace-nowrap font-body font-extrabold ${
            isFooter ? "text-xs text-washking-yellow" : "text-[10px] text-washking-sky sm:text-xs"
          }`}
        >
          CAR WASH
        </span>
      </span>
    </span>
  );
};

export default BrandLogo;
