import { Database, Send, ShieldCheck, UserRoundCheck } from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import { CONTACT_EMAIL, MEMBERSHIP_PORTAL } from "@/lib/site";

const PrivacyPage = () => (
  <div className="min-h-screen overflow-x-hidden bg-white">
    <Seo
      title="Privacy Notice | WashKing Car Wash"
      description="Learn what information WashKing's website collects through forms and website analytics, how it is used, and which services receive it."
      path="/privacy"
    />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(202_68%_40%)] to-[hsl(202_72%_34%)] py-14 lg:py-18">
        <FoamBubbles variant="hero" density="low" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-3 font-body text-sm font-extrabold uppercase text-washking-yellow">
            Last updated July 11, 2026
          </p>
          <h1 className="font-display text-5xl text-white text-shadow sm:text-6xl lg:text-7xl">
            PRIVACY NOTICE
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-white/90 sm:text-xl">
            A plain-language summary of information handled through washking.net.
          </p>
        </div>
      </section>

      <section className="border-b border-washking-brown/15 bg-washking-yellow py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl items-start gap-4">
            <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-washking-brown" aria-hidden="true" />
            <p className="font-body text-base font-bold leading-relaxed text-washking-brown sm:text-lg">
              WashKing receives information you choose to send through website forms. The site also records limited usage signals tied to random browser identifiers so the team can understand which pages and actions are useful.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-18">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl divide-y divide-washking-brown/15">
            <section className="grid gap-5 pb-10 md:grid-cols-[56px_1fr]" aria-labelledby="information-you-submit">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-washking-sky text-white">
                <Send className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="information-you-submit" className="font-display text-3xl text-washking-brown">
                  Information you submit
                </h2>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-gray-700">
                  <p>
                    The contact form asks for your name, email, phone number, topic, location, and message. For membership or billing questions, you may also provide the vehicle plate connected to the membership.
                  </p>
                  <p>
                    The customer survey asks for your name, email, location, rating, and feedback. The employment form asks for contact and location details, a message about yourself, and answers about prior applications, employer contact, and transportation.
                  </p>
                  <p className="font-bold text-washking-brown">
                    Do not enter payment card details in a free-text website form.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 py-10 md:grid-cols-[56px_1fr]" aria-labelledby="website-analytics">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-washking-green text-white">
                <Database className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="website-analytics" className="font-display text-3xl text-washking-brown">
                  Website usage analytics
                </h2>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-gray-700">
                  <p>
                    The site creates random visitor and session identifiers in browser local and session storage. Analytics events may include the page path, location page viewed, referring page, device category, viewport size, campaign tags, and interactions such as selecting a location, requesting directions, or opening the membership portal.
                  </p>
                  <p>
                    These analytics events do not include the name, email, phone, plate, message, survey feedback, or employment details typed into forms.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 py-10 md:grid-cols-[56px_1fr]" aria-labelledby="how-information-is-used">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-washking-yellow text-washking-brown">
                <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="how-information-is-used" className="font-display text-3xl text-washking-brown">
                  How information is used
                </h2>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-gray-700">
                  <p>
                    Form information is used to respond to customer questions, review feedback, assist with membership requests, and evaluate employment applications. Website analytics are used to understand website performance and improve customer journeys.
                  </p>
                  <p>
                    Contact, survey, and employment submissions are delivered through Formspree and a Webchily-managed Supabase function. Website analytics are delivered to a separate WashKing Supabase endpoint. A form is sent to both delivery services so a temporary provider outage is less likely to lose the message.
                  </p>
                  <p>
                    Membership purchases and account management open the external NXTWash customer portal. Information entered there is handled by that service under its own terms and privacy practices. You can open the{" "}
                    <a
                      href={MEMBERSHIP_PORTAL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-washking-sky underline underline-offset-4"
                    >
                      membership portal
                    </a>
                    {" "}directly.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 pt-10 md:grid-cols-[56px_1fr]" aria-labelledby="choices-and-contact">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-washking-brown text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="choices-and-contact" className="font-display text-3xl text-washking-brown">
                  Your choices and contact
                </h2>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-gray-700">
                  <p>
                    You can clear the site's random identifiers by clearing local and session storage in your browser. You can also use the site without submitting a contact, survey, or employment form.
                  </p>
                  <p>
                    To ask about information WashKing received through a website form, or to request a correction or deletion, email{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("WashKing website privacy request")}`}
                      className="font-bold text-washking-sky underline underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;
