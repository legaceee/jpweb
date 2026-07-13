"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, CheckCircle, ArrowRight, Loader2, IndianRupee, FileText } from "lucide-react";
import { submitQuotationRequest } from "../actions";

const services = [
  "Residential Interiors",
  "Modular Kitchen",
  "Wardrobes & Storage",
  "False Ceiling & POP",
  "Civil Contracting",
  "Construction Services",
  "Renovation & Remodeling",
  "Painting & Finishing",
  "Commercial Interiors",
  "Turnkey Projects",
  "Plumbing & Piping",
  "Electrical Work",
  "Flooring & Tiling",
];

const budgets = [
  "Under ₹5 Lakhs",
  "₹5 Lakhs - ₹10 Lakhs",
  "₹10 Lakhs - ₹20 Lakhs",
  "₹20 Lakhs - ₹50 Lakhs",
  "₹50 Lakhs +",
];

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  location: z.string().min(3, "Please enter project location"),
  projectDetails: z.string().min(10, "Details must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function FreeQuotePage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    setErrorMessage("");
    try {
      const response = (await submitQuotationRequest(data)) as any;
      if (response.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(response.errors?.global || "Submission failed. Please verify your entries.");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white/90 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
            Instant Estimation
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Request a Free Quotation
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto">
            Provide details of your project to receive a detailed cost analysis and preliminary material estimate.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="quote-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Form Errors */}
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-light text-center">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-400 text-xs font-light">{errors.fullName.message}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Phone Number</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs font-light">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        {...register("email")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs font-light">{errors.email.message}</p>}
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Service Category</label>
                    <select
                      {...register("service")}
                      className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#1A1A1A] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs font-light">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Target Budget</label>
                    <div className="relative">
                      <IndianRupee size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <select
                        {...register("budget")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select budget range...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b} className="bg-[#1A1A1A] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.budget && <p className="text-red-400 text-xs font-light">{errors.budget.message}</p>}
                  </div>

                  {/* Project Location */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Project Location (City/Area)</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <input
                        type="text"
                        placeholder="e.g. Pune, Camp"
                        {...register("location")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.location && <p className="text-red-400 text-xs font-light">{errors.location.message}</p>}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Project details &amp; dimensions</label>
                  <div className="relative">
                    <FileText size={15} className="absolute left-4 top-3.5 text-white/30" />
                    <textarea
                      rows={5}
                      placeholder="Please specify room dimensions, layout size, floor levels, material specifications, and design requirements."
                      {...register("projectDetails")}
                      className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  {errors.projectDetails && <p className="text-red-400 text-xs font-light">{errors.projectDetails.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary-hover text-dark py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="quote-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-12 text-center shadow-2xl space-y-6 max-w-2xl mx-auto"
            >
              <div className="flex justify-center">
                <CheckCircle className="text-primary w-16 h-16" />
              </div>
              <h2 className="text-3xl font-serif font-semibold text-white">
                Request Acknowledged!
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Your request for estimate has been successfully registered. A confirmation has been logged and sent to your email. Our design engineers will verify the project details and prepare a preliminary design proposal report for you within 48 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-transparent border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:bg-white/5 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
