"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSearch, CheckCircle2, ShieldAlert, DollarSign, Calendar, Mail, FileDown, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { checkAIConfigured, analyzeRoomAction, createAIReport } from "../app/actions";
import { AnalysisResult } from "../lib/ai-service";

const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Exterior Construction Site", "Empty Plot"];

const schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 chars"),
  phone: z.string().min(10, "Phone must be 10 digits"),
  email: z.string().email("Invalid email"),
});

type LeadData = z.infer<typeof schema>;

export default function RoomAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [roomType, setRoomType] = useState(roomTypes[0]!);
  
  const [isAiConfigured, setIsAiConfigured] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LeadData>({
    resolver: zodResolver(schema),
  });

  // Check if AI keys are configured on the server
  useEffect(() => {
    checkAIConfigured().then(res => {
      setIsAiConfigured(res.isConfigured);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setReport(null);
      setIsLeadSaved(false);
      setErrorMessage("");

      // Convert layout file to base64 for server upload
      const reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onload = () => {
        setBase64Image(reader.result as string);
      };
    }
  };

  const executeAnalysis = async () => {
    if (!base64Image) {
      setErrorMessage("Please select a raw site photo to analyze.");
      return;
    }
    if (!isAiConfigured) {
      setErrorMessage("AI room analysis is currently unavailable because no structural scanner provider has been configured.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await analyzeRoomAction(roomType, base64Image);
      if (res.success && res.analysis) {
        setReport(res.analysis);
      } else {
        setErrorMessage(res.error || "Space assessment failed. Verify server configurations.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReport = async (data: LeadData) => {
    if (!report) return;
    setIsSaving(true);
    try {
      const res = await createAIReport({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        roomType: report.roomType,
        analysisData: {
          dimensions: report.dimensions,
          spaceScore: report.spaceUtilizationScore,
          lighting: report.lightingAnalysis,
          placements: report.placementSuggestions,
          storages: report.storageSuggestions,
          style: report.styleRecommendations,
          palette: report.colorPalette
        },
        maintenanceIssues: report.maintenanceIssues,
        approxCost: report.approxCostRange,
        approxTimeline: report.approxTimeline
      });
      if (res.success) {
        setIsLeadSaved(true);
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
          <FileSearch className="text-primary w-6 h-6 animate-pulse" />
          <span>AI Room Space &amp; Structure Analyzer</span>
        </h3>
        <p className="text-xs text-foreground/50 leading-relaxed font-light max-w-xl">
          Upload photo grids of your layouts. Our Vision Engine checks masonry structures, estimates dimensions, identifies wall cracks or dampness points, and drafts recommended finishes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Input Block */}
        <div className="lg:col-span-4 bg-background/50 border border-border p-6 rounded-2xl space-y-6">
          
          {/* File Upload Selector */}
          <div className="space-y-2">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">1. Target Layout Image</label>
            <div className="border border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-all cursor-pointer relative bg-card">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center space-y-1">
                <Upload size={18} className="text-primary" />
                <span className="text-[10px] font-semibold text-foreground/70">
                  {file ? file.name : "Select raw site image"}
                </span>
                <span className="text-[8px] text-foreground/40 font-light">PNG, JPG up to 10MB</span>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">2. Target Category</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-card border border-border text-foreground rounded-xl py-2.5 px-3 text-xs focus:outline-none transition-colors"
            >
              {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Action Analyze */}
          <button
            onClick={executeAnalysis}
            disabled={isLoading || isAiConfigured === false}
            className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning Spaces...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Begin Vision Scan</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="bg-background rounded-2xl border border-border overflow-hidden relative aspect-[16/10] flex items-center justify-center shadow-inner">
            <AnimatePresence mode="wait">
              {isAiConfigured === false ? (
                <motion.div
                  key="no-ai-analyzer-key"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-card/65 backdrop-blur-sm text-center space-y-3 z-30 animate-fade-in-up"
                >
                  <AlertCircle className="w-10 h-10 text-primary animate-bounce" />
                  <h4 className="font-serif text-sm font-semibold text-foreground">AI Scanning Unavailable</h4>
                  <p className="text-xs text-foreground/60 leading-normal max-w-sm">
                    AI room analysis is currently unavailable because no structural scanner provider has been configured.
                  </p>
                </motion.div>
              ) : null}

              {isLoading ? (
                <motion.div
                  key="loading-scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-card/75 backdrop-blur-sm space-y-3 z-30"
                >
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <h4 className="font-serif text-xs font-semibold text-foreground animate-pulse uppercase tracking-wider">
                    Mapping Dimension Grids &amp; checking humidity markers...
                  </h4>
                </motion.div>
              ) : null}

              {report ? (
                <motion.div
                  key="analysis-report"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full overflow-y-auto p-6 md:p-8 space-y-8"
                >
                  {/* Header Metrics */}
                  <div className="flex flex-wrap justify-between items-center gap-4 border-b border-border pb-4">
                    <div>
                      <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        Scan: {report.roomType}
                      </span>
                      <h4 className="font-serif text-lg text-foreground font-bold mt-1">Structure Assessment Metrics</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold block">Space Efficiency</span>
                      <span className="text-xl md:text-3xl font-serif text-primary font-bold font-sans">
                        {report.spaceUtilizationScore} / 100
                      </span>
                    </div>
                  </div>

                  {/* Grid layout parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-light">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Estimated Bounds</h5>
                        <p className="font-semibold text-foreground mt-1 font-sans">{report.dimensions}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Lighting Analysis</h5>
                        <p className="text-foreground/75 leading-relaxed mt-1 font-light">{report.lightingAnalysis}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Styling Recommendation</h5>
                        <p className="text-foreground/75 font-semibold mt-1">{report.styleRecommendations}</p>
                      </div>
                    </div>

                    <div className="space-y-4 border-l border-border pl-0 md:pl-8">
                      <div>
                        <h5 className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Structural Diagnostic Warnings</h5>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2 text-[11px]">
                            <ShieldAlert size={14} className={report.maintenanceIssues.cracks.includes("No") ? "text-primary" : "text-red-400"} />
                            <span className="text-foreground/80">{report.maintenanceIssues.cracks}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px]">
                            <ShieldAlert size={14} className={report.maintenanceIssues.dampness.includes("No") ? "text-primary" : "text-red-400"} />
                            <span className="text-foreground/80">{report.maintenanceIssues.dampness}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px]">
                            <ShieldAlert size={14} className="text-primary" />
                            <span className="text-foreground/80">{report.maintenanceIssues.paintQuality}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Color swatches */}
                  <div className="space-y-2 border-t border-border pt-4">
                    <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Suggested Palettes</h5>
                    <div className="flex gap-3">
                      {report.colorPalette.map((col) => (
                        <div key={col} className="flex items-center space-x-1 bg-card border border-border p-1 rounded-full pr-3 text-[10px] font-semibold text-foreground/85">
                          <span className="w-5 h-5 rounded-full border border-black/10 inline-block shrink-0" style={{ backgroundColor: col }} />
                          <span className="font-sans uppercase text-[8px]">{col}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placements and storage suggestions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-t border-border pt-4 leading-normal">
                    <div className="space-y-1">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Placement Suggestions</h5>
                      <ul className="list-disc pl-4 space-y-1 text-foreground/75 font-light">
                        {report.placementSuggestions.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">Storage Layout Additions</h5>
                      <ul className="list-disc pl-4 space-y-1 text-foreground/75 font-light">
                        {report.storageSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing indicators */}
                  <div className="bg-card border border-border p-4 rounded-xl flex justify-between items-center flex-wrap gap-4 text-xs font-semibold">
                    <div className="flex items-center space-x-2 text-foreground/80">
                      <DollarSign size={14} className="text-primary" />
                      <span>Est Renovation: {report.approxCostRange}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-foreground/80">
                      <Calendar size={14} className="text-primary" />
                      <span>Est Timeframe: {report.approxTimeline}</span>
                    </div>
                  </div>

                  {/* Save report Lead Capture form */}
                  <div className="border-t border-border pt-6 mt-6 space-y-4">
                    {!isLeadSaved ? (
                      <form onSubmit={handleSubmit(handleSaveReport)} className="space-y-4 bg-card/65 p-4 rounded-xl border border-border">
                        <h5 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center space-x-1.5">
                          <Mail size={12} />
                          <span>Lock Analysis Data &amp; Email Detailed Report PDF</span>
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
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <FileDown size={11} />
                                <span>Lock Report</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-center text-xs font-light text-foreground/80 flex items-center justify-center space-x-2">
                        <CheckCircle2 className="text-primary w-4.5 h-4.5" />
                        <span>Report locked in ledger! Custom assessment PDF has been dispatched to your inbox.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-6 space-y-3 flex flex-col items-center"
                >
                  <FileSearch className="text-primary/30 w-12 h-12" />
                  <h4 className="font-serif text-sm font-semibold text-foreground">Awaiting Assessment</h4>
                  <p className="text-[10px] text-foreground/44 font-light max-w-xs leading-normal mx-auto">
                    Vision analysis reports appear here. Choose a space type and click \"Begin Vision Scan\" to evaluate layout boundaries and structural humidity ratings.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message display */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-xl font-light text-center flex items-center justify-center space-x-2 mt-4">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
