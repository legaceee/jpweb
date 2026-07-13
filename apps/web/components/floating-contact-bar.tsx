"use client";

import { useEffect, useState, useRef } from "react";
import { Phone, Calendar, MessageSquare, Calculator, Sparkles, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactConfig, getWhatsAppLink, getCallLink } from "../lib/config";

export default function FloatingContactBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waLink = getWhatsAppLink("Hi JP Enterprises, I would like to schedule a consultation.");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#121212]/90 border border-white/10 px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-4 md:space-x-6 backdrop-blur-xl pointer-events-auto"
        >
          {/* Call Link */}
          <a
            href={getCallLink()}
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            title="Call Helpline"
          >
            <Phone size={13} className="text-primary" />
            <span className="hidden md:inline">Call Helpline</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* WhatsApp Link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            title="WhatsApp"
          >
            <MessageSquare size={13} className="text-[#25D366]" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* Estimate */}
          <a
            href="#calculator"
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            title="Estimate Cost"
          >
            <Calculator size={13} className="text-primary" />
            <span className="hidden md:inline">Estimate Cost</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* Upload / Visualize */}
          <a
            href="#ai-visualizer"
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            title="Upload Room"
          >
            <Upload size={13} className="text-primary" />
            <span className="hidden md:inline">Upload Room</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* Book Link */}
          <a
            href="#booking"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-card px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Calendar size={13} />
            <span>Book Visit</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
