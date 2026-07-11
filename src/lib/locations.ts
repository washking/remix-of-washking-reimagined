// Shared list of WashKing locations with coordinates, used by the locations map.
export interface MapLocation {
  name: string;
  slug: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  comingSoon?: boolean;
}

export const LOCATIONS: MapLocation[] = [
  { name: "Vineland Main Rd", slug: "vineland", address: "2611 S Main Rd", city: "Vineland, NJ 08361", lat: 39.4478, lng: -75.0202 },
  { name: "Vineland Dante", slug: "vineland-dante", address: "2375 Dante Ave", city: "Vineland, NJ", lat: 39.479, lng: -75.01 },
  { name: "Somerset", slug: "somerset", address: "1463 NJ-27", city: "Somerset, NJ 08873", lat: 40.5015, lng: -74.4832 },
  { name: "Landisville", slug: "landisville", address: "305 S Harding Hwy", city: "Landisville, NJ", lat: 39.5265, lng: -74.9682 },
  { name: "Cherry Hill", slug: "cherry-hill", address: "", city: "Cherry Hill, NJ", lat: 39.9348, lng: -75.0307, comingSoon: true },
];
