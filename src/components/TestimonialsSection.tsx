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
    <section id="testimonials" className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_35%_50%)] to-[hsl(120_40%_40%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 lg:mb-14"
        >
          <div className="relative">
            <img 
              src={woodenSign} 
              alt="Testimonial" 
              className="w-44 sm:w-56 lg:w-80 h-auto"
            />
            <h2 className="absolute inset-0 flex items-center justify-center font-display text-white text-2xl sm:text-3xl lg:text-5xl text-shadow pt-2 lg:pt-4">
              Testimonial
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-10 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-washking-green rounded-2xl lg:rounded-3xl p-5 lg:p-8 text-white border-2 border-white/30 shadow-xl"
            >
              <div className="flex gap-0.5 mb-3 lg:mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 lg:w-7 lg:h-7 fill-washking-yellow text-washking-yellow" 
                  />
                ))}
              </div>
              
              <p className="text-white font-body text-sm sm:text-base lg:text-xl mb-3 lg:mb-5 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <p className="text-white font-body font-bold text-sm sm:text-base lg:text-lg">
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
