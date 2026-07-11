import type { RouteRecord } from "vite-react-ssg";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import { LOCATION_SLUGS } from "./lib/locations";

function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-washking-brown px-4 py-3 font-body font-extrabold text-white shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Analytics />
      <Suspense
        fallback={(
          <div className="flex min-h-screen items-center justify-center bg-washking-sky" role="status">
            <span className="font-body font-bold text-white">Loading page...</span>
          </div>
        )}
      >
        <Outlet />
      </Suspense>
    </>
  );
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("./pages/Index")).default }),
      },
      {
        path: "location/:locationSlug",
        lazy: async () => ({ Component: (await import("./pages/LocationPage")).default }),
        getStaticPaths: () => LOCATION_SLUGS.map((slug) => `location/${slug}`),
      },
      {
        path: "about",
        lazy: async () => ({ Component: (await import("./pages/AboutPage")).default }),
      },
      {
        path: "employment",
        lazy: async () => ({ Component: (await import("./pages/EmploymentPage")).default }),
      },
      {
        path: "contact",
        lazy: async () => ({ Component: (await import("./pages/ContactPage")).default }),
      },
      {
        path: "customer-survey",
        lazy: async () => ({ Component: (await import("./pages/CustomerSurveyPage")).default }),
      },
      {
        path: "privacy",
        lazy: async () => ({ Component: (await import("./pages/PrivacyPage")).default }),
      },
      {
        path: "thank-you",
        lazy: async () => ({ Component: (await import("./pages/ThankYouPage")).default }),
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("./pages/NotFound")).default }),
      },
    ],
  },
];

export default routes;
