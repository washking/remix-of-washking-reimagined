import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LOCATIONS,
  getDirectionsUrl,
  type WashKingLocation,
} from "@/lib/locations";

const pinHtml = (fill: string, center: string) =>
  `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${fill}"/><circle cx="15" cy="15" r="6" fill="${center}"/></svg>`;

const makeIcon = (comingSoon: boolean) =>
  L.divIcon({
    className: "washking-map-pin",
    html: comingSoon ? pinHtml("#FFD43B", "#6B3E26") : pinHtml("#E23B3B", "#FFFFFF"),
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  });

const makePopup = (location: WashKingLocation) => {
  const container = document.createElement("div");
  container.style.minWidth = "170px";

  const heading = document.createElement("strong");
  heading.textContent = location.name;
  heading.style.display = "block";
  heading.style.marginBottom = "4px";
  container.appendChild(heading);

  const address = document.createElement("span");
  address.textContent = location.address
    ? `${location.address}, ${location.city}`
    : location.city;
  address.style.display = "block";
  container.appendChild(address);

  if (location.status === "coming-soon") {
    const status = document.createElement("strong");
    status.textContent = "Coming soon";
    status.style.display = "block";
    status.style.marginTop = "5px";
    status.style.color = "#6B3E26";
    container.appendChild(status);
  }

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "10px";
  actions.style.marginTop = "10px";

  const details = document.createElement("a");
  details.href = `/location/${location.slug}`;
  details.textContent = location.status === "coming-soon" ? "Opening details" : "View location";
  details.style.fontWeight = "700";
  actions.appendChild(details);

  const directionsUrl = getDirectionsUrl(location);
  if (directionsUrl) {
    const directions = document.createElement("a");
    directions.href = directionsUrl;
    directions.target = "_blank";
    directions.rel = "noopener noreferrer";
    directions.textContent = "Directions";
    directions.style.fontWeight = "700";
    actions.appendChild(directions);
  }

  container.appendChild(actions);
  return container;
};

const LocationsMapInner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    LOCATIONS.forEach((location) => {
      const comingSoon = location.status === "coming-soon";
      L.marker([location.lat, location.lng], {
        icon: makeIcon(comingSoon),
        title: `${location.name}${comingSoon ? " - Coming Soon" : ""}`,
        alt: `WashKing ${location.name}`,
      })
        .addTo(map)
        .bindPopup(makePopup(location));
    });

    map.fitBounds(
      L.latLngBounds(LOCATIONS.map((location) => [location.lat, location.lng] as [number, number])),
      { padding: [40, 40] },
    );

    return () => map.remove();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      role="region"
      aria-label="Map of five WashKing locations across New Jersey, including Cherry Hill coming soon"
    />
  );
};

export default LocationsMapInner;
