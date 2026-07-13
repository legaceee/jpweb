"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, CheckCircle, HelpCircle, Phone, Loader2, ArrowRight, Save, Mail, Calendar } from "lucide-react";
import { saveAIChat } from "../app/actions";
import { contactConfig } from "../lib/config";
import Link from "next/link";

const bhkTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK / Penthouse", "Luxury Villa", "Commercial Space"];
const finishes = [
  { value: "acrylic", name: "High Gloss Acrylic", desc: "Anti-scratch polymer coatings, optimal for contemporary modular kitchens." },
  { value: "pu", name: "Premium PU Paint", desc: "Satin seamless liquid paint coats, best for high-end handleless wardrobes." },
  { value: "laminate", name: "Matte Laminate", desc: "Eco-friendly core panels, highly durable under friction and standard cleaning cycles." }
];

const schema = z.object({
  fullName: z.string().min(3, "Name required"),
  phone: z.string().min(10, "Phone required"),
  email: z.string().email("Invalid email"),
});

type ConsultantLead = z.infer<typeof schema>;

interface ConsultantResult {
  timeline: string;
  budgetCap: string;
  furniture: string[];
  lighting: string[];
  storages: string[];
  hardwareRecommended: string;
}

export default function InteriorConsultant() {
  const [bhk, setBhk] = useState(bhkTypes[1]!); // 2 BHK default
  const [budget, setBudget] = useState(12); // 12 Lakhs default
  const [selectedFinish, setSelectedFinish] = useState(finishes[2]!); // Laminate default
  const [isKidsFriendly, setIsKidsFriendly] = useState(true);
  const [isSpaceSaving, setIsSpaceSaving] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConsultantResult | null>(null);
  const [isChatSaved, setIsChatSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ConsultantLead>({
    resolver: zodResolver(schema),
  });

  const getRecommendations = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));

    // Simple heuristic-based dynamic advice matching input parameters
    const timelineVal = budget > 20 ? "75 - 90 Working Days" : budget > 10 ? "50 - 60 Working Days" : "35 - 45 Working Days";
    const furnitureRec = isKidsFriendly 
      ? ["Round-edged lounge sofas (no sharp trims)", "Upholstered wing chairs", "Eco-friendly certified modular ply tables"]
      : ["High-back minimal steel frame lounges", "Bespoke glass dining credentials", "Premium floating consoles"];
    
    const storageRec = isSpaceSaving
      ? ["Concealed floor-to-ceiling modular wardrobe shafts", "Telescopic pantry storage drawers", "Pull-out corner carousels"]
      : ["Deep accent glass credenzas", "Open shelf library grids", "Oversized master walk-in wardrobes"];

    setResult({
      timeline: timelineVal,
      budgetCap: `₹${budget} Lakhs (Allocated)`,
      furniture: furnitureRec,
      lighting: budget > 18 
        ? ["Magnetic linear recessed light tracking", "Indirect warm ceiling cove LED ropes", "Bespoke brass chandeliers"] 
        : ["Slim profile trim LEDs", "Concealed ambient wardrobe tube strip lines"],
      storages: storageRec,
      hardwareRecommended: selectedFinish.name === "Premium PU Paint" ? "Blum Blumotion hinges" : "Hettich soft-close sliders"
    });
    setIsChatSaved(false);
  };

  const handleSaveSession = async (data: ConsultantLead) => {
    if (!result) return;
    setIsSaving(true);
    try {
      const logs = [
        { role: "user", text: `I have a ${bhk} layout. Budget is ₹${budget}L. Finishes: ${selectedFinish.name}. Kids: ${isKidsFriendly}, Space saving: ${isSpaceSaving}` },
        { role: "assistant", text: `Recommendation timeline: ${result.timeline}, Hardware: ${result.hardwareRecommended}. Furniture suggestions: ${result.furniture.join(", ")}` }
      ];
      const res = await saveAIChat({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        messages: logs
      });
      if (res.success) {
        setIsChatSaved(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
      <div className="text-center md:text-left space-y-2">
        <h3 className="font-serif text-2xl md:text-3xl text-foreground font-bold flex items-center justify-center md:justify-start space-x-2">
          <Compass className="text-primary w-6 h-6 animate-pulse" />
          <span>AI Interior Design Consultant</span>
        </h3>
        <p className="text-xs text-foreground/50 leading-relaxed font-light max-w-xl">
          Interact with our configuration consultant. Specify space dimensions, woodwork finish preferences, and budget ranges to yield customized material bundles and schedule reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-5 bg-background/50 border border-border p-6 rounded-2xl space-y-6">
          {/* BHK Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block font-sans">1. Space Configuration</label>
            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="w-full bg-card border border-border text-foreground rounded-xl py-2.5 px-3 text-xs focus:outline-none transition-colors"
            >
              {bhkTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Budget Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground/50 font-bold uppercase tracking-wider">2. Allocated Budget</span>
              <span className="text-primary font-bold text-base font-sans">₹{budget} Lakhs</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Woodwork Finishes */}
          <div className="space-y-3">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">3. Preferred Material Finishes</label>
            <div className="grid grid-cols-1 gap-2.5">
              {finishes.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSelectedFinish(f)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    selectedFinish.value === f.value
                      ? "bg-primary/5 border-primary text-foreground"
                      : "bg-card text-foreground/60 border-border hover:border-foreground/20"
                  }`}
                >
                  <h4 className="text-xs font-bold text-foreground">{f.name}</h4>
                  <p className="text-[9px] text-foreground/45 mt-0.5 leading-snug font-light">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Toggles */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <label className="flex items-center space-x-2 bg-card p-3 border border-border rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={isKidsFriendly}
                onChange={(e) => setIsKidsFriendly(e.target.checked)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-[10px] text-foreground/75 uppercase font-sans">Child Safe</span>
            </label>
            <label className="flex items-center space-x-2 bg-card p-3 border border-border rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={isSpaceSaving}
                onChange={(e) => setIsSpaceSaving(e.target.checked)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-[10px] text-foreground/75 uppercase font-sans">Space Saving</span>
            </label>
          </div>

          {/* Consultant Submit Action */}
          <button
            onClick={getRecommendations}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Blueprint Proposal...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Get Design recommendations</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Proposal Results */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading-consult"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-background rounded-2xl border border-border p-12 text-center flex flex-col items-center justify-center space-y-4 aspect-[16/10]"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <h4 className="font-serif text-sm font-semibold text-foreground animate-pulse uppercase tracking-wider">
                  Mapping material ratios &amp; coordinating timeline milestones...
                </h4>
              </motion.div>
            ) : result ? (
              <motion.div
                key="proposal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background border border-border p-6 md:p-8 rounded-2xl space-y-6 shadow-inner"
              >
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <div>
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                      Proposal: {bhk}
                    </span>
                    <h4 className="font-serif text-lg text-foreground font-bold mt-1">AI Consultation Summary</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold block">Timeframe</span>
                    <span className="text-sm font-bold text-foreground font-sans">{result.timeline}</span>
                  </div>
                </div>

                {/* Recommendations Details */}
                <div className="space-y-4 text-xs font-light">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Suggested Furniture Profile</h5>
                      <ul className="list-disc pl-4 space-y-1 text-foreground/80 font-light">
                        {result.furniture.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Lighting Schemes</h5>
                      <ul className="list-disc pl-4 space-y-1 text-foreground/80 font-light">
                        {result.lighting.map((l, i) => <li key={i}>{l}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-4">
                    <div className="space-y-1.5">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Storage Allocations</h5>
                      <ul className="list-disc pl-4 space-y-1 text-foreground/80 font-light">
                        {result.storages.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Hardware &amp; Access System</h5>
                      <p className="font-semibold text-primary">{result.hardwareRecommended}</p>
                      <p className="text-[10px] text-foreground/55 font-light leading-normal">
                        Matches woodwork load specs with custom dampeners.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save session lead capture form */}
                <div className="border-t border-border pt-6 mt-6 space-y-4">
                  {!isChatSaved ? (
                    <form onSubmit={handleSubmit(handleSaveSession)} className="space-y-4 bg-card/65 p-4 rounded-xl border border-border">
                      <h5 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center space-x-1.5">
                        <Mail size={12} />
                        <span>Save Consultation Logs &amp; Book Site Consultation</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          {...register("fullName")}
                          className="w-full bg-background border border-border text-foreground rounded-lg py-2 px-3 text-xs font-light focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          {...register("phone")}
                          className="w-full bg-background border border-border text-foreground rounded-lg py-2 px-3 text-xs font-light focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          {...register("email")}
                          className="w-full bg-background border border-border text-foreground rounded-lg py-2 px-3 text-xs font-light focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center flex-wrap gap-2 text-[10px] text-red-400 font-light">
                        <div>
                          {errors.fullName && <p>{errors.fullName.message}</p>}
                          {errors.phone && <p>{errors.phone.message}</p>}
                          {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="bg-primary hover:bg-primary-hover text-card px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save size={11} />
                              <span>Save Session</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-center text-xs font-light text-foreground/80 flex flex-wrap items-center justify-center gap-4">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle className="text-primary w-4.5 h-4.5" />
                        <span>Design logs registered. Summary copy dispatched to your inbox.</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/book"
                          className="bg-primary hover:bg-primary-hover text-card px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest inline-flex items-center space-x-1"
                        >
                          <Calendar size={11} />
                          <span>Book Slot</span>
                        </Link>
                        <a
                          href={`tel:${contactConfig.phone}`}
                          className="border border-border bg-card text-foreground px-3.5 py-1.5 rounded-lg text-[9px] font-semibold uppercase tracking-widest inline-flex items-center space-x-1 hover:border-foreground/30"
                        >
                          <Phone size={11} />
                          <span>Call Coordinator</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-consult"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-background rounded-2xl border border-border p-12 text-center flex flex-col items-center justify-center space-y-3 aspect-[16/10] shadow-inner"
              >
                <Compass className="text-primary/30 w-12 h-12" />
                <h4 className="font-serif text-sm font-semibold text-foreground">Consultation Blueprint Awaiting</h4>
                <p className="text-[10px] text-foreground/44 font-light max-w-xs leading-normal mx-auto">
                  Recommended material specifications appear here. Select your woodwork profile and budget to compile design timelines.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
