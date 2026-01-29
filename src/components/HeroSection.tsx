import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";

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
      <div className="bg-washking-yellow h-6 lg:h-8" />
      
      <div className="relative bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] min-h-[500px] sm:min-h-[550px] lg:min-h-[650px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 lg:top-20 left-5 lg:left-10"
          >
            <div className="w-20 lg:w-32 h-10 lg:h-16 bg-white/90 rounded-full" />
            <div className="w-16 lg:w-24 h-8 lg:h-14 bg-white/90 rounded-full -mt-5 lg:-mt-8 ml-5 lg:ml-8" />
          </motion.div>
          
          <motion.div 
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 lg:top-32 right-[20%] lg:right-[30%]"
          >
            <div className="w-24 lg:w-40 h-12 lg:h-20 bg-white/80 rounded-full" />
            <div className="w-18 lg:w-28 h-10 lg:h-16 bg-white/80 rounded-full -mt-6 lg:-mt-10 ml-8 lg:ml-12" />
          </motion.div>
          
          <motion.div 
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-16 lg:bottom-20 right-10 lg:right-20 hidden sm:block"
          >
            <div className="w-20 lg:w-28 h-10 lg:h-14 bg-white/60 rounded-full" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-10 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white text-shadow mb-1 lg:mb-2">WELCOME</h1>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 lg:mb-8">
                <span className="text-white text-shadow">TO </span>
                <span className="text-washking-yellow text-shadow">WASHKING</span>
              </h2>

              <div className="space-y-1.5 lg:space-y-2 mb-6 lg:mb-8">
                <p className="font-display text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-wider text-shadow-white">PASSIONATE ABOUT CAR WASHING.</p>
                <p className="font-display text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-wider text-shadow-white">ROOTED IN FAMILY VALUES.</p>
                <p className="font-display text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-wider text-shadow-white">COMMITTED TO EXCELLENCE.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <motion.a 
                  href="https://customerportal.nxtwash.com/washkingcarwash"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-primary text-sm lg:text-lg px-6 lg:px-8 py-2.5 lg:py-3"
                >
                  GET YOUR FREE WASH
                </motion.a>
                <motion.a 
                  href="#packages" 
                  onClick={scrollToPackages}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="btn-hero-secondary text-sm lg:text-lg px-6 lg:px-8 py-2.5 lg:py-3"
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
                className="w-48 sm:w-56 lg:w-80 xl:w-96 h-auto drop-shadow-2xl rounded-2xl"
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
