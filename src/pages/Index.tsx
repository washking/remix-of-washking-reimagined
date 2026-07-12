import Seo from "@/components/Seo";
import { organizationSchema } from "@/lib/structuredData";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PackagesSection from "@/components/PackagesSection";
import LocationsSection from "@/components/LocationsSection";
import ProofSection from "@/components/ProofSection";
import TrustStatsSection from "@/components/TrustStatsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Wash King Car Wash | Four New Jersey Locations"
        description="Visit Wash King at four open New Jersey car wash locations, with Cherry Hill coming soon. Explore wash packages and unlimited monthly plans."
        path="/"
        jsonLd={organizationSchema()}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <LocationsSection />
        <PackagesSection />
        <ProofSection />
        <TrustStatsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
