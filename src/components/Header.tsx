import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import logo from "@/assets/washking-logo.png";
import logoAvif from "@/assets/washking-logo.avif";
import OptimizedImage from "@/components/OptimizedImage";
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
      { label: "At a Glance", href: "/#at-a-glance" },
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
    <header className="sticky top-0 z-50 border-b border-gray-200 border-t-4 border-t-washking-yellow bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2.5 lg:py-3">
        <div className="flex items-center justify-between gap-3">
          <a
            href="/"
            onClick={(event) => handleNavClick(event, "/")}
            className="flex items-center shrink-0"
            aria-label="WashKing home"
          >
            <OptimizedImage
              avifSrc={logoAvif}
              src={logo}
              alt="WashKing Car Wash"
              width={500}
              height={511}
              decoding="async"
              className="h-14 w-auto sm:h-16"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
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
                    className="flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 font-body text-xs font-extrabold text-washking-brown transition-colors hover:bg-gray-100 xl:px-4 xl:text-sm"
                    aria-expanded={activeDropdown === item.label}
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
                    className="block min-h-11 rounded-lg px-3 py-3 font-body text-xs font-extrabold text-washking-brown transition-colors hover:bg-gray-100 xl:px-4 xl:text-sm"
                  >
                    {item.label.toUpperCase()}
                  </a>
                )}

                {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="min-w-[230px] overflow-hidden rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
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
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              onClick={(event) => handleNavClick(event, subItem.href)}
                              className="block px-5 py-3 font-body text-sm text-washking-brown hover:bg-washking-cream transition-colors"
                            >
                              {subItem.label}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="/contact"
              data-analytics="contact_open"
              data-analytics-source="desktop_header"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="btn-cloud flex min-h-11 items-center gap-1.5 whitespace-nowrap border border-gray-300 bg-white px-4 py-2 text-sm text-washking-brown xl:px-5"
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
              className="btn-cloud flex min-h-11 items-center gap-1 whitespace-nowrap border border-gray-300 bg-white px-3 py-2 text-xs text-washking-brown"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact
            </a>
            <button
              type="button"
              className="-mr-2 flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 hover:bg-gray-100"
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

        {mobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="mt-2 overflow-hidden border-t border-gray-200 lg:hidden"
            >
              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pt-3 pb-4 pr-1">
                <nav className="space-y-1" aria-label="Mobile navigation">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.href)}
                        className="block rounded-lg px-2 py-2.5 font-body text-sm font-extrabold text-washking-brown transition-colors hover:bg-gray-100"
                      >
                        {item.label.toUpperCase()}
                      </a>
                      {item.dropdown && (
                        <div className="ml-3 grid grid-cols-1 gap-0.5 border-l border-gray-200 pl-3 sm:grid-cols-2">
                          {item.dropdown.map((subItem) => (
                            subItem.external ? (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-analytics="membership_cta"
                                data-analytics-source="mobile_navigation"
                                className="block rounded-lg px-3 py-2 font-body text-sm text-washking-brown transition-colors hover:bg-gray-100"
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(event) => handleNavClick(event, subItem.href)}
                                className="block rounded-lg px-3 py-2 font-body text-sm text-washking-brown transition-colors hover:bg-gray-100"
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
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
