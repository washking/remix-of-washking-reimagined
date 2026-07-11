import { motion } from "framer-motion";
import { Clock, MapPin, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import woodTexture from "@/assets/wood-texture.jpg";
import { Badge } from "@/components/ui/badge";
import {
  LOCATIONS,
  OPEN_LOCATIONS,
  getDirectionsUrl,
  getHoursSummary,
} from "@/lib/locations";

const LocationsSection = () => (
  <section id="locations" className="relative overflow-hidden scroll-mt-6">
    <div
      className="relative py-10 lg:py-20"
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/75" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white text-shadow mb-3">
            PICK YOUR LOCATION
          </h2>
          <p className="font-body text-white text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {OPEN_LOCATIONS.length} locations open across New Jersey. Cherry Hill is coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7 max-w-6xl mx-auto">
          {LOCATIONS.map((location, index) => {
            const directionsUrl = getDirectionsUrl(location);
            const comingSoon = location.status === "coming-soon";

            return (
              <motion.article
                key={location.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={`bg-washking-yellow rounded-3xl p-5 lg:p-7 shadow-xl flex flex-col min-h-[300px] ${
                  index === LOCATIONS.length - 1 ? "sm:col-span-2 lg:col-span-1 sm:max-w-lg lg:max-w-none sm:w-full sm:mx-auto" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-washking-brown" aria-hidden="true" />
                  </div>
                  {comingSoon && (
                    <Badge className="bg-washking-brown text-white font-display text-xs px-3 py-1.5 rounded-full">
                      Coming Soon
                    </Badge>
                  )}
                </div>

                <h3 className="font-display text-washking-brown text-2xl lg:text-3xl mb-3">
                  {location.name}
                </h3>
                <p className="text-washking-brown font-body text-base">
                  {location.address || location.city}
                </p>
                {location.address && (
                  <p className="text-washking-brown/80 font-body text-sm mb-4">{location.city}</p>
                )}

                <div className="mt-auto">
                  {!comingSoon && (
                    <p className="font-body text-sm text-washking-brown flex items-start gap-2 mb-5">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{getHoursSummary(location)}</span>
                    </p>
                  )}

                  <div className={`grid ${directionsUrl ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
                    <Link
                      to={`/location/${location.slug}`}
                      className="btn-cloud bg-white text-washking-brown border-2 border-washking-brown px-3 py-2.5 font-display text-sm text-center"
                    >
                      {comingSoon ? "Opening Details" : "View Washes"}
                    </Link>
                    {directionsUrl && (
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cloud bg-washking-brown text-white border-2 border-washking-brown px-3 py-2.5 font-display text-sm text-center flex items-center justify-center gap-1.5"
                        aria-label={`Get directions to WashKing ${location.name}`}
                      >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        Directions
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default LocationsSection;
