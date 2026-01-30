import { motion } from "framer-motion";
import { Star } from "lucide-react";
import woodenSign from "@/assets/wooden-sign.png";

const testimonials = [
  {
    text: "Love the welcoming atmosphere here. The staff always make me feel valued.",
    author: "Marcus L",
  },
  {
    text: "I appreciate the friendly faces every time I visit. Such a convenient location too!",
    author: "Megan P",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-14 lg:py-20 overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_35%_50%)] to-[hsl(120_40%_40%)]" />
      
      {/* Simplified foliage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 100" className="absolute top-0 left-0 w-full h-auto" preserveAspectRatio="none">
          <path fill="hsl(120 45% 30%)" d="M0,0 Q400,80 800,40 T1440,60 L1440,0 L0,0 Z" opacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Wooden sign header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10 lg:mb-14"
        >
          <div className="relative">
            <img 
              src={woodenSign} 
              alt="Testimonial" 
              className="w-56 sm:w-64 lg:w-80 h-auto"
            />
            <h2 className="absolute inset-0 flex items-center justify-center font-display text-white text-3xl sm:text-4xl lg:text-5xl text-shadow pt-3 lg:pt-4">
              Testimonial
            </h2>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-washking-green rounded-3xl p-6 lg:p-8 text-white border-2 border-white/30 shadow-xl"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 lg:mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 lg:w-7 lg:h-7 fill-washking-yellow text-washking-yellow" 
                  />
                ))}
              </div>
              
              <p className="text-white font-body text-base sm:text-lg lg:text-xl mb-4 lg:mb-5 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <p className="text-white font-body font-bold text-base lg:text-lg">
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
