import { Link } from "react-router-dom";
import carWashIllustration from "@/assets/car-wash-illustration.png";
import carWashIllustrationAvif from "@/assets/car-wash-illustration.avif";
import { OPEN_LOCATIONS } from "@/lib/locations";
import FoamBubbles from "./FoamBubbles";
import OptimizedImage from "@/components/OptimizedImage";

const benefits = [
  "Visit daily for one monthly low price!",
  "Most plans pay for themselves after 2-3 visits per month.",
  "Hassle-free entry with License Plate Recognition.",
  "Automatic Monthly Recharge on your anniversary.",
  "No contracts — cancel anytime!",
];

const PackagesSection = () => {
  return (
    <section 
      id="packages" 
      className="relative py-10 lg:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(202_68%_40%)] to-[hsl(202_72%_34%)]" />
      <FoamBubbles variant="section" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
          <div
            className="lg:w-1/2"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl text-white text-shadow mb-2 lg:mb-4">
              UNLIMITED WASH CLUB
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-5xl text-washking-yellow text-shadow mb-4 lg:mb-8">
              HOW IT WORKS
            </h3>
            
            <p className="font-body text-white text-base sm:text-lg lg:text-2xl mb-6 lg:mb-10 text-shadow-white leading-relaxed">
              Turn repeat visits into one predictable monthly price.
            </p>

            <div className="space-y-3 lg:space-y-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 lg:gap-4"
                >
                  <div 
                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-display text-base lg:text-xl flex-shrink-0"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.7) 70%)",
                      boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.1)",
                      color: "hsl(var(--washking-brown))",
                    }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-white font-body text-sm sm:text-base lg:text-xl">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 lg:mt-10">
              <p className="mb-3 font-body text-sm font-bold text-white">
                Compare plans and pricing at your location:
              </p>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {OPEN_LOCATIONS.map((location) => (
                  <Link
                    key={location.slug}
                    to={`/location/${location.slug}`}
                    data-analytics="location_select"
                    data-analytics-source="homepage_unlimited"
                    data-location-slug={location.slug}
                    className="rounded-full border-2 border-white bg-white px-4 py-2 font-body text-sm font-extrabold text-washking-brown transition-colors hover:bg-washking-cream"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="lg:w-1/2 flex justify-center"
          >
            <OptimizedImage
              avifSrc={carWashIllustrationAvif}
              src={carWashIllustration}
              alt="Car being washed with bubbles"
              width={801}
              height={451}
              loading="lazy"
              decoding="async"
              className="w-48 sm:w-64 lg:max-w-lg h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
