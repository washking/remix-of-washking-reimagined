import { useEffect, useState } from "react";
import { Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import woodTexture from "@/assets/wood-texture.jpg";
import woodTextureAvif from "@/assets/wood-texture.avif";
import { backgroundImageSet } from "@/lib/media";
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
      className={`inline-flex min-h-7 items-center rounded-full px-3 py-1 font-body text-xs font-extrabold ${
        status?.isOpen
          ? "bg-washking-green text-white"
          : "bg-washking-brown text-white"
      }`}
    >
      {status?.label || "See today's hours"}
    </span>
  );
};

const LocationCard = ({
  location,
  index,
  currentTime,
}: {
  location: WashKingLocation;
  index: number;
  currentTime: Date | null;
}) => {
  const directionsUrl = getDirectionsUrl(location);
  const startingPrice = getStartingMonthlyPrice(location);

  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-washking-yellow p-5 shadow-xl lg:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
          <MapPin className="h-6 w-6 text-washking-brown" aria-hidden="true" />
        </div>
        <OpenStatus location={location} currentTime={currentTime} />
      </div>

      <h3 className="mb-2 font-display text-2xl text-washking-brown lg:text-3xl">
        {location.name}
      </h3>
      <p className="mb-4 flex items-start gap-2 font-body text-sm font-bold text-washking-brown">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{location.serviceLabel}</span>
      </p>

      <div className="space-y-3 border-t border-washking-brown/20 pt-4">
        <p className="font-body text-sm text-washking-brown">
          <span className="block font-bold">{location.address}</span>
          <span>{location.city}</span>
        </p>
        <p className="flex items-start gap-2 font-body text-sm text-washking-brown">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{getHoursSummary(location)}</span>
        </p>
      </div>

      {Number.isFinite(startingPrice) && (
        <p className="mt-4 font-body text-sm font-bold text-washking-brown">
          Unlimited from{" "}
          <span className="font-display text-xl">${startingPrice.toFixed(2)}/mo</span>
        </p>
      )}

      <div className="mt-auto grid gap-2 pt-5">
        <Link
          to={`/location/${location.slug}`}
          data-analytics="location_select"
          data-analytics-source="homepage_locations"
          data-location-slug={location.slug}
          className="btn-cloud border-2 border-washking-brown bg-white px-3 py-2.5 text-center font-display text-sm text-washking-brown"
        >
          Plans &amp; Pricing
        </Link>
        {directionsUrl && (
          <a
            href={directionsUrl}
            data-analytics="directions_click"
            data-analytics-source="homepage_locations"
            data-location-slug={location.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cloud flex items-center justify-center gap-1.5 border-2 border-washking-brown bg-washking-brown px-3 py-2.5 text-center font-display text-sm text-white"
            aria-label={`Get directions to WashKing ${location.name}`}
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
    <section id="locations" className="relative scroll-mt-6 overflow-hidden">
      <div
        className="relative py-12 lg:py-20"
        style={{
          backgroundImage: backgroundImageSet(woodTextureAvif, woodTexture),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-9 text-center lg:mb-12">
            <p className="mb-2 font-body text-sm font-extrabold uppercase text-washking-yellow">
              Hours, services, prices, and directions
            </p>
            <h2 className="mb-3 font-display text-4xl text-white text-shadow sm:text-5xl lg:text-6xl">
              FIND YOUR WASHKING
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-white sm:text-lg">
              Choose one of our {OPEN_LOCATIONS.length} open New Jersey locations to compare washes and plan your visit.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {OPEN_LOCATIONS.map((location, index) => (
              <LocationCard
                key={location.slug}
                location={location}
                index={index}
                currentTime={currentTime}
              />
            ))}
          </div>

          {comingSoon && (
            <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-5 border-t border-white/25 pt-8 text-center sm:flex-row sm:text-left">
              <div>
                <p className="mb-1 font-display text-sm text-washking-yellow">COMING SOON</p>
                <h3 className="font-display text-3xl text-white">{comingSoon.name}</h3>
                <p className="font-body text-white/90">
                  A new WashKing is on the way to {comingSoon.city}.
                </p>
              </div>
              <Link
                to={`/location/${comingSoon.slug}`}
                data-analytics="location_select"
                data-analytics-source="homepage_coming_soon"
                data-location-slug={comingSoon.slug}
                className="btn-cloud shrink-0 border-2 border-washking-brown bg-washking-yellow px-6 py-3 font-display text-sm text-washking-brown"
              >
                Opening Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
