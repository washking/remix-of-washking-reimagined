import { CalendarClock, CarFront, Clock3, MapPinned } from "lucide-react";
import {
  COMING_SOON_LOCATIONS,
  OPEN_LOCATIONS,
} from "@/lib/locations";

const open24HourLocations = OPEN_LOCATIONS.filter(
  (location) => location.hours.is24Hours,
);
const fullServiceLocations = OPEN_LOCATIONS.filter(
  (location) => location.serviceType === "full-service-and-exterior",
);

const formatLocationNames = (locations: Array<{ name: string }>) => {
  const names = locations.map((location) => location.name);
  if (names.length < 2) return names[0] || "None currently listed";
  if (names.length === 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
};

const stats = [
  {
    icon: MapPinned,
    value: OPEN_LOCATIONS.length,
    label: "Open locations",
    detail: formatLocationNames(OPEN_LOCATIONS),
  },
  {
    icon: Clock3,
    value: open24HourLocations.length,
    label: "Open 24 hours",
    detail: formatLocationNames(open24HourLocations),
  },
  {
    icon: CarFront,
    value: fullServiceLocations.length,
    label: fullServiceLocations.length === 1 ? "Full-service location" : "Full-service locations",
    detail: fullServiceLocations.length
      ? `${formatLocationNames(fullServiceLocations)} ${fullServiceLocations.length === 1 ? "offers" : "offer"} interior and exterior service`
      : "No full-service location is currently listed",
  },
  {
    icon: CalendarClock,
    value: COMING_SOON_LOCATIONS.length,
    label: "Coming soon",
    detail: COMING_SOON_LOCATIONS.length
      ? `${formatLocationNames(COMING_SOON_LOCATIONS)} opening details will be posted when confirmed`
      : "No coming-soon location is currently listed",
  },
] as const;

const TrustStatsSection = () => (
  <section id="at-a-glance" className="scroll-mt-24 bg-white py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="section-eyebrow mb-2">
            Plan with the facts
          </p>
          <h2 className="section-title">
            Wash King at a glance
          </h2>
          <p className="section-copy mt-3">
            See which locations are open 24 hours, which offer full service, and where Wash King is opening next.
          </p>
        </div>

        <div className="grid border-y border-washking-brown/15 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex min-h-48 flex-col border-b border-washking-brown/15 px-2 py-7 last:border-b-0 md:px-6 md:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-washking-yellow text-washking-brown">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-display text-4xl text-washking-sky">{stat.value}</p>
              <h3 className="mt-1 font-display text-lg text-washking-brown">{stat.label}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustStatsSection;
