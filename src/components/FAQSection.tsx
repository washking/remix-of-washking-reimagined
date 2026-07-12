import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
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
    answer: "Each Unlimited Wash Plan is connected to one vehicle and its license plate. Contact us if you need help choosing coverage for another vehicle.",
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
    <section id="faq" className="bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-6 lg:mb-14"
        >
          <h2 className="font-display text-3xl text-washking-brown sm:text-4xl lg:text-5xl">
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
              className="mx-auto mb-6 h-auto w-32 lg:mx-0 lg:w-40"
            />
            <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
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
                  className="border-b border-gray-300 pb-2 lg:pb-4"
                >
                  <AccordionTrigger 
                    hideChevron 
                    className="group py-3 text-left font-body text-sm font-extrabold text-washking-brown hover:no-underline sm:text-base lg:text-lg"
                  >
                    <span className="flex items-center gap-2 lg:gap-4">
                      <Plus className="h-4 w-4 flex-shrink-0 text-washking-sky transition-transform group-data-[state=open]:rotate-45 lg:h-5 lg:w-5" />
                      {faq.question.toUpperCase()}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6 font-body text-sm leading-relaxed text-gray-700 sm:text-base lg:pl-9">
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
                className="btn-cloud border border-washking-brown bg-washking-yellow px-5 py-3 text-center text-sm text-washking-brown"
              >
                Manage Membership
              </a>
              <Link
                to="/contact"
                data-analytics="contact_open"
                data-analytics-source="faq"
                className="btn-cloud border border-washking-brown bg-white px-5 py-3 text-center text-sm text-washking-brown"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <p
          className="mx-auto mt-6 max-w-md text-center font-body text-sm leading-relaxed text-gray-700 lg:hidden"
        >
          Have more questions? Feel free to reach out to us! We're here to assist 
          you with all your car care needs.
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
