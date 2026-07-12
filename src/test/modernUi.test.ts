import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("modern UI guardrails", () => {
  it("uses the approved brand and customer imagery across the homepage", () => {
    const brandLogo = source("src/components/BrandLogo.tsx");
    const hero = source("src/components/HeroSection.tsx");
    const packages = source("src/components/PackagesSection.tsx");
    const media = hero.indexOf('className="hero-media-enter');
    const eyebrow = hero.indexOf("Family-owned across New Jersey");

    expect(brandLogo).toContain('from "@/assets/lion-mascot.png"');
    expect(brandLogo).toContain('from "@/assets/washking-hero-logo.png"');
    expect(hero).toContain('from "@/assets/washking-wash-tunnel-hero.jpg"');
    expect(hero).toContain("Wash King Car Wash");
    expect(hero).not.toContain('<h1 className="sr-only">');
    expect(hero).not.toContain("hero-logo-float");
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
});
