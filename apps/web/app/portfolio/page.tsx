"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye, Tag } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: "Interior" | "Civil" | "Commercial" | "Residential";
  image: string;
  description: string;
  location: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Minimalist Modular Kitchen",
    category: "Interior",
    image: "/images/interior_kitchen.png",
    description: "Bespoke kitchen featuring matte-charcoal soft-close cabinets, white marble quartz island, and premium gold accents.",
    location: "Koregaon Park, Pune",
    client: "Mehta Residence"
  },
  {
    id: 2,
    title: "Double-Height Luxury Lounge",
    category: "Residential",
    image: "/images/hero_bg.png",
    description: "High-ceiling living room utilizing dry-laid Italian marble flooring, oak-slat wall panels, and bespoke pendant lighting.",
    location: "Kalyani Nagar, Pune",
    client: "Dr. Kulkarni"
  },
  {
    id: 3,
    title: "Commercial Steel Concrete Structure",
    category: "Civil",
    image: "/images/civil_construction.png",
    description: "Structural concrete framing, columns casting, and reinforced masonry foundations for a multi-level office park.",
    location: "Hinjewadi, Pune",
    client: "Vertex Corporates"
  },
  {
    id: 4,
    title: "Master Suite & Wardrobes",
    category: "Residential",
    image: "/images/interior_bedroom.png",
    description: "Bespoke bedroom interior with integrated sliding-profile glass doors, LED garment hangers, and PU finishes.",
    location: "Aundh, Pune",
    client: "Ranade Residence"
  },
  {
    id: 5,
    title: "Executive Corporate Lobby",
    category: "Commercial",
    image: "/images/commercial_office.png",
    description: "Modern lobby design incorporating acoustic wood slat panel walls, polished concrete flooring, and linear light track modules.",
    location: "Baner, Pune",
    client: "Innovo Tech Labs"
  },
  {
    id: 6,
    title: "Luxury Dining Wood Accents",
    category: "Interior",
    image: "/images/hero_bg.png",
    description: "Premium dining lounge utilizing walnut panel wall wraps and designer light configurations for high-end hospitality.",
    location: "Viman Nagar, Pune",
    client: "Oasis Bistro"
  },
  {
    id: 7,
    title: "Bespoke Kitchen Dry-Bar",
    category: "Interior",
    image: "/images/interior_kitchen.png",
    description: "Dual kitchen layout incorporating custom cutlery drawer systems, tandem pantries, and profile handle designs.",
    location: "Kalyani Nagar, Pune",
    client: "Dr. Kulkarni"
  },
  {
    id: 8,
    title: "RCC Frame Roof Casting",
    category: "Civil",
    image: "/images/civil_construction.png",
    description: "Milestone roof slab formwork, high-grade steel grids assembly, and concrete casting supervising for a private villa.",
    location: "Lonavala, Pune",
    client: "Singhania Estate"
  }
];

const categories = ["All", "Interior", "Civil", "Commercial", "Residential"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openLightbox = (index: number) => {
    // Find absolute project index in projects array matching the filtered items index
    const selectedProject = filteredProjects[index];
    const absoluteIndex = projects.findIndex(p => p.id === selectedProject?.id);
    setLightboxIndex(absoluteIndex !== -1 ? absoluteIndex : null);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1));
    }
  };

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white/90 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
            Craftsmanship
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Featured Projects Gallery
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto">
            Explore a curated selection of our luxury residential interiors, modern workspace designs, and heavy civil construction structures.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-primary text-dark shadow-md"
                  : "bg-[#1A1A1A] text-white/70 hover:bg-white/5 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                key={project.id}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-square bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Glassmorphic Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                    <span className="bg-primary/20 text-primary border border-primary/20 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider w-fit inline-block">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-lg text-white font-semibold">{project.title}</h3>
                    <p className="text-white/60 text-xs font-light line-clamp-1">{project.location}</p>
                    <span className="text-primary text-xs font-bold pt-2 flex items-center space-x-1">
                      <span>View Details</span>
                      <Eye size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal Overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-3 cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute right-6 top-6 z-10 bg-[#121212]/80 hover:bg-white/10 p-2 rounded-full text-white cursor-pointer transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Left Side: Image Content */}
                <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto bg-black flex items-center justify-center">
                  <img
                    src={projects[lightboxIndex]?.image}
                    alt={projects[lightboxIndex]?.title}
                    className="max-h-[70vh] max-w-full object-contain"
                  />

                  {/* Nav Controls */}
                  <button
                    onClick={prevProject}
                    className="absolute left-4 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextProject}
                    className="absolute right-4 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white cursor-pointer transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Right Side: Details */}
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="bg-primary/20 text-primary border border-primary/20 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider w-fit inline-block">
                      {projects[lightboxIndex]?.category} Project
                    </span>
                    <h2 className="font-serif text-2xl text-white font-bold">
                      {projects[lightboxIndex]?.title}
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {projects[lightboxIndex]?.description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-6 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/40">Location:</span>
                      <span className="text-white/80 font-medium">{projects[lightboxIndex]?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Client Scope:</span>
                      <span className="text-white/80 font-medium">{projects[lightboxIndex]?.client}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
