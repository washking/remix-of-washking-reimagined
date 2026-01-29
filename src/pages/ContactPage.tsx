import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-10 lg:py-14">
        {/* Cloud decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 left-[5%]"
          >
            <div className="w-24 lg:w-36 h-12 lg:h-16 bg-white/60 rounded-full" />
            <div className="w-16 lg:w-24 h-8 lg:h-12 bg-white/60 rounded-full -mt-6 ml-8" />
          </motion.div>
          <motion.div 
            animate={{ x: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-6 right-[10%] hidden sm:block"
          >
            <div className="w-32 lg:w-44 h-14 lg:h-20 bg-white/50 rounded-full" />
            <div className="w-20 lg:w-28 h-10 lg:h-14 bg-white/50 rounded-full -mt-8 ml-12" />
          </motion.div>
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
      </section>

      {/* Business Hours Section */}
      <section className="relative bg-washking-green py-10 lg:py-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-6 lg:mb-10"
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
      <section className="relative bg-washking-green py-10 lg:py-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-6 lg:mb-10"
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            className="bg-white border-3 border-washking-brown rounded-[20px] h-13 text-lg font-body shadow-sm"
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
                            className="bg-white border-3 border-washking-brown rounded-[20px] h-13 text-lg font-body shadow-sm"
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
                          className="bg-white border-3 border-washking-brown rounded-[20px] h-13 text-lg font-body shadow-sm"
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
                          rows={5}
                          className="bg-white border-3 border-washking-brown rounded-[20px] text-lg font-body resize-none shadow-sm py-4"
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
                    className="btn-submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)] py-8 lg:py-10">
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12323.823908697876!2d-75.0201754!3d39.4478589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d7dcb67cdec3%3A0x8b9c7b687e7a8f95!2sWash%20King!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WashKing Car Wash Location"
                className="w-full h-[280px] sm:h-[350px] lg:h-[380px]"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center mt-8"
        >
          <p className="font-body text-lg lg:text-xl text-white mb-1">
            Need to contact Customer Support?
          </p>
          <p className="font-body text-lg lg:text-xl text-white mb-1">
            Call or Text Us: <a href="tel:8568807679" className="hover:underline font-bold">(856) 880-7679</a>
          </p>
          <p className="font-body text-lg lg:text-xl text-white">
            <a href="mailto:contact@washking.net" className="hover:underline">contact@washking.net</a>
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
