"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20JP%20Enterprises%2C%20I%20would%20like%20to%20inquire%20about%20your%20interior%20design%20and%20civil%20contracting%20services.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA56] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-[#25D366]/20 hover:scale-110 active:scale-95 transition-all duration-200"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6 animate-pulse" />
    </motion.a>
  );
}
