import { ClientOnly } from "vite-react-ssg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardCheck, Send, Star } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormPageHero from "@/components/FormPageHero";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { submitWebsiteForm } from "@/lib/formSubmission";
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_TEXTAREA_CLASS,
} from "@/lib/formStyles";
import {
  OPEN_LOCATIONS,
  getLocationFormLabel,
  getLocationFormValue,
} from "@/lib/locations";
import { track } from "@/lib/analytics";

const surveyLocationValues = new Set(OPEN_LOCATIONS.map(getLocationFormValue));
const ratingValues = new Set(["1", "2", "3", "4", "5"]);

const surveySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  location: z.string().refine((value) => surveyLocationValues.has(value), "Select the location you visited"),
  rating: z.string().refine((value) => ratingValues.has(value), "Select an overall rating"),
  feedback: z.string().trim().min(1, "Feedback is required").max(2000),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

const ratings = [
  { value: "1", label: "Poor" },
  { value: "2", label: "Fair" },
  { value: "3", label: "Good" },
  { value: "4", label: "Great" },
  { value: "5", label: "Excellent" },
] as const;

const CustomerSurveyPage = () => {
  const navigate = useNavigate();
  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      rating: "",
      feedback: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: SurveyFormValues) => {
    try {
      await submitWebsiteForm({
        source: "customer_survey",
        subject: "New Wash King Customer Survey",
        data,
      });
      toast.success("Thank you. Your feedback was submitted.");
      form.reset();
      track("form_submit", { form: "survey" });
      navigate("/thank-you?source=customer_survey");
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error("Your feedback could not be sent. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Customer Survey | Wash King Car Wash"
        description="Share feedback about your visit to one of Wash King Car Wash's four open New Jersey locations."
        path="/customer-survey"
        noIndex
      />
      <Header />
      <ClientOnly>{() => <SonnerToaster />}</ClientOnly>
      <main id="main-content" tabIndex={-1}>
        <FormPageHero
          eyebrow="Customer feedback"
          title="Tell us about your visit"
          description="Your feedback helps the Wash King team improve the next visit."
          icon={ClipboardCheck}
        />

        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-5 sm:px-7">
                <h2 className="font-display text-xl text-washking-brown sm:text-2xl">
                  Share your feedback
                </h2>
                <p className="mt-1 font-body text-sm text-gray-600">
                  Required fields are marked with an asterisk.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
                  <fieldset className="min-w-0 space-y-6">
                    <legend className="font-body text-base font-bold text-washking-brown">
                      Visit details
                    </legend>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={FORM_LABEL_CLASS}>
                            Location visited <span className="text-red-700" aria-hidden="true">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} required>
                            <FormControl>
                              <SelectTrigger className={FORM_SELECT_CLASS}>
                                <SelectValue placeholder="Select a location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {OPEN_LOCATIONS.map((location) => (
                                <SelectItem
                                  key={location.slug}
                                  value={getLocationFormValue(location)}
                                  className="font-body text-base"
                                >
                                  {getLocationFormLabel(location)}
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
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={FORM_LABEL_CLASS}>
                            Overall rating <span className="text-red-700" aria-hidden="true">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              required
                              aria-label="Overall rating"
                              className="grid grid-cols-5 gap-2"
                            >
                              {ratings.map((rating) => (
                                <div key={rating.value} className="relative">
                                  <RadioGroupItem
                                    id={`survey-rating-${rating.value}`}
                                    value={rating.value}
                                    aria-label={`${rating.value} - ${rating.label}`}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={`survey-rating-${rating.value}`}
                                    className="flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-1 py-2 text-center font-body text-washking-brown transition-colors hover:border-washking-sky peer-focus-visible:ring-2 peer-focus-visible:ring-washking-sky peer-focus-visible:ring-offset-2 peer-data-[state=checked]:border-washking-sky peer-data-[state=checked]:bg-washking-sky peer-data-[state=checked]:text-white"
                                  >
                                    <span className="font-body text-lg font-extrabold">{rating.value}</span>
                                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                                    <span className="hidden text-xs font-bold sm:block">{rating.label}</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-700" />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                    <legend className="font-body text-base font-bold text-washking-brown">
                      Your details
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
                  </fieldset>

                  <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                    <legend className="font-body text-base font-bold text-washking-brown">
                      Feedback
                    </legend>
                    <FormField
                      control={form.control}
                      name="feedback"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={FORM_LABEL_CLASS}>
                            Tell us about your visit <span className="text-red-700" aria-hidden="true">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea required maxLength={2000} placeholder="What went well? What could we do better? Include any details that would help us understand your visit." rows={7} className={FORM_TEXTAREA_CLASS} {...field} />
                          </FormControl>
                          <FormMessage className="text-red-700" />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="mb-5 font-body text-sm leading-relaxed text-gray-600">
                      We use this information to review your feedback. Read our{" "}
                      <Link to="/privacy" className="font-bold text-washking-sky underline underline-offset-4">
                        Privacy Notice
                      </Link>
                      .
                    </p>
                    <button type="submit" className={FORM_SUBMIT_CLASS} disabled={isSubmitting}>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {isSubmitting ? "Submitting..." : "Submit feedback"}
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerSurveyPage;
