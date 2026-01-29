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
        { label: "Vineland", href: "/location/vineland" },
        { label: "Somerset", href: "/location/somerset" },
      ],
    },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "About WashKing", href: "/about" },
        { label: "FAQ's", href: "/#faq" },
        { label: "Gallery", href: "/#testimonials" },
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
    <header className="bg-washking-yellow relative z-50">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="WashKing Car Wash" className="h-12 sm:h-14 lg:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
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
                  className="font-display text-washking-brown text-xs xl:text-sm tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity px-2 xl:px-3 py-3"
                >
                  {item.label.toUpperCase()}
                  {item.dropdown && <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4" />}
                </a>
                
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-1 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-xl py-2 min-w-[200px] border border-gray-100">
                        {item.dropdown.map((subItem, index) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => handleNavClick(e, subItem.href)}
                            className={`block px-5 py-3 font-body text-sm cursor-pointer transition-colors ${
                              index === 0 
                                ? "bg-washking-brown text-white hover:bg-washking-brown/90" 
                                : "text-washking-brown hover:bg-washking-cream"
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
