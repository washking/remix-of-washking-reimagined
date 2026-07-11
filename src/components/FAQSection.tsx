import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import FoamBubbles from "./FoamBubbles";
import OptimizedImage from "@/components/OptimizedImage";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
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
    answer: "You can cancel online through the membership portal or visit an open WashKing location and speak with a team member. You can also send us a message through the contact page if you need help.",
  },
  {
    question: "What happens when I cancel my WashKing Unlimited Wash Plan?",
    answer: "If you choose to cancel your Unlimited Wash Plan, your membership will end on the day it is canceled, even if there are remaining days in the month. We strive to ensure transparency and flexibility in our cancellation process.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(202_68%_40%)] to-[hsl(202_72%_34%)]" />
      <FoamBubbles variant="section" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="text-center mb-6 lg:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white text-shadow">
            ANY QUESTIONS?
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16 max-w-6xl mx-auto">
          <div
            className="lg:w-1/3 text-center lg:text-left hidden lg:block"
          >
            <OptimizedImage
              avifSrc={lionMascotAvif}
              src={lionMascot}
              alt="WashKing Lion"
              width={1132}
              height={1920}
              loading="lazy"
              decoding="async"
              className="w-48 lg:w-64 xl:w-72 h-auto mx-auto lg:mx-0 drop-shadow-2xl mb-6"
            />
            <p className="text-white font-body text-base lg:text-lg xl:text-xl leading-relaxed">
              Have more questions? Feel free to reach out to us! We're here to assist 
              you with all your car care needs.
            </p>
          </div>

          <div
            className="lg:w-2/3 w-full"
          >
            <Accordion type="single" collapsible className="space-y-2 lg:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/30 pb-2 lg:pb-4"
                >
                  <AccordionTrigger 
                    hideChevron 
                    className="text-left font-display text-white text-sm sm:text-base lg:text-xl xl:text-2xl tracking-wide hover:no-underline group py-2"
                  >
                    <span className="flex items-center gap-2 lg:gap-4">
                      <Plus className="w-4 h-4 lg:w-6 lg:h-6 flex-shrink-0 transition-transform group-data-[state=open]:rotate-45" />
                      {faq.question.toUpperCase()}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 font-body text-sm sm:text-base lg:text-lg pl-6 lg:pl-10 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={MEMBERSHIP_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="membership_cta"
                data-analytics-source="faq"
                className="btn-cloud border-2 border-washking-brown bg-washking-yellow px-5 py-3 text-center font-display text-sm text-washking-brown"
              >
                Manage Membership
              </a>
              <Link
                to="/contact"
                data-analytics="contact_open"
                data-analytics-source="faq"
                className="btn-cloud border-2 border-washking-brown bg-white px-5 py-3 text-center font-display text-sm text-washking-brown"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <p
          className="text-white font-body text-sm text-center mt-6 lg:hidden max-w-md mx-auto leading-relaxed"
        >
          Have more questions? Feel free to reach out to us! We're here to assist 
          you with all your car care needs.
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
