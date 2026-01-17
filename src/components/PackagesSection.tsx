import { motion } from "framer-motion";
import carWashIllustration from "@/assets/car-wash-illustration.png";

const benefits = [
  "Visit daily for one monthly low price!",
  "Wash as often as you like, costing less than 2 washes.",
  "Hassle-free entry with License Plate Recognition technology.",
  "Automatic Monthly Recharge on your membership anniversary.",
  "No contracts, cancel anytime (membership ends on the cancellation day).",
];

const PackagesSection = () => {
  return (
    <section 
      id="packages" 
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Sky blue background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_60%)] to-[hsl(200_85%_55%)]" />
      
      {/* Cloud decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[5%]"
        >
          <div className="w-48 h-24 bg-white/80 rounded-full" />
          <div className="w-36 h-20 bg-white/80 rounded-full -mt-12 ml-16" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-[10%]"
        >
          <div className="w-64 h-32 bg-white/70 rounded-full" />
          <div className="w-48 h-24 bg-white/70 rounded-full -mt-16 ml-20" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[15%]"
        >
          <div className="w-56 h-28 bg-white/60 rounded-full" />
          <div className="w-40 h-20 bg-white/60 rounded-full -mt-10 ml-24" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 right-[5%]"
        >
          <div className="w-40 h-20 bg-white/50 rounded-full" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="font-display text-4xl lg:text-5xl text-white text-shadow mb-4">
              Our Unlimited Wash Packages
            </h2>
            
            <p className="font-display text-white text-lg tracking-wider mb-10 text-shadow-white">
              THE WASHKING UNLIMITED PLANS ALLOWS YOU TO VISIT ONCE A DAY, EVERY DAY 
              FOR ONE MONTHLY LOW PRICE!!
            </p>

            {/* Numbered benefits with connected line */}
            <div className="space-y-6 relative">
              {/* Connecting dashed line */}
              <div className="absolute left-6 top-12 bottom-12 w-0.5 border-l-2 border-dashed border-washking-yellow/60" />
              
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 relative z-10"
                >
                  <div className="yellow-badge flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-white font-body text-lg pt-2">
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
              className="w-full max-w-lg h-auto drop-shadow-2xl"
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
