import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import woodTexture from "@/assets/wood-texture.jpg";

const locations = [
  {
    name: "VINELAND",
    slug: "vineland",
    address: "2611 S Main Road",
    city: "Vineland, NJ 08361",
  },
  {
    name: "SOMERSET",
    slug: "somerset",
    address: "1463 NJ 27",
    city: "Somerset NJ 08873",
  },
];

const LocationsSection = () => {
  return (
    <section id="locations" className="relative overflow-hidden">
      {/* Wood texture section - no sky transition */}
      <div 
        className="relative py-14 lg:py-20"
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
            className="text-center mb-10 lg:mb-14"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white text-shadow mb-3">
              PICK YOUR LOCATION
            </h2>
            <p className="font-display text-white text-lg sm:text-xl lg:text-2xl tracking-widest">
              PRICING • ADDRESS • CONTACTS
            </p>
          </motion.div>

          {/* Location cards */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-washking-yellow rounded-3xl p-8 lg:p-10 text-center shadow-xl"
              >
                <h3 className="font-display text-washking-brown text-3xl sm:text-4xl lg:text-5xl mb-4">
                  {location.name}
                </h3>
                <p className="text-washking-brown font-body text-lg lg:text-xl mb-1">
                  {location.address}
                </p>
                <p className="text-washking-brown font-body text-lg lg:text-xl mb-6 lg:mb-8">
                  {location.city}
                </p>
                <Link to={`/location/${location.slug}`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-cloud inline-block bg-white text-washking-brown border-2 border-washking-brown px-6 lg:px-8 py-3 lg:py-4 font-display text-lg lg:text-xl"
                  >
                    See Wash Menu
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
