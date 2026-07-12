import { CONTACT_EMAIL } from "./site";

export type LocationStatus = "open" | "coming-soon";
export type LocationServiceType =
  | "full-service-and-exterior"
  | "exterior-only"
  | "coming-soon";

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
  serviceType: LocationServiceType;
  serviceLabel: string;
  portalLocationName: string | null;
  memberPerks: string[];
  lat: number;
  lng: number;
  hours: LocationHours;
  mapEmbed: string;
  packages: WashPackage[];
}

export const UNLIMITED_MEMBER_BENEFITS = [
  "Wash once a day for one monthly price",
  "License plate recognition for faster entry",
  "Automatic monthly renewal",
  "No long-term contract - cancel anytime",
] as const;

export const PACKAGE_CATALOG_VERIFIED_ON = "2026-07-11";

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
    features: [
      "PRESOAK 2X",
      "BUG BUSTER",
      "LAVA SOAP",
      "CLEARCOAT PROTECTANT",
      "CERAMIC SHIELD",
      "GRAPHENE WAX",
      "TIRE SHINE",
      "BUFF N SHINE",
    ],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "PLATINUM",
    color: "bg-sky-300",
    textColor: "text-washking-brown",
    singlePrice: "$14",
    monthlyPrice: platinum,
    includes: "INCLUDES BRONZE WASH PLUS:",
    features: ["UNDERBODY BLAST", "WHEEL CLEANER 2X", "TRIPLE FOAM POLISH", "TIRE SHINE"],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "BRONZE",
    color: "bg-washking-green",
    textColor: "text-white",
    singlePrice: "$10",
    monthlyPrice: bronze,
    includes: null,
    features: ["WASH AND DRY"],
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
    "DOOR JAMBS CLEANED",
    "MATS CLEANED",
  ],
  note: null,
};

const premiumExteriorPackages = (): WashPackage[] => [
  {
    name: "DIAMOND",
    color: "bg-yellow-400",
    textColor: "text-washking-brown",
    singlePrice: "$16",
    monthlyPrice: "$39.99",
    includes: "INCLUDES PLATINUM WASH PLUS:",
    features: [
      "HOT PRESOAK 2X",
      "BUG BUSTER",
      "SEALANT",
      "HOT LAVA",
      "CERAMIC SHIELD",
      "GRAPHENE",
      "DRYING AGENT",
    ],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "PLATINUM",
    color: "bg-sky-300",
    textColor: "text-washking-brown",
    singlePrice: "$14",
    monthlyPrice: "$34.99",
    includes: "INCLUDES BRONZE WASH PLUS:",
    features: [
      "UNDERCARRIAGE",
      "WHEEL CLEANER",
      "TRI COLOR POLISH",
      "CLEAR COAT PROTECTANT",
    ],
    note: "*EXTERIOR ONLY",
  },
  {
    name: "BRONZE",
    color: "bg-washking-green",
    textColor: "text-white",
    singlePrice: "$10",
    monthlyPrice: "$24.99",
    includes: null,
    features: ["WASH AND DRY"],
    note: "*EXTERIOR ONLY",
  },
];

const standardExteriorPrices: ExteriorMonthlyPrices = {
  diamond: "$34.99",
  platinum: "$31.99",
  bronze: "$19.99",
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
    serviceType: "full-service-and-exterior",
    serviceLabel: "Full-service and exterior washes",
    portalLocationName: "Wash King Vineland",
    memberPerks: [
      "10% discount on detailing services",
      "10% discount on Royalty wash packages",
      "Discounted family plan rates for up to 5 cars",
      "Seasonal promotions and discounts",
    ],
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
    serviceType: "exterior-only",
    serviceLabel: "Exterior-only wash packages",
    portalLocationName: "Wash King - Dante",
    memberPerks: [],
    lat: 39.479,
    lng: -75.01,
    hours: { is24Hours: true },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.03!3d39.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI4JzEyLjAiTiA3NcKwMDEnNDguMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: premiumExteriorPackages(),
  },
  {
    slug: "somerset",
    name: "Somerset",
    state: "New Jersey",
    address: "1463 NJ-27",
    city: "Somerset, NJ 08873",
    email: CONTACT_EMAIL,
    status: "open",
    serviceType: "exterior-only",
    serviceLabel: "Exterior-only wash packages",
    portalLocationName: "Wash King Somerset",
    memberPerks: [],
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
    serviceType: "exterior-only",
    serviceLabel: "Exterior-only wash packages",
    portalLocationName: "Wash King - Landisville",
    memberPerks: [],
    lat: 39.5265,
    lng: -74.9682,
    hours: { is24Hours: true },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.07!3d39.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDMxJzEyLjAiTiA3NcKwMDQnMTIuMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: premiumExteriorPackages(),
  },
  {
    slug: "cherry-hill",
    name: "Cherry Hill",
    state: "New Jersey",
    address: "",
    city: "Cherry Hill, NJ",
    email: CONTACT_EMAIL,
    status: "coming-soon",
    serviceType: "coming-soon",
    serviceLabel: "Service details coming soon",
    portalLocationName: null,
    memberPerks: [],
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
  `Wash King ${location.name}`;

export const getLocationFormLabel = (location: WashKingLocation) =>
  `${getLocationFormValue(location)}${location.status === "coming-soon" ? " - Coming Soon" : ""}`;

export const getDirectionsUrl = (location: WashKingLocation) => {
  if (location.status !== "open" || !location.address) return null;

  const destination = `Wash King ${location.name}, ${location.address}, ${location.city}`;
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

const timeToMinutes = (time: string) => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};

const currentNewJerseyTime = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;
  const hour = Number.parseInt(value("hour") || "", 10);
  const minute = Number.parseInt(value("minute") || "", 10);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  return { weekday: value("weekday"), minutes: hour * 60 + minute };
};

export const getLocationOpenStatus = (
  location: WashKingLocation,
  at = new Date(),
) => {
  if (location.status !== "open") return null;
  if (location.hours.is24Hours) return { isOpen: true, label: "Open 24 hours" };

  const now = currentNewJerseyTime(at);
  if (!now) return null;

  const range =
    location.hours.allDays ||
    (now.weekday === "Sun" ? location.hours.sunday : location.hours.weekdays);
  if (!range) return null;

  const [opensAt, closesAt] = range.split(/\s+to\s+/i);
  const opens = timeToMinutes(opensAt || "");
  const closes = timeToMinutes(closesAt || "");
  if (opens === null || closes === null) return null;

  const isOpen =
    closes > opens
      ? now.minutes >= opens && now.minutes < closes
      : now.minutes >= opens || now.minutes < closes;
  return { isOpen, label: isOpen ? "Open now" : "Closed now" };
};

export const getStartingMonthlyPrice = (location: WashKingLocation) =>
  location.packages.reduce((minimum, washPackage) => {
    const price = Number.parseFloat(washPackage.monthlyPrice.replace(/[^0-9.]/g, ""));
    return Number.isFinite(price) && price < minimum ? price : minimum;
  }, Number.POSITIVE_INFINITY);

export const getBreakEvenVisits = (washPackage: WashPackage) => {
  const singlePrice = Number.parseFloat(washPackage.singlePrice.replace(/[^0-9.]/g, ""));
  const monthlyPrice = Number.parseFloat(washPackage.monthlyPrice.replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(singlePrice) || singlePrice <= 0 || !Number.isFinite(monthlyPrice)) {
    return null;
  }

  return Math.ceil(monthlyPrice / singlePrice);
};

const monthlyPriceValue = (washPackage: WashPackage) =>
  Number.parseFloat(washPackage.monthlyPrice.replace(/[^0-9.]/g, ""));

export const getPackagesByMonthlyPrice = (location: WashKingLocation) =>
  [...location.packages].sort(
    (left, right) => monthlyPriceValue(left) - monthlyPriceValue(right),
  );

export const getPackagesByMonthlyPriceDescending = (location: WashKingLocation) =>
  [...location.packages].sort(
    (left, right) => monthlyPriceValue(right) - monthlyPriceValue(left),
  );

export const getIncludedFeatures = (
  location: WashKingLocation,
  packageName: string,
) => {
  const packages = getPackagesByMonthlyPrice(location);
  const packageIndex = packages.findIndex((washPackage) => washPackage.name === packageName);
  if (packageIndex < 0) return [];

  return Array.from(
    new Set(
      packages
        .slice(0, packageIndex + 1)
        .flatMap((washPackage) => washPackage.features),
    ),
  );
};
