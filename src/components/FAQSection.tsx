import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import lionMascot from "@/assets/lion-mascot.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  "How do I sign up for WashKing's Unlimited Wash Plans?",
  "When will I be billed for my WashKing Unlimited Wash Plan?",
  "What should I do if I get a new license plate or a new car?",
  "Can I use my WashKing Unlimited Wash Plan on more than one vehicle?",
  "How do I cancel my WashKing Unlimited Wash Plan?",
  "What happens when I cancel my WashKing Unlimited Wash Plan?",
];

const FAQSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Sky blue background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_60%)] to-[hsl(200_85%_55%)]" />
      
      {/* Cloud decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%]"
        >
          <div className="w-40 h-20 bg-white/70 rounded-full" />
          <div className="w-28 h-14 bg-white/70 rounded-full -mt-8 ml-12" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-[15%]"
        >
          <div className="w-48 h-24 bg-white/60 rounded-full" />
          <div className="w-32 h-16 bg-white/60 rounded-full -mt-10 ml-16" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 left-[30%]"
        >
          <div className="w-36 h-18 bg-white/50 rounded-full" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl lg:text-6xl text-white text-shadow">
            ANY QUESTIONS?
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">
          {/* Left - Lion mascot and helper text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 text-center lg:text-left"
          >
            <motion.img
              src={lionMascot}
              alt="WashKing Lion"
              className="w-48 lg:w-64 h-auto mx-auto lg:mx-0 drop-shadow-2xl mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-white font-body text-lg">
              Have more questions? Feel free to reach out to us! We're here to assist 
              you with all your car care needs.
            </p>
          </motion.div>

          {/* Right - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3 w-full"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/30 pb-3"
                >
                  <AccordionTrigger 
                    hideChevron 
                    className="text-left font-display text-white text-lg lg:text-xl tracking-wide hover:no-underline group"
                  >
                    <span className="flex items-center gap-3">
                      <Plus className="w-5 h-5 flex-shrink-0 transition-transform group-data-[state=open]:rotate-45" />
                      {faq.toUpperCase()}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 font-body text-base pl-8">
                    Contact us for more information about our {faq.toLowerCase().replace("?", "")}.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
