import { motion } from "framer-motion";
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
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Navigation } from "lucide-react";
import { track } from "@/lib/analytics";
import LocationsMap from "@/components/LocationsMap";
import {
  LOCATIONS,
  OPEN_LOCATIONS,
  getDirectionsUrl,
  getLocationFormLabel,
  getLocationFormValue,
} from "@/lib/locations";

const contactLocationValues = new Set(LOCATIONS.map(getLocationFormValue));

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  location: z.string().refine((value) => contactLocationValues.has(value), "Please select a location"),
  plateNumber: z.string().max(20, "Plate number must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

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
      <div className="w-6 h-6 rounded-full bg-white/35 backdrop-blur-sm absolute top-10 -left-2" />
      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm absolute top-2 left-16" />
    </motion.div>
  </div>
);

const ContactPage = () => {
  const navigate = useNavigate();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      plateNumber: "",
      message: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const webchilyReq = fetch("https://tabbjztcwbohcsvofyvv.supabase.co/functions/v1/receive-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "38bd3ca3-cc18-44b6-b7fe-4c8c0ba0e51d",
          source: "contact_form",
          ...data,
        }),
      });
      const formspreeReq = fetch("https://formspree.io/f/mrejrbgy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "New WashKing Contact Enquiry", source: "contact_form", ...data }),
      });
      const [webchilyRes, formspreeRes] = await Promise.allSettled([webchilyReq, formspreeReq]);
      const webchilyOk = webchilyRes.status === "fulfilled" && webchilyRes.value.ok;
      const formspreeOk = formspreeRes.status === "fulfilled" && formspreeRes.value.ok;
      if (!webchilyOk && !formspreeOk) throw new Error("Both submissions failed");
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
      track("form_submit", { form: "contact" });
      navigate("/thank-you?source=contact_form");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-washking-sky">
      <Seo
        title="Contact WashKing Car Wash | New Jersey Locations"
        description="Contact WashKing Car Wash about memberships, wash packages or any of our New Jersey locations. Four locations are open and Cherry Hill is coming soon."
        path="/contact"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-14 lg:py-18">
        <FoamBubbles variant="hero" density="medium" />
        <BubbleCluster className="top-10 left-[5%]" />
        <BubbleCluster className="top-16 right-[8%]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white text-center text-shadow"
          >
            CONTACT US
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-xl lg:text-2xl text-white/90 text-center mt-4 max-w-2xl mx-auto"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)] py-14 lg:py-18 overflow-hidden">
        <FoamBubbles variant="section" density="medium" />
        <BubbleCluster className="top-16 left-[5%]" />
        <BubbleCluster className="bottom-20 right-[10%]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-center mb-10 text-shadow"
          >
            SEND US A MESSAGE
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-body text-lg">
                          Phone <span className="text-red-300">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(000) 000-0000"
                            type="tel"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        Email Address <span className="text-red-300">*</span>
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
                          {LOCATIONS.map((location) => (
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
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        Plate Number <span className="text-white/60 text-sm">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. ABC-1234"
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-body text-lg">
                        Message <span className="text-red-300">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
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
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Locations Map Section */}
      <section className="relative overflow-hidden bg-washking-green py-14 lg:py-18">
        <FoamBubbles variant="section" density="low" />
        <BubbleCluster className="top-10 left-[8%]" />
        <BubbleCluster className="bottom-16 right-[12%]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-center mb-4 text-shadow"
          >
            FIND US
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-white/90 text-lg lg:text-xl text-center mb-10 max-w-2xl mx-auto"
          >
            {OPEN_LOCATIONS.length} locations are open across New Jersey. Cherry Hill is coming soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30"
          >
            <LocationsMap />
          </motion.div>

          <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((location) => {
              const directionsUrl = getDirectionsUrl(location);
              const comingSoon = location.status === "coming-soon";

              return (
                <article
                  key={location.slug}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-white flex flex-col gap-4"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-washking-yellow shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-lg">{location.name}</h3>
                      <p className="font-body text-sm text-white/85">
                        {location.address ? `${location.address}, ` : ""}
                        {location.city}
                      </p>
                      {comingSoon && (
                        <p className="font-display text-xs text-washking-yellow mt-1">COMING SOON</p>
                      )}
                    </div>
                  </div>

                  <div className={`grid ${directionsUrl ? "grid-cols-2" : "grid-cols-1"} gap-2 mt-auto`}>
                    <Link
                      to={`/location/${location.slug}`}
                      className="font-display text-sm bg-white text-washking-brown rounded-full px-3 py-2 text-center hover:bg-washking-cream transition-colors"
                    >
                      {comingSoon ? "Opening Details" : "View Location"}
                    </Link>
                    {directionsUrl && (
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-sm border-2 border-white rounded-full px-3 py-2 text-center flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
                        aria-label={`Get directions to WashKing ${location.name}`}
                      >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        Directions
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
