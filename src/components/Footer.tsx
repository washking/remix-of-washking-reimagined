import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/washking-logo.png";
import woodTexture from "@/assets/wood-texture.jpg";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Wash Packages", href: "/#packages" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Locations", href: "/#locations" },
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
      {/* Wood texture footer - no sky gap */}
      <div 
        className="relative py-8 lg:py-14"
        style={{
          backgroundImage: `url(${woodTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 items-start">
            {/* Left - Email & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-sm lg:text-lg">E-MAIL US</h3>
                  <a 
                    href="mailto:contact@washking.net"
                    className="font-body text-white text-xs lg:text-sm tracking-wide hover:underline break-all"
                  >
                    CONTACT@WASHKING.NET
                  </a>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center md:justify-start">
                <motion.a
                  href="https://www.facebook.com/WashKingVineland/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-washking-yellow rounded-full flex items-center justify-center"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/washkingvineland"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-washking-yellow rounded-full flex items-center justify-center"
                  aria-label="Follow us on Instagram"
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
                  className="w-28 lg:w-44 h-auto"
                />
              </Link>
            </motion.div>

            {/* Right - Explore links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h3 className="font-display text-washking-yellow text-lg lg:text-2xl mb-2 border-b-2 border-washking-yellow pb-1.5 inline-block">
                EXPLORE
              </h3>
              <nav className="space-y-1">
                {exploreLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-white font-body text-xs lg:text-base hover:text-washking-yellow transition-colors py-0.5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 pt-4 border-t border-white/20"
          >
            <p className="text-white/70 font-body text-xs lg:text-sm flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>© {new Date().getFullYear()} WashKing Car Wash. All rights reserved.</span>
              <span className="hidden sm:inline text-white/40">|</span>
              <span>
                Web design &amp; developed by{" "}
                <a
                  href="https://www.webchily.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-washking-yellow hover:underline"
                >
                  Webchily
                </a>
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
