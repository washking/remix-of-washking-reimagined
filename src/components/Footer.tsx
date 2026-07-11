import { Facebook, Instagram, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/washking-logo.png";
import logoAvif from "@/assets/washking-logo.avif";
import woodTexture from "@/assets/wood-texture.jpg";
import woodTextureAvif from "@/assets/wood-texture.avif";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import OptimizedImage from "@/components/OptimizedImage";
import { backgroundImageSet } from "@/lib/media";

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
    <footer id="footer" className="relative overflow-hidden">
      {/* Wood texture footer */}
      <div 
        className="relative py-8 lg:py-14"
        style={{
          backgroundImage: backgroundImageSet(woodTextureAvif, woodTexture),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[hsl(25_55%_32%)]/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Logo - full width centered on all sizes */}
          <div
            className="flex justify-center mb-6"
          >
            <Link to="/">
              <OptimizedImage
                avifSrc={logoAvif}
                src={logo} 
                alt="WashKing Car Wash" 
                width={500}
                height={511}
                loading="lazy"
                decoding="async"
                className="w-28 lg:w-44 h-auto"
              />
            </Link>
          </div>

          {/* Two-column link grid + email/social on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 items-start">
            {/* Mobile: Email & Social appears after links via order */}
            <div
              className="order-3 md:order-1 text-center md:text-left"
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
                <a
                  href="https://www.facebook.com/WashKingVineland/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-washking-yellow rounded-full flex items-center justify-center"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-washking-brown" />
                </a>
                <a
                  href="https://www.instagram.com/washkingvineland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-washking-yellow rounded-full flex items-center justify-center"
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

            {/* Center - Two divided link columns on mobile, single column on desktop */}
            <div
              className="order-1 md:order-2 text-center"
            >
              {/* Mobile: 2-column grid for links */}
              <div className="grid grid-cols-2 gap-4 md:block">
                {/* Section 1: EXPLORE */}
                <div className="text-center">
                  <h3 className="font-display text-washking-yellow text-base lg:text-2xl mb-2 border-b-2 border-washking-yellow pb-1 inline-block">
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

                {/* Section 2 */}
                <div className="text-center md:text-center">
                  <div aria-hidden="true" className="font-display text-washking-yellow text-base lg:text-2xl mb-2 border-b-2 border-washking-yellow pb-1 inline-block md:hidden">
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

            {/* Right spacer on desktop to balance 3-column layout */}
            <div className="hidden md:block order-3" />
          </div>

          <div
            className="text-center mt-6 pt-4 border-t border-white/20"
          >
            <p className="text-white/70 font-body text-xs lg:text-sm flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>© {new Date().getFullYear()} WashKing Car Wash. All rights reserved.</span>
              <span className="hidden sm:inline text-white/40">|</span>
              <a
                href="/privacy"
                onClick={(event) => handleNavClick(event, "/privacy")}
                className="font-semibold text-white hover:text-washking-yellow hover:underline"
              >
                Privacy Notice
              </a>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
