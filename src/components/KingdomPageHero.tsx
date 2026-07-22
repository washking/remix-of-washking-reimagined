import type { LucideIcon } from "lucide-react";
import lionCar from "@/assets/lion-car-mark.png";
import lionCarAvif from "@/assets/lion-car-mark.avif";
import OptimizedImage from "@/components/OptimizedImage";
import RoyalTrim from "@/components/RoyalTrim";
import BubbleField from "@/components/decor/BubbleField";

type KingdomPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

const KingdomPageHero = ({
  eyebrow,
  title,
  description,
  icon: Icon,
}: KingdomPageHeroProps) => (
  <section className="relative overflow-hidden bg-washking-sky text-white">
    <BubbleField density="subtle" />
    <div className="container relative mx-auto px-4">
      <div className="mx-auto grid max-w-6xl items-center gap-5 py-9 sm:py-11 md:grid-cols-[minmax(0,1fr)_190px] lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="flex items-start gap-4 sm:items-center">
          {Icon && (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-white/30 bg-washking-yellow text-washking-brown shadow-sm">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <div>
            <p className="font-body text-sm font-extrabold text-washking-yellow">
              {eyebrow}
            </p>
            <h1 className="mt-1 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-white/90 sm:text-base">
              {description}
            </p>
          </div>
        </div>

        <OptimizedImage
          avifSrc={lionCarAvif}
          src={lionCar}
          alt=""
          width={500}
          height={380}
          loading="eager"
          decoding="async"
          className="mx-auto hidden h-auto w-full max-w-[230px] md:block"
        />
      </div>
    </div>
    <RoyalTrim />
  </section>
);

export default KingdomPageHero;
