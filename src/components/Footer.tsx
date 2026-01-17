import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";
import logo from "@/assets/washking-logo.png";
import woodTexture from "@/assets/wood-texture.jpg";

const exploreLinks = [
  "Home",
  "Wash Packages",
  "About Us",
  "Contact Us",
  "Customer Survey",
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Sky to brown transition */}
      <div className="bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)] py-8">
        <svg viewBox="0 0 1440 100" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 50% 42%)" d="M0,100 Q360,30 720,70 T1440,50 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 35%)" d="M0,100 Q300,50 600,80 T1200,60 T1440,90 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Wood texture footer */}
      <div 
        className="relative py-12 lg:py-16"
        style={{
          backgroundImage: `url(${woodTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left - Email & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-lg">E-MAIL US</h3>
                  <p className="font-display text-white text-sm tracking-wide">
                    WASHKINGVINELAND@GMAIL.COM
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-washking-yellow rounded-full flex items-center justify-center"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-washking-yellow rounded-full flex items-center justify-center"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </motion.a>
              </div>
            </motion.div>

            {/* Center - Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <img 
                src={logo} 
                alt="WashKing Car Wash" 
                className="w-40 lg:w-48 h-auto mb-2"
              />
              <h2 className="font-display text-2xl">
                <span className="text-white">WASH</span>
                <span className="text-washking-yellow">KING</span>
              </h2>
              <p className="font-display text-white text-sm tracking-widest">
                CAR WASH
              </p>
            </motion.div>

            {/* Right - Explore links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h3 className="font-display text-washking-yellow text-2xl mb-4 border-b-2 border-washking-yellow pb-2 inline-block">
                EXPLORE
              </h3>
              <nav className="space-y-2">
                {exploreLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-white font-body hover:text-washking-yellow transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12 pt-6 border-t border-white/20"
          >
            <p className="text-white/70 font-body text-sm">
              © 2024 WashKing Car Wash. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
