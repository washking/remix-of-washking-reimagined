import { BadgeDollarSign, CalendarCheck2, MapPinned } from "lucide-react";
import tunnelHero from "@/assets/washking-wash-tunnel-hero.jpg";
import tunnelHeroAvif from "@/assets/washking-wash-tunnel-hero.avif";
import OptimizedImage from "@/components/OptimizedImage";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import { OPEN_LOCATIONS, getStartingMonthlyPrice } from "@/lib/locations";

const lowestMonthlyPrice = Math.min(
  ...OPEN_LOCATIONS.map(getStartingMonthlyPrice).filter(Number.isFinite),
);

const quickFacts = [
  {
    icon: MapPinned,
    label: `${OPEN_LOCATIONS.length} locations open`,
  },
  {
    icon: BadgeDollarSign,
    label: `Unlimited from $${lowestMonthlyPrice.toFixed(2)}/month`,
  },
  {
    icon: CalendarCheck2,
    label: "No long-term contract",
  },
] as const;

const HeroSection = () => {
  const scrollToLocations = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="overflow-hidden border-b-4 border-washking-yellow bg-white">
      <div className="hero-media-enter relative h-[280px] overflow-hidden bg-black sm:h-[380px] lg:h-[440px]">
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
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="section-eyebrow">
              Family-owned across New Jersey
            </p>

            <h1 className="mt-2 font-display text-3xl text-washking-brown sm:text-4xl">
              Wash King Car Wash
            </h1>

            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-gray-600 sm:text-lg">
              Find the right wash, see today's hours, and compare single-wash and unlimited plans before you arrive.
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Wash King highlights">
              {quickFacts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-2 font-body text-sm font-bold text-washking-brown">
                  <fact.icon className="h-4 w-4 text-washking-sky" aria-hidden="true" />
                  {fact.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#locations"
                onClick={scrollToLocations}
                className="btn-secondary min-h-12 px-6 text-center sm:px-8 sm:text-base"
              >
                Find a location
              </a>
              <a
                href={MEMBERSHIP_PORTAL}
                data-analytics="membership_cta"
                data-analytics-source="homepage_hero"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-12 px-6 text-center sm:px-8 sm:text-base"
              >
                Join Unlimited
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
