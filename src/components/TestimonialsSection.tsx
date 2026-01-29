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
    <section id="testimonials" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_35%_50%)] to-[hsl(120_40%_40%)]" />
      
      {/* Illustrated foliage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side trees */}
        <div className="absolute left-0 top-0 w-24 lg:w-48 h-full">
          <div className="absolute top-0 left-0 w-20 lg:w-40 h-32 lg:h-60 bg-[hsl(120_45%_25%)] rounded-br-full" />
          <div className="absolute top-12 lg:top-20 left-0 w-16 lg:w-32 h-24 lg:h-48 bg-[hsl(120_50%_22%)] rounded-br-full" />
          <div className="absolute bottom-0 left-0 w-18 lg:w-36 h-36 lg:h-72 bg-[hsl(120_45%_28%)] rounded-tr-full" />
        </div>
        
        {/* Right side trees */}
        <div className="absolute right-0 top-0 w-32 lg:w-64 h-full">
          <div className="absolute top-0 right-0 w-28 lg:w-56 h-40 lg:h-80 bg-[hsl(120_45%_25%)] rounded-bl-full" />
          <div className="absolute top-24 lg:top-40 right-0 w-20 lg:w-40 h-32 lg:h-60 bg-[hsl(120_50%_22%)] rounded-bl-full" />
          <div className="absolute bottom-12 lg:bottom-20 right-0 w-24 lg:w-48 h-32 lg:h-64 bg-[hsl(120_45%_28%)] rounded-tl-full" />
          <div className="absolute bottom-0 right-10 lg:right-20 w-4 lg:w-8 h-20 lg:h-40 bg-[hsl(25_40%_35%)]" />
        </div>
        
        {/* Background mountains/hills */}
        <svg viewBox="0 0 1440 400" className="absolute bottom-0 left-0 w-full h-auto opacity-40" preserveAspectRatio="none">
          <path fill="hsl(120 45% 30%)" d="M0,400 L200,150 L400,300 L600,100 L800,250 L1000,50 L1200,200 L1440,100 L1440,400 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Wooden sign header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 lg:mb-12"
        >
          <div className="relative">
            <img 
              src={woodenSign} 
              alt="Testimonial" 
              className="w-48 sm:w-56 lg:w-80 h-auto"
            />
            <h2 className="absolute inset-0 flex items-center justify-center font-display text-white text-2xl sm:text-3xl lg:text-4xl text-shadow pt-3 lg:pt-4">
              Testimonial
            </h2>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-testimonial p-5 lg:p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 lg:gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 lg:w-6 lg:h-6 fill-washking-yellow text-washking-yellow" 
                  />
                ))}
              </div>
              
              <p className="text-white font-body text-sm sm:text-base lg:text-lg mb-3 lg:mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              
              <p className="text-white font-body font-semibold text-sm lg:text-base">
                - {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
