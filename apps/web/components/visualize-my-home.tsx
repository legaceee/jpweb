"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, Sliders, Check, Phone, MessageSquare, FileText, Calendar, Loader2, AlertCircle } from "lucide-react";
import { checkAIConfigured, visualizeRoomAction } from "../app/actions";
import BeforeAfterSlider from "./before-after-slider";
import { contactConfig, getWhatsAppLink, getCallLink } from "../lib/config";

const styles = ["Modern", "Luxury", "Scandinavian", "Industrial", "Minimal", "Contemporary", "Traditional", "Japanese", "Mediterranean"];
const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Exterior", "Construction Site", "Empty Plot"];
const budgets = ["Standard Value", "Premium Luxe", "Ultra Luxury"];

const flooringOptions = ["Carrara Marble", "Smoked Walnut Wood", "Polished Concrete", "Vitrified Tile"];
const wallFinishes = ["Satin Paint", "Fluted Wood Rafters", "Exposed Brick Panel", "Textured Plaster"];

export default function VisualizeMyHome() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]!);
  const [selectedStyle, setSelectedStyle] = useState(styles[0]!);
  const [selectedBudget, setSelectedBudget] = useState(budgets[1]!);
  const [floor, setFloor] = useState(flooringOptions[0]!);
  const [wall, setWall] = useState(wallFinishes[0]!);

  const [isAiConfigured, setIsAiConfigured] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [result, setResult] = useState<{ before: string; after: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if Stability AI provider key is configured on the server
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
      setResult(null);
      setErrorMessage("");

      // Convert image file to base64 immediately for server submission
      const reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onload = () => {
        setBase64Image(reader.result as string);
      };
      reader.onerror = (err) => {
        console.error("Base64 conversion error:", err);
      };
    }
  };

  const triggerVisualization = async () => {
    if (!base64Image) {
      setErrorMessage("Please select a room photo to visualize.");
      return;
    }
    if (!isAiConfigured) {
      setErrorMessage("AI visualization is currently unavailable because no image generation provider has been configured.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Start premium sequential loading animation
    const steps = [
      "Uploading...",
      "Analyzing Room...",
      "Generating Design...",
      "Applying Materials...",
      "Final Rendering..."
    ];

    let currentStep = 0;
    setProgressText(steps[currentStep]!);

    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setProgressText(steps[currentStep]!);
      }
    }, 1200);

    try {
      const res = await visualizeRoomAction({
        roomType: selectedRoom,
        style: selectedStyle,
        budget: selectedBudget,
        materials: { flooring: floor, wallFinish: wall },
        beforeImage: base64Image
      });

      if (res.success && res.afterImage) {
        setResult({
          before: res.beforeImage || base64Image,
          after: res.afterImage
        });
      } else {
        setErrorMessage(res.error || "Image generation failed. Verify API thresholds.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setProgressText("");
    }
  };

  const waLink = getWhatsAppLink(`Hi JP Enterprises, I'm checking my visualization for ${selectedRoom}.`);

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
      <div className="text-center md:text-left space-y-2">
        <h3 className="font-serif text-2xl md:text-3xl text-foreground font-bold flex items-center justify-center md:justify-start space-x-2">
          <Sparkles className="text-primary w-6 h-6 animate-pulse" />
          <span>Visualize My Home</span>
        </h3>
        <p className="text-xs text-foreground/50 leading-relaxed font-light max-w-xl">
          Upload a photo of your empty plot, raw construction brickwork, or current layout room. Choose a styling theme, and our rendering engine will compile a luxury interior blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options Controls */}
        <div className="lg:col-span-4 space-y-6 bg-background/50 border border-border p-6 rounded-2xl">
          {/* File Upload Selector */}
          <div className="space-y-2">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">1. Upload Room Photo</label>
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
                  {file ? file.name : "Choose or drag image"}
                </span>
                <span className="text-[8px] text-foreground/44">PNG, JPG up to 10MB</span>
              </div>
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">2. Room Type</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full bg-card border border-border text-foreground rounded-xl py-2 px-3 text-xs focus:outline-none transition-colors"
            >
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Design Style */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">3. Style Theme</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-card border border-border text-foreground rounded-xl py-2 px-3 text-xs focus:outline-none transition-colors"
            >
              {styles.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Floor & Wall Material */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider block">Flooring</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full bg-card border border-border text-foreground rounded-xl py-2 px-3 text-[10px] focus:outline-none"
              >
                {flooringOptions.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider block">Wall Finish</label>
              <select
                value={wall}
                onChange={(e) => setWall(e.target.value)}
                className="w-full bg-card border border-border text-foreground rounded-xl py-2 px-3 text-[10px] focus:outline-none"
              >
                {wallFinishes.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider block">4. Budget Scope</label>
            <div className="grid grid-cols-3 gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBudget(b)}
                  className={`py-1.5 rounded-lg border text-[9px] font-semibold text-center cursor-pointer transition-colors ${
                    selectedBudget === b
                      ? "bg-primary text-card border-primary"
                      : "bg-card text-foreground/75 border-border hover:border-foreground/20"
                  }`}
                >
                  {b.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Generate */}
          <button
            onClick={triggerVisualization}
            disabled={isLoading || isAiConfigured === false}
            className="w-full bg-primary hover:bg-primary-hover text-card py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-[10px]">{progressText}</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Generate Realistic Concept</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Viewport */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="bg-background rounded-2xl border border-border overflow-hidden relative aspect-[4/3] flex items-center justify-center shadow-inner">
            <AnimatePresence mode="wait">
              {isAiConfigured === false ? (
                <motion.div
                  key="no-ai-key"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-card/65 backdrop-blur-sm text-center space-y-3 z-30"
                >
                  <AlertCircle className="w-10 h-10 text-primary" />
                  <h4 className="font-serif text-sm font-semibold text-foreground">AI Visualization Unavailable</h4>
                  <p className="text-xs text-foreground/60 leading-normal max-w-sm">
                    AI visualization is currently unavailable because no image generation provider has been configured.
                  </p>
                </motion.div>
              ) : null}

              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-card/75 backdrop-blur-sm space-y-3 z-30"
                >
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <p className="text-xs text-foreground/75 font-semibold uppercase tracking-wider animate-pulse">
                    {progressText}
                  </p>
                </motion.div>
              ) : null}

              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <BeforeAfterSlider
                    beforeImage={result.before}
                    afterImage={result.after}
                    heightClass="w-full h-full animate-fade-in-up"
                  />
                </motion.div>
              ) : previewUrl ? (
                <motion.div
                  key="uploaded-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center p-6 bg-card"
                >
                  <img src={previewUrl} alt="Before Preview" className="max-h-[85%] object-contain rounded-lg shadow-md" />
                  <span className="text-[10px] text-foreground/50 font-light mt-3 block">Before photo uploaded. Press generate.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-6 space-y-2 flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <Sparkles className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-foreground">Awaiting Upload</h4>
                  <p className="text-[10px] text-foreground/44 font-light max-w-xs leading-normal">
                    Visual comparisons appear here. Upload a construction photo or finished room layout to begin rendering.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message display */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-xl font-light text-center flex items-center justify-center space-x-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Lead Capture Board */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h4 className="text-xs font-bold text-foreground">Love this design? Let JP Enterprises build it.</h4>
                <p className="text-[9px] text-foreground/50 leading-relaxed font-light mt-0.5">
                  Get exact structural mapping and custom woodwork templates based on your visualization.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/book"
                  className="bg-primary hover:bg-primary-hover text-card px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center space-x-1"
                >
                  <Calendar size={12} />
                  <span>Book Visit</span>
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-foreground px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-colors flex items-center space-x-1"
                >
                  <MessageSquare size={12} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="/quote"
                  className="border border-border bg-card text-foreground px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-colors flex items-center space-x-1 hover:border-foreground/30"
                >
                  <FileText size={12} />
                  <span>Get Quote</span>
                </Link>
                <a
                  href={getCallLink()}
                  className="border border-border bg-card text-foreground px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-colors flex items-center space-x-1 hover:border-foreground/30"
                >
                  <Phone size={12} />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
