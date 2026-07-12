import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import OptimizedImage from "@/components/OptimizedImage";

const sourceContent: Record<string, { title: string; subtitle: string; message: string }> = {
  contact_form: {
    title: "MESSAGE RECEIVED!",
    subtitle: "Thanks for reaching out to WashKing",
    message: "Your message has been delivered to the WashKing team for review.",
  },
  customer_survey: {
    title: "FEEDBACK SUBMITTED!",
    subtitle: "Thank you for helping us shine brighter",
    message: "Your feedback has been delivered to the WashKing team and will help us understand your visit.",
  },
  employment_application: {
    title: "APPLICATION SENT!",
    subtitle: "Welcome to the WashKing journey",
    message: "Your application has been delivered to the WashKing hiring team for review.",
  },
};

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") || "contact_form";
  const content = sourceContent[source] || sourceContent.contact_form;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Seo
        title="Thank You | WashKing Car Wash"
        description="Your website form has been submitted to WashKing Car Wash."
        path="/thank-you"
        noIndex
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex flex-1 items-center py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <section className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white px-6 py-9 text-center shadow-sm sm:px-10 sm:py-12">
            <CheckCircle2 className="mx-auto h-16 w-16 text-washking-green" strokeWidth={2} aria-hidden="true" />

            <OptimizedImage
              avifSrc={lionMascotAvif}
              src={lionMascot}
              alt="WashKing Lion"
              width={1132}
              height={1920}
              decoding="async"
              className="mx-auto mt-6 h-auto w-20"
            />

            <h1 className="mt-6 font-display text-3xl text-washking-brown sm:text-4xl">
              {content.title}
            </h1>

            <p className="mt-3 flex items-center justify-center gap-2 font-body text-lg font-extrabold text-washking-sky sm:text-xl">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              {content.subtitle}
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </p>

            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-gray-700 sm:text-lg">
              {content.message}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/" className="btn-cloud inline-flex min-h-12 items-center gap-2 bg-washking-brown px-5 py-3 text-white">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center px-4 py-3 font-body font-extrabold text-washking-sky underline-offset-4 hover:underline"
              >
                Need anything else?
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
