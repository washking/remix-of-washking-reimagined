import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";
import FoamBubbles from "./FoamBubbles";

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
      <div className="relative bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
        {/* Foam bubbles decoration */}
        <FoamBubbles variant="hero" density="medium" />

        <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white text-shadow mb-1 lg:mb-2">WELCOME</h1>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 lg:mb-8">
                <span className="text-white text-shadow">TO </span>
                <span className="text-washking-yellow text-shadow">WASHKING</span>
              </h2>

              <div className="space-y-2 lg:space-y-3 mb-8 lg:mb-10">
                <p className="font-display text-white text-base sm:text-lg lg:text-xl xl:text-2xl tracking-wider text-shadow-white">PASSIONATE ABOUT CAR WASHING.</p>
                <p className="font-display text-white text-base sm:text-lg lg:text-xl xl:text-2xl tracking-wider text-shadow-white">ROOTED IN FAMILY VALUES.</p>
                <p className="font-display text-white text-base sm:text-lg lg:text-xl xl:text-2xl tracking-wider text-shadow-white">COMMITTED TO EXCELLENCE.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a 
                  href="https://customerportal.nxtwash.com/washkingcarwash"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-primary text-base lg:text-xl px-8 lg:px-10 py-3 lg:py-4"
                >
                  GET YOUR FREE WASH
                </motion.a>
                <motion.a 
                  href="#packages" 
                  onClick={scrollToPackages}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-secondary text-base lg:text-xl px-8 lg:px-10 py-3 lg:py-4"
                >
                  GO UNLIMITED
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
                className="w-56 sm:w-64 lg:w-80 xl:w-96 h-auto drop-shadow-2xl rounded-2xl"
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
