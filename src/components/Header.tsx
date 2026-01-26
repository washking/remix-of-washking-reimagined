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
        { label: "Employment", href: "/#footer" },
      ],
    },
    { label: "Manage Membership", href: "https://customerportal.nxtwash.com/washkingcarwash", external: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return; // Let external links work normally
    
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    // Check if it's a hash link to the home page
    if (href.startsWith("/#")) {
      const hash = href.substring(1); // Remove the leading "/"
      if (location.pathname === "/") {
        // Already on home page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page then scroll
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="WashKing Car Wash" className="h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
                  className="font-display text-washking-brown text-sm tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity py-2"
                >
                  {item.label.toUpperCase()}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-0 bg-white rounded-xl shadow-lg py-2 min-w-[180px] z-50"
                  >
                    {item.dropdown.map((subItem, index) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={(e) => handleNavClick(e, subItem.href)}
                        className={`block px-4 py-3 text-washking-brown hover:bg-washking-cream font-body cursor-pointer ${
                          index === 0 ? "bg-washking-brown text-white hover:bg-washking-brown/90 hover:text-white" : ""
                        }`}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a 
              href="https://customerportal.nxtwash.com/washkingcarwash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-unlimited"
            >
              Go Unlimited
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              className="lg:hidden mt-4 pb-4"
            >
              {menuItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.external)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block py-2 font-display text-washking-brown text-sm"
                  >
                    {item.label.toUpperCase()}
                  </a>
                  {item.dropdown && (
                    <div className="pl-4">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className="block py-2 font-body text-washking-brown text-sm opacity-80"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a 
                href="https://customerportal.nxtwash.com/washkingcarwash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-unlimited mt-4 inline-block"
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
