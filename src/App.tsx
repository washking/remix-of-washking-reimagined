import type { RouteRecord } from "vite-react-ssg";
import { Outlet } from "react-router-dom";
import { ClientOnly } from "vite-react-ssg";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import Index from "./pages/Index";
import LocationPage from "./pages/LocationPage";
import AboutPage from "./pages/AboutPage";
import EmploymentPage from "./pages/EmploymentPage";
import ContactPage from "./pages/ContactPage";
import CustomerSurveyPage from "./pages/CustomerSurveyPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Location slugs that get pre-rendered to static HTML (mirrors locationData in LocationPage).
const LOCATION_SLUGS = ["vineland", "vineland-dante", "somerset", "landisville", "cherry-hill"];

function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toasts are client-only UI (fired by user interactions); skip them during SSG. */}
        <ClientOnly>{() => (<><Toaster /><Sonner /></>)}</ClientOnly>
        <ScrollToTop />
        <Analytics />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "location/:locationSlug",
        element: <LocationPage />,
        getStaticPaths: () => LOCATION_SLUGS.map((slug) => `location/${slug}`),
      },
      { path: "about", element: <AboutPage /> },
      { path: "employment", element: <EmploymentPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "customer-survey", element: <CustomerSurveyPage /> },
      { path: "thank-you", element: <ThankYouPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
