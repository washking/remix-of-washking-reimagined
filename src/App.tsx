import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import LocationPage from "./pages/LocationPage";
import AboutPage from "./pages/AboutPage";
import EmploymentPage from "./pages/EmploymentPage";
import ContactPage from "./pages/ContactPage";
import CustomerSurveyPage from "./pages/CustomerSurveyPage";
import ThankYouPage from "./pages/ThankYouPage";
import MaintenancePage from "./pages/MaintenancePage";
import NotFound from "./pages/NotFound";

// Toggle to false to restore the live site after cloud migration is complete.
const MAINTENANCE_MODE = true;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        {MAINTENANCE_MODE ? (
          <Routes>
            <Route path="*" element={<MaintenancePage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/location/:locationSlug" element={<LocationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/employment" element={<EmploymentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/customer-survey" element={<CustomerSurveyPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
