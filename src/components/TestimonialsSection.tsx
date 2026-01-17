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
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_35%_50%)] to-[hsl(120_40%_40%)]" />
      
      {/* Illustrated foliage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side trees */}
        <div className="absolute left-0 top-0 w-48 h-full">
          <div className="absolute top-0 left-0 w-40 h-60 bg-[hsl(120_45%_25%)] rounded-br-full" />
          <div className="absolute top-20 left-0 w-32 h-48 bg-[hsl(120_50%_22%)] rounded-br-full" />
          <div className="absolute bottom-0 left-0 w-36 h-72 bg-[hsl(120_45%_28%)] rounded-tr-full" />
        </div>
        
        {/* Right side trees */}
        <div className="absolute right-0 top-0 w-64 h-full">
          <div className="absolute top-0 right-0 w-56 h-80 bg-[hsl(120_45%_25%)] rounded-bl-full" />
          <div className="absolute top-40 right-0 w-40 h-60 bg-[hsl(120_50%_22%)] rounded-bl-full" />
          <div className="absolute bottom-20 right-0 w-48 h-64 bg-[hsl(120_45%_28%)] rounded-tl-full" />
          <div className="absolute bottom-0 right-20 w-8 h-40 bg-[hsl(25_40%_35%)]" /> {/* Tree trunk */}
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
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <img 
              src={woodenSign} 
              alt="Testimonial" 
              className="w-64 lg:w-80 h-auto"
            />
            <h2 className="absolute inset-0 flex items-center justify-center font-display text-white text-3xl lg:text-4xl text-shadow pt-4">
              Testimonial
            </h2>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-testimonial"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 fill-washking-yellow text-washking-yellow" 
                  />
                ))}
              </div>
              
              <p className="text-white font-body text-lg mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              
              <p className="text-white font-body font-semibold">
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
