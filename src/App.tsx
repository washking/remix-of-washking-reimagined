import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import LocationPage from "./pages/LocationPage";
import AboutPage from "./pages/AboutPage";
import EmploymentPage from "./pages/EmploymentPage";
import ContactPage from "./pages/ContactPage";
import CustomerSurveyPage from "./pages/CustomerSurveyPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
