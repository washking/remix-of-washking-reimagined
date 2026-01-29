import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, Users, TrendingUp, UsersRound, Cpu, Shield, CheckCircle, Database, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lionMascot from "@/assets/lion-mascot.png";

const coreValues = [
  {
    icon: Car,
    title: "Relentless Pursuit of Cleanliness",
    description: "At Wash King, we're not just committed to cleaning; we're obsessed with it. Every vehicle that comes through our doors receives the meticulous attention it deserves, leaving it spotless and shining like new."
  },
  {
    icon: Users,
    title: "Exceptional Customer Service",
    description: "We place our customers at the heart of everything we do. From the moment you arrive, our team is dedicated to ensuring your experience is smooth, enjoyable, and tailored to your needs. Your satisfaction drives us to be the best."
  },
  {
    icon: TrendingUp,
    title: "Cultivating Growth and Development",
    description: "We believe in the continuous growth of both our team and our services. Wash King is a place where skills are honed, talents are nurtured, and innovation is encouraged, ensuring we stay at the forefront of the industry."
  },
  {
    icon: UsersRound,
    title: "Community Engagement and Responsibility",
    description: "Wash King is deeply invested in the communities we serve. We actively participate in local initiatives, support charitable causes, and aim to make a positive impact in every community we're a part of."
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Technology",
    description: "We harness the latest in car wash technology to provide the best possible service. Our investment in advanced systems ensures your car receives the most thorough, efficient, and gentle wash available."
  },
  {
    icon: Shield,
    title: "Proactive Maintenance",
    description: "We maintain our equipment and facilities with the utmost care. Regular checks and updates ensure that everything is always in top working order, minimizing downtime and keeping our services reliable and consistent."
  },
  {
    icon: CheckCircle,
    title: "Premium Products",
    description: "Only the best will do at Wash King. We use high-quality, environmentally friendly cleaning products that are safe for your vehicle and effective at achieving a pristine finish."
  },
  {
    icon: Database,
    title: "Data-Driven Performance",
    description: "We track and analyze every aspect of our operation to continuously improve our services. By focusing on data and performance metrics, we ensure that we're always delivering the best possible experience for our customers."
  },
  {
    icon: ArrowUpRight,
    title: "Streamlined Operations",
    description: "Efficiency is at the core of our service. We've optimized every step of our process to provide quick, effective, and reliable car washes without compromising on quality, ensuring you're back on the road in no time."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[45vh] overflow-hidden">
        {/* Yellow background */}
        <div className="absolute inset-0 bg-washking-yellow" />
        
        {/* Forest/Hills background */}
        <div className="absolute bottom-0 left-0 right-0 h-[70%]">
          {/* Brown hills background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30_50%_45%)] to-[hsl(25_55%_35%)]" />
          
          {/* Trees - left side */}
          <div className="absolute bottom-0 left-0 w-1/4 h-full">
            <div className="absolute bottom-0 left-[10%] w-16 h-[80%] bg-[hsl(25_60%_25%)] rounded-t-lg" />
            <div className="absolute bottom-0 left-[25%] w-20 h-[90%] bg-[hsl(25_55%_30%)] rounded-t-lg" />
          </div>
          
          {/* Trees - right side */}
          <div className="absolute bottom-0 right-0 w-1/4 h-full">
            <div className="absolute bottom-0 right-[10%] w-16 h-[80%] bg-[hsl(25_60%_25%)] rounded-t-lg" />
            <div className="absolute bottom-0 right-[25%] w-20 h-[90%] bg-[hsl(25_55%_30%)] rounded-t-lg" />
          </div>

          {/* Green grass at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[hsl(140_45%_35%)] to-[hsl(140_40%_40%)]" />
        </div>
        
        {/* Wave transition from yellow */}
        <svg 
          viewBox="0 0 1440 200" 
          className="absolute top-0 left-0 right-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '150px' }}
        >
          <path 
            d="M0,0 L1440,0 L1440,100 Q1200,180 720,120 Q240,60 0,140 Z" 
            fill="hsl(45 100% 55%)"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl lg:text-7xl text-white text-shadow"
          >
            ABOUT WASHKING
          </motion.h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Green water/lake background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(170_50%_45%)] to-[hsl(170_45%_40%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-4xl lg:text-5xl">
              <span className="text-[hsl(210_90%_50%)]">WHO</span>{" "}
              <span className="text-white text-shadow">WE ARE</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Mission Statement Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl"
            >
              <h3 className="font-display text-2xl text-[hsl(140_60%_25%)] mb-4 text-center">
                MISSION STATEMENT
              </h3>
              <p className="text-gray-700 text-center font-body leading-relaxed">
                To challenge, disrupt and redefine all industry norms one car wash at a time, every interaction and one team member at a time. Our goal is a world where going to the car wash is fast, easy and enjoyable.
              </p>
            </motion.div>

            {/* Brand Promise Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl"
            >
              <h3 className="font-display text-2xl text-[hsl(140_60%_25%)] mb-4 text-center">
                BRAND PROMISE
              </h3>
              <p className="text-gray-700 text-center font-body leading-relaxed">
                Car washing is our Passion. Family is at our Core. Only the Best for Family.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Green leafy background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_40%_30%)] to-[hsl(120_35%_25%)]" />
        
        {/* Decorative leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-10 left-5 w-32 h-32 bg-[hsl(120_50%_35%)] rounded-full blur-xl" />
          <div className="absolute top-20 right-10 w-40 h-40 bg-[hsl(120_45%_30%)] rounded-full blur-xl" />
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-[hsl(120_50%_32%)] rounded-full blur-xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-4xl lg:text-5xl text-washking-yellow text-shadow">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <value.icon className="w-12 h-12 text-[hsl(140_60%_30%)]" />
                  </div>
                  <h3 className="font-display text-lg text-[hsl(140_60%_25%)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">
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
            className="text-center mt-10"
          >
            <Link
              to="/#locations"
              className="btn-learn-more inline-block"
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
