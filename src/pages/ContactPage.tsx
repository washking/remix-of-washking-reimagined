import { useEffect } from "react";
import { ClientOnly } from "vite-react-ssg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ExternalLink,
  Mail,
  MapPinned,
  MessageSquareText,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormPageHero from "@/components/FormPageHero";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import {
  CONTACT_TOPICS,
  GENERAL_LOCATION_VALUE,
  contactSchema,
  getContactFormPrefill,
  isMembershipContactTopic,
  type ContactFormValues,
} from "@/lib/contactForm";
import { submitWebsiteForm } from "@/lib/formSubmission";
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_TEXTAREA_CLASS,
} from "@/lib/formStyles";
import { LOCATIONS, getLocationFormValue } from "@/lib/locations";
import { track } from "@/lib/analytics";
import { CONTACT_EMAIL, MEMBERSHIP_PORTAL } from "@/lib/site";

const ContactPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefill = getContactFormPrefill(
    searchParams.get("location"),
    searchParams.get("topic"),
  );
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      topic: "",
      location: "",
      plateNumber: "",
      message: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const selectedTopic = form.watch("topic");
  const showPlateNumber = isMembershipContactTopic(selectedTopic);
  const { setValue } = form;

  useEffect(() => {
    if (prefill.location) setValue("location", prefill.location);
    if (prefill.topic) setValue("topic", prefill.topic);
  }, [prefill.location, prefill.topic, setValue]);

  useEffect(() => {
    if (!showPlateNumber) setValue("plateNumber", "");
  }, [setValue, showPlateNumber]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitWebsiteForm({
        source: "contact_form",
        subject: "New WashKing Contact Enquiry",
        data: {
          ...data,
          plateNumber: isMembershipContactTopic(data.topic)
            ? data.plateNumber || undefined
            : undefined,
        },
      });
      toast.success("Message sent. Thank you for contacting WashKing.");
      form.reset();
      track("form_submit", { form: "contact" });
      navigate("/thank-you?source=contact_form");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Your message could not be sent. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Contact WashKing Car Wash | New Jersey Locations"
        description="Contact WashKing Car Wash about memberships, wash packages or any of our New Jersey locations. Four locations are open and Cherry Hill is coming soon."
        path="/contact"
      />
      <Header />
      <ClientOnly>{() => <SonnerToaster />}</ClientOnly>
      <main id="main-content" tabIndex={-1}>
        <FormPageHero
          eyebrow="Customer support"
          title="CONTACT WASHKING"
          description="Choose a topic and location so your request reaches the right team."
          icon={MessageSquareText}
        />

        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-5 sm:px-7">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <h2 className="font-body text-xl font-extrabold uppercase text-washking-brown sm:text-2xl">
                        SEND A MESSAGE
                      </h2>
                      <p className="mt-1 font-body text-sm text-gray-600">
                        All fields are required unless marked optional.
                      </p>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
                    <fieldset className="min-w-0 space-y-5">
                      <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                        REQUEST DETAILS
                      </legend>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={FORM_LABEL_CLASS}>
                                Topic <span className="text-red-700" aria-hidden="true">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value} required>
                                <FormControl>
                                  <SelectTrigger className={FORM_SELECT_CLASS}>
                                    <SelectValue placeholder="Select a topic" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {CONTACT_TOPICS.map((topic) => (
                                    <SelectItem key={topic.value} value={topic.value} className="font-body text-base">
                                      {topic.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={FORM_LABEL_CLASS}>
                                Location <span className="text-red-700" aria-hidden="true">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value} required>
                                <FormControl>
                                  <SelectTrigger className={FORM_SELECT_CLASS}>
                                    <SelectValue placeholder="Select a location" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={GENERAL_LOCATION_VALUE} className="font-body text-base">
                                    {GENERAL_LOCATION_VALUE}
                                  </SelectItem>
                                  {LOCATIONS.map((location) => (
                                    <SelectItem
                                      key={location.slug}
                                      value={getLocationFormValue(location)}
                                      className="font-body text-base"
                                    >
                                      {location.name}{location.status === "coming-soon" ? " - Coming Soon" : ""}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </fieldset>

                    <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                      <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                        CONTACT DETAILS
                      </legend>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={FORM_LABEL_CLASS}>
                                Name <span className="text-red-700" aria-hidden="true">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input required maxLength={100} autoComplete="name" placeholder="Your name" className={FORM_INPUT_CLASS} {...field} />
                              </FormControl>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={FORM_LABEL_CLASS}>
                                Email <span className="text-red-700" aria-hidden="true">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input required maxLength={255} type="email" autoComplete="email" placeholder="you@example.com" className={FORM_INPUT_CLASS} {...field} />
                              </FormControl>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={FORM_LABEL_CLASS}>
                              Phone <span className="text-red-700" aria-hidden="true">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input required maxLength={20} type="tel" autoComplete="tel" placeholder="(000) 000-0000" className={FORM_INPUT_CLASS} {...field} />
                            </FormControl>
                            <FormDescription className="font-body text-sm text-gray-600">
                              For membership requests, use the phone number connected to the account.
                            </FormDescription>
                            <FormMessage className="text-red-700" />
                          </FormItem>
                        )}
                      />

                      {showPlateNumber && (
                        <FormField
                          control={form.control}
                          name="plateNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={FORM_LABEL_CLASS}>
                                Membership vehicle plate <span className="font-normal text-gray-500">(optional)</span>
                              </FormLabel>
                              <FormControl>
                                <Input maxLength={20} autoComplete="off" placeholder="e.g. ABC-1234" className={FORM_INPUT_CLASS} {...field} />
                              </FormControl>
                              <FormDescription className="font-body text-sm text-gray-600">
                                Include only the plate tied to the membership you need help with.
                              </FormDescription>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                      )}
                    </fieldset>

                    <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                      <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                        MESSAGE
                      </legend>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={FORM_LABEL_CLASS}>
                              How can we help? <span className="text-red-700" aria-hidden="true">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea required maxLength={1000} placeholder="Share the details of your request." rows={6} className={FORM_TEXTAREA_CLASS} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                          </FormItem>
                        )}
                      />
                    </fieldset>

                    <div className="border-t border-gray-200 pt-6">
                      <p className="mb-5 font-body text-sm leading-relaxed text-gray-600">
                        We use this information to respond to your request. Read our{" "}
                        <Link to="/privacy" className="font-bold text-washking-sky underline underline-offset-4">
                          Privacy Notice
                        </Link>
                        .
                      </p>
                      <button type="submit" className={FORM_SUBMIT_CLASS} disabled={isSubmitting}>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {isSubmitting ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </form>
                </Form>
              </div>

              <aside className="space-y-7 lg:sticky lg:top-6" aria-label="Contact options">
                <section>
                  <h2 className="font-body text-base font-extrabold uppercase text-washking-brown">MEMBERSHIP ACCOUNT</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">
                    Update a vehicle, review your account, or manage an existing plan in the member portal.
                  </p>
                  <a
                    href={MEMBERSHIP_PORTAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="membership_cta"
                    data-analytics-source="contact_sidebar"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-washking-yellow px-4 py-2.5 font-body text-sm font-extrabold text-washking-brown hover:bg-washking-gold"
                  >
                    Manage membership
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </section>

                <section className="border-t border-gray-300 pt-7">
                  <h2 className="font-body text-base font-extrabold uppercase text-washking-brown">VISIT A LOCATION</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">
                    Compare services, hours, plans, and directions for all open locations.
                  </p>
                  <Link
                    to="/#locations"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-extrabold text-washking-sky underline-offset-4 hover:underline"
                  >
                    <MapPinned className="h-4 w-4" aria-hidden="true" />
                    View locations
                  </Link>
                </section>

                <section className="border-t border-gray-300 pt-7">
                  <h2 className="font-body text-base font-extrabold uppercase text-washking-brown">EMAIL</h2>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 inline-flex items-center gap-2 break-all font-body text-sm font-extrabold text-washking-sky underline-offset-4 hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {CONTACT_EMAIL}
                  </a>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
