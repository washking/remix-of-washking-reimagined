import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll be in touch soon!",
    });
    reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] overflow-hidden">
        {/* Yellow background */}
        <div className="absolute inset-0 bg-washking-yellow" />

        {/* Forest/Hills background */}
        <div className="absolute bottom-0 left-0 right-0 h-[70%]">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30_50%_45%)] to-[hsl(25_55%_35%)]" />

          {/* Trees - left side */}
          <div className="absolute bottom-0 left-0 w-1/4 h-full">
            <div className="absolute bottom-0 left-[10%] w-16 h-[80%] bg-[hsl(25_60%_25%)] rounded-t-lg" />
            <div className="absolute bottom-0 left-[25%] w-20 h-[90%] bg-[hsl(25_55%_30%)] rounded-t-lg" />
          </div>

          {/* Trees - right side */}
          <div className="absolute bottom-0 right-0 w-1/4 h-full">
            <div className="absolute bottom-0 right-[10%] w-16 h-[80%] bg-[hsl(25_60%_25%)] rounded-t-lg" />
            <div className="absolute bottom-0 right-[25%] w-20 h-[90%] bg-[hsl(25_55%_30%)] rounded-t-lg" />
          </div>
        </div>

        {/* Wave transition from yellow */}
        <svg
          viewBox="0 0 1440 200"
          className="absolute top-0 left-0 right-0 w-full"
          preserveAspectRatio="none"
          style={{ height: "150px" }}
        >
          <path
            d="M0,0 L1440,0 L1440,100 Q1200,180 720,120 Q240,60 0,140 Z"
            fill="hsl(45 100% 55%)"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl lg:text-7xl text-white text-shadow"
          >
            CAREERS
          </motion.h1>
        </div>
      </section>

      {/* We're Hiring Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Sky blue background with clouds */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_80%_60%)]" />

        {/* Cloud decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-[20%]"
          >
            <div className="w-48 h-24 bg-white/50 rounded-full" />
            <div className="w-32 h-16 bg-white/50 rounded-full -mt-10 ml-20" />
          </motion.div>
          <motion.div
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-[10%]"
          >
            <div className="w-40 h-20 bg-white/40 rounded-full" />
          </motion.div>
        </div>

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
              <h2 className="font-display text-4xl lg:text-5xl text-white text-shadow mb-8">
                WE'RE HIRING!
              </h2>
              <ul className="space-y-4 text-white font-body text-lg lg:text-xl">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">•</span>
                  <span>We are always looking for great people to join our team!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">•</span>
                  <span>Fill out the form below to apply to be apart of our wash king Family!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">•</span>
                  <span>Always accepting applications for Full-Time and Part-Time applicants!</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Green leafy background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(120_40%_35%)] to-[hsl(120_35%_30%)]" />

        {/* Decorative bushes/leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-[hsl(120_45%_28%)] rounded-full transform -translate-y-1/2" />
          <div className="absolute top-0 right-1/4 w-48 h-24 bg-[hsl(120_50%_30%)] rounded-full transform -translate-y-1/2" />
          <div className="absolute top-10 left-1/3 w-56 h-28 bg-[hsl(120_42%_25%)] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-4xl lg:text-5xl text-white text-shadow mb-4">
              APPLICATION FOR EMPLOYMENT
            </h2>
            <p className="text-white font-body text-lg max-w-2xl mx-auto">
              Please be sure to complete all the required fields before moving to the next set of questions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="text-center mb-6">
                <h3 className="font-display text-3xl text-[hsl(25_70%_45%)] mb-2">
                  PERSONAL INFORMATION
                </h3>
                <p className="text-white font-body">Enter your personal information below</p>
              </div>

              {/* First Name & Last Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body mb-2 block">
                    First Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body mb-2 block">
                    Last Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <Label className="text-white font-body mb-2 block">
                  Message <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  {...register("message")}
                  placeholder="Message"
                  rows={5}
                  className="bg-white rounded-2xl py-4 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none resize-none"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* City & State */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body mb-2 block">
                    City <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("city")}
                    placeholder="City"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.city && (
                    <p className="text-red-300 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body mb-2 block">
                    State <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("state")}
                    placeholder="State"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.state && (
                    <p className="text-red-300 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Postal */}
              <div>
                <Label className="text-white font-body mb-2 block">Postal</Label>
                <Input
                  {...register("postal")}
                  placeholder="Postal"
                  className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                />
                {errors.postal && (
                  <p className="text-red-300 text-sm mt-1">{errors.postal.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-body mb-2 block">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white font-body mb-2 block">Phone Number</Label>
                  <Input
                    {...register("phone")}
                    placeholder="00000 00000"
                    className="bg-white rounded-2xl py-6 px-4 text-washking-brown placeholder:text-washking-brown/60 border-none"
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Radio Questions */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Applied Before */}
                <div>
                  <Label className="text-white font-body mb-3 block">
                    Have you ever applied at wash king before?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("appliedBefore", value as "yes" | "no")}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="applied-yes" className="border-white text-white" />
                      <Label htmlFor="applied-yes" className="text-white font-body cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="applied-no" className="border-white text-white" />
                      <Label htmlFor="applied-no" className="text-white font-body cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.appliedBefore && (
                    <p className="text-red-300 text-sm mt-1">{errors.appliedBefore.message}</p>
                  )}
                </div>

                {/* Can Contact Employer */}
                <div>
                  <Label className="text-white font-body mb-3 block">
                    Can present employer be contacted?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("canContactEmployer", value as "yes" | "no")}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="contact-yes" className="border-white text-white" />
                      <Label htmlFor="contact-yes" className="text-white font-body cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="contact-no" className="border-white text-white" />
                      <Label htmlFor="contact-no" className="text-white font-body cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.canContactEmployer && (
                    <p className="text-red-300 text-sm mt-1">{errors.canContactEmployer.message}</p>
                  )}
                </div>
              </div>

              {/* Transportation */}
              <div>
                <Label className="text-white font-body mb-3 block">
                  Do you have reliable transportation?
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("hasTransportation", value as "yes" | "no")}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="transport-yes" className="border-white text-white" />
                    <Label htmlFor="transport-yes" className="text-white font-body cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="transport-no" className="border-white text-white" />
                    <Label htmlFor="transport-no" className="text-white font-body cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
                {errors.hasTransportation && (
                  <p className="text-red-300 text-sm mt-1">{errors.hasTransportation.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-submit disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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
