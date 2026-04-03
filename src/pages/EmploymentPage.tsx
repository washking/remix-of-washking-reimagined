import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import lionMascot from "@/assets/lion-mascot.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const employmentSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  city: z.string().trim().min(1, "City is required").max(100, "City must be less than 100 characters"),
  state: z.string().trim().min(1, "State is required").max(50, "State must be less than 50 characters"),
  postal: z.string().trim().max(20, "Postal code must be less than 20 characters").optional(),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  appliedBefore: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  canContactEmployer: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  hasTransportation: z.enum(["yes", "no"], { required_error: "Please select an option" }),
});

type EmploymentFormData = z.infer<typeof employmentSchema>;

// Decorative bubble cluster component
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

const EmploymentPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
  });

  const onSubmit = async (data: EmploymentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://tabbjztcwbohcsvofyvv.supabase.co/functions/v1/receive-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "38bd3ca3-cc18-44b6-b7fe-4c8c0ba0e51d",
          source: "employment_application",
          ...data,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon!",
      });
      reset();
    } catch (error) {
      console.error("Employment form error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* Hero Section - Wash Foam Aesthetic */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-16 lg:py-20">
        <FoamBubbles variant="hero" density="medium" />
        
        {/* Additional bubble clusters */}
        <BubbleCluster className="top-10 left-[5%]" />
        <BubbleCluster className="top-16 right-[8%]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white text-center text-shadow"
          >
            CAREERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-xl lg:text-2xl text-white/90 text-center mt-4 max-w-2xl mx-auto"
          >
            Join the WashKing family and grow with us
          </motion.p>
        </div>
      </section>

      {/* We're Hiring Section */}
      <section className="relative py-14 lg:py-20 overflow-hidden bg-washking-green">
        <FoamBubbles variant="section" density="low" />
        <BubbleCluster className="bottom-10 right-[15%]" />
        <BubbleCluster className="top-20 left-[10%]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Lion mascot */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3"
            >
              <motion.img
                src={lionMascot}
                alt="WashKing Lion"
                className="w-64 lg:w-80 h-auto drop-shadow-2xl mx-auto"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Hiring info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/3"
            >
              <h2 className="font-display text-4xl lg:text-6xl text-white text-shadow mb-8">
                WE'RE HIRING!
              </h2>
              <ul className="space-y-5 text-white font-body text-lg lg:text-xl">
                <li className="flex items-start gap-4">
                  <span className="w-3 h-3 rounded-full bg-white/80 mt-2 flex-shrink-0" />
                  <span>We are always looking for great people to join our team!</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-3 h-3 rounded-full bg-white/80 mt-2 flex-shrink-0" />
                  <span>Fill out the form below to apply to be apart of our WashKing Family!</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-3 h-3 rounded-full bg-white/80 mt-2 flex-shrink-0" />
                  <span>Always accepting applications for Full-Time and Part-Time applicants!</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative py-14 lg:py-20 overflow-hidden bg-gradient-to-b from-[hsl(200_85%_55%)] to-[hsl(200_85%_60%)]">
        <FoamBubbles variant="section" density="medium" />
        <BubbleCluster className="top-10 left-[5%]" />
        <BubbleCluster className="bottom-20 right-[8%]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl lg:text-6xl text-white text-shadow mb-4">
              APPLICATION FOR EMPLOYMENT
            </h2>
            <p className="text-white/90 font-body text-lg lg:text-xl max-w-2xl mx-auto">
              Please complete all required fields below to join our team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl lg:text-3xl text-white mb-2">
                  PERSONAL INFORMATION
                </h3>
                <p className="text-white/80 font-body text-lg">Enter your personal information below</p>
              </div>

              {/* First Name & Last Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">
                    First Name <span className="text-red-300">*</span>
                  </Label>
                  <Input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">
                    Last Name <span className="text-red-300">*</span>
                  </Label>
                  <Input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <Label className="text-white font-body text-lg mb-2 block">
                  Message <span className="text-red-300">*</span>
                </Label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us about yourself..."
                  rows={5}
                  className="bg-white border-3 border-washking-brown rounded-[20px] text-lg font-body resize-none py-4"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* City & State */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">
                    City <span className="text-red-300">*</span>
                  </Label>
                  <Input
                    {...register("city")}
                    placeholder="City"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.city && (
                    <p className="text-red-300 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">
                    State <span className="text-red-300">*</span>
                  </Label>
                  <Input
                    {...register("state")}
                    placeholder="State"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.state && (
                    <p className="text-red-300 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Postal */}
              <div>
                <Label className="text-white font-body text-lg mb-2 block">Postal Code</Label>
                <Input
                  {...register("postal")}
                  placeholder="Postal Code"
                  className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                />
                {errors.postal && (
                  <p className="text-red-300 text-sm mt-1">{errors.postal.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">
                    Email <span className="text-red-300">*</span>
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body text-lg mb-2 block">Phone Number</Label>
                  <Input
                    {...register("phone")}
                    placeholder="(000) 000-0000"
                    className="bg-white border-3 border-washking-brown rounded-[20px] h-14 text-lg font-body"
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Radio Questions */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Applied Before */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <Label className="text-white font-body text-lg mb-4 block">
                    Have you ever applied at WashKing before?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("appliedBefore", value as "yes" | "no")}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="applied-yes" className="border-white text-white" />
                      <Label htmlFor="applied-yes" className="text-white font-body text-lg cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="applied-no" className="border-white text-white" />
                      <Label htmlFor="applied-no" className="text-white font-body text-lg cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.appliedBefore && (
                    <p className="text-red-300 text-sm mt-2">{errors.appliedBefore.message}</p>
                  )}
                </div>

                {/* Can Contact Employer */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <Label className="text-white font-body text-lg mb-4 block">
                    Can present employer be contacted?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("canContactEmployer", value as "yes" | "no")}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="contact-yes" className="border-white text-white" />
                      <Label htmlFor="contact-yes" className="text-white font-body text-lg cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="contact-no" className="border-white text-white" />
                      <Label htmlFor="contact-no" className="text-white font-body text-lg cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.canContactEmployer && (
                    <p className="text-red-300 text-sm mt-2">{errors.canContactEmployer.message}</p>
                  )}
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white/10 rounded-2xl p-6">
                <Label className="text-white font-body text-lg mb-4 block">
                  Do you have reliable transportation?
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("hasTransportation", value as "yes" | "no")}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="transport-yes" className="border-white text-white" />
                    <Label htmlFor="transport-yes" className="text-white font-body text-lg cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="transport-no" className="border-white text-white" />
                    <Label htmlFor="transport-no" className="text-white font-body text-lg cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
                {errors.hasTransportation && (
                  <p className="text-red-300 text-sm mt-2">{errors.hasTransportation.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-cloud btn-submit disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmploymentPage;
