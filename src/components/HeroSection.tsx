import tunnelHero from "@/assets/washking-wash-tunnel-hero.jpg";
import tunnelHeroAvif from "@/assets/washking-wash-tunnel-hero.avif";
import OptimizedImage from "@/components/OptimizedImage";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import { OPEN_LOCATIONS } from "@/lib/locations";

const HeroSection = () => {
  const scrollToLocations = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="overflow-hidden border-b-4 border-washking-yellow bg-white">
      <h1 className="sr-only">WASH KING CAR WASH</h1>

      <div className="hero-media-enter relative h-[320px] overflow-hidden bg-black sm:h-[430px] lg:h-[520px]">
        <OptimizedImage
          avifSrc={tunnelHeroAvif}
          src={tunnelHero}
          alt="A car moving through the Wash King wash tunnel, shown half dirty and half clean"
          width={1247}
          height={831}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-contain"
        />
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-7 sm:py-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="font-body text-sm font-extrabold uppercase text-washking-sky sm:text-base">
              FAMILY-OWNED NEW JERSEY CAR WASH
            </p>

            <div className="mt-3 max-w-2xl">
              <p className="font-body text-sm font-bold leading-relaxed text-washking-brown sm:text-base lg:text-lg">
                Find your nearest Wash King, check today's hours, compare wash plans, and get directions.
              </p>
              <p className="mt-2 font-body text-sm font-extrabold uppercase text-washking-sky sm:text-base">
                {OPEN_LOCATIONS.length} LOCATIONS OPEN | CHERRY HILL COMING SOON
              </p>
            </div>

            <div className="mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#locations"
                onClick={scrollToLocations}
                className="btn-cloud min-h-12 border border-washking-brown bg-washking-yellow px-6 py-3 text-center text-sm text-washking-brown sm:px-8 sm:text-base"
              >
                FIND A LOCATION
              </a>
              <a
                href={MEMBERSHIP_PORTAL}
                data-analytics="membership_cta"
                data-analytics-source="homepage_hero"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cloud min-h-12 border border-washking-brown bg-washking-brown px-6 py-3 text-center text-sm text-white sm:px-8 sm:text-base"
              >
                GO UNLIMITED
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
