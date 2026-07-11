import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  COMING_SOON_LOCATIONS,
  LOCATIONS,
  LOCATION_SLUGS,
  OPEN_LOCATIONS,
  getDirectionsUrl,
  getLocationFormLabel,
} from "@/lib/locations";
import { autoWashSchema } from "@/lib/structuredData";

describe("WashKing location registry", () => {
  it("contains four open locations and Cherry Hill coming soon", () => {
    expect(LOCATIONS).toHaveLength(5);
    expect(OPEN_LOCATIONS).toHaveLength(4);
    expect(COMING_SOON_LOCATIONS).toHaveLength(1);
    expect(COMING_SOON_LOCATIONS[0].slug).toBe("cherry-hill");
  });

  it("uses unique slugs and complete operational data", () => {
    expect(new Set(LOCATION_SLUGS).size).toBe(LOCATIONS.length);

    OPEN_LOCATIONS.forEach((location) => {
      expect(location.address).not.toBe("");
      expect(location.city).not.toBe("");
      expect(location.packages.length).toBeGreaterThan(0);
      expect(location.mapEmbed).toMatch(/^https:\/\//);
      expect(getDirectionsUrl(location)).toMatch(/^https:\/\/www\.google\.com\/maps\/dir/);
      expect(Number.isFinite(location.lat)).toBe(true);
      expect(Number.isFinite(location.lng)).toBe(true);
    });
  });

  it("does not expose open-location actions for Cherry Hill", () => {
    const cherryHill = COMING_SOON_LOCATIONS[0];

    expect(cherryHill.address).toBe("");
    expect(cherryHill.packages).toEqual([]);
    expect(cherryHill.mapEmbed).toBe("");
    expect(getDirectionsUrl(cherryHill)).toBeNull();
    expect(getLocationFormLabel(cherryHill)).toContain("Coming Soon");
    expect(autoWashSchema(cherryHill.slug, cherryHill)).toBeNull();
  });

  it("publishes Monday through Saturday hours in Vineland structured data", () => {
    const vineland = OPEN_LOCATIONS.find((location) => location.slug === "vineland");
    expect(vineland).toBeDefined();

    const schema = autoWashSchema(vineland!.slug, vineland!) as Record<string, unknown>;
    const hours = schema.openingHoursSpecification as Array<{ dayOfWeek: string[] }>;

    expect(hours[0].dayOfWeek).toContain("Saturday");
  });

  it("keeps the public sitemap aligned with every location slug", () => {
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    const sitemapSlugs = Array.from(
      sitemap.matchAll(/\/location\/([^<]+)/g),
      (match) => match[1],
    );

    expect(sitemapSlugs.sort()).toEqual([...LOCATION_SLUGS].sort());
  });
});
