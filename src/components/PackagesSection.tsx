import { Link } from "react-router-dom";
import carWashIllustration from "@/assets/car-wash-illustration.png";
import carWashIllustrationAvif from "@/assets/car-wash-illustration.avif";
import { OPEN_LOCATIONS } from "@/lib/locations";
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
    <section id="packages" className="overflow-hidden bg-washking-sky py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div
            className="lg:w-1/2"
          >
            <h2 className="mb-2 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
              UNLIMITED WASH CLUB
            </h2>
            <h3 className="mb-4 font-display text-xl text-washking-yellow sm:text-2xl lg:mb-7 lg:text-3xl">
              HOW IT WORKS
            </h3>
            
            <p className="mb-6 font-body text-base leading-relaxed text-white/90 sm:text-lg lg:mb-9 lg:text-xl">
              Turn repeat visits into one predictable monthly price.
            </p>

            <div className="space-y-3 lg:space-y-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 lg:gap-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-washking-yellow font-body text-sm font-extrabold text-washking-brown lg:h-11 lg:w-11 lg:text-base">
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
                    className="rounded-lg border border-white/40 bg-white px-4 py-2 font-body text-sm font-extrabold text-washking-brown transition-colors hover:bg-washking-cream"
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
              className="h-auto w-64 sm:w-80 lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
