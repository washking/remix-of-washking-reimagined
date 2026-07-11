import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";
import FoamBubbles from "./FoamBubbles";
import { MEMBERSHIP_PORTAL } from "@/lib/site";

const HeroSection = () => {
  const scrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#packages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] min-h-[360px] sm:min-h-[420px] lg:min-h-[540px]">
        <FoamBubbles variant="hero" density="medium" />

        <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <p className="font-display text-white text-sm sm:text-base lg:text-xl tracking-wider text-shadow-white mb-2">
                NEW JERSEY CAR WASH
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-washking-yellow text-shadow mb-4 lg:mb-8">
                WASHKING
              </h1>

              <div className="space-y-1.5 lg:space-y-3 mb-6 lg:mb-10">
                <p className="font-display text-white text-sm sm:text-base lg:text-xl xl:text-2xl tracking-wider text-shadow-white">FOUR LOCATIONS OPEN.</p>
                <p className="font-display text-white text-sm sm:text-base lg:text-xl xl:text-2xl tracking-wider text-shadow-white">CHERRY HILL COMING SOON.</p>
                <p className="font-display text-white text-sm sm:text-base lg:text-xl xl:text-2xl tracking-wider text-shadow-white">FAMILY-OWNED. FAST. FRIENDLY.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.a 
                  href={MEMBERSHIP_PORTAL}
                  data-analytics="membership_cta"
                  data-analytics-source="homepage_hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-primary text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4"
                >
                  GO UNLIMITED
                </motion.a>
                <motion.a 
                  href="#packages" 
                  onClick={scrollToPackages}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-secondary text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4"
                >
                  VIEW WASHES
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 flex justify-center lg:justify-end"
            >
              <motion.img
                src={lionMascot}
                alt="WashKing Lion Mascot"
                className="w-40 sm:w-56 lg:w-72 xl:w-80 h-auto drop-shadow-2xl rounded-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
