import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import woodTexture from "@/assets/wood-texture.jpg";

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative py-12 lg:py-16"
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-shadow mb-4 lg:mb-6">
            About us
          </h2>
          
          <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed mb-5 lg:mb-6 font-body">
            At WashKing, we're not just redefining the car wash experience; 
            we're infusing it with a personal touch. Our mission is to provide 
            a car wash service that goes beyond the ordinary – one that we 
            would proudly offer to our own family.
          </p>
          
          <Link to="/about">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-know-more inline-block"
            >
              Know More
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
