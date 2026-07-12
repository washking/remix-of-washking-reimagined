import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("modern UI guardrails", () => {
  it("uses the approved brand and customer imagery across the homepage", () => {
    const brandLogo = source("src/components/BrandLogo.tsx");
    const hero = source("src/components/HeroSection.tsx");
    const carousel = source("src/components/ui/carousel.tsx");
    const packages = source("src/components/PackagesSection.tsx");
    const media = hero.indexOf('className="hero-media-enter');
    const eyebrow = hero.indexOf("Family-owned across New Jersey");

    expect(brandLogo).toContain('from "@/assets/lion-mascot.png"');
    expect(brandLogo).toContain('from "@/assets/washking-hero-logo.png"');
    expect(brandLogo).toContain("min-[360px]:flex");
    expect(hero).toContain('from "@/assets/washking-wash-tunnel-hero.jpg"');
    expect(hero).toContain('from "@/assets/washking-customer-experience-collage.jpg"');
    expect(hero).toContain("Wash King Car Wash");
    expect(hero).not.toContain('<h1 className="sr-only">');
    expect(hero).not.toContain("hero-logo-float");
    expect(hero).toContain('opts={{ loop: true, align: "start" }}');
    expect(hero).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(hero).toContain('document.visibilityState === "visible"');
    expect(hero).toContain("Pause automatic hero images");
    expect(hero).toContain("autoplayTimeoutRef");
    expect(hero).toContain("carouselApi?.scrollTo(nextIndex, true)");
    expect(hero).toContain('className="absolute left-3 top-1/2');
    expect(hero).toContain('className="absolute right-3 top-1/2');
    expect(hero).toContain("bg-black/40 px-2.5 py-1.5");
    expect(hero).not.toContain("bg-black/70 p-1.5");
    expect(hero).toContain('className="absolute inset-0 h-full w-full object-contain object-center"');
    expect(hero).not.toContain("object-cover");
    expect(carousel).toContain('api?.off("reInit", onSelect)');
    expect(packages).toContain("washking-customer-experience-collage");
    expect(media).toBeGreaterThan(-1);
    expect(media).toBeLessThan(eyebrow);
  });

  it("uses one modern type family across the site", () => {
    expect(source("index.html")).toContain("Plus+Jakarta+Sans");
    ["tailwind.config.ts", "src/index.css"].forEach((file) => {
      expect(source(file)).toContain("Plus Jakarta Sans");
    });
    ["index.html", "tailwind.config.ts", "src/index.css"].forEach((file) => {
      expect(source(file)).not.toContain("Luckiest Guy");
    });
  });

  it("uses the spaced Wash King name in customer-facing copy", () => {
    const customerFacingFiles = [
      "index.html",
      "src/lib/site.ts",
      "src/lib/locations.ts",
      "src/components/BrandLogo.tsx",
      "src/components/Header.tsx",
      "src/components/HeroSection.tsx",
      "src/components/LocationsSection.tsx",
      "src/components/LocationsMapInner.tsx",
      "src/components/ProofSection.tsx",
      "src/components/TrustStatsSection.tsx",
      "src/components/FAQSection.tsx",
      "src/components/Footer.tsx",
      "src/pages/Index.tsx",
      "src/pages/AboutPage.tsx",
      "src/pages/ContactPage.tsx",
      "src/pages/CustomerSurveyPage.tsx",
      "src/pages/EmploymentPage.tsx",
      "src/pages/LocationPage.tsx",
      "src/pages/NotFound.tsx",
      "src/pages/PrivacyPage.tsx",
      "src/pages/ThankYouPage.tsx",
    ];

    customerFacingFiles.forEach((file) => {
      const copy = source(file)
        .replaceAll("WashKingLocation", "")
        .replaceAll("WashKingVineland", "")
        .replaceAll("CONTACT@WASHKING.NET", "");

      expect(copy).not.toMatch(/\b(?:WashKing|WASHKING|Washking)\b/);
    });
  });

  it("keeps third-party design credits out of the footer", () => {
    const footer = source("src/components/Footer.tsx");

    expect(footer).not.toContain("Web design &amp; developed by");
    expect(footer).not.toContain("webchily.design");
  });

  it("keeps legacy decorative treatments off customer-facing surfaces", () => {
    const surfaces = [
      "src/components/Header.tsx",
      "src/components/HeroSection.tsx",
      "src/components/LocationsSection.tsx",
      "src/components/PackagesSection.tsx",
      "src/components/TrustStatsSection.tsx",
      "src/components/ProofSection.tsx",
      "src/components/FAQSection.tsx",
      "src/components/Footer.tsx",
      "src/pages/AboutPage.tsx",
      "src/pages/LocationPage.tsx",
      "src/pages/NotFound.tsx",
      "src/pages/PrivacyPage.tsx",
      "src/pages/ThankYouPage.tsx",
    ];

    surfaces.forEach((file) => {
      const ui = source(file);
      expect(ui).not.toContain("bg-gradient");
      expect(ui).not.toContain("rounded-3xl");
      expect(ui).not.toContain("FoamBubbles");
      expect(ui).not.toContain("tracking-widest");
      expect(ui).not.toContain("woodTexture");
    });
  });

  it("keeps the sticky header out of overflow scroll containers", () => {
    [
      "src/pages/Index.tsx",
      "src/pages/LocationPage.tsx",
      "src/pages/PrivacyPage.tsx",
    ].forEach((file) => {
      expect(source(file)).not.toContain("overflow-x-hidden");
    });
  });

  it("keeps mobile location and wash-plan cards visually separated", () => {
    const locations = source("src/components/LocationsSection.tsx");
    const plans = source("src/pages/LocationPage.tsx");

    expect(locations).toContain("grid-cols-1 gap-8");
    expect(locations).toContain("border-2 border-gray-200 border-t-4");
    expect(plans).toContain("max-w-7xl gap-10");
    expect(plans).toContain("border-2 border-t-[8px]");
  });

  it("keeps the contact form prominent beside membership management", () => {
    const header = source("src/components/Header.tsx");

    expect(header).toContain('data-analytics-source="desktop_header"');
    expect(header).toContain('data-analytics-source="mobile_header"');
    expect(header.match(/href="\/contact"/g)).toHaveLength(2);
    expect(header).toContain("MessageSquareText");
  });

  it("restores the production brand colors without restoring decorative clutter", () => {
    expect(source("src/components/Header.tsx")).toContain("bg-washking-yellow/95");
    expect(source("src/components/HeroSection.tsx")).toContain('className="bg-washking-sky"');
    expect(source("src/components/LocationsSection.tsx")).toContain("bg-washking-sky-light");
    expect(source("src/components/FAQSection.tsx")).toContain("bg-washking-cream");
  });
});
