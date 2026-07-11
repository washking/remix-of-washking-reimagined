import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("trust and privacy guardrails", () => {
  it("uses verified operating facts instead of unattributed testimonials", () => {
    expect(source("src/pages/Index.tsx")).toContain("TrustStatsSection");
    expect(source("src/components/TrustStatsSection.tsx")).toContain("OPEN_LOCATIONS");
    expect(existsSync(resolve(process.cwd(), "src/components/TestimonialsSection.tsx"))).toBe(false);
    expect(source("src/components/Header.tsx")).toContain("At a Glance");

    const confirmation = source("src/pages/ThankYouPage.tsx");
    expect(confirmation).not.toContain("as soon as possible");
    expect(confirmation).not.toContain("every response");
  });

  it("publishes and links the privacy notice", () => {
    expect(source("src/App.tsx")).toContain('path: "privacy"');
    expect(source("public/sitemap.xml")).toContain("https://www.washking.net/privacy");
    expect(source("src/components/Footer.tsx")).toContain("Privacy Notice");

    ["ContactPage.tsx", "CustomerSurveyPage.tsx", "EmploymentPage.tsx"].forEach((page) => {
      expect(source(`src/pages/${page}`)).toContain('to="/privacy"');
    });
  });

  it("discloses both form delivery and anonymous analytics", () => {
    const privacy = source("src/pages/PrivacyPage.tsx");

    expect(privacy).toContain("Formspree");
    expect(privacy).toContain("Supabase");
    expect(privacy).toContain("random visitor and session identifiers");
    expect(privacy).toContain("NXTWash");
  });
});
