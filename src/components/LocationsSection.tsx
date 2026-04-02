import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import woodTexture from "@/assets/wood-texture.jpg";
import { Badge } from "@/components/ui/badge";

const locations = [
  { name: "VINELAND MAIN RD", slug: "vineland", address: "2611 S Main Rd", city: "Vineland, NJ 08361", comingSoon: false },
  { name: "VINELAND DANTE", slug: "vineland-dante", address: "2375 Dante Ave", city: "Vineland, NJ", comingSoon: false },
  { name: "SOMERSET", slug: "somerset", address: "1463 NJ-27", city: "Somerset, NJ 08873", comingSoon: false },
  { name: "LANDISVILLE", slug: "landisville", address: "305 S Harding Hwy", city: "Landisville, NJ", comingSoon: false },
  { name: "CHERRY HILL", slug: "cherry-hill", address: "", city: "Cherry Hill, NJ", comingSoon: true },
];

const LocationsSection = () => {
  return (
    <section id="locations" className="relative overflow-hidden">
      <div 
        className="relative py-10 lg:py-20"
        style={{
          backgroundImage: `url(${woodTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white text-shadow mb-2">
              PICK YOUR LOCATION
            </h2>
            <p className="font-display text-white text-sm sm:text-base lg:text-2xl tracking-widest">
              PRICING • ADDRESS • CONTACTS
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 max-w-6xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-washking-yellow rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-10 text-center shadow-xl ${
                  index === 4 ? 'col-span-2 lg:col-span-1 max-w-xs mx-auto w-full' : ''
                }`}
              >
                <h3 className="font-display text-washking-brown text-base sm:text-xl lg:text-4xl mb-2 lg:mb-4">
                  {location.name}
                </h3>
                {location.address && (
                  <p className="text-washking-brown font-body text-xs sm:text-sm lg:text-xl mb-0.5">
                    {location.address}
                  </p>
                )}
                <p className="text-washking-brown font-body text-xs sm:text-sm lg:text-xl mb-3 lg:mb-8">
                  {location.city}
                </p>
                {location.comingSoon ? (
                  <Badge className="bg-washking-brown text-white font-display text-xs sm:text-sm lg:text-lg px-3 sm:px-6 py-1.5 sm:py-3 rounded-full">
                    Coming Soon
                  </Badge>
                ) : (
                  <Link to={`/location/${location.slug}`}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-cloud inline-block bg-white text-washking-brown border-2 border-washking-brown px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-display text-xs sm:text-base lg:text-xl"
                    >
                      See Wash Menu
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
