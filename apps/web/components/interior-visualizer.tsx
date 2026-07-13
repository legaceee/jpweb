"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Compass, Layout, Sliders, Check } from "lucide-react";

interface Option {
  name: string;
  value: string;
  color?: string;
  previewUrl: string;
}

const wallPaints: Option[] = [
  { name: "Luxury Alabaster", value: "alabaster", color: "#F4F1EA", previewUrl: "/images/hero_bg.png" },
  { name: "Nordic Sage", value: "sage", color: "#8E9B8D", previewUrl: "/images/interior_bedroom.png" },
  { name: "Warm Greige", value: "greige", color: "#C6C1B6", previewUrl: "/images/hero_bg.png" },
  { name: "Midnight Slate", value: "slate", color: "#3B424C", previewUrl: "/images/commercial_office.png" },
];

const flooringOptions: Option[] = [
  { name: "Carrara Marble", value: "marble", previewUrl: "/images/hero_bg.png" },
  { name: "Smoked Oak Parquet", value: "oak", previewUrl: "/images/interior_bedroom.png" },
  { name: "Polished Concrete", value: "concrete", previewUrl: "/images/commercial_office.png" },
];

const cabinetTrims: Option[] = [
  { name: "Matte Graphite", value: "graphite", previewUrl: "/images/interior_kitchen.png" },
  { name: "Warm Walnut", value: "walnut", previewUrl: "/images/interior_kitchen.png" },
  { name: "Brushed Champagne Gold", value: "gold", previewUrl: "/images/interior_kitchen.png" },
];

const designStyles = [
  { name: "Modern Luxury", desc: "Italian marble, brass trims, high gloss paneling." },
  { name: "Warm Minimalism", desc: "Oak wood, cream textiles, concealed cove lights." },
  { name: "Scandinavian", desc: "Light birch, pastel accents, clean lines." },
  { name: "Industrial Loft", desc: "Exposed brick, iron frameworks, concrete finishes." },
];

export default function InteriorVisualizer() {
  const [selectedWall, setSelectedWall] = useState(wallPaints[0]!);
  const [selectedFloor, setSelectedFloor] = useState(flooringOptions[0]!);
  const [selectedTrim, setSelectedTrim] = useState(cabinetTrims[0]!);
  const [activeStyle, setActiveStyle] = useState(designStyles[0]!.name);

  // Dynamic preview image selector based on user selections
  const getPreviewImage = () => {
    if (activeStyle === "Modern Luxury") {
      return selectedWall?.previewUrl || "/images/hero_bg.png";
    } else if (activeStyle === "Warm Minimalism") {
      return selectedFloor?.previewUrl || "/images/interior_bedroom.png";
    } else if (activeStyle === "Industrial Loft") {
      return "/images/commercial_office.png";
    } else {
      return selectedTrim?.previewUrl || "/images/interior_kitchen.png";
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Interactive Preview Frame */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-black shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={getPreviewImage()}
                src={getPreviewImage()}
                alt="Interior Visualizer Preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Subtle Overlay filter to simulate Wall Color tinting */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color opacity-25 transition-all duration-500"
              style={{ backgroundColor: selectedWall?.color }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-white/50 border-t border-white/5 pt-4">
            <span className="flex items-center space-x-2">
              <Sliders size={14} className="text-primary" />
              <span>Interactive Render Engine v2.1</span>
            </span>
            <span>Swapping selects updates model textures instantly</span>
          </div>
        </div>

        {/* Right: Dashboard Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-white font-semibold">Material Visualizer Dashboard</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light pt-1">
              Select wood finishes, stone profiles, and luxury paint colors to customize your living layout space.
            </p>
          </div>

          {/* Wall Paint Swatches */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-white/60 font-semibold uppercase tracking-widest flex items-center space-x-2">
              <Paintbrush size={11} className="text-primary" />
              <span>Wall Paint Color</span>
            </h4>
            <div className="flex gap-3">
              {wallPaints.map((paint) => (
                <button
                  key={paint.value}
                  onClick={() => setSelectedWall(paint)}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                    selectedWall?.value === paint.value
                      ? "border-primary scale-110 shadow-lg"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ backgroundColor: paint.color }}
                  title={paint.name}
                >
                  {selectedWall?.value === paint.value && (
                    <Check size={14} className={paint.value === "alabaster" ? "text-dark" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-primary font-medium">{selectedWall?.name}</p>
          </div>

          {/* Flooring Finishes */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-white/60 font-semibold uppercase tracking-widest flex items-center space-x-2">
              <Layout size={11} className="text-primary" />
              <span>Floor Material</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {flooringOptions.map((floor) => (
                <button
                  key={floor.value}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-3 py-2.5 rounded-xl border text-[11px] font-semibold text-center cursor-pointer transition-all ${
                    selectedFloor?.value === floor.value
                      ? "bg-primary text-dark border-primary font-bold"
                      : "bg-[#121212] text-white/70 border-white/5 hover:border-white/20"
                  }`}
                >
                  {floor.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cabinets Trim */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-white/60 font-semibold uppercase tracking-widest flex items-center space-x-2">
              <Compass size={11} className="text-primary" />
              <span>Cabinet Accents</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {cabinetTrims.map((trim) => (
                <button
                  key={trim.value}
                  onClick={() => setSelectedTrim(trim)}
                  className={`px-3 py-2.5 rounded-xl border text-[11px] font-semibold text-center cursor-pointer transition-all ${
                    selectedTrim?.value === trim.value
                      ? "bg-primary text-dark border-primary font-bold"
                      : "bg-[#121212] text-white/70 border-white/5 hover:border-white/20"
                  }`}
                >
                  {trim.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Design Theme Styles */}
          <div className="space-y-3 border-t border-white/5 pt-6">
            <h4 className="text-[10px] text-white/60 font-semibold uppercase tracking-widest block">
              Luxury Furniture Themes
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {designStyles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setActiveStyle(style.name)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    activeStyle === style.name
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-[#121212] text-white/60 border-white/5 hover:border-white/10"
                  }`}
                >
                  <h5 className="text-xs font-bold text-white">{style.name}</h5>
                  <p className="text-[9px] text-white/40 font-light mt-0.5">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
