import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import FoamBubbles from "./FoamBubbles";
import OptimizedImage from "@/components/OptimizedImage";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import { OPEN_LOCATIONS } from "@/lib/locations";

const HeroSection = () => {
  const scrollToLocations = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#locations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative bg-gradient-to-b from-[hsl(202_68%_40%)] to-[hsl(202_72%_34%)] min-h-[360px] sm:min-h-[420px] lg:min-h-[540px]">
        <FoamBubbles variant="hero" density="medium" />

        <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            <div
              className="lg:w-1/2 text-center lg:text-left"
            >
              <p className="font-display text-white text-sm sm:text-base lg:text-xl tracking-wider text-shadow-white mb-2">
                FAMILY-OWNED NEW JERSEY CAR WASH
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-washking-yellow text-shadow mb-4 lg:mb-8">
                WASHKING
              </h1>

              <div className="mb-6 lg:mb-10 max-w-xl mx-auto lg:mx-0">
                <p className="font-body font-bold text-white text-base sm:text-lg lg:text-xl leading-relaxed text-shadow-white">
                  Find your nearest WashKing, check today's hours, compare wash plans, and get directions.
                </p>
                <p className="font-display text-washking-yellow text-sm sm:text-base lg:text-lg tracking-wider text-shadow mt-3">
                  {OPEN_LOCATIONS.length} LOCATIONS OPEN | CHERRY HILL COMING SOON
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#locations"
                  onClick={scrollToLocations}
                  className="btn-hero-secondary text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4"
                >
                  FIND A LOCATION
                </a>
                <a
                  href={MEMBERSHIP_PORTAL}
                  data-analytics="membership_cta"
                  data-analytics-source="homepage_hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-primary text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4"
                >
                  GO UNLIMITED
                </a>
              </div>
            </div>

            <div
              className="lg:w-1/2 flex justify-center lg:justify-end"
            >
              <OptimizedImage
                avifSrc={lionMascotAvif}
                src={lionMascot}
                alt="WashKing Lion Mascot"
                width={1132}
                height={1920}
                decoding="async"
                className="w-40 sm:w-56 lg:w-72 xl:w-80 h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
