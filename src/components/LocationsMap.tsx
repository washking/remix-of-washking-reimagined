import { Suspense, lazy, useEffect, useState } from "react";

// Leaflet touches `window` on import, so load the map only on the client.
// This keeps the SSG prerender (Node, no window) safe — it renders the placeholder.
const LocationsMapInner = lazy(() => import("./LocationsMapInner"));

const Placeholder = () => (
  <div className="flex h-full w-full items-center justify-center bg-washking-sky-light">
    <span className="font-body text-washking-brown">Loading map…</span>
  </div>
);

const LocationsMap = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="h-[320px] w-full sm:h-[400px] lg:h-[460px]">
      {mounted ? (
        <Suspense fallback={<Placeholder />}>
          <LocationsMapInner />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default LocationsMap;
