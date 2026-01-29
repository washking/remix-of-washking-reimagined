import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/washking-logo.png";
import woodTexture from "@/assets/wood-texture.jpg";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Wash Packages", href: "/#packages" },
  { label: "About Us", href: "/about" },
  { label: "Locations", href: "/#locations" },
  { label: "Employment", href: "/employment" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (window.location.pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Sky to brown transition */}
      <div className="bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)] py-6">
        <svg viewBox="0 0 1440 100" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 50% 42%)" d="M0,100 Q360,30 720,70 T1440,50 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 35%)" d="M0,100 Q300,50 600,80 T1200,60 T1440,90 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Wood texture footer */}
      <div 
        className="relative py-10 lg:py-14"
        style={{
          backgroundImage: `url(${woodTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left - Email & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-base lg:text-lg">E-MAIL US</h3>
                  <a 
                    href="mailto:washkingvineland@gmail.com"
                    className="font-body text-white text-xs lg:text-sm tracking-wide hover:underline break-all"
                  >
                    WASHKINGVINELAND@GMAIL.COM
                  </a>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center md:justify-start">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-washking-yellow rounded-full flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-washking-yellow rounded-full flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
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
              <Link to="/">
                <img 
                  src={logo} 
                  alt="WashKing Car Wash" 
                  className="w-32 lg:w-40 h-auto mb-2"
                />
              </Link>
              <h2 className="font-display text-xl lg:text-2xl">
                <span className="text-white">WASH</span>
                <span className="text-washking-yellow">KING</span>
              </h2>
              <p className="font-display text-white text-xs lg:text-sm tracking-widest">
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
              <h3 className="font-display text-washking-yellow text-xl lg:text-2xl mb-3 border-b-2 border-washking-yellow pb-2 inline-block">
                EXPLORE
              </h3>
              <nav className="space-y-1.5">
                {exploreLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-white font-body text-sm lg:text-base hover:text-washking-yellow transition-colors py-1"
                  >
                    {link.label}
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
            className="text-center mt-8 pt-5 border-t border-white/20"
          >
            <p className="text-white/70 font-body text-xs lg:text-sm">
              © {new Date().getFullYear()} WashKing Car Wash. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
