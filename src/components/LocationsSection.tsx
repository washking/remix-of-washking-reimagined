import { useEffect, useState } from "react";
import { Clock, Crown, MapPin, Navigation, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import KingdomHeading from "@/components/KingdomHeading";
import RoyalTrim from "@/components/RoyalTrim";
import Reveal from "@/components/decor/Reveal";
import BubbleField from "@/components/decor/BubbleField";
import OptimizedImage from "@/components/OptimizedImage";
import lionCar from "@/assets/lion-car-mark.png";
import lionCarAvif from "@/assets/lion-car-mark.avif";
import { LOCATION_PHOTO_SETS } from "@/lib/locationMedia";
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
  accentClass,
}: {
  location: WashKingLocation;
  currentTime: Date | null;
  accentClass: string;
}) => {
  const directionsUrl = getDirectionsUrl(location);
  const startingPrice = getStartingMonthlyPrice(location);
  const cardPhoto = LOCATION_PHOTO_SETS[location.slug]?.[0];

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border-2 border-washking-brown/35 border-t-[6px] bg-washking-yellow shadow-md transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:shadow-sm sm:hover:shadow-md ${accentClass}`}
    >
      {cardPhoto ? (
        <OptimizedImage
          avifSrc={cardPhoto.avifSrc}
          src={cardPhoto.src}
          alt={cardPhoto.alt}
          width={cardPhoto.width}
          height={cardPhoto.height}
          loading="lazy"
          decoding="async"
          className="h-36 w-full border-b-2 border-washking-brown/25 object-cover"
        />
      ) : (
        <div className="relative flex h-36 items-center justify-center overflow-hidden border-b-2 border-washking-brown/25 bg-washking-sky">
          <BubbleField density="subtle" />
          <OptimizedImage
            avifSrc={lionCarAvif}
            src={lionCar}
            alt=""
            width={500}
            height={380}
            loading="lazy"
            decoding="async"
            className="relative h-28 w-auto"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 lg:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-washking-brown/15 bg-white/90">
          <MapPin className="h-6 w-6 text-washking-sky" aria-hidden="true" />
          <Crown className="absolute -right-2 -top-2 h-4 w-4 rotate-12 text-washking-brown" aria-hidden="true" />
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

      <div className="space-y-3 border-t border-washking-brown/25 pt-4">
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
        <div className="mt-4 rounded-lg border border-washking-brown/15 bg-white/85 px-3 py-2.5">
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
          See washes &amp; prices
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
    <section id="locations" className="scroll-mt-24 bg-washking-sky-light py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <KingdomHeading
            eyebrow="Hours, services, pricing, and directions"
            title="Choose your Wash King location"
            description="Select a location to see its services, hours, single-wash prices, unlimited plans, and directions."
            className="mb-9 lg:mb-12"
          />

          <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-5">
            {OPEN_LOCATIONS.map((location, index) => (
              <LocationCard
                key={location.slug}
                location={location}
                currentTime={currentTime}
                accentClass={[
                  "border-t-washking-sky",
                  "border-t-washking-green",
                  "border-t-washking-orange",
                  "border-t-washking-brown",
                ][index % 4]}
              />
            ))}
          </Reveal>

          {comingSoon && (
            <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-lg border-2 border-dashed border-washking-sky/35 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
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
        <RoyalTrim className="mt-12 lg:mt-16" />
    </section>
  );
};

export default LocationsSection;
