import { Facebook, Instagram, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";

const exploreLinks1 = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const exploreLinks2 = [
  { label: "Plans & Pricing", href: "/#locations" },
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
    <footer id="footer" className="overflow-hidden bg-washking-brown">
      <div className="py-9 lg:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-7 flex justify-center md:justify-start">
            <Link to="/">
              <BrandLogo variant="footer" />
            </Link>
          </div>

          <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-16">
            <div className="order-2 text-center md:order-1 md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/10 lg:h-12 lg:w-12">
                  <Mail className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-sm lg:text-lg">E-MAIL US</h3>
                  <a 
                    href="mailto:contact@washking.net"
                    className="break-all font-body text-xs text-white hover:underline lg:text-sm"
                  >
                    CONTACT@WASHKING.NET
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center gap-3 md:justify-start">
                <a
                  href="https://www.facebook.com/WashKingVineland/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-washking-yellow"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-washking-brown" />
                </a>
                <a
                  href="https://www.instagram.com/washkingvineland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-washking-yellow"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-washking-brown" />
                </a>
              </div>

              <a
                href={MEMBERSHIP_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="membership_cta"
                data-analytics-source="footer"
                className="mt-4 inline-block font-body text-sm font-bold text-washking-yellow hover:underline"
              >
                Manage Membership
              </a>
            </div>

            <div className="order-1 text-center md:order-2 md:text-left">
              <div className="grid grid-cols-2 gap-4 md:block">
                <div className="text-center md:text-left">
                  <h3 className="mb-2 inline-block border-b border-washking-yellow pb-1 font-display text-base text-washking-yellow lg:text-xl">
                    EXPLORE
                  </h3>
                  <nav className="space-y-1">
                    {exploreLinks1.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block text-white font-body text-sm lg:text-base hover:text-washking-yellow transition-colors py-0.5"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="text-center md:text-left">
                  <div aria-hidden="true" className="mb-2 inline-block pb-1 font-display text-base text-transparent md:hidden lg:text-xl">
                    &nbsp;
                  </div>
                  <nav className="space-y-1 md:mt-0">
                    {exploreLinks2.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block text-white font-body text-sm lg:text-base hover:text-washking-yellow transition-colors py-0.5"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

          </div>

          <div
            className="text-center mt-6 pt-4 border-t border-white/20"
          >
            <p className="text-white/70 font-body text-xs lg:text-sm flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>© {new Date().getFullYear()} Wash King Car Wash. All rights reserved.</span>
              <span className="hidden sm:inline text-white/40">|</span>
              <a
                href="/privacy"
                onClick={(event) => handleNavClick(event, "/privacy")}
                className="font-semibold text-white hover:text-washking-yellow hover:underline"
              >
                Privacy Notice
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
