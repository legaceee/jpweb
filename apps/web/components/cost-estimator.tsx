"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, IndianRupee, ArrowRight, Loader2, CheckCircle2, User, Phone, Mail, MapPin } from "lucide-react";
import { createCostEstimate } from "../app/actions";

const propertyTypes = ["Apartment", "Villa", "Commercial Office", "Restaurant", "Clinic", "Retail Shop"];
const stages = ["Excavation", "Plinth Level", "RCC Slab Core", "Brickwork & Plastering", "Finishing & Woodwork"];

const servicesList = [
  { id: "Interior", label: "Interior Design" },
  { id: "Civil", label: "Civil Contracting" },
  { id: "Painting", label: "Painting & Polish" },
  { id: "Electrical", label: "Electrical Cabling" },
  { id: "Plumbing", label: "Plumbing Line Setup" },
  { id: "FalseCeiling", label: "False Ceiling & POP" },
  { id: "Kitchen", label: "Modular Kitchen" },
  { id: "Wardrobe", label: "Modular Wardrobes" },
  { id: "Waterproofing", label: "Waterproofing Shield" }
];

const budgets = [
  { value: "standard", name: "Standard Grade", rate: 1600, desc: "Standard branded cement, vitrified tiles, basic wardrobes." },
  { value: "premium", name: "Premium Luxe", rate: 2400, desc: "BWR waterproof ply, custom linear panels, Legrand cabling." },
  { value: "luxury", name: "Ultra Luxury", rate: 3600, desc: "Imported Italian marble, home automation, PU finishes." }
];

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(3, "Location is required"),
});

type FormInput = z.infer<typeof schema>;

export default function CostEstimator() {
  const [area, setArea] = useState(1500);
  const [propertyType, setPropertyType] = useState(propertyTypes[1]!); // Villa default
  const [selectedBudget, setSelectedBudget] = useState(budgets[1]!); // Premium default
  const [stage, setStage] = useState(stages[2]!); // RCC Slab default
  const [selectedServices, setSelectedServices] = useState<string[]>(["Interior", "Civil", "Kitchen"]);
  
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [estimateData, setEstimateData] = useState<{ cost: string; timeline: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const handleServiceToggle = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Dynamic cost calculation
  const servicesMultiplier = 0.5 + (selectedServices.length * 0.1); // more services = higher cost factor
  const baseRate = selectedBudget.rate * servicesMultiplier;
  const totalCost = area * baseRate;

  // Timeline calculation
  const calculatedMonths = Math.max(2, Math.round((area / 500) + (selectedServices.length * 0.5)));
  const timelineStr = `${calculatedMonths} - ${calculatedMonths + 2} Months`;
  const costRangeStr = `${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(totalCost - totalCost * 0.05)} - ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(totalCost + totalCost * 0.05)}`;

  const onSubmit = async (data: FormInput) => {
    setIsPending(true);
    try {
      const res = await createCostEstimate({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        propertyType,
        area,
        budgetTier: selectedBudget.name,
        location: data.location,
        services: selectedServices.join(", "),
        estimatedCost: costRangeStr,
        estimatedTimeline: timelineStr
      });

      if (res.success) {
        setEstimateData({ cost: costRangeStr, timeline: timelineStr });
        setIsSuccess(true);
        reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
      <div className="text-center md:text-left space-y-2">
        <h3 className="font-serif text-2xl md:text-3xl text-foreground font-bold flex items-center justify-center md:justify-start space-x-2">
          <Calculator className="text-primary w-6 h-6 animate-pulse" />
          <span>AI Construction Cost Estimator</span>
        </h3>
        <p className="text-xs text-foreground/50 leading-relaxed font-light max-w-xl">
          Specify built-up sizes, target services, and construction phases to calculate dynamically matching structural timelines and package estimations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Property Type and Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider block">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-card border border-border text-foreground rounded-xl py-2.5 px-3 text-xs focus:outline-none"
              >
                {propertyTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider block">Current Construction Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full bg-card border border-border text-foreground rounded-xl py-2.5 px-3 text-xs focus:outline-none"
              >
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground/50 font-bold uppercase tracking-wider">Built-up Area (Sq. Ft.)</span>
              <span className="text-primary font-bold text-base font-sans">{area} sq ft</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Budget Grade */}
          <div className="space-y-3">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">Budget Grade Selection</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {budgets.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setSelectedBudget(b)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-colors flex flex-col justify-between h-28 ${
                    selectedBudget.value === b.value
                      ? "bg-primary/5 border-primary text-foreground"
                      : "bg-card text-foreground/60 border-border hover:border-foreground/20"
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{b.name}</h4>
                    <p className="text-[9px] text-foreground/45 mt-0.5 leading-snug font-light">{b.desc}</p>
                  </div>
                  <span className="text-xs text-primary font-bold mt-2 font-sans">₹{b.rate}/sqft</span>
                </button>
              ))}
            </div>
          </div>

          {/* Services Required Checkboxes */}
          <div className="space-y-3">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">Services Required</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {servicesList.map((service) => {
                const isActive = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-primary/5 border-primary text-foreground"
                        : "bg-card text-foreground/60 border-border hover:border-foreground/10"
                    }`}
                  >
                    <span>{service.label}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isActive ? "border-primary bg-primary text-card" : "border-border"
                    }`}>
                      {isActive && <span className="w-1.5 h-1.5 bg-card rounded-full" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Lead capture / Output Display */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-background border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-inner">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-bold">Secure AI Cost Estimate</h4>
                  <p className="text-[10px] text-foreground/50 leading-relaxed font-light mt-0.5">
                    Save estimation to our local ledger and trigger direct mail breakdowns.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-foreground/50 uppercase font-sans">Full Name</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className="w-full bg-card border border-border text-foreground rounded-lg py-2 pl-10 pr-4 text-xs font-light focus:outline-none"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-400 text-[9px] font-light">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-foreground/50 uppercase font-sans">Phone Number</label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="w-full bg-card border border-border text-foreground rounded-lg py-2 pl-10 pr-4 text-xs font-light focus:outline-none"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-[9px] font-light">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-foreground/50 uppercase font-sans">Email Address</label>
                    <div className="relative">
                      <Mail size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="email"
                        placeholder="johndoe@email.com"
                        {...register("email")}
                        className="w-full bg-card border border-border text-foreground rounded-lg py-2 pl-10 pr-4 text-xs font-light focus:outline-none"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-[9px] font-light">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-foreground/50 uppercase font-sans">Site Location</label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3 top-3 text-foreground/30" />
                      <input
                        type="text"
                        placeholder="Pune, Kalyani Nagar"
                        {...register("location")}
                        className="w-full bg-card border border-border text-foreground rounded-lg py-2 pl-10 pr-4 text-xs font-light focus:outline-none"
                      />
                    </div>
                    {errors.location && <p className="text-red-400 text-[9px] font-light">{errors.location.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-card py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Calculating Estimates...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Instant Estimate</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                key="estimate-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-background border border-primary/20 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-xl"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="text-primary w-12 h-12" />
                </div>
                <h4 className="font-serif text-lg text-foreground font-semibold">Estimate Configured</h4>
                <p className="text-xs text-foreground/60 leading-relaxed font-light">
                  Your dynamic calculation is logged. Custom proposal has been generated.
                </p>

                <div className="bg-card border border-border p-4 rounded-xl text-xs font-semibold space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-foreground/45">Estimated Cost:</span>
                    <span className="text-primary font-sans">{estimateData?.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/45">Project Timeline:</span>
                    <span className="text-foreground font-sans">{estimateData?.timeline}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-transparent border border-border text-foreground px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-foreground/5 cursor-pointer"
                  >
                    Recalculate Estimate
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
