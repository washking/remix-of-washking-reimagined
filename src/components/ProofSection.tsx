import { MapPinned, ScanLine, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { OPEN_LOCATIONS } from "@/lib/locations";
import lionCar from "@/assets/lion-car-mark.png";
import lionCarAvif from "@/assets/lion-car-mark.avif";
import OptimizedImage from "@/components/OptimizedImage";
import KingdomHeading from "@/components/KingdomHeading";

const proofPoints = [
  {
    icon: Users,
    title: "Family-owned",
    description: "Friendly, local service built around the care we expect for our own family.",
  },
  {
    icon: MapPinned,
    title: `${OPEN_LOCATIONS.length} locations open`,
    description: "Choose the New Jersey location, hours, and wash options that fit your day.",
  },
  {
    icon: ScanLine,
    title: "Faster member entry",
    description: "Unlimited members use license plate recognition for a quicker arrival.",
  },
] as const;

const ProofSection = () => (
  <section className="bg-washking-cream py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 grid items-center gap-6 lg:grid-cols-[140px_minmax(0,1fr)_auto]">
          <OptimizedImage
            avifSrc={lionCarAvif}
            src={lionCar}
            alt=""
            width={500}
            height={380}
            loading="lazy"
            decoding="async"
            className="mx-auto hidden h-auto w-32 lg:block"
          />
          <KingdomHeading
            eyebrow="Local service. Easier car care."
            title="Why drivers choose Wash King"
            align="left"
          />
          <Link to="/about" className="btn-primary justify-self-start px-6 py-3 lg:justify-self-end">
            About Wash King
          </Link>
        </div>

        <div className="grid gap-7 border-t-2 border-washking-brown/15 pt-8 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-washking-brown/15 bg-washking-yellow text-washking-brown">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg text-washking-brown">{point.title}</h3>
                <p className="font-body text-sm leading-relaxed text-gray-700 sm:text-base">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProofSection;
