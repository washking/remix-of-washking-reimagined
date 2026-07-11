import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("form page UI guardrails", () => {
  const pages = [
    "src/pages/ContactPage.tsx",
    "src/pages/CustomerSurveyPage.tsx",
    "src/pages/EmploymentPage.tsx",
  ];

  it("uses the shared compact form header without decorative motion", () => {
    pages.forEach((page) => {
      const pageSource = source(page);
      expect(pageSource).toContain("FormPageHero");
      expect(pageSource).not.toContain("framer-motion");
      expect(pageSource).not.toContain("FoamBubbles");
      expect(pageSource).not.toContain("rounded-3xl");
    });
  });

  it("keeps task-specific controls visible", () => {
    const contact = source("src/pages/ContactPage.tsx");
    const survey = source("src/pages/CustomerSurveyPage.tsx");
    const employment = source("src/pages/EmploymentPage.tsx");

    expect(contact).toContain("phone number connected to the account");
    expect(contact).not.toContain("LocationsMap");
    expect(survey).toContain("survey-rating-");
    expect(employment).toContain("preferredLocation");
    expect(employment).not.toContain("lionMascot");
  });
});
