"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { bookAppointment } from "../actions";

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

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time slot is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BookAppointmentPage() {
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
      const response = (await bookAppointment(data)) as any;
      if (response.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(response.errors?.global || "Submission failed. Please check your inputs.");
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
            Premium Consultations
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Schedule a Consultative Site Visit
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto">
            Book an appointment with our project engineers and interior designers to evaluate your site and design layout.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="booking-form"
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
                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Preferred Date</label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        {...register("preferredDate")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-400 text-xs font-light">{errors.preferredDate.message}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Preferred Time Slot</label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-4 top-3.5 text-white/30" />
                      <select
                        {...register("preferredTime")}
                        className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select time slot...</option>
                        <option value="Morning (9 AM - 12 PM)" className="bg-[#1A1A1A]">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (1 PM - 4 PM)" className="bg-[#1A1A1A]">Afternoon (1 PM - 4 PM)</option>
                        <option value="Evening (5 PM - 7 PM)" className="bg-[#1A1A1A]">Evening (5 PM - 7 PM)</option>
                      </select>
                    </div>
                    {errors.preferredTime && <p className="text-red-400 text-xs font-light">{errors.preferredTime.message}</p>}
                  </div>
                </div>

                {/* Site Address */}
                <div className="space-y-2">
                  <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Site Address</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-4 top-3.5 text-white/30" />
                    <input
                      type="text"
                      placeholder="Enter property street location details"
                      {...register("address")}
                      className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.address && <p className="text-red-400 text-xs font-light">{errors.address.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs text-white/60 font-medium uppercase tracking-wider block">Message (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements (e.g. number of BHKs, design style preferances)"
                    {...register("message")}
                    className="w-full bg-[#121212] border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 px-4 text-sm font-light focus:outline-none transition-colors resize-none"
                  />
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
                      <span>Booking Appointment...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Appointment Book</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-12 text-center shadow-2xl space-y-6 max-w-2xl mx-auto"
            >
              <div className="flex justify-center">
                <CheckCircle className="text-primary w-16 h-16" />
              </div>
              <h2 className="text-3xl font-serif font-semibold text-white">
                Booking Successful!
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Your consultation request has been saved. We have successfully sent a confirmation email to your address and logged the details to the Projects Dispatch Desk. Our coordinator will contact you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-transparent border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:bg-white/5 cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
