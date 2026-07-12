import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const size = (path: string) => statSync(resolve(process.cwd(), path)).size;

describe("performance guardrails", () => {
  it("keeps every page behind a lazy route boundary", () => {
    const app = source("src/App.tsx");

    expect(app).not.toContain('from "./pages/');
    expect(app.match(/lazy: async/g)).toHaveLength(9);
    expect(app).not.toContain("QueryClientProvider");
  });

  it("keeps Framer Motion out of shared and homepage components", () => {
    const sharedFiles = [
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
      "src/components/FormPageHero.tsx",
      "src/components/HeroSection.tsx",
      "src/components/LocationsSection.tsx",
      "src/components/PackagesSection.tsx",
      "src/components/TrustStatsSection.tsx",
      "src/components/FAQSection.tsx",
    ];

    sharedFiles.forEach((file) => expect(source(file)).not.toContain("framer-motion"));
  });

  it("ships substantially smaller AVIF alternatives for repeated assets", () => {
    const assets = [
      ["src/assets/lion-mascot.avif", "src/assets/lion-mascot.png"],
      ["src/assets/wood-texture.avif", "src/assets/wood-texture.jpg"],
      ["src/assets/car-wash-illustration.avif", "src/assets/car-wash-illustration.png"],
      ["src/assets/washking-hero-logo.avif", "src/assets/washking-hero-logo.png"],
      ["src/assets/washking-wash-tunnel-hero.avif", "src/assets/washking-wash-tunnel-hero.jpg"],
    ];

    assets.forEach(([optimized, fallback]) => {
      expect(size(optimized)).toBeLessThan(size(fallback) * 0.65);
    });
  });

  it("loads Google Fonts without a render-blocking CSS import", () => {
    expect(source("src/index.css")).not.toContain("@import url");
    expect(source("index.html")).toContain('rel="preconnect"');
  });
});
