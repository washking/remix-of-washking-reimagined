import { ClientOnly } from "vite-react-ssg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Send } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormPageHero from "@/components/FormPageHero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import {
  ANY_OPEN_LOCATION_VALUE,
  employmentSchema,
  type EmploymentFormData,
} from "@/lib/employmentForm";
import { submitWebsiteForm } from "@/lib/formSubmission";
import {
  FORM_ERROR_CLASS,
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_TEXTAREA_CLASS,
} from "@/lib/formStyles";
import { OPEN_LOCATIONS, getLocationFormValue } from "@/lib/locations";
import { track } from "@/lib/analytics";

type YesNoValue = "yes" | "no";

type YesNoFieldProps = {
  id: string;
  label: string;
  value?: YesNoValue;
  error?: string;
  onChange: (value: YesNoValue) => void;
};

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? <p id={id} className={FORM_ERROR_CLASS}>{message}</p> : null;

const YesNoField = ({ id, label, value, error, onChange }: YesNoFieldProps) => (
  <fieldset className="min-w-0">
    <legend id={`${id}-label`} className={`${FORM_LABEL_CLASS} mb-3 block md:min-h-12`}>
      {label} <span className="text-red-700" aria-hidden="true">*</span>
    </legend>
    <RadioGroup
      value={value}
      onValueChange={(nextValue) => onChange(nextValue as YesNoValue)}
      required
      aria-labelledby={`${id}-label`}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={Boolean(error)}
      className="grid grid-cols-2 gap-2"
    >
      {(["yes", "no"] as const).map((option) => (
        <div key={option} className="relative">
          <RadioGroupItem id={`${id}-${option}`} value={option} className="peer sr-only" />
          <Label
            htmlFor={`${id}-${option}`}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-body text-sm font-extrabold capitalize text-washking-brown transition-colors hover:border-washking-sky peer-focus-visible:ring-2 peer-focus-visible:ring-washking-sky peer-focus-visible:ring-offset-2 peer-data-[state=checked]:border-washking-sky peer-data-[state=checked]:bg-washking-sky peer-data-[state=checked]:text-white"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
    <FieldError id={`${id}-error`} message={error} />
  </fieldset>
);

const EmploymentPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      preferredLocation: "",
      firstName: "",
      lastName: "",
      message: "",
      city: "",
      state: "",
      postal: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: EmploymentFormData) => {
    try {
      await submitWebsiteForm({
        source: "employment_application",
        subject: "New Wash King Employment Application",
        data,
      });
      toast.success("Application submitted. Thank you for your interest in Wash King.");
      reset();
      track("form_submit", { form: "employment" });
      navigate("/thank-you?source=employment_application");
    } catch (error) {
      console.error("Employment form error:", error);
      toast.error("Your application could not be sent. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Careers at Wash King Car Wash | Now Hiring in NJ"
        description="Apply to join the Wash King Car Wash team at one of our four open New Jersey locations."
        path="/employment"
      />
      <Header />
      <ClientOnly>{() => <SonnerToaster />}</ClientOnly>
      <main id="main-content" tabIndex={-1}>
        <FormPageHero
          eyebrow="Careers"
          title="JOIN THE WASH KING TEAM"
          description="Tell us where you would like to work and a little about yourself."
          icon={BriefcaseBusiness}
        />

        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-5 sm:px-7">
                <h2 className="font-body text-xl font-extrabold uppercase text-washking-brown sm:text-2xl">
                  EMPLOYMENT APPLICATION
                </h2>
                <p className="mt-1 font-body text-sm text-gray-600">
                  All fields are required unless marked optional.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
                <fieldset className="min-w-0 space-y-5">
                  <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                    LOCATION
                  </legend>
                  <div>
                    <Label htmlFor="employment-location" className={FORM_LABEL_CLASS}>
                      Preferred work location <span className="text-red-700" aria-hidden="true">*</span>
                    </Label>
                    <select
                      id="employment-location"
                      required
                      {...register("preferredLocation")}
                      aria-invalid={Boolean(errors.preferredLocation)}
                      aria-describedby={errors.preferredLocation ? "employment-location-error" : undefined}
                      className={`mt-2 w-full ${FORM_SELECT_CLASS}`}
                    >
                      <option value="">Select a location</option>
                      <option value={ANY_OPEN_LOCATION_VALUE}>{ANY_OPEN_LOCATION_VALUE}</option>
                      {OPEN_LOCATIONS.map((location) => (
                        <option key={location.slug} value={getLocationFormValue(location)}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                    <FieldError id="employment-location-error" message={errors.preferredLocation?.message} />
                  </div>
                </fieldset>

                <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                  <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                    APPLICANT DETAILS
                  </legend>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="employment-first-name" className={FORM_LABEL_CLASS}>
                        First name <span className="text-red-700" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="employment-first-name"
                        required
                        maxLength={50}
                        autoComplete="given-name"
                        placeholder="First name"
                        {...register("firstName")}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? "employment-first-name-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-first-name-error" message={errors.firstName?.message} />
                    </div>

                    <div>
                      <Label htmlFor="employment-last-name" className={FORM_LABEL_CLASS}>
                        Last name <span className="text-red-700" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="employment-last-name"
                        required
                        maxLength={50}
                        autoComplete="family-name"
                        placeholder="Last name"
                        {...register("lastName")}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? "employment-last-name-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-last-name-error" message={errors.lastName?.message} />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="employment-email" className={FORM_LABEL_CLASS}>
                        Email <span className="text-red-700" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="employment-email"
                        required
                        maxLength={255}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "employment-email-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-email-error" message={errors.email?.message} />
                    </div>

                    <div>
                      <Label htmlFor="employment-phone" className={FORM_LABEL_CLASS}>
                        Phone <span className="font-normal text-gray-500">(optional)</span>
                      </Label>
                      <Input
                        id="employment-phone"
                        type="tel"
                        maxLength={20}
                        autoComplete="tel"
                        placeholder="(000) 000-0000"
                        {...register("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "employment-phone-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-phone-error" message={errors.phone?.message} />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-[1.5fr_1fr_1fr]">
                    <div>
                      <Label htmlFor="employment-city" className={FORM_LABEL_CLASS}>
                        City <span className="text-red-700" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="employment-city"
                        required
                        maxLength={100}
                        autoComplete="address-level2"
                        placeholder="City"
                        {...register("city")}
                        aria-invalid={Boolean(errors.city)}
                        aria-describedby={errors.city ? "employment-city-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-city-error" message={errors.city?.message} />
                    </div>

                    <div>
                      <Label htmlFor="employment-state" className={FORM_LABEL_CLASS}>
                        State <span className="text-red-700" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="employment-state"
                        required
                        maxLength={50}
                        autoComplete="address-level1"
                        placeholder="NJ"
                        {...register("state")}
                        aria-invalid={Boolean(errors.state)}
                        aria-describedby={errors.state ? "employment-state-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-state-error" message={errors.state?.message} />
                    </div>

                    <div>
                      <Label htmlFor="employment-postal" className={FORM_LABEL_CLASS}>
                        Postal code <span className="font-normal text-gray-500">(optional)</span>
                      </Label>
                      <Input
                        id="employment-postal"
                        maxLength={20}
                        autoComplete="postal-code"
                        placeholder="00000"
                        {...register("postal")}
                        aria-invalid={Boolean(errors.postal)}
                        aria-describedby={errors.postal ? "employment-postal-error" : undefined}
                        className={`mt-2 ${FORM_INPUT_CLASS}`}
                      />
                      <FieldError id="employment-postal-error" message={errors.postal?.message} />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                  <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                    ABOUT YOU
                  </legend>
                  <div>
                    <Label htmlFor="employment-message" className={FORM_LABEL_CLASS}>
                      Tell us about yourself <span className="text-red-700" aria-hidden="true">*</span>
                    </Label>
                    <Textarea
                      id="employment-message"
                      required
                      maxLength={1000}
                      rows={7}
                      placeholder="Share relevant experience, availability, or why you would like to join Wash King."
                      {...register("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "employment-message-error" : undefined}
                      className={`mt-2 ${FORM_TEXTAREA_CLASS}`}
                    />
                    <FieldError id="employment-message-error" message={errors.message?.message} />
                  </div>
                </fieldset>

                <fieldset className="min-w-0 space-y-5 border-t border-gray-200 pt-8">
                  <legend className="mb-5 font-body text-base font-extrabold uppercase text-washking-brown">
                    APPLICATION DETAILS
                  </legend>
                  <div className="grid gap-6 md:grid-cols-3">
                    <YesNoField
                      id="employment-applied-before"
                      label="Applied to Wash King before?"
                      value={watch("appliedBefore")}
                      error={errors.appliedBefore?.message}
                      onChange={(value) => setValue("appliedBefore", value, { shouldValidate: true })}
                    />
                    <YesNoField
                      id="employment-contact-employer"
                      label="May we contact your current employer?"
                      value={watch("canContactEmployer")}
                      error={errors.canContactEmployer?.message}
                      onChange={(value) => setValue("canContactEmployer", value, { shouldValidate: true })}
                    />
                    <YesNoField
                      id="employment-transportation"
                      label="Do you have reliable transportation?"
                      value={watch("hasTransportation")}
                      error={errors.hasTransportation?.message}
                      onChange={(value) => setValue("hasTransportation", value, { shouldValidate: true })}
                    />
                  </div>
                </fieldset>

                <div className="border-t border-gray-200 pt-6">
                  <p className="mb-5 font-body text-sm leading-relaxed text-gray-600">
                    We use this information to review your application. Read our{" "}
                    <Link to="/privacy" className="font-bold text-washking-sky underline underline-offset-4">
                      Privacy Notice
                    </Link>
                    .
                  </p>
                  <button type="submit" className={FORM_SUBMIT_CLASS} disabled={isSubmitting}>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? "Submitting..." : "Submit application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmploymentPage;
