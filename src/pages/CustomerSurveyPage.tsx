import { MotionConfig, motion } from "framer-motion";
import { ClientOnly } from "vite-react-ssg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { track } from "@/lib/analytics";
import {
  OPEN_LOCATIONS,
  getLocationFormLabel,
  getLocationFormValue,
} from "@/lib/locations";

const surveyLocationValues = new Set(OPEN_LOCATIONS.map(getLocationFormValue));

const surveySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  location: z.string().refine((value) => surveyLocationValues.has(value), "Please select a location"),
  rating: z.string().min(1, "Please select a rating"),
  feedback: z.string().trim().min(1, "Feedback is required").max(2000),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

const BubbleCluster = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <motion.div
      animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm absolute -top-4 -left-4" />
      <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm absolute top-6 left-8" />
      <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm absolute -top-2 left-12" />
    </motion.div>
  </div>
);

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
      const webchilyReq = fetch("https://tabbjztcwbohcsvofyvv.supabase.co/functions/v1/receive-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "38bd3ca3-cc18-44b6-b7fe-4c8c0ba0e51d",
          source: "customer_survey",
          ...data,
        }),
      });
      const formspreeReq = fetch("https://formspree.io/f/mrejrbgy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "New WashKing Customer Survey", source: "customer_survey", ...data }),
      });
      const [webchilyRes, formspreeRes] = await Promise.allSettled([webchilyReq, formspreeReq]);
      const webchilyOk = webchilyRes.status === "fulfilled" && webchilyRes.value.ok;
      const formspreeOk = formspreeRes.status === "fulfilled" && formspreeRes.value.ok;
      if (!webchilyOk && !formspreeOk) throw new Error("Both submissions failed");
      toast.success("Thank you for your feedback!");
      form.reset();
      track("form_submit", { form: "survey" });
      navigate("/thank-you?source=customer_survey");
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-washking-sky">
      <Seo
        title="Customer Survey | WashKing Car Wash"
        description="Share feedback about your visit to one of WashKing Car Wash's four open New Jersey locations."
        path="/customer-survey"
        noIndex
      />
      <Header />
      <ClientOnly>{() => <SonnerToaster />}</ClientOnly>
      <main id="main-content" tabIndex={-1}>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(202_68%_40%)] to-[hsl(202_72%_34%)] py-14 lg:py-18">
        <FoamBubbles variant="hero" density="medium" />
        <BubbleCluster className="top-10 left-[5%]" />
        <BubbleCluster className="top-16 right-[8%]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white text-center text-shadow"
          >
            CUSTOMER SURVEY
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-xl lg:text-2xl text-white/90 text-center mt-4 max-w-2xl mx-auto"
          >
            We value your feedback — help us improve!
          </motion.p>
        </div>
      </section>

      {/* Survey Form */}
      <section className="relative bg-gradient-to-b from-[hsl(202_72%_34%)] to-[hsl(202_68%_40%)] py-14 lg:py-18 overflow-hidden">
        <FoamBubbles variant="section" density="medium" />
        <BubbleCluster className="top-16 left-[5%]" />
        <BubbleCluster className="bottom-20 right-[10%]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-body text-lg">
                          Name <span className="text-red-300">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-body text-lg">
                          Email <span className="text-red-300">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        Location <span className="text-red-300">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body">
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OPEN_LOCATIONS.map((location) => (
                            <SelectItem
                              key={location.slug}
                              value={getLocationFormValue(location)}
                              className="font-body text-lg"
                            >
                              {getLocationFormLabel(location)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        How would you rate your experience? <span className="text-red-300">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body">
                            <SelectValue placeholder="Select a rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5" className="font-body text-lg">5 - Excellent</SelectItem>
                          <SelectItem value="4" className="font-body text-lg">4 - Great</SelectItem>
                          <SelectItem value="3" className="font-body text-lg">3 - Good</SelectItem>
                          <SelectItem value="2" className="font-body text-lg">2 - Fair</SelectItem>
                          <SelectItem value="1" className="font-body text-lg">1 - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        Your Feedback <span className="text-red-300">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your experience..."
                          rows={5}
                          className="bg-white border-3 border-washking-brown rounded-[20px] text-lg font-body resize-none py-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="btn-cloud btn-submit disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default CustomerSurveyPage;
