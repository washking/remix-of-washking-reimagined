import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("modern UI guardrails", () => {
  it("keeps the requested Wash King hero title first and gives Car Wash its accent color", () => {
    const hero = source("src/components/HeroSection.tsx");
    const title = hero.indexOf("WASH KING");
    const subtitle = hero.indexOf("CAR WASH");
    const eyebrow = hero.indexOf("FAMILY-OWNED NEW JERSEY CAR WASH");

    expect(hero).toContain('<h1 className="font-display');
    expect(hero).toContain('className="mt-1 block text-washking-yellow">CAR WASH</span>');
    expect(title).toBeGreaterThan(-1);
    expect(title).toBeLessThan(subtitle);
    expect(subtitle).toBeLessThan(eyebrow);
  });

  it("uses one modern type family across the site", () => {
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
});
