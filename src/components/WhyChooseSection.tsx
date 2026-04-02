import { motion } from "framer-motion";
import lionMascot from "@/assets/lion-mascot.png";

const features = [
  {
    title: "EXCEPTIONAL SERVICE",
    description: "Our trained professionals provide top-tier care and attention to detail for every vehicle.",
  },
  {
    title: "CUTTING-EDGE TECHNOLOGY",
    description: "We use state-of-the-art equipment and eco-friendly practices for superior results.",
  },
  {
    title: "CONVENIENCE",
    description: "Open year round, 7 days a week for your convenience.",
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
    <section id="why-choose" className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_40%_40%)] to-[hsl(120_45%_30%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white text-shadow mb-1">
              WHY CHOOSE
            </h2>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-washking-yellow text-shadow">
              WASHKING?
            </h2>
          </motion.div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8 lg:mt-14">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-5 lg:p-8 text-center shadow-xl border-b-4 border-washking-brown"
            >
              <h3 className="font-display text-washking-brown text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-3">
                {feature.title}
              </h3>
              <p className="text-washking-brown/80 font-body text-sm sm:text-base lg:text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 lg:mt-14"
        >
          <p className="text-white text-sm sm:text-base lg:text-xl xl:text-2xl font-body max-w-3xl mx-auto mb-5 lg:mb-8 leading-relaxed">
            Ready to experience the WashKing difference? Choose a package that suits your 
            vehicle's needs. Your car deserves nothing less than the royal treatment!
          </p>
          <motion.a
            href="#packages"
            onClick={scrollToPackages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-learn-more text-base lg:text-xl px-6 lg:px-10 py-3 lg:py-4"
          >
            Learn more
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
