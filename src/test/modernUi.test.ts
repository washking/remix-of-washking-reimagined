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
