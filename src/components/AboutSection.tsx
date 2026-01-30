import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import woodTexture from "@/assets/wood-texture.jpg";

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative py-14 lg:py-20"
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/85" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3 text-center lg:text-left"
          >
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white text-shadow mb-6 lg:mb-8">
              ABOUT US
            </h2>
            
            <p className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 lg:mb-8 font-body max-w-2xl">
              At WashKing, we're redefining the car wash experience with a personal touch. 
              Our mission is to provide a service we would proudly offer to our own family.
            </p>
            
            <Link to="/about">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-know-more inline-block text-lg lg:text-xl px-8 py-4"
              >
                Know More
              </motion.span>
            </Link>
          </motion.div>

          {/* Right content - Decorative foam illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3 flex justify-center"
          >
            <div className="relative">
              {/* Large bubble cluster */}
              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 60%, rgba(200,230,255,0.5))",
                  boxShadow: "inset -4px -4px 10px rgba(255,255,255,0.8), inset 4px 4px 10px rgba(200,230,255,0.3), 0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-6 w-16 h-16 lg:w-24 lg:h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.5) 60%, rgba(200,230,255,0.4))",
                  boxShadow: "inset -2px -2px 6px rgba(255,255,255,0.8), 0 2px 10px rgba(0,0,0,0.08)",
                }}
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.45) 60%, rgba(200,230,255,0.35))",
                  boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 text-washking-yellow/80" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
