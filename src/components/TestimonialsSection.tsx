import { Star } from "lucide-react";
import woodenSign from "@/assets/wooden-sign.png";
import woodenSignAvif from "@/assets/wooden-sign.avif";
import OptimizedImage from "@/components/OptimizedImage";

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
        <div
          className="flex justify-center mb-8 lg:mb-14"
        >
          <div className="relative">
            <OptimizedImage
              avifSrc={woodenSignAvif}
              src={woodenSign} 
              alt=""
              aria-hidden="true"
              width={1264}
              height={848}
              loading="lazy"
              decoding="async"
              className="w-44 sm:w-56 lg:w-80 h-auto"
            />
            <h2 className="absolute inset-0 flex items-center justify-center font-display text-white text-2xl sm:text-3xl lg:text-5xl text-shadow pt-2 lg:pt-4">
              Customer Stories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-10 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-washking-green rounded-2xl lg:rounded-3xl p-5 lg:p-8 text-white border-2 border-white/30 shadow-xl"
            >
              <div className="flex gap-0.5 mb-3 lg:mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 lg:w-7 lg:h-7 fill-washking-yellow text-washking-yellow" 
                    aria-hidden="true"
                  />
                ))}
              </div>
              
              <p className="text-white font-body text-sm sm:text-base lg:text-xl mb-3 lg:mb-5 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <p className="text-white font-body font-bold text-sm sm:text-base lg:text-lg">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
