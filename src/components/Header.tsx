import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, CircleUserRound, Menu, MessageSquareText, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
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
  label: `${washLocation.name}${washLocation.status === "coming-soon" ? " - coming soon" : ""}`,
  href: `/location/${washLocation.slug}`,
}));

const menuItems: MenuItem[] = [
  { label: "Plans & pricing", href: "/#locations" },
  { label: "Locations", href: "/#locations", dropdown: locationLinks },
  { label: "About", href: "/about" },
  {
    label: "Help",
    href: "/#faq",
    dropdown: [
      { label: "FAQs", href: "/#faq" },
      { label: "At a glance", href: "/#at-a-glance" },
      { label: "Contact us", href: "/contact" },
      { label: "Customer survey", href: "/customer-survey" },
      { label: "Careers", href: "/employment" },
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
      navigate(href);
      return;
    }

    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-washking-sky bg-washking-yellow/95 shadow-sm backdrop-blur">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <a
            href="/"
            onClick={(event) => handleNavClick(event, "/")}
            className="flex items-center shrink-0"
            aria-label="Wash King home"
          >
            <BrandLogo />
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
                    className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 font-body text-sm font-bold text-washking-brown transition-colors hover:bg-white/55 xl:px-4"
                    aria-expanded={activeDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2 font-body text-sm font-bold text-washking-brown transition-colors hover:bg-white/55 xl:px-4"
                  >
                    {item.label}
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
                              className="block px-5 py-3 font-body text-sm font-medium text-washking-brown transition-colors hover:bg-washking-cream"
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              onClick={(event) => handleNavClick(event, subItem.href)}
                              className="block px-5 py-3 font-body text-sm font-medium text-washking-brown transition-colors hover:bg-washking-cream"
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

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <a
              href={MEMBERSHIP_PORTAL}
              data-analytics="membership_cta"
              data-analytics-source="desktop_header_manage"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cloud gap-1.5 whitespace-nowrap border border-washking-brown/45 bg-white/90 px-3 py-3 text-washking-brown shadow-sm hover:bg-white xl:px-4"
            >
              <CircleUserRound className="h-4 w-4" aria-hidden="true" />
              Manage plan
            </a>
            <a
              href="/contact"
              onClick={(event) => handleNavClick(event, "/contact")}
              data-analytics="contact_open"
              data-analytics-source="desktop_header"
              className="btn-cloud gap-1.5 whitespace-nowrap border border-washking-red bg-washking-red px-3 py-3 text-white shadow-sm hover:brightness-90 xl:px-4"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Contact
            </a>
            <a
              href={MEMBERSHIP_PORTAL}
              data-analytics="membership_cta"
              data-analytics-source="desktop_header_join"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap px-4 xl:px-5"
            >
              Join Unlimited
            </a>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={MEMBERSHIP_PORTAL}
              data-analytics="membership_cta"
              data-analytics-source="mobile_header_manage"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cloud gap-1 whitespace-nowrap border border-washking-brown/45 bg-white/90 px-2 py-3 text-[11px] text-washking-brown shadow-sm hover:bg-white sm:px-3 sm:text-xs"
            >
              <CircleUserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              Manage
            </a>
            <a
              href="/contact"
              onClick={(event) => handleNavClick(event, "/contact")}
              data-analytics="contact_open"
              data-analytics-source="mobile_header"
              className="btn-cloud gap-1 whitespace-nowrap border border-washking-red bg-washking-red px-2 py-3 text-[11px] text-white shadow-sm hover:brightness-90 sm:px-3 sm:text-xs"
            >
              <MessageSquareText className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              Contact
            </a>
            <button
              type="button"
              className="-mr-2 flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 hover:bg-white/55"
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
                        className="flex min-h-11 items-center rounded-lg px-3 py-2.5 font-body text-sm font-bold text-washking-brown transition-colors hover:bg-washking-cream"
                      >
                        {item.label}
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
                                className="block rounded-lg px-3 py-2.5 font-body text-sm text-washking-brown transition-colors hover:bg-washking-cream"
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(event) => handleNavClick(event, subItem.href)}
                                className="block rounded-lg px-3 py-2.5 font-body text-sm text-washking-brown transition-colors hover:bg-washking-cream"
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

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-200 pt-4">
                  <a
                    href={MEMBERSHIP_PORTAL}
                    data-analytics="membership_cta"
                    data-analytics-source="mobile_menu_manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-3 text-center"
                  >
                    Manage Membership
                  </a>
                  <a
                    href={MEMBERSHIP_PORTAL}
                    data-analytics="membership_cta"
                    data-analytics-source="mobile_menu_join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-3 text-center"
                  >
                    Join Unlimited
                  </a>
                </div>
              </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
