import { CONTACT_EMAIL } from "./site";

export type LocationStatus = "open" | "coming-soon";

export interface LocationHours {
  allDays?: string;
  weekdays?: string;
  sunday?: string;
  is24Hours?: boolean;
}

export interface WashPackage {
  name: string;
  color: string;
  textColor: string;
  singlePrice: string;
  monthlyPrice: string;
  includes: string | null;
  features: string[];
  note: string | null;
}

export interface WashKingLocation {
  slug: string;
  name: string;
  state: string;
  address: string;
  city: string;
  email: string;
  status: LocationStatus;
  lat: number;
  lng: number;
  hours: LocationHours;
  mapEmbed: string;
  packages: WashPackage[];
}

type ExteriorMonthlyPrices = {
  diamond: string;
  platinum: string;
  bronze: string;
};

const exteriorPackages = ({
  diamond,
  platinum,
  bronze,
}: ExteriorMonthlyPrices): WashPackage[] => [
  {
    name: "DIAMOND",
    color: "bg-yellow-400",
    textColor: "text-washking-brown",
    singlePrice: "$16",
    monthlyPrice: diamond,
    includes: "INCLUDES PLATINUM WASH PLUS:",
    features: ["LAVA SOAP", "CARNAUBA WAX", "POLYSEALANT", "TIRE SHINE"],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "PLATINUM",
    color: "bg-sky-300",
    textColor: "text-washking-brown",
    singlePrice: "$14",
    monthlyPrice: platinum,
    includes: "INCLUDES BRONZE WASH PLUS:",
    features: ["TRIPLE FOAM", "WHEEL CLEANER 2X", "UNDERCARRIAGE WASH"],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "BRONZE",
    color: "bg-green-600",
    textColor: "text-white",
    singlePrice: "$10",
    monthlyPrice: bronze,
    includes: null,
    features: ["WHITE FOAM", "DRYING AGENT"],
    note: "*EXTERIOR ONLY",
  },
];

const royaltyPackage: WashPackage = {
  name: "ROYALTY",
  color: "bg-amber-800",
  textColor: "text-white",
  singlePrice: "$29",
  monthlyPrice: "$59.99",
  includes: "INCLUDES DIAMOND WASH PLUS:",
  features: [
    "INTERIOR VACUUM",
    "DASH WIPE DOWN",
    "WINDOW WIPE DOWN",
    "DOOR JAMS CLEANED",
    "MATS CLEANED",
  ],
  note: null,
};

const standardExteriorPrices: ExteriorMonthlyPrices = {
  diamond: "$34.99",
  platinum: "$31.99",
  bronze: "$19.99",
};

const premiumExteriorPrices: ExteriorMonthlyPrices = {
  diamond: "$39.99",
  platinum: "$34.99",
  bronze: "$24.99",
};

export const LOCATIONS: WashKingLocation[] = [
  {
    slug: "vineland",
    name: "Vineland Main Rd",
    state: "New Jersey",
    address: "2611 S Main Rd",
    city: "Vineland, NJ 08361",
    email: CONTACT_EMAIL,
    status: "open",
    lat: 39.4478,
    lng: -75.0202,
    hours: {
      weekdays: "9:00 AM to 6:00 PM",
      sunday: "9:00 AM to 5:00 PM",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12323.823908697876!2d-75.0201754!3d39.4478589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d7dcb67cdec3%3A0x8b9c7b687e7a8f95!2sWash%20King!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: [royaltyPackage, ...exteriorPackages(standardExteriorPrices)],
  },
  {
    slug: "vineland-dante",
    name: "Vineland Dante",
    state: "New Jersey",
    address: "2375 Dante Ave",
    city: "Vineland, NJ",
    email: CONTACT_EMAIL,
    status: "open",
    lat: 39.479,
    lng: -75.01,
    hours: { is24Hours: true },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.03!3d39.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI4JzEyLjAiTiA3NcKwMDEnNDguMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: exteriorPackages(premiumExteriorPrices),
  },
  {
    slug: "somerset",
    name: "Somerset",
    state: "New Jersey",
    address: "1463 NJ-27",
    city: "Somerset, NJ 08873",
    email: CONTACT_EMAIL,
    status: "open",
    lat: 40.5015,
    lng: -74.4832,
    hours: { allDays: "8:00 AM to 7:00 PM" },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.5!2d-74.49!3d40.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMwJzAwLjAiTiA3NMKwMjknMjQuMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: exteriorPackages(standardExteriorPrices),
  },
  {
    slug: "landisville",
    name: "Landisville",
    state: "New Jersey",
    address: "305 S Harding Hwy",
    city: "Landisville, NJ",
    email: CONTACT_EMAIL,
    status: "open",
    lat: 39.5265,
    lng: -74.9682,
    hours: { is24Hours: true },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.07!3d39.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDMxJzEyLjAiTiA3NcKwMDQnMTIuMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: exteriorPackages(premiumExteriorPrices),
  },
  {
    slug: "cherry-hill",
    name: "Cherry Hill",
    state: "New Jersey",
    address: "",
    city: "Cherry Hill, NJ",
    email: CONTACT_EMAIL,
    status: "coming-soon",
    lat: 39.9348,
    lng: -75.0307,
    hours: {},
    mapEmbed: "",
    packages: [],
  },
];

export const OPEN_LOCATIONS = LOCATIONS.filter(
  (location) => location.status === "open",
);

export const COMING_SOON_LOCATIONS = LOCATIONS.filter(
  (location) => location.status === "coming-soon",
);

export const LOCATION_SLUGS = LOCATIONS.map((location) => location.slug);

export const LOCATION_BY_SLUG = Object.fromEntries(
  LOCATIONS.map((location) => [location.slug, location]),
) as Record<string, WashKingLocation>;

export const getLocationBySlug = (slug?: string) =>
  slug ? LOCATION_BY_SLUG[slug] : undefined;

export const getLocationFormValue = (location: WashKingLocation) =>
  `WashKing ${location.name}`;

export const getLocationFormLabel = (location: WashKingLocation) =>
  `${getLocationFormValue(location)}${location.status === "coming-soon" ? " - Coming Soon" : ""}`;

export const getDirectionsUrl = (location: WashKingLocation) => {
  if (location.status !== "open" || !location.address) return null;

  const destination = `WashKing ${location.name}, ${location.address}, ${location.city}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};

export const getHoursSummary = (location: WashKingLocation) => {
  const { hours } = location;
  if (location.status !== "open") return "Opening details to come";
  if (hours.is24Hours) return "Open 24 hours, 7 days a week";
  if (hours.allDays) return `Open 7 days, ${hours.allDays}`;
  if (hours.weekdays) {
    return `Mon-Sat ${hours.weekdays}${hours.sunday ? `, Sun ${hours.sunday}` : ""}`;
  }
  return "Hours unavailable";
};

export const getStartingMonthlyPrice = (location: WashKingLocation) =>
  location.packages.reduce((minimum, washPackage) => {
    const price = Number.parseFloat(washPackage.monthlyPrice.replace(/[^0-9.]/g, ""));
    return Number.isFinite(price) && price < minimum ? price : minimum;
  }, Number.POSITIVE_INFINITY);
