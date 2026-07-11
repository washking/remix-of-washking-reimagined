import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import logo from "@/assets/washking-logo.png";
import { LOCATIONS } from "@/lib/locations";
import { MEMBERSHIP_PORTAL } from "@/lib/site";

type SubmenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

type MenuItem = {
  label: string;
  href: string;
  dropdown?: SubmenuItem[];
};

const locationLinks: SubmenuItem[] = LOCATIONS.map((washLocation) => ({
  label: `${washLocation.name}${washLocation.status === "coming-soon" ? " - Coming Soon" : ""}`,
  href: `/location/${washLocation.slug}`,
}));

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Plans & Pricing", href: "/#locations" },
  { label: "Locations", href: "/#locations", dropdown: locationLinks },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "About WashKing", href: "/about" },
      { label: "FAQs", href: "/#faq" },
      { label: "Customer Stories", href: "/#testimonials" },
      { label: "Employment", href: "/employment" },
      { label: "Manage Membership", href: MEMBERSHIP_PORTAL, external: true },
    ],
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const route = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [route.pathname, route.hash]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (route.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        window.setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      return;
    }

    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-washking-yellow relative z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-3">
          <a
            href="/"
            onClick={(event) => handleNavClick(event, "/")}
            className="flex items-center shrink-0"
            aria-label="WashKing home"
          >
            <img
              src={logo}
              alt="WashKing Car Wash"
              className="h-16 sm:h-18 lg:h-24 w-auto drop-shadow-sm"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1.5" aria-label="Primary navigation">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveDropdown(null);
                  }
                }}
              >
                {item.dropdown ? (
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    onFocus={() => setActiveDropdown(item.label)}
                    className="font-display text-washking-brown text-xs xl:text-sm flex items-center gap-1 hover:bg-white/40 rounded-full transition-colors px-3 xl:px-4 py-2"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="menu"
                  >
                    {item.label.toUpperCase()}
                    <ChevronDown
                      className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="font-display text-washking-brown text-xs xl:text-sm block hover:bg-white/40 rounded-full transition-colors px-3 xl:px-4 py-2"
                  >
                    {item.label.toUpperCase()}
                  </a>
                )}

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 pt-2 z-50"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl py-2 min-w-[230px] border border-gray-100 overflow-hidden" role="menu">
                        {item.dropdown.map((subItem) => (
                          subItem.external ? (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-analytics="membership_cta"
                              data-analytics-source="desktop_navigation"
                              className="block px-5 py-3 font-body text-sm text-washking-brown hover:bg-washking-cream transition-colors"
                              role="menuitem"
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              onClick={(event) => handleNavClick(event, subItem.href)}
                              className="block px-5 py-3 font-body text-sm text-washking-brown hover:bg-washking-cream transition-colors"
                              role="menuitem"
                            >
                              {subItem.label}
                            </a>
                          )
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="/contact"
              data-analytics="contact_open"
              data-analytics-source="desktop_header"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="btn-cloud bg-white text-washking-brown border-2 border-washking-brown px-4 xl:px-5 py-2 text-sm whitespace-nowrap flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact Us
            </a>
            <a
              href={MEMBERSHIP_PORTAL}
              data-analytics="membership_cta"
              data-analytics-source="desktop_header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-unlimited whitespace-nowrap"
            >
              Go Unlimited
            </a>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href="/contact"
              data-analytics="contact_open"
              data-analytics-source="mobile_header"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="btn-cloud bg-white text-washking-brown border-2 border-washking-brown px-3 py-1.5 text-xs whitespace-nowrap flex items-center gap-1"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact
            </a>
            <button
              type="button"
              className="p-2 -mr-2"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-washking-brown" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-washking-brown" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden mt-3 border-t border-washking-brown/20 overflow-hidden"
            >
              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pt-3 pb-4 pr-1">
                <nav className="space-y-1" aria-label="Mobile navigation">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.href)}
                        className="block py-2.5 px-2 font-display text-washking-brown text-sm rounded-lg hover:bg-washking-brown/10 transition-colors"
                      >
                        {item.label.toUpperCase()}
                      </a>
                      {item.dropdown && (
                        <div className="pl-3 border-l-2 border-washking-brown/20 ml-3 grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                          {item.dropdown.map((subItem) => (
                            subItem.external ? (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-analytics="membership_cta"
                                data-analytics-source="mobile_navigation"
                                className="block py-2 px-3 font-body text-washking-brown text-sm rounded-lg hover:bg-washking-brown/10 transition-colors"
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(event) => handleNavClick(event, subItem.href)}
                                className="block py-2 px-3 font-body text-washking-brown text-sm rounded-lg hover:bg-washking-brown/10 transition-colors"
                              >
                                {subItem.label}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <a
                  href={MEMBERSHIP_PORTAL}
                  data-analytics="membership_cta"
                  data-analytics-source="mobile_menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-unlimited mt-4 block w-full text-center"
                >
                  Go Unlimited
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
