"use client";

import { useEffect, useState } from "react";
import { Phone, Calendar, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { contactConfig, getWhatsAppLink } from "../lib/config";

export default function FloatingContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
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
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#121212]/90 border border-white/10 px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-3 backdrop-blur-xl pointer-events-auto"
        >
          {/* Call Link */}
          <a
            href={`tel:${contactConfig.phone}`}
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-2 text-xs font-semibold uppercase tracking-wider"
          >
            <Phone size={14} className="text-primary" />
            <span className="hidden sm:inline">Call</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* WhatsApp Link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors p-2 text-xs font-semibold uppercase tracking-wider"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          {/* Book Link */}
          <Link
            href="/book"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Calendar size={14} />
            <span>Book</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
