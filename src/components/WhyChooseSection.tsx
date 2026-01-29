import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";

const features = [
  {
    title: "EXCEPTIONAL SERVICE",
    description: "Our trained professionals provide top-tier care and attention to detail for every vehicle.",
  },
  {
    title: "CUTTING-EDGE TECHNOLOGY",
    description: "We use state-of-the-art equipment and eco-friendly practices to deliver superior results while minimizing environmental impact.",
  },
  {
    title: "CONVENIENCE",
    description: "We are open year round 7 days a week.",
  },
];

const WhyChooseSection = () => {
  const scrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#packages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="why-choose" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_40%_40%)] to-[hsl(120_45%_30%)]" />
      
      {/* Illustrated trees/bushes overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top foliage */}
        <svg viewBox="0 0 1440 200" className="absolute top-0 left-0 w-full h-auto" preserveAspectRatio="none">
          <path fill="hsl(120 50% 25%)" d="M0,0 Q200,80 400,40 T800,60 T1200,30 T1440,80 L1440,0 L0,0 Z" />
          <path fill="hsl(120 45% 30%)" d="M0,20 Q180,100 360,50 T720,70 T1080,40 T1440,100 L1440,0 L0,0 Z" />
          <path fill="hsl(120 40% 35%)" d="M0,40 Q160,120 320,60 T640,80 T960,50 T1280,90 T1440,60 L1440,0 L0,0 Z" />
        </svg>
        
        {/* Side foliage - left */}
        <div className="absolute left-0 top-1/4 w-16 lg:w-32 h-32 lg:h-64 bg-[hsl(120_45%_28%)] rounded-r-full opacity-80" />
        <div className="absolute left-0 top-1/3 w-12 lg:w-24 h-24 lg:h-48 bg-[hsl(120_50%_25%)] rounded-r-full" />
        
        {/* Side foliage - right */}
        <div className="absolute right-0 top-1/4 w-20 lg:w-40 h-40 lg:h-80 bg-[hsl(120_45%_28%)] rounded-l-full opacity-80" />
        <div className="absolute right-0 top-1/2 w-14 lg:w-28 h-28 lg:h-56 bg-[hsl(120_50%_25%)] rounded-l-full" />
        
        {/* Bottom foliage */}
        <svg viewBox="0 0 1440 150" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none">
          <path fill="hsl(120 50% 25%)" d="M0,150 Q200,70 400,110 T800,90 T1200,120 T1440,70 L1440,150 L0,150 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white text-shadow mb-2 lg:mb-4">
              WHY CHOOSE
            </h2>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white text-shadow">
              WASHKING?
            </h2>
          </motion.div>

          {/* Lion mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:w-1/3"
          >
            <motion.img
              src={lionMascot}
              alt="WashKing Lion"
              className="w-48 xl:w-64 h-auto drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-feature p-5 lg:p-6"
            >
              <h3 className="font-display text-washking-brown text-lg lg:text-xl xl:text-2xl mb-3 lg:mb-4">
                {feature.title}
              </h3>
              <p className="text-washking-brown/80 font-body text-sm lg:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 lg:mt-16"
        >
          <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl font-body max-w-3xl mx-auto mb-5 lg:mb-6 px-2">
            Ready to experience the WashKing difference? Choose a package that suits your 
            vehicle's needs or contact us for a customized solution. Your car deserves nothing 
            less than the royal treatment!
          </p>
          <motion.a
            href="#packages"
            onClick={scrollToPackages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-learn-more text-sm lg:text-lg px-5 lg:px-6 py-2.5 lg:py-3"
          >
            Learn more
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
