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
      {/* Sky with clouds transition */}
      <div className="bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_65%)] py-20">
        {/* Fluffy clouds at bottom */}
        <div className="relative">
          <svg viewBox="0 0 1440 150" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none">
            <ellipse cx="200" cy="120" rx="180" ry="80" fill="white" />
            <ellipse cx="350" cy="130" rx="150" ry="70" fill="white" />
            <ellipse cx="550" cy="125" rx="200" ry="90" fill="white" />
            <ellipse cx="750" cy="140" rx="160" ry="60" fill="white" />
            <ellipse cx="950" cy="120" rx="220" ry="95" fill="white" />
            <ellipse cx="1150" cy="135" rx="180" ry="75" fill="white" />
            <ellipse cx="1350" cy="125" rx="150" ry="85" fill="white" />
          </svg>
        </div>
      </div>
      
      {/* Brown hills transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 100" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 50% 45%)" d="M0,100 Q360,20 720,60 T1440,40 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 38%)" d="M0,100 Q300,50 600,70 T1200,50 T1440,80 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 35%)" d="M0,100 Q240,60 480,80 T960,60 T1440,90 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Wood texture section */}
      <div 
        className="relative py-16 lg:py-24"
        style={{
          backgroundImage: `url(${woodTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/70" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl lg:text-6xl text-white text-shadow mb-4">
              PICK YOUR LOCATION
            </h2>
            <p className="font-display text-white text-lg tracking-widest">
              PRICING . ADDRESS. CONTACTS
            </p>
          </motion.div>

          {/* Location cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-location"
              >
                <h3 className="font-display text-washking-brown text-3xl lg:text-4xl mb-4">
                  {location.name}
                </h3>
                <p className="text-washking-brown font-body text-lg mb-1">
                  {location.address}
                </p>
                <p className="text-washking-brown font-body text-lg mb-6">
                  {location.city}
                </p>
                <Link to={`/location/${location.slug}`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-white text-washking-brown border-2 border-washking-brown rounded-full px-6 py-3 font-display text-lg hover:shadow-lg transition-all"
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
