import { Link } from "react-router-dom";
import experienceCollage from "@/assets/washking-customer-experience-collage.jpg";
import experienceCollageAvif from "@/assets/washking-customer-experience-collage.avif";
import carWashIllustration from "@/assets/car-wash-illustration.png";
import carWashIllustrationAvif from "@/assets/car-wash-illustration.avif";
import { OPEN_LOCATIONS } from "@/lib/locations";
import OptimizedImage from "@/components/OptimizedImage";
import KingdomHeading from "@/components/KingdomHeading";
import RoyalTrim from "@/components/RoyalTrim";
import BubbleField from "@/components/decor/BubbleField";

const benefits = [
  "Wash once a day for one predictable monthly price.",
  "For most plans, 2-3 washes per month can cost as much as the membership.",
  "License plate recognition makes member entry faster.",
  "Your plan renews automatically on your monthly sign-up date.",
  "No long-term contract. Cancel anytime.",
];

const PackagesSection = () => {
  return (
    <section id="packages" className="relative overflow-hidden bg-washking-sky py-12 lg:py-16">
      <BubbleField density="subtle" />
      <div className="container relative mx-auto px-4">
        <KingdomHeading
          eyebrow="Membership made simple"
          title="Unlimited Wash Club"
          description="Wash your registered vehicle once a day for one predictable monthly price."
          inverse
          className="mb-10 lg:mb-12"
        />
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div
            className="lg:w-1/2"
          >
            <div className="space-y-3 lg:space-y-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 lg:gap-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 rotate-3 items-center justify-center rounded-lg border-2 border-white/35 bg-washking-yellow font-display text-sm font-bold text-washking-brown shadow-sm lg:h-11 lg:w-11 lg:text-base">
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
                Choose your location to see exact plans and pricing:
              </p>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {OPEN_LOCATIONS.map((location) => (
                  <Link
                    key={location.slug}
                    to={`/location/${location.slug}`}
                    data-analytics="location_select"
                    data-analytics-source="homepage_unlimited"
                    data-location-slug={location.slug}
                    className="btn-cloud border border-white/40 bg-white px-4 py-2 text-washking-brown hover:bg-washking-cream"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex w-full flex-col items-center justify-center lg:w-1/2"
          >
            <OptimizedImage
              avifSrc={experienceCollageAvif}
              src={experienceCollage}
              alt="Wash King pricing board, wash tunnel, payment station, facility entrance, and team member detailing a wheel"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-2xl rounded-lg border border-white/20 shadow-lg"
            />
            <OptimizedImage
              avifSrc={carWashIllustrationAvif}
              src={carWashIllustration}
              alt=""
              width={803}
              height={451}
              loading="lazy"
              decoding="async"
              className="-mt-8 h-auto w-56 max-w-[65%] sm:w-72"
            />
          </div>
        </div>
      </div>
      <RoyalTrim className="mt-12 lg:mt-16" />
    </section>
  );
};

export default PackagesSection;
