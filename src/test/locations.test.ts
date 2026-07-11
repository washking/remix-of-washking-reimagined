import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  COMING_SOON_LOCATIONS,
  LOCATIONS,
  LOCATION_SLUGS,
  OPEN_LOCATIONS,
  PACKAGE_CATALOG_VERIFIED_ON,
  getBreakEvenVisits,
  getDirectionsUrl,
  getIncludedFeatures,
  getLocationFormLabel,
  getLocationOpenStatus,
  getPackagesByMonthlyPrice,
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
      expect(location.portalLocationName).toBeTruthy();
      expect(location.serviceType).not.toBe("coming-soon");
      expect(location.mapEmbed).toMatch(/^https:\/\//);
      expect(getDirectionsUrl(location)).toMatch(/^https:\/\/www\.google\.com\/maps\/dir/);
      expect(Number.isFinite(location.lat)).toBe(true);
      expect(Number.isFinite(location.lng)).toBe(true);
    });
  });

  it("matches the verified NXTWash recurring membership catalog", () => {
    expect(PACKAGE_CATALOG_VERIFIED_ON).toBe("2026-07-11");

    const vineland = LOCATIONS.find((location) => location.slug === "vineland")!;
    const somerset = LOCATIONS.find((location) => location.slug === "somerset")!;
    const dante = LOCATIONS.find((location) => location.slug === "vineland-dante")!;
    const landisville = LOCATIONS.find((location) => location.slug === "landisville")!;

    for (const location of [vineland, somerset]) {
      expect(location.packages.find((plan) => plan.name === "BRONZE")?.monthlyPrice).toBe("$19.99");
      expect(location.packages.find((plan) => plan.name === "PLATINUM")?.features).toContain("TRIPLE FOAM POLISH");
      expect(location.packages.find((plan) => plan.name === "DIAMOND")?.features).toContain("GRAPHENE WAX");
    }

    for (const location of [dante, landisville]) {
      expect(location.packages.find((plan) => plan.name === "BRONZE")?.monthlyPrice).toBe("$24.99");
      expect(location.packages.find((plan) => plan.name === "PLATINUM")?.features).toContain("CLEAR COAT PROTECTANT");
      expect(location.packages.find((plan) => plan.name === "DIAMOND")?.features).toContain("HOT LAVA");
    }
  });

  it("keeps location-only perks at Vineland Main and uses honest break-even ranges", () => {
    const vineland = LOCATIONS.find((location) => location.slug === "vineland")!;
    expect(vineland.memberPerks.length).toBeGreaterThan(0);

    OPEN_LOCATIONS.filter((location) => location.slug !== "vineland").forEach((location) => {
      expect(location.memberPerks).toEqual([]);
    });

    OPEN_LOCATIONS.flatMap((location) => location.packages).forEach((plan) => {
      expect(getBreakEvenVisits(plan)).toBeGreaterThanOrEqual(2);
      expect(getBreakEvenVisits(plan)).toBeLessThanOrEqual(3);
    });
  });

  it("calculates open status in the New Jersey time zone", () => {
    const vineland = LOCATIONS.find((location) => location.slug === "vineland")!;
    const dante = LOCATIONS.find((location) => location.slug === "vineland-dante")!;
    const cherryHill = LOCATIONS.find((location) => location.slug === "cherry-hill")!;

    expect(getLocationOpenStatus(vineland, new Date("2026-07-13T14:00:00Z"))).toEqual({
      isOpen: true,
      label: "Open now",
    });
    expect(getLocationOpenStatus(vineland, new Date("2026-07-13T23:00:00Z"))).toEqual({
      isOpen: false,
      label: "Closed now",
    });
    expect(getLocationOpenStatus(vineland, new Date("2026-07-12T20:30:00Z"))?.isOpen).toBe(true);
    expect(getLocationOpenStatus(vineland, new Date("2026-07-12T21:30:00Z"))?.isOpen).toBe(false);
    expect(getLocationOpenStatus(dante, new Date("2026-07-13T06:00:00Z"))?.isOpen).toBe(true);
    expect(getLocationOpenStatus(cherryHill)).toBeNull();
  });

  it("orders plans entry-level first and expands inherited features", () => {
    const vineland = LOCATIONS.find((location) => location.slug === "vineland")!;
    const orderedPlans = getPackagesByMonthlyPrice(vineland);

    expect(orderedPlans.map((plan) => plan.name)).toEqual([
      "BRONZE",
      "PLATINUM",
      "DIAMOND",
      "ROYALTY",
    ]);
    expect(orderedPlans.map(getBreakEvenVisits)).toEqual([2, 3, 3, 3]);

    const royaltyFeatures = getIncludedFeatures(vineland, "ROYALTY");
    expect(royaltyFeatures).toContain("WASH AND DRY");
    expect(royaltyFeatures).toContain("GRAPHENE WAX");
    expect(royaltyFeatures).toContain("INTERIOR VACUUM");
    expect(new Set(royaltyFeatures).size).toBe(royaltyFeatures.length);
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
