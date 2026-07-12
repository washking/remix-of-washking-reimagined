import carWashIllustration from "@/assets/car-wash-illustration.png";
import carWashIllustrationAvif from "@/assets/car-wash-illustration.avif";
import OptimizedImage from "@/components/OptimizedImage";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import { OPEN_LOCATIONS } from "@/lib/locations";

const HeroSection = () => {
  const scrollToLocations = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-washking-sky">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] border-l border-white/10 bg-white/5 lg:block" aria-hidden="true" />
      <OptimizedImage
        avifSrc={carWashIllustrationAvif}
        src={carWashIllustration}
        alt="Car being washed with bubbles"
        width={801}
        height={451}
        decoding="async"
        className="pointer-events-none absolute -bottom-3 right-[-12%] z-0 w-[82%] max-w-2xl opacity-95 sm:right-[-5%] sm:w-[68%] lg:bottom-6 lg:right-[2%] lg:w-[48%] lg:max-w-3xl"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex min-h-[560px] max-w-3xl flex-col items-start py-10 pb-64 sm:min-h-[600px] sm:pb-72 lg:min-h-[620px] lg:justify-center lg:py-14 lg:pb-14">
          <h1 className="font-display text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
            <span className="block">WASH KING</span>
            <span className="mt-1 block text-washking-yellow">CAR WASH</span>
          </h1>

          <p className="mt-5 font-body text-sm font-extrabold uppercase text-white/80 sm:text-base">
            FAMILY-OWNED NEW JERSEY CAR WASH
          </p>

          <div className="mt-5 max-w-xl">
            <p className="font-body text-base font-bold leading-relaxed text-white sm:text-lg lg:text-xl">
              Find your nearest Wash King, check today's hours, compare wash plans, and get directions.
            </p>
            <p className="mt-3 font-body text-sm font-extrabold uppercase text-washking-yellow sm:text-base">
              {OPEN_LOCATIONS.length} LOCATIONS OPEN | CHERRY HILL COMING SOON
            </p>
          </div>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#locations"
              onClick={scrollToLocations}
              className="btn-hero-secondary min-h-12 px-6 py-3 text-center text-sm sm:px-8 sm:text-base"
            >
              FIND A LOCATION
            </a>
            <a
              href={MEMBERSHIP_PORTAL}
              data-analytics="membership_cta"
              data-analytics-source="homepage_hero"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary min-h-12 px-6 py-3 text-center text-sm sm:px-8 sm:text-base"
            >
              GO UNLIMITED
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
