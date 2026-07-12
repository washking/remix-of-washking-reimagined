import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";
import { LOCATIONS } from "@/lib/locations";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Wash King", href: "/about" },
  { label: "Plans & pricing", href: "/#locations" },
  { label: "Careers", href: "/employment" },
];

const supportLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
  { label: "Customer survey", href: "/customer-survey" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("/#")) {
      navigate(href);
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="overflow-hidden bg-washking-brown">
      <div className="border-b-4 border-washking-yellow bg-white py-4 sm:py-5">
        <div className="container mx-auto flex justify-center px-4">
          <Link to="/" aria-label="Wash King home">
            <BrandLogo variant="footer" />
          </Link>
        </div>
      </div>

      <div className="py-10 lg:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-9 lg:grid-cols-[1.15fr_0.8fr_1fr_0.75fr] lg:gap-10">
            <section className="col-span-2 lg:col-span-1">
              <h2 className="font-display text-lg text-white">Customer care</h2>
              <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-white/75">
                Need help with a visit or membership? Use our contact form so your request reaches the right location or account team.
              </p>
              <a
                href="mailto:contact@washking.net"
                className="mt-4 inline-flex items-center gap-2 break-all font-body text-sm font-bold text-white hover:text-washking-yellow"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                contact@washking.net
              </a>
              <a
                href={MEMBERSHIP_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="membership_cta"
                data-analytics-source="footer"
                className="mt-5 block w-fit rounded-lg border border-white/35 px-4 py-2.5 font-body text-sm font-bold text-white transition-colors hover:border-washking-yellow hover:text-washking-yellow"
              >
                Manage membership
              </a>
            </section>

            <section>
              <h2 className="font-display text-lg text-white">Explore</h2>
              <nav className="mt-3 space-y-2" aria-label="Footer explore links">
                {exploreLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block py-0.5 font-body text-sm text-white/80 transition-colors hover:text-washking-yellow"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </section>

            <section>
              <h2 className="font-display text-lg text-white">Locations</h2>
              <nav className="mt-3 space-y-2" aria-label="Footer location links">
                {LOCATIONS.map((location) => (
                  <a
                    key={location.slug}
                    href={`/location/${location.slug}`}
                    onClick={(event) => handleNavClick(event, `/location/${location.slug}`)}
                    className="flex items-start gap-2 py-0.5 font-body text-sm text-white/80 transition-colors hover:text-washking-yellow"
                  >
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      {location.name}
                      {location.status === "coming-soon" ? " (coming soon)" : ""}
                    </span>
                  </a>
                ))}
              </nav>
            </section>

            <section className="col-span-2 lg:col-span-1">
              <h2 className="font-display text-lg text-white">Stay connected</h2>
              <nav className="mt-3 space-y-2" aria-label="Footer support links">
                {supportLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block py-0.5 font-body text-sm text-white/80 transition-colors hover:text-washking-yellow"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-5 flex gap-2">
                <a
                  href="https://www.facebook.com/WashKingVineland/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-washking-yellow transition-colors hover:bg-washking-gold"
                  aria-label="Follow Wash King on Facebook"
                >
                  <Facebook className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/washkingvineland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-washking-yellow transition-colors hover:bg-washking-gold"
                  aria-label="Follow Wash King on Instagram"
                >
                  <Instagram className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>

          <div className="mt-9 border-t border-white/20 pt-5 text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body text-xs text-white/65 sm:justify-between lg:text-sm">
              <span>© {new Date().getFullYear()} Wash King Car Wash. All rights reserved.</span>
              <a
                href="/privacy"
                onClick={(event) => handleNavClick(event, "/privacy")}
                className="font-semibold text-white hover:text-washking-yellow hover:underline"
              >
                Privacy notice
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
