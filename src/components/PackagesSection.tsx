import { motion } from "framer-motion";
import carWashIllustration from "@/assets/car-wash-illustration.png";
import FoamBubbles from "./FoamBubbles";

const benefits = [
  "Visit daily for one monthly low price!",
  "Wash as often as you like, costing less than 2 washes.",
  "Hassle-free entry with License Plate Recognition.",
  "Automatic Monthly Recharge on your anniversary.",
  "No contracts — cancel anytime!",
];

const PackagesSection = () => {
  return (
    <section 
      id="packages" 
      className="relative py-14 lg:py-20 overflow-hidden"
    >
      {/* Sky blue background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_60%)] to-[hsl(200_85%_55%)]" />
      
      {/* Foam bubbles decoration */}
      <FoamBubbles variant="section" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-shadow mb-4 lg:mb-6">
              UNLIMITED WASH
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-washking-yellow text-shadow mb-6 lg:mb-8">
              PACKAGES
            </h3>
            
            <p className="font-body text-white text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-10 text-shadow-white leading-relaxed">
              Visit once a day, every day for one monthly low price!
            </p>

            {/* Benefits list */}
            <div className="space-y-4 lg:space-y-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div 
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-display text-lg lg:text-xl flex-shrink-0"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.7) 70%)",
                      boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.1)",
                      color: "hsl(var(--washking-brown))",
                    }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-white font-body text-base sm:text-lg lg:text-xl">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Car illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-1/2 flex justify-center"
          >
            <motion.img
              src={carWashIllustration}
              alt="Car being washed with bubbles"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
