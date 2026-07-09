import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, Users, TrendingUp, UsersRound, Cpu, Shield, CheckCircle, Database, ArrowUpRight, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";

const coreValues = [
  {
    icon: Car,
    title: "Relentless Pursuit of Cleanliness",
    description: "Every vehicle receives meticulous attention, leaving it spotless and shining like new."
  },
  {
    icon: Users,
    title: "Exceptional Customer Service",
    description: "We place our customers at the heart of everything we do. Your satisfaction drives us to be the best."
  },
  {
    icon: TrendingUp,
    title: "Cultivating Growth",
    description: "A place where skills are honed, talents are nurtured, and innovation is encouraged."
  },
  {
    icon: UsersRound,
    title: "Community Engagement",
    description: "Deeply invested in local initiatives and charitable causes in every community we serve."
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Technology",
    description: "Advanced systems ensure your car receives the most thorough and efficient wash available."
  },
  {
    icon: Shield,
    title: "Proactive Maintenance",
    description: "Regular checks ensure everything is in top working order, keeping services reliable and consistent."
  },
  {
    icon: CheckCircle,
    title: "Premium Products",
    description: "High-quality, environmentally friendly products safe for your vehicle and effective at achieving a pristine finish."
  },
  {
    icon: Database,
    title: "Data-Driven Performance",
    description: "We track every aspect of our operation to continuously improve the experience for our customers."
  },
  {
    icon: ArrowUpRight,
    title: "Streamlined Operations",
    description: "Optimized processes provide quick, effective washes without compromising on quality."
  }
];

// Decorative bubble cluster component
const BubbleCluster = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <motion.div
      animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-24 h-24 lg:w-32 lg:h-32 rounded-full"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 60%, rgba(200,230,255,0.5))",
        boxShadow: "inset -4px -4px 10px rgba(255,255,255,0.8), inset 4px 4px 10px rgba(200,230,255,0.3), 0 4px 20px rgba(0,0,0,0.1)",
      }}
    />
    <motion.div
      animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute -top-4 -right-4 w-14 h-14 lg:w-20 lg:h-20 rounded-full"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.5) 60%, rgba(200,230,255,0.4))",
        boxShadow: "inset -2px -2px 6px rgba(255,255,255,0.8), 0 2px 10px rgba(0,0,0,0.08)",
      }}
    />
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute -bottom-2 -left-2 w-10 h-10 lg:w-14 lg:h-14 rounded-full"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.45) 60%, rgba(200,230,255,0.35))",
        boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    />
    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 text-washking-yellow/80" />
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Seo
        title="About WashKing | Family-Owned Car Wash in Vineland & Somerset, NJ"
        description="Learn about WashKing Car Wash — a family-owned, technology-driven car wash serving Vineland, Somerset, Landisville and South Jersey with unlimited wash plans."
        path="/about"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] overflow-hidden">
        {/* Sky blue background matching wash-foam aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_60%)] to-[hsl(200_80%_55%)]" />
        
        {/* Foam bubbles */}
        <FoamBubbles variant="hero" density="medium" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white text-shadow"
          >
            ABOUT WASHKING
          </motion.h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        {/* Teal/cyan water background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(180_55%_45%)] to-[hsl(180_50%_40%)]" />
        
        {/* Foam bubbles */}
        <FoamBubbles variant="section" density="low" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left side - Bubble cluster for balance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex lg:w-1/4 justify-center"
            >
              <BubbleCluster />
            </motion.div>

            {/* Center content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 text-center"
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-8">
                <span className="text-[hsl(210_90%_50%)]">WHO</span>{" "}
                <span className="text-white text-shadow">WE ARE</span>
              </h2>

              <div className="space-y-6">
                {/* Mission Statement Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl"
                >
                  <h3 className="font-display text-2xl lg:text-3xl text-[hsl(140_60%_25%)] mb-4">
                    MISSION STATEMENT
                  </h3>
                  <p className="text-gray-700 font-body text-lg lg:text-xl leading-relaxed">
                    To challenge, disrupt and redefine all industry norms — making car washing fast, easy, and enjoyable for everyone.
                  </p>
                </motion.div>

                {/* Brand Promise Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl"
                >
                  <h3 className="font-display text-2xl lg:text-3xl text-[hsl(140_60%_25%)] mb-4">
                    BRAND PROMISE
                  </h3>
                  <p className="text-gray-700 font-body text-lg lg:text-xl leading-relaxed">
                    Car washing is our Passion. Family is at our Core. Only the Best for Family.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Bubble cluster for balance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex lg:w-1/4 justify-center"
            >
              <BubbleCluster />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        {/* Deeper blue-green background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(170_50%_38%)] to-[hsl(170_45%_32%)]" />
        
        {/* Foam bubbles */}
        <FoamBubbles variant="section" density="medium" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-washking-yellow text-shadow">
              CORE VALUES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 lg:p-10 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(200,230,255,0.6) 70%)",
                        boxShadow: "inset -2px -2px 6px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <value.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[hsl(180_50%_35%)]" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-[hsl(140_60%_25%)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-body text-base lg:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View Our Location Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/#locations"
              className="btn-cloud inline-block text-lg lg:text-xl px-10 py-4"
            >
              View Our Location
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
