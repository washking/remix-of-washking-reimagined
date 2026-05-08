import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import logo from "@/assets/washking-logo.png";

const locationOptions = [
  "WashKing Vineland Main Rd",
  "WashKing Vineland Dante",
  "WashKing Somerset",
  "WashKing Landisville",
  "WashKing Cherry Hill",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  location: z.string().min(1, "Please select a location"),
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
      const formspreeReq = fetch("https://formspree.io/f/xbdwzrdw", {
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
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-washking-sky">
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

      {/* Business Hours Section */}
      <section className="relative bg-washking-green py-14 lg:py-18 overflow-hidden">
        <FoamBubbles variant="section" density="low" />
        <BubbleCluster className="top-10 right-[10%]" />
        <BubbleCluster className="bottom-10 left-[8%]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-center mb-10 text-shadow"
          >
            BUSINESS HOURS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/15 backdrop-blur-sm rounded-3xl p-10 flex items-center justify-center"
            >
              <img src={logo} alt="WashKing Logo" className="w-52 lg:w-72 h-auto" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/15 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center justify-center text-center"
            >
              <p className="font-display text-2xl lg:text-3xl text-white mb-6">
                We're open 7 days a week!
              </p>
              <div className="space-y-3 font-body text-lg lg:text-xl text-white">
                <p className="font-semibold">Monday to Saturday</p>
                <p className="text-2xl lg:text-3xl font-bold">9:00 AM to 6:00 PM</p>
                <p className="font-semibold mt-4">Sunday</p>
                <p className="text-2xl lg:text-3xl font-bold">9:00 AM to 5:00 PM</p>
              </div>
            </motion.div>
          </div>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body">
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locationOptions.map((loc) => (
                            <SelectItem key={loc} value={loc} className="font-body text-lg">
                              {loc}
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
                  <button type="submit" className="btn-cloud btn-submit">
                    Send Message
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
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
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-center mb-10 text-shadow"
          >
            FIND US
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12323.823908697876!2d-75.0201754!3d39.4478589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d7dcb67cdec3%3A0x8b9c7b687e7a8f95!2sWash%20King!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WashKing Car Wash Location"
                className="w-full h-[300px] sm:h-[380px] lg:h-[420px]"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-4 text-center mt-10"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto">
            <p className="font-display text-2xl lg:text-3xl text-white mb-4">
              Need Customer Support?
            </p>
            <p className="font-body text-xl lg:text-2xl text-white">
              Email: <a href="mailto:contact@washking.net" className="hover:underline font-bold">contact@washking.net</a>
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
