import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import lionMascot from "@/assets/lion-mascot.png";
import FoamBubbles from "./FoamBubbles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I sign up for WashKing's Unlimited Wash Plans?",
    answer: "You can easily sign up for our Unlimited Wash Plans either online through our website, at our onsite pay station, or by speaking with a WashKing team member at our location.",
  },
  {
    question: "When will I be billed for my WashKing Unlimited Wash Plan?",
    answer: "Your payment card will be automatically charged on the same date each month, ensuring hassle-free billing.",
  },
  {
    question: "What should I do if I get a new license plate or a new car?",
    answer: "Updating your information is simple. You can do it online through your member portal on our website or by speaking with a WashKing team member at our location.",
  },
  {
    question: "Can I use my WashKing Unlimited Wash Plan on more than one vehicle?",
    answer: "Our Unlimited Wash Plans are designed for one vehicle per plan. However, we offer a family plan option for multiple vehicles. Contact us to learn more about this convenient option!",
  },
  {
    question: "How do I cancel my WashKing Unlimited Wash Plan?",
    answer: "Canceling your Unlimited Wash Plan is easy and convenient. You can do it online by logging into your membership portal on our website, by calling our location, or by visiting us in person and notifying a WashKing team member.",
  },
  {
    question: "What happens when I cancel my WashKing Unlimited Wash Plan?",
    answer: "If you choose to cancel your Unlimited Wash Plan, your membership will end on the day it is canceled, even if there are remaining days in the month. We strive to ensure transparency and flexibility in our cancellation process.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-14 lg:py-20 overflow-hidden">
      {/* Sky blue background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_60%)] to-[hsl(200_85%_55%)]" />
      
      {/* Foam bubbles decoration */}
      <FoamBubbles variant="section" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white text-shadow">
            ANY QUESTIONS?
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left - Lion mascot and helper text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 text-center lg:text-left hidden lg:block"
          >
            <motion.img
              src={lionMascot}
              alt="WashKing Lion"
              className="w-48 lg:w-64 xl:w-72 h-auto mx-auto lg:mx-0 drop-shadow-2xl mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-white font-body text-base lg:text-lg xl:text-xl leading-relaxed">
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
            <Accordion type="single" collapsible className="space-y-3 lg:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/30 pb-3 lg:pb-4"
                >
                  <AccordionTrigger 
                    hideChevron 
                    className="text-left font-display text-white text-base sm:text-lg lg:text-xl xl:text-2xl tracking-wide hover:no-underline group py-2"
                  >
                    <span className="flex items-center gap-3 lg:gap-4">
                      <Plus className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0 transition-transform group-data-[state=open]:rotate-45" />
                      {faq.toUpperCase()}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 font-body text-base lg:text-lg pl-8 lg:pl-10 leading-relaxed">
                    Contact us for more information about our {faq.toLowerCase().replace("?", "")}.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* Mobile helper text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white font-body text-base text-center mt-10 lg:hidden max-w-md mx-auto leading-relaxed"
        >
          Have more questions? Feel free to reach out to us! We're here to assist 
          you with all your car care needs.
        </motion.p>
      </div>
    </section>
  );
};

export default FAQSection;
