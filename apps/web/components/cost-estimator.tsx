"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, IndianRupee, ArrowRight, Loader2, CheckCircle2, FileText, MapPin, User, Phone, Mail } from "lucide-react";
import { submitQuotationRequest } from "../app/actions";

const qualityTiers = [
  { value: "standard", name: "Standard Grade", rate: 1600, desc: "BWR wood ply core, vitrified tiles, branded pipelines, standard fixtures." },
  { value: "premium", name: "Premium Luxe", rate: 2400, desc: "German soft-close accessories, large format tiles, custom wood profiles, advanced cabling." },
  { value: "luxury", name: "Ultra Luxury", rate: 3600, desc: "Imported Italian marble, home automation, PU finishes, designer sanitary fittings." }
];

const projectTypes = [
  { value: "villa", name: "Residential Villa / Bungalow", factor: 1.0 },
  { value: "office", name: "Commercial Office Layout", factor: 1.15 },
  { value: "renovation", name: "Apartment Restoration", factor: 0.85 }
];

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(3, "Location is required"),
});

type FormData = z.infer<typeof schema>;

export default function CostEstimator() {
  const [area, setArea] = useState(1500); // Default sq. ft.
  const [selectedQuality, setSelectedQuality] = useState(qualityTiers[1]!); // Default premium
  const [selectedType, setSelectedType] = useState(projectTypes[0]!); // Default villa
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Calculate costs
  const baseRate = selectedQuality.rate * selectedType.factor;
  const totalCost = area * baseRate;
  
  const rccCost = Math.round(totalCost * 0.40);
  const masonryCost = Math.round(totalCost * 0.15);
  const finishCost = Math.round(totalCost * 0.35);
  const consultCost = Math.round(totalCost * 0.10);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    setErrorMessage("");
    try {
      const details = `Estimated Project: Area ${area} sq.ft., Quality: ${selectedQuality.name}, Type: ${selectedType.name}. Calculated details - RCC: ${formatCurrency(rccCost)}, Finish: ${formatCurrency(finishCost)}.`;
      const response = await submitQuotationRequest({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        service: "Cost Estimation - " + selectedType.name,
        budget: `${formatCurrency(totalCost - totalCost*0.05)} - ${formatCurrency(totalCost + totalCost*0.05)}`,
        location: data.location,
        projectDetails: details
      });

      if (response.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage("Submission failed. Please check inputs.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Panel: Sliders & Live Estimates */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-foreground font-bold">Construction Cost Estimator</h3>
            <p className="text-xs text-foreground/50 leading-relaxed font-light pt-1">
              Select built-up specifications to calculate instant structural, finishing, and engineering estimates.
            </p>
          </div>

          {/* Area Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground/60 font-semibold uppercase tracking-wider">Built-up Area</span>
              <span className="text-primary font-bold text-base font-sans">{area} Sq. Ft.</span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="100"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-foreground/40 font-light font-sans">
              <span>500 sq ft</span>
              <span>8,000 sq ft</span>
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wider">Project Type</h4>
            <div className="grid grid-cols-3 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2.5 rounded-xl border text-[11px] font-semibold text-center cursor-pointer transition-all ${
                    selectedType.value === type.value
                      ? "bg-primary text-card border-primary font-bold"
                      : "bg-background text-foreground/75 border-border hover:border-foreground/20"
                  }`}
                >
                  {type.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Tiers */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wider">Quality Grade</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {qualityTiers.map((tier) => (
                <button
                  key={tier.value}
                  onClick={() => setSelectedQuality(tier)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-28 ${
                    selectedQuality.value === tier.value
                      ? "bg-primary/5 border-primary text-foreground"
                      : "bg-background text-foreground/60 border-border hover:border-foreground/10"
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{tier.name}</h5>
                    <p className="text-[9px] text-foreground/40 font-light mt-0.5 leading-snug">{tier.desc}</p>
                  </div>
                  <span className="text-xs text-primary font-bold mt-2 block font-sans">
                    {formatCurrency(tier.rate)}/sqft
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Estimate Breakdown */}
          <div className="bg-background border border-border p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-end border-b border-border pb-3">
              <span className="text-xs text-foreground/50 uppercase tracking-widest font-semibold">Calculated Total Estimate</span>
              <span className="text-xl md:text-3xl font-serif text-primary font-bold font-sans">
                {formatCurrency(totalCost - totalCost*0.05)} - {formatCurrency(totalCost + totalCost*0.05)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-light">
              <div className="space-y-1">
                <p className="text-foreground/45">RCC Concrete Structure (40%):</p>
                <p className="font-semibold text-foreground font-sans">{formatCurrency(rccCost)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground/45">Masonry &amp; Plastering (15%):</p>
                <p className="font-semibold text-foreground font-sans">{formatCurrency(masonryCost)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground/45">Design Finishes &amp; Wood (35%):</p>
                <p className="font-semibold text-foreground font-sans">{formatCurrency(finishCost)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground/45">Architect Fees &amp; Liaison (10%):</p>
                <p className="font-semibold text-foreground font-sans">{formatCurrency(consultCost)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Lead Capture Form */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="lead-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-background border border-border rounded-2xl p-6 md:p-8 space-y-6"
              >
                <div>
                  <h4 className="font-serif text-lg text-foreground font-bold">Lock Estimate &amp; Consult</h4>
                  <p className="text-[10px] text-foreground/50 leading-relaxed font-light">
                    Submit coordinates to record your calculation in our ledger and receive a custom email breakdown report.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-light text-center">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className="w-full bg-card border border-border focus:border-primary/50 text-foreground rounded-xl py-2.5 pl-10 pr-4 text-xs font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-400 text-[10px] font-light">{errors.fullName.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider block">Phone Number</label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="w-full bg-card border border-border focus:border-primary/50 text-foreground rounded-xl py-2.5 pl-10 pr-4 text-xs font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-[10px] font-light">{errors.phone.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="email"
                        placeholder="johndoe@email.com"
                        {...register("email")}
                        className="w-full bg-card border border-border focus:border-primary/50 text-foreground rounded-xl py-2.5 pl-10 pr-4 text-xs font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-[10px] font-light">{errors.email.message}</p>}
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider block">Site Location</label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="text"
                        placeholder="Pune, Kalyani Nagar"
                        {...register("location")}
                        className="w-full bg-card border border-border focus:border-primary/50 text-foreground rounded-xl py-2.5 pl-10 pr-4 text-xs font-light focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.location && <p className="text-red-400 text-[10px] font-light">{errors.location.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving Estimate...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Calculation</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="lead-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-background border border-primary/20 rounded-2xl p-8 text-center space-y-4 shadow-xl"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="text-primary w-12 h-12" />
                </div>
                <h4 className="font-serif text-lg text-foreground font-semibold">Estimate Saved</h4>
                <p className="text-xs text-foreground/60 leading-relaxed font-light">
                  Your calculation report has been sent to your email. Our coordinator will contact you shortly to schedule an on-site validation session.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-transparent border border-border hover:border-foreground/35 text-foreground px-5 py-2.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all hover:bg-foreground/5 cursor-pointer"
                  >
                    New Calculation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
