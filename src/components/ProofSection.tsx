import { CalendarDays, MapPinned, ScanLine, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { OPEN_LOCATIONS } from "@/lib/locations";

const proofPoints = [
  {
    icon: Users,
    title: "Family-owned",
    description: "Personal service built around the care we would expect for our own family.",
  },
  {
    icon: MapPinned,
    title: `${OPEN_LOCATIONS.length} locations open`,
    description: "Choose the New Jersey location, hours, and wash options that fit your day.",
  },
  {
    icon: ScanLine,
    title: "Faster member entry",
    description: "Unlimited members use license plate recognition for a simpler arrival.",
  },
] as const;

const ProofSection = () => (
  <section className="bg-washking-green py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
          <div>
            <p className="mb-2 flex items-center justify-center gap-2 font-body text-sm font-extrabold uppercase text-washking-yellow lg:justify-start">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Built for everyday convenience
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              WHY WASHKING
            </h2>
          </div>
          <Link
            to="/about"
            className="btn-cloud border border-white bg-white px-6 py-3 text-sm text-washking-brown"
          >
            About WashKing
          </Link>
        </div>

        <div className="grid gap-7 border-t border-white/25 pt-8 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-washking-yellow text-washking-brown">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 font-body text-lg font-extrabold text-white">{point.title}</h3>
                <p className="font-body text-sm leading-relaxed text-white/90 sm:text-base">
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
