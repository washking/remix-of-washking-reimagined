// Generates schema.org JSON-LD for local SEO.
// All business facts are derived from the same location data shown on the site,
// so the markup never drifts from what visitors actually see.
import {
  SITE_URL,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  OG_IMAGE,
  SOCIAL_LINKS,
} from "./site";
import type { LocationHours, WashKingLocation } from "./locations";

const MONDAY_TO_SATURDAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const ALL_DAYS = [...MONDAY_TO_SATURDAY, "Sunday"];

// "9:00 AM" -> "09:00"; returns "" if it can't parse.
function to24h(time: string): string {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "";
  let hour = parseInt(m[1], 10);
  const minute = m[2];
  const meridiem = m[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

// "9:00 AM to 6:00 PM" -> { opens, closes }
function parseRange(range: string): { opens: string; closes: string } | null {
  const parts = range.split(/\s+to\s+/i);
  if (parts.length !== 2) return null;
  const opens = to24h(parts[0]);
  const closes = to24h(parts[1]);
  if (!opens || !closes) return null;
  return { opens, closes };
}

function spec(days: string[], opens: string, closes: string) {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
}

function openingHours(hours: LocationHours) {
  const out: ReturnType<typeof spec>[] = [];
  if (hours.is24Hours) {
    out.push(spec(ALL_DAYS, "00:00", "23:59"));
    return out;
  }
  if (hours.allDays) {
    const r = parseRange(hours.allDays);
    if (r) out.push(spec(ALL_DAYS, r.opens, r.closes));
    return out;
  }
  if (hours.weekdays) {
    const r = parseRange(hours.weekdays);
    if (r) out.push(spec(MONDAY_TO_SATURDAY, r.opens, r.closes));
  }
  if (hours.sunday) {
    const r = parseRange(hours.sunday);
    if (r) out.push(spec(["Sunday"], r.opens, r.closes));
  }
  return out;
}

// "Vineland, NJ 08361" -> { locality: "Vineland", region: "NJ", postalCode: "08361" }
function parseCity(city: string) {
  const [localityRaw, rest = ""] = city.split(",");
  const region = (rest.match(/[A-Z]{2}/) || [])[0] || "NJ";
  const postalCode = (rest.match(/\d{5}/) || [])[0];
  return { locality: localityRaw.trim(), region, postalCode };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS_NAME,
        alternateName: "Wash King",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.png`,
        },
        image: OG_IMAGE,
        email: CONTACT_EMAIL,
        sameAs: SOCIAL_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS_NAME,
        alternateName: "Wash King",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function autoWashSchema(slug: string, loc: WashKingLocation) {
  if (loc.status !== "open" || !loc.address) return null;
  const { locality, region, postalCode } = parseCity(loc.city);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "@id": `${SITE_URL}/location/${slug}#business`,
    name: `${BUSINESS_NAME} – ${loc.name}`,
    url: `${SITE_URL}/location/${slug}`,
    image: OG_IMAGE,
    email: loc.email || CONTACT_EMAIL,
    priceRange: "$10-$60",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: locality,
      addressRegion: region,
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    },
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    sameAs: SOCIAL_LINKS,
  };

  const hours = openingHours(loc.hours);
  if (hours.length) schema.openingHoursSpecification = hours;

  return schema;
}
