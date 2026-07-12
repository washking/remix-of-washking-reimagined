import { useEffect, useState } from "react";
import { Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  COMING_SOON_LOCATIONS,
  OPEN_LOCATIONS,
  getDirectionsUrl,
  getHoursSummary,
  getLocationOpenStatus,
  getStartingMonthlyPrice,
  type WashKingLocation,
} from "@/lib/locations";

const OpenStatus = ({
  location,
  currentTime,
}: {
  location: WashKingLocation;
  currentTime: Date | null;
}) => {
  const status = currentTime ? getLocationOpenStatus(location, currentTime) : null;

  return (
    <span
      className={`inline-flex min-h-7 items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-bold ${
        status?.isOpen
          ? "bg-washking-green text-white"
          : "bg-washking-brown text-white"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      {status?.label || "See today's hours"}
    </span>
  );
};

const LocationCard = ({
  location,
  currentTime,
}: {
  location: WashKingLocation;
  currentTime: Date | null;
}) => {
  const directionsUrl = getDirectionsUrl(location);
  const startingPrice = getStartingMonthlyPrice(location);

  return (
    <article
      className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md lg:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
          <MapPin className="h-5 w-5 text-washking-sky" aria-hidden="true" />
        </div>
        <OpenStatus location={location} currentTime={currentTime} />
      </div>

      <h3 className="mb-2 font-display text-xl text-washking-brown lg:text-2xl">
        {location.name}
      </h3>
      <p className="mb-4 flex items-start gap-2 font-body text-sm font-bold text-gray-700">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-washking-sky" aria-hidden="true" />
        <span>{location.serviceLabel}</span>
      </p>

      <div className="space-y-3 border-t border-gray-200 pt-4">
        <p className="font-body text-sm text-gray-700">
          <span className="block font-bold">{location.address}</span>
          <span>{location.city}</span>
        </p>
        <p className="flex items-start gap-2 font-body text-sm text-gray-700">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{getHoursSummary(location)}</span>
        </p>
      </div>

      {Number.isFinite(startingPrice) && (
        <div className="mt-4 rounded-lg bg-washking-cream px-3 py-2.5">
          <p className="font-body text-xs font-bold text-washking-brown/70">Unlimited plans from</p>
          <p className="font-display text-xl text-washking-brown">
            ${startingPrice.toFixed(2)}
            <span className="font-body text-xs font-bold">/month + tax</span>
          </p>
        </div>
      )}

      <div className="mt-auto grid gap-2 pt-5">
        <Link
          to={`/location/${location.slug}`}
          data-analytics="location_select"
          data-analytics-source="homepage_locations"
          data-location-slug={location.slug}
          className="btn-outline px-3 py-2.5 text-center"
        >
          View plans &amp; pricing
        </Link>
        {directionsUrl && (
          <a
            href={directionsUrl}
            data-analytics="directions_click"
            data-analytics-source="homepage_locations"
            data-location-slug={location.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-1.5 px-3 py-2.5 text-center"
            aria-label={`Get directions to Wash King ${location.name}`}
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Directions
          </a>
        )}
      </div>
    </article>
  );
};

const LocationsSection = () => {
  const comingSoon = COMING_SOON_LOCATIONS[0];
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setCurrentTime(new Date());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="locations" className="scroll-mt-24 bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-9 text-center lg:mb-12">
            <p className="section-eyebrow mb-2">
              Hours, services, pricing, and directions
            </p>
            <h2 className="section-title mb-3">
              Find your Wash King
            </h2>
            <p className="section-copy mx-auto max-w-2xl">
              Choose one of our {OPEN_LOCATIONS.length} open New Jersey locations to compare wash options and plan your visit.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {OPEN_LOCATIONS.map((location) => (
              <LocationCard
                key={location.slug}
                location={location}
                currentTime={currentTime}
              />
            ))}
          </div>

          {comingSoon && (
            <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-lg border border-washking-sky/20 bg-washking-sky-light p-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="mb-1 font-body text-sm font-bold text-washking-sky">Coming soon</p>
                <h3 className="font-display text-2xl text-washking-brown">{comingSoon.name}</h3>
                <p className="font-body text-gray-700">
                  A new Wash King is on the way to {comingSoon.city}.
                </p>
              </div>
              <Link
                to={`/location/${comingSoon.slug}`}
                data-analytics="location_select"
                data-analytics-source="homepage_coming_soon"
                data-location-slug={comingSoon.slug}
                className="btn-secondary shrink-0 px-6"
              >
                Opening details
              </Link>
            </div>
          )}
        </div>
    </section>
  );
};

export default LocationsSection;
