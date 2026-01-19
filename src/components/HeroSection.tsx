import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="bg-washking-yellow h-8" />
      
      <div className="relative bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] min-h-[600px] lg:min-h-[700px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10"
          >
            <div className="w-32 h-16 bg-white/90 rounded-full" />
            <div className="w-24 h-14 bg-white/90 rounded-full -mt-8 ml-8" />
          </motion.div>
          
          <motion.div 
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-32 right-[30%]"
          >
            <div className="w-40 h-20 bg-white/80 rounded-full" />
            <div className="w-28 h-16 bg-white/80 rounded-full -mt-10 ml-12" />
          </motion.div>
          
          <motion.div 
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-20"
          >
            <div className="w-28 h-14 bg-white/60 rounded-full" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="font-display text-5xl lg:text-7xl text-white text-shadow mb-2">WELCOME</h1>
              <h2 className="font-display text-5xl lg:text-7xl mb-8">
                <span className="text-white text-shadow">TO </span>
                <span className="text-washking-yellow text-shadow">WASHKING</span>
              </h2>

              <div className="space-y-2 mb-8">
                <p className="font-display text-white text-lg lg:text-xl tracking-wider text-shadow-white">PASSIONATE ABOUT CAR WASHING.</p>
                <p className="font-display text-white text-lg lg:text-xl tracking-wider text-shadow-white">ROOTED IN FAMILY VALUES.</p>
                <p className="font-display text-white text-lg lg:text-xl tracking-wider text-shadow-white">COMMITTED TO EXCELLENCE.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-hero-primary">GET YOUR FREE WASH</motion.a>
                <motion.a href="#packages" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-hero-secondary">GO UNLIMITED</motion.a>
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
                className="w-64 lg:w-96 h-auto drop-shadow-2xl rounded-2xl"
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
