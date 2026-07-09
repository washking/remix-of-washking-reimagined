import Seo from "@/components/Seo";
import { organizationSchema } from "@/lib/structuredData";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import PackagesSection from "@/components/PackagesSection";
import LocationsSection from "@/components/LocationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Seo
        title="Washking – Best Full-Service Car Wash in Vineland, NJ"
        description="Washking offers premium full-service car wash and unlimited membership plans across Vineland, Somerset, Landisville and South Jersey. Fast, friendly, family-owned."
        path="/"
        jsonLd={organizationSchema()}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <PackagesSection />
        <LocationsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
