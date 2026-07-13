import vinelandTunnel from "@/assets/washking-wash-tunnel-hero.jpg";
import vinelandTunnelAvif from "@/assets/washking-wash-tunnel-hero.avif";
import vinelandCollage from "@/assets/washking-customer-experience-collage.jpg";
import vinelandCollageAvif from "@/assets/washking-customer-experience-collage.avif";
import somersetWash from "@/assets/somerset-wash-experience-collage.jpg";
import somersetWashAvif from "@/assets/somerset-wash-experience-collage.avif";
import somersetFacility from "@/assets/somerset-facility-collage.jpg";
import somersetFacilityAvif from "@/assets/somerset-facility-collage.avif";

export type LocationPhoto = {
  src: string;
  avifSrc: string;
  alt: string;
  label: string;
  location: string;
  width: number;
  height: number;
};

const vinelandPhotos = [
  {
    src: vinelandTunnel,
    avifSrc: vinelandTunnelAvif,
    alt: "A car moving through the Wash King Vineland Main Road wash tunnel, shown half dirty and half clean",
    label: "Vineland Main Road wash tunnel",
    location: "Vineland Main Rd",
    width: 1247,
    height: 831,
  },
  {
    src: vinelandCollage,
    avifSrc: vinelandCollageAvif,
    alt: "Wash King Vineland Main Road pricing, wash tunnel, payment station, entrance, and team service",
    label: "Vineland Main Road experience",
    location: "Vineland Main Rd",
    width: 1536,
    height: 1024,
  },
] as const satisfies readonly LocationPhoto[];

const somersetPhotos = [
  {
    src: somersetWash,
    avifSrc: somersetWashAvif,
    alt: "Wash King Somerset wash tunnel, brushes, payment station, and customer service",
    label: "Somerset wash experience",
    location: "Somerset",
    width: 1536,
    height: 1024,
  },
  {
    src: somersetFacility,
    avifSrc: somersetFacilityAvif,
    alt: "Wash King Somerset facility, wash equipment, vacuum area, and colorful wash tunnel",
    label: "Somerset facility and wash",
    location: "Somerset",
    width: 1536,
    height: 1024,
  },
] as const satisfies readonly LocationPhoto[];

export const LOCATION_PHOTO_SETS: Readonly<Record<string, readonly LocationPhoto[]>> = {
  vineland: vinelandPhotos,
  somerset: somersetPhotos,
};

export const HOMEPAGE_LOCATION_PHOTOS = [
  ...vinelandPhotos,
  ...somersetPhotos,
] as const;
