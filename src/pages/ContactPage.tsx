import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/washking-logo.png";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().max(20, "Phone must be less than 20 characters").optional(),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-washking-sky">
      <Header />
      
      {/* Hero Section with Forest/Hills Background */}
      <section className="relative overflow-hidden">
        {/* Sky background */}
        <div className="bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-12 lg:py-16">
          {/* Trees on left */}
          <div className="absolute top-0 left-0 w-24 md:w-32 lg:w-48 h-full">
            <svg viewBox="0 0 150 400" className="w-full h-full" preserveAspectRatio="xMinYMin slice">
              <ellipse cx="30" cy="80" rx="60" ry="70" fill="hsl(120 45% 30%)" />
              <ellipse cx="80" cy="60" rx="70" ry="65" fill="hsl(120 50% 35%)" />
              <ellipse cx="50" cy="120" rx="55" ry="50" fill="hsl(120 45% 32%)" />
              <rect x="40" y="120" width="20" height="80" fill="hsl(25 55% 30%)" />
            </svg>
          </div>
          
          {/* Trees on right */}
          <div className="absolute top-0 right-0 w-24 md:w-32 lg:w-48 h-full">
            <svg viewBox="0 0 150 400" className="w-full h-full" preserveAspectRatio="xMaxYMin slice">
              <ellipse cx="120" cy="80" rx="60" ry="70" fill="hsl(120 45% 30%)" />
              <ellipse cx="70" cy="60" rx="70" ry="65" fill="hsl(120 50% 35%)" />
              <ellipse cx="100" cy="120" rx="55" ry="50" fill="hsl(120 45% 32%)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-center text-shadow"
            >
              CONTACT US
            </motion.h1>
          </div>
        </div>
        
        {/* Wave transition to brown hills */}
        <svg viewBox="0 0 1440 120" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 45% 50%)" d="M0,60 Q360,20 720,60 T1440,40 L1440,120 L0,120 Z" />
          <path fill="hsl(25 50% 40%)" d="M0,80 Q400,40 800,70 T1440,60 L1440,120 L0,120 Z" />
          <path fill="hsl(120 35% 40%)" d="M0,100 Q360,60 720,90 T1440,80 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* Business Hours Section */}
      <section className="relative bg-washking-green py-12 lg:py-16 overflow-hidden">
        {/* Decorative foliage on left */}
        <div className="hidden md:block absolute left-0 top-0 w-32 lg:w-48 h-full opacity-60">
          <svg viewBox="0 0 150 400" className="w-full h-full" preserveAspectRatio="xMinYMin slice">
            <ellipse cx="20" cy="100" rx="80" ry="90" fill="hsl(120 45% 30%)" />
            <ellipse cx="40" cy="200" rx="70" ry="80" fill="hsl(120 50% 32%)" />
            <ellipse cx="30" cy="300" rx="60" ry="70" fill="hsl(120 45% 28%)" />
          </svg>
        </div>
        
        {/* Decorative foliage on right */}
        <div className="hidden md:block absolute right-0 top-0 w-32 lg:w-48 h-full opacity-60">
          <svg viewBox="0 0 150 400" className="w-full h-full" preserveAspectRatio="xMaxYMin slice">
            <ellipse cx="130" cy="100" rx="80" ry="90" fill="hsl(120 45% 30%)" />
            <ellipse cx="110" cy="200" rx="70" ry="80" fill="hsl(120 50% 32%)" />
            <ellipse cx="120" cy="300" rx="60" ry="70" fill="hsl(120 45% 28%)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-8 lg:mb-12"
          >
            BUSINESS HOURS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Logo Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-washking-sky-light/30 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center"
            >
              <img src={logo} alt="WashKing Logo" className="w-48 lg:w-64 h-auto" />
            </motion.div>
            
            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-washking-sky-light/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center"
            >
              <p className="font-display text-xl lg:text-2xl text-washking-green mb-4">
                We're open 7 days a week!
              </p>
              <div className="space-y-2 font-body text-lg lg:text-xl text-washking-green font-bold">
                <p>Monday to Saturday</p>
                <p className="text-xl lg:text-2xl">9:00 AM to 6:00 PM</p>
                <p className="mt-4">Sunday</p>
                <p className="text-xl lg:text-2xl">9:00 AM to 5:00 PM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative bg-washking-green py-12 lg:py-16 overflow-hidden">
        {/* Decorative foliage on left */}
        <div className="hidden lg:block absolute left-0 top-0 w-48 h-full opacity-60">
          <svg viewBox="0 0 150 500" className="w-full h-full" preserveAspectRatio="xMinYMin slice">
            <ellipse cx="10" cy="150" rx="90" ry="100" fill="hsl(120 45% 30%)" />
            <ellipse cx="30" cy="300" rx="80" ry="90" fill="hsl(120 50% 32%)" />
            <ellipse cx="20" cy="450" rx="70" ry="80" fill="hsl(120 45% 28%)" />
          </svg>
        </div>
        
        {/* Decorative foliage on right */}
        <div className="hidden lg:block absolute right-0 top-0 w-48 h-full opacity-60">
          <svg viewBox="0 0 150 500" className="w-full h-full" preserveAspectRatio="xMaxYMin slice">
            <ellipse cx="140" cy="150" rx="90" ry="100" fill="hsl(120 45% 30%)" />
            <ellipse cx="120" cy="300" rx="80" ry="90" fill="hsl(120 50% 32%)" />
            <ellipse cx="130" cy="450" rx="70" ry="80" fill="hsl(120 45% 28%)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-8 lg:mb-12"
          >
            CONTACT US
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-body text-base">
                          Name <span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            className="bg-white border-4 border-washking-brown rounded-2xl h-14 text-lg font-body"
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
                        <FormLabel className="text-white font-body text-base">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone"
                            type="tel"
                            className="bg-white border-4 border-washking-brown rounded-2xl h-14 text-lg font-body"
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
                      <FormLabel className="text-white font-body text-base">
                        Email Address <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          type="email"
                          className="bg-white border-4 border-washking-brown rounded-2xl h-14 text-lg font-body"
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
                      <FormLabel className="text-white font-body text-base">
                        Message <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          rows={6}
                          className="bg-white border-4 border-washking-brown rounded-2xl text-lg font-body resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    className="bg-washking-cream text-washking-green font-display text-xl px-12 py-6 rounded-full border-2 border-washking-green hover:scale-105 transition-transform h-auto"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative overflow-hidden">
        {/* Sky background with trees */}
        <div className="bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)] py-8 lg:py-12">
          {/* Trees on left */}
          <div className="absolute top-0 left-0 w-16 md:w-24 lg:w-32 h-full">
            <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="xMinYMin slice">
              <ellipse cx="20" cy="60" rx="50" ry="55" fill="hsl(120 45% 30%)" />
              <ellipse cx="40" cy="100" rx="45" ry="40" fill="hsl(120 50% 35%)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.8847742459287!2d-75.02277382399073!3d39.44644697161008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d4e3c3c3c3c3%3A0x89c6d4e3c3c3c3c3!2s2611%20S%20Main%20Rd%2C%20Vineland%2C%20NJ%2008360!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WashKing Car Wash Location"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Contact Info with sky background */}
        <div className="bg-[hsl(200_85%_60%)] py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 text-center"
          >
            <p className="font-body text-xl lg:text-2xl text-white mb-2">
              Need to contact Customer Support?
            </p>
            <p className="font-body text-xl lg:text-2xl text-white mb-2">
              Call or Text Us: <a href="tel:8568807679" className="hover:underline font-bold">(856) 880-7679</a>
            </p>
            <p className="font-body text-xl lg:text-2xl text-white">
              <a href="mailto:contact@washking.net" className="hover:underline">contact@washking.net</a>
            </p>
          </motion.div>
        </div>
        
        {/* Wave transition to footer */}
        <svg viewBox="0 0 1440 80" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 50% 42%)" d="M0,40 Q360,10 720,30 T1440,20 L1440,80 L0,80 Z" />
          <path fill="hsl(25 55% 35%)" d="M0,50 Q300,20 600,40 T1200,30 T1440,45 L1440,80 L0,80 Z" />
        </svg>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
