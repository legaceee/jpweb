"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, DollarSign, MapPin, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectItem {
  title: string;
  location: string;
  budget: string;
  duration: string;
  category: string;
  image: string;
  desc: string;
}

const projects: ProjectItem[] = [
  {
    title: "Minimalist Modular Kitchen",
    location: "Koregaon Park, Pune",
    budget: "₹14 Lakhs",
    duration: "45 Days",
    category: "Interior",
    image: "/images/interior_kitchen.png",
    desc: "Seamless handle-less acrylic cabinet storage with quartz countertops."
  },
  {
    title: "Double-Height Luxury Lounge",
    location: "Kalyani Nagar, Pune",
    budget: "₹32 Lakhs",
    duration: "75 Days",
    category: "Residential",
    image: "/images/hero_bg.png",
    desc: "Italian marble dry-lay floors, wooden rafters, and customized drop chandeliers."
  },
  {
    title: "Corporate Office Lounge",
    location: "Baner, Pune",
    budget: "₹45 Lakhs",
    duration: "90 Days",
    category: "Commercial",
    image: "/images/commercial_office.png",
    desc: "Acoustic grid partition wall boards, linear profile lighting, and modular desks."
  },
  {
    title: "Master Suite & Glass Wardrobes",
    location: "Aundh, Pune",
    budget: "₹18 Lakhs",
    duration: "55 Days",
    category: "Residential",
    image: "/images/interior_bedroom.png",
    desc: "Concealed profile tracking led lighting, sliding tint doors, and HDMR wardrobes."
  },
  {
    title: "RCC Frame Civil Structure",
    location: "Hinjewadi, Pune",
    budget: "₹120 Lakhs",
    duration: "240 Days",
    category: "Civil",
    image: "/images/civil_construction.png",
    desc: "Multi-level concrete pouring, structural steel pile reinforcements, and masonry excavation."
  }
];

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  // Drag handler threshold
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  return (
    <div className="space-y-12">
      {/* Coverflow Stack Wrapper */}
      <div className="relative h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[900px] h-[340px] md:h-[400px] flex items-center justify-center">
          
          {projects.map((project, idx) => {
            // Calculate distance from active card to assign styles
            const distance = idx - activeIndex;
            const isActive = idx === activeIndex;
            const isVisible = Math.abs(distance) <= 1 || (idx === 0 && activeIndex === projects.length - 1) || (idx === projects.length - 1 && activeIndex === 0);

            if (!isVisible) return null;

            // Positioning variables
            let xOffset = 0;
            if (distance === 1 || (distance === -(projects.length - 1))) {
              xOffset = 180; // Side right
            } else if (distance === -1 || (distance === projects.length - 1)) {
              xOffset = -180; // Side left
            }

            return (
              <motion.div
                key={idx}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute w-[280px] sm:w-[350px] md:w-[440px] h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-grab active:cursor-grabbing select-none origin-bottom"
                style={{ zIndex: isActive ? 20 : 10 }}
                animate={{
                  x: xOffset,
                  scale: isActive ? 1.05 : 0.85,
                  opacity: isActive ? 1 : 0.45,
                  rotateY: isActive ? 0 : distance > 0 ? -12 : 12,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Cover overlay when inactive */}
                {!isActive && (
                  <div className="absolute inset-0 bg-[#121212]/50 hover:bg-[#121212]/30 transition-colors" />
                )}

                {/* Details overlay inside card */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <span className="bg-primary/20 text-primary border border-primary/20 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest w-fit mb-2">
                      {project.category} Project
                    </span>
                    <h3 className="font-serif text-lg md:text-2xl text-white font-bold leading-tight">
                      {project.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>

        {/* Floating Manual Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10 text-white cursor-pointer transition-colors z-30"
          aria-label="Previous Project"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10 text-white cursor-pointer transition-colors z-30"
          aria-label="Next Project"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Active Project Specifications Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl items-center"
        >
          <div className="space-y-3">
            <h4 className="font-serif text-xl text-white font-semibold">{projects[activeIndex]?.title}</h4>
            <p className="text-xs text-white/50 leading-relaxed font-light">{projects[activeIndex]?.desc}</p>
            <div className="pt-2">
              <Link
                href="/portfolio"
                className="text-xs text-primary font-semibold flex items-center space-x-1 hover:text-white transition-colors tracking-wide uppercase"
              >
                <span>View Full Showcase</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-l border-white/5 pl-0 md:pl-8">
            <div className="space-y-1">
              <span className="text-[10px] text-white/30 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <MapPin size={11} className="text-primary" />
                <span>Location</span>
              </span>
              <p className="text-xs text-white/80 font-medium">{projects[activeIndex]?.location}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white/30 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <DollarSign size={11} className="text-primary" />
                <span>Approx Budget</span>
              </span>
              <p className="text-xs text-white/80 font-medium">{projects[activeIndex]?.budget}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white/30 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <Clock size={11} className="text-primary" />
                <span>Timeframe</span>
              </span>
              <p className="text-xs text-white/80 font-medium">{projects[activeIndex]?.duration}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white/30 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                <Calendar size={11} className="text-primary" />
                <span>Scope</span>
              </span>
              <p className="text-xs text-white/80 font-medium">{projects[activeIndex]?.category} Build</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
