import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/washking-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/#packages",
      dropdown: [{ label: "Fleet", href: "/#packages" }],
    },
    {
      label: "Locations",
      href: "/#locations",
      dropdown: [
        { label: "Vineland Main Rd", href: "/location/vineland" },
        { label: "Vineland Dante", href: "/location/vineland-dante" },
        { label: "Somerset", href: "/location/somerset" },
        { label: "Landisville", href: "/location/landisville" },
        { label: "Cherry Hill", href: "/location/cherry-hill" },
      ],
    },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "About WashKing", href: "/about" },
        { label: "FAQ's", href: "/#faq" },
        { label: "Gallery", href: "/#testimonials" },
        { label: "Contact Us", href: "/contact" },
        { label: "Employment", href: "/employment" },
      ],
    },
    { label: "Manage Membership", href: "https://customerportal.nxtwash.com/washkingcarwash", external: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (location.pathname === "/") {
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
    } else if (href === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="bg-washking-yellow relative z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="WashKing Car Wash" className="h-16 sm:h-18 lg:h-24 w-auto drop-shadow-sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1.5">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.external)}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="font-display text-washking-brown text-xs xl:text-sm tracking-wide flex items-center gap-1 hover:bg-white/40 rounded-full transition-all duration-200 px-3 xl:px-4 py-2"
                >
                  {item.label.toUpperCase()}
                  {item.dropdown && (
                    <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </a>
                
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2 z-50"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] border border-gray-100 overflow-hidden">
                        {item.dropdown.map((subItem, index) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => handleNavClick(e, subItem.href)}
                            className={`block px-5 py-3 font-body text-sm cursor-pointer transition-all duration-200 ${
                              index === 0 
                                ? "bg-gradient-to-r from-washking-brown to-washking-brown-light text-white hover:brightness-110" 
                                : "text-washking-brown hover:bg-washking-cream hover:pl-6"
                            }`}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
            <a 
              href="https://customerportal.nxtwash.com/washkingcarwash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-unlimited whitespace-nowrap"
            >
              Go Unlimited
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-washking-brown" />
            ) : (
              <Menu className="w-6 h-6 text-washking-brown" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 pb-4 border-t border-washking-brown/20 pt-4"
            >
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.external)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="block py-3 px-2 font-display text-washking-brown text-base rounded-lg hover:bg-washking-brown/10 transition-colors"
                    >
                      {item.label.toUpperCase()}
                    </a>
                    {item.dropdown && (
                      <div className="pl-4 border-l-2 border-washking-brown/20 ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => handleNavClick(e, subItem.href)}
                            className="block py-2.5 px-3 font-body text-washking-brown text-sm rounded-lg hover:bg-washking-brown/10 transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <a 
                href="https://customerportal.nxtwash.com/washkingcarwash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-unlimited mt-4 inline-block w-full text-center"
              >
                Go Unlimited
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
