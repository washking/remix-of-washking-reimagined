import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LOCATIONS } from "@/lib/locations";

// Red teardrop pin as an inline SVG divIcon (avoids Leaflet's default image assets).
const redPinHtml = `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 2px rgba(0,0,0,0.35))"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="#E23B3B"/><circle cx="15" cy="15" r="6" fill="#ffffff"/></svg>`;

// Plain Leaflet (no react-leaflet) — imperative init avoids any React-instance conflicts.
const LocationsMapInner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const icon = L.divIcon({
      className: "washking-map-pin",
      html: redPinHtml,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -38],
    });

    LOCATIONS.forEach((loc) => {
      const lines = [`<strong>${loc.name}</strong>`];
      if (loc.address) lines.push(loc.address);
      lines.push(loc.city + (loc.comingSoon ? " — <em>Coming soon</em>" : ""));
      L.marker([loc.lat, loc.lng], { icon, title: loc.name }).addTo(map).bindPopup(lines.join("<br/>"));
    });

    map.fitBounds(L.latLngBounds(LOCATIONS.map((l) => [l.lat, l.lng] as [number, number])), {
      padding: [40, 40],
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label="Map of WashKing car wash locations across South Jersey"
    />
  );
};

export default LocationsMapInner;
