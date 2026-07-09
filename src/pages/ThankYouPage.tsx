import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import lionMascot from "@/assets/lion-mascot.png";

const sourceContent: Record<string, { title: string; subtitle: string; message: string }> = {
  contact_form: {
    title: "MESSAGE RECEIVED!",
    subtitle: "Thanks for reaching out to WashKing",
    message: "We've received your message and our team will get back to you as soon as possible. Keep an eye on your inbox!",
  },
  customer_survey: {
    title: "FEEDBACK SUBMITTED!",
    subtitle: "Thank you for helping us shine brighter",
    message: "Your feedback means the world to us. We use every response to make the WashKing experience even better for you.",
  },
  employment_application: {
    title: "APPLICATION SENT!",
    subtitle: "Welcome to the WashKing journey",
    message: "Thanks for applying! Our hiring team will review your application and reach out if there's a great fit.",
  },
};

const BubbleCluster = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <motion.div
      animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm absolute -top-4 -left-4" />
      <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-sm absolute top-8 left-10" />
      <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm absolute -top-2 left-16" />
      <div className="w-8 h-8 rounded-full bg-white/35 backdrop-blur-sm absolute top-14 -left-2" />
    </motion.div>
  </div>
);

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") || "contact_form";
  const content = sourceContent[source] || sourceContent.contact_form;

  return (
    <div className="min-h-screen bg-washking-sky flex flex-col">
      <Seo
        title="Thank You | WashKing Car Wash"
        description="Thanks for reaching out to WashKing Car Wash. We'll be in touch soon."
        path="/thank-you"
        noIndex
      />
      <Header />

      <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-16 lg:py-24">
        <FoamBubbles variant="hero" density="medium" />
        <BubbleCluster className="top-12 left-[6%]" />
        <BubbleCluster className="top-20 right-[8%]" />
        <BubbleCluster className="bottom-16 left-[12%]" />
        <BubbleCluster className="bottom-24 right-[14%]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white/15 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl border-2 border-white/30"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 120 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-washking-yellow rounded-full blur-2xl opacity-60" />
                <CheckCircle2 className="relative w-24 h-24 sm:w-28 sm:h-28 text-washking-yellow drop-shadow-2xl" strokeWidth={2.5} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mb-6"
            >
              <motion.img
                src={lionMascot}
                alt="WashKing Lion"
                className="w-32 sm:w-40 h-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-shadow mb-4"
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-display text-xl sm:text-2xl lg:text-3xl text-washking-yellow mb-6 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6" />
              {content.subtitle}
              <Sparkles className="w-6 h-6" />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="font-body text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {content.message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/" className="btn-cloud btn-submit inline-flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="font-body text-lg text-white/90 hover:text-white underline underline-offset-4"
              >
                Need anything else?
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
