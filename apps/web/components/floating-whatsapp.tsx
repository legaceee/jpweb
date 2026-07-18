"use client";

import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppLink(
    "Hi JP Enterprises, I have a question about your services."
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with JP Enterprises on WhatsApp"
    >
      {/* Brass ring container */}
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-bg border-2 border-accent shadow-lg shadow-accent/15 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent/25">
        <FaWhatsapp className="text-[#25D366] w-7 h-7" />
      </span>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-fg text-bg text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
