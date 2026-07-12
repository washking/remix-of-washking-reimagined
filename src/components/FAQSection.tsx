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
    question: "How often can I use an Unlimited Wash Plan?",
    answer: "Unlimited members can wash their registered vehicle once a day for one monthly price.",
  },
  {
    question: "How do I join the Unlimited Wash Club?",
    answer: "Join through the online membership portal, at an onsite pay station, or with help from a Wash King team member.",
  },
  {
    question: "When will I be billed for my Wash King Unlimited Wash Plan?",
    answer: "Your payment card is charged automatically on the same date each month.",
  },
  {
    question: "What should I do if I get a new license plate or a new car?",
    answer: "Update your vehicle in the member portal or ask a Wash King team member for help at an open location.",
  },
  {
    question: "Can I use my Wash King Unlimited Wash Plan on more than one vehicle?",
    answer: "Each Unlimited Wash Plan is connected to one vehicle and its license plate. Contact us if you need help choosing coverage for another vehicle.",
  },
  {
    question: "How do I cancel my Wash King Unlimited Wash Plan?",
    answer: "Cancel through the membership portal or visit an open Wash King location and speak with a team member. Contact support if you need help finding your account.",
  },
  {
    question: "What happens when I cancel my Wash King Unlimited Wash Plan?",
    answer: "Your membership ends on the day it is canceled, even if days remain in the current billing month.",
  },
];

const supportCopy = "Need account help? Use the phone number connected to your membership so our team can find it quickly.";

const FAQSection = () => {
  return (
    <section id="faq" className="scroll-mt-24 bg-washking-cream py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-9 text-center lg:mb-12">
          <p className="section-eyebrow mb-2">Unlimited membership</p>
          <h2 className="section-title">
            Unlimited Wash Club FAQs
          </h2>
          <p className="section-copy mx-auto mt-3 max-w-2xl">
            The essentials about joining, billing, vehicles, and cancellation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16 max-w-6xl mx-auto">
          <div
            className="lg:w-1/3 text-center lg:text-left hidden lg:block"
          >
            <OptimizedImage
              avifSrc={lionMascotAvif}
              src={lionMascot}
              alt="Wash King lion mascot"
              width={1132}
              height={1920}
              loading="lazy"
              decoding="async"
              className="mx-auto mb-6 h-auto w-32 lg:mx-0 lg:w-40"
            />
            <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
              {supportCopy}
            </p>
          </div>

          <div
            className="lg:w-2/3 w-full"
          >
            <Accordion type="single" collapsible className="space-y-2.5">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index} 
                  value={`item-${index}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 shadow-sm sm:px-5"
                >
                  <AccordionTrigger 
                    hideChevron 
                    className="group py-4 text-left font-body text-sm font-bold text-washking-brown hover:no-underline sm:text-base"
                  >
                    <span className="flex items-center gap-2 lg:gap-4">
                      <Plus className="h-4 w-4 flex-shrink-0 text-washking-sky transition-transform group-data-[state=open]:rotate-45 lg:h-5 lg:w-5" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6 pr-2 font-body text-sm leading-relaxed text-gray-700 sm:text-base lg:pl-9">
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
                className="btn-secondary px-5 text-center"
              >
                Manage Membership
              </a>
              <Link
                to="/contact"
                data-analytics="contact_open"
                data-analytics-source="faq"
                className="btn-outline px-5 text-center"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <p
          className="mx-auto mt-6 max-w-md text-center font-body text-sm leading-relaxed text-gray-700 lg:hidden"
        >
          {supportCopy}
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
