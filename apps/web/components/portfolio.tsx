"use client";

import { useRef, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";

/* --------------------------------------------------------------------------
   SVG line-art illustrations for portfolio categories — brass linework
   -------------------------------------------------------------------------- */

function LivingRoomIllustration() {
  return (
    <svg viewBox="0 0 200 150" className="w-full" aria-label="Living room line drawing" role="img">
      {/* Floor */}
      <line x1="10" y1="130" x2="190" y2="130" className="stroke-accent stroke-[1] fill-none" />
      {/* Back wall */}
      <line x1="10" y1="20" x2="190" y2="20" className="stroke-accent stroke-[0.5] opacity-30 fill-none" />
      <line x1="10" y1="20" x2="10" y2="130" className="stroke-accent stroke-[0.5] opacity-30 fill-none" />
      <line x1="190" y1="20" x2="190" y2="130" className="stroke-accent stroke-[0.5] opacity-30 fill-none" />
      {/* Sofa */}
      <path d="M 25 130 L 25 95 L 30 90 L 100 90 L 105 95 L 105 130" className="stroke-accent stroke-[1] fill-none" />
      <path d="M 30 90 L 30 82 L 100 82 L 100 90" className="stroke-accent stroke-[0.75] fill-none opacity-60" />
      {/* Coffee table */}
      <rect x="45" y="118" width="40" height="3" className="stroke-accent stroke-[0.5] fill-accent/5" />
      <line x1="50" y1="121" x2="50" y2="130" className="stroke-accent stroke-[0.5] opacity-40 fill-none" />
      <line x1="80" y1="121" x2="80" y2="130" className="stroke-accent stroke-[0.5] opacity-40 fill-none" />
      {/* TV unit */}
      <rect x="135" y="65" width="40" height="50" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      <rect x="140" y="70" width="30" height="18" className="stroke-accent stroke-[0.5] fill-none opacity-40" />
      {/* Pendant light */}
      <line x1="75" y1="20" x2="75" y2="42" className="stroke-accent stroke-[0.5] opacity-40 fill-none" />
      <ellipse cx="75" cy="46" rx="10" ry="5" className="stroke-accent stroke-[0.5] fill-none opacity-50" />
      {/* Rug */}
      <ellipse cx="70" cy="125" rx="35" ry="5" className="stroke-accent stroke-[0.5] fill-none opacity-25" />
    </svg>
  );
}

function KitchenIllustration() {
  return (
    <svg viewBox="0 0 200 150" className="w-full" aria-label="Kitchen plan line drawing" role="img">
      {/* Counter L-shape */}
      <path d="M 15 130 L 15 50 L 120 50 L 120 70 L 35 70 L 35 130" className="stroke-accent stroke-[1] fill-none" />
      {/* Upper cabinets */}
      <rect x="15" y="25" width="105" height="18" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      {/* Sink */}
      <rect x="55" y="55" width="25" height="10" rx="3" className="stroke-accent stroke-[0.75] fill-none opacity-60" />
      {/* Stove burners */}
      <circle cx="30" cy="60" r="5" className="stroke-accent stroke-[0.5] fill-none opacity-50" />
      <circle cx="45" cy="60" r="5" className="stroke-accent stroke-[0.5] fill-none opacity-50" />
      {/* Chimney */}
      <path d="M 22 25 L 22 15 L 52 15 L 52 25" className="stroke-accent stroke-[0.5] fill-none opacity-40" />
      {/* Island / dining table */}
      <rect x="80" y="95" width="80" height="30" rx="2" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      {/* Chairs */}
      <circle cx="90" cy="90" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <circle cx="110" cy="90" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <circle cx="130" cy="90" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <circle cx="90" cy="130" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <circle cx="110" cy="130" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <circle cx="130" cy="130" r="4" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      {/* Fridge */}
      <rect x="170" y="40" width="20" height="45" className="stroke-accent stroke-[0.75] fill-none opacity-40" />
      <line x1="170" y1="55" x2="190" y2="55" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
    </svg>
  );
}

function RenovationIllustration() {
  return (
    <svg viewBox="0 0 200 150" className="w-full" aria-label="Structural renovation cross-section" role="img">
      {/* Building cross-section */}
      <path d="M 20 130 L 20 40 L 100 15 L 180 40 L 180 130" className="stroke-accent stroke-[1.5] fill-none" />
      {/* Foundation */}
      <line x1="10" y1="130" x2="190" y2="130" className="stroke-accent stroke-[2] fill-none" />
      <line x1="10" y1="135" x2="190" y2="135" className="stroke-accent stroke-[0.5] fill-none opacity-25" />
      {/* Floor */}
      <line x1="20" y1="85" x2="180" y2="85" className="stroke-accent stroke-[0.75] fill-none opacity-40" />
      {/* Columns */}
      <rect x="55" y="40" width="6" height="90" className="stroke-accent stroke-[0.5] fill-accent/5" />
      <rect x="140" y="40" width="6" height="90" className="stroke-accent stroke-[0.5] fill-accent/5" />
      {/* Window */}
      <rect x="30" y="92" width="18" height="22" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      <line x1="39" y1="92" x2="39" y2="114" className="stroke-accent stroke-[0.3] fill-none opacity-30" />
      {/* Door */}
      <path d="M 90 130 L 90 105 L 110 105 L 110 130" className="stroke-accent stroke-[1] fill-none" />
      {/* Crack lines (renovation indicator) */}
      <path d="M 160 50 L 163 60 L 158 68 L 162 75" className="stroke-accent stroke-[0.5] fill-none opacity-30" strokeDasharray="2 2" />
      {/* Dimension line */}
      <line x1="20" y1="143" x2="180" y2="143" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <line x1="20" y1="140" x2="20" y2="146" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      <line x1="180" y1="140" x2="180" y2="146" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      {/* Roof truss */}
      <line x1="60" y1="40" x2="100" y2="20" className="stroke-accent stroke-[0.5] fill-none opacity-25" />
      <line x1="140" y1="40" x2="100" y2="20" className="stroke-accent stroke-[0.5] fill-none opacity-25" />
      <line x1="100" y1="20" x2="100" y2="40" className="stroke-accent stroke-[0.5] fill-none opacity-25" />
    </svg>
  );
}

function BathroomIllustration() {
  return (
    <svg viewBox="0 0 200 150" className="w-full" aria-label="Bathroom layout line drawing" role="img">
      {/* Room outline */}
      <rect x="15" y="15" width="170" height="120" className="stroke-accent stroke-[0.75] fill-none opacity-30" />
      {/* Shower area */}
      <rect x="20" y="20" width="55" height="55" className="stroke-accent stroke-[0.75] fill-none opacity-40" />
      <circle cx="47" cy="47" r="15" className="stroke-accent stroke-[0.5] fill-none opacity-20" />
      {/* Shower head */}
      <circle cx="47" cy="47" r="4" className="stroke-accent stroke-[0.5] fill-accent/10" />
      {/* Vanity / sink */}
      <rect x="90" y="20" width="45" height="25" rx="2" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      <ellipse cx="112" cy="32" rx="10" ry="7" className="stroke-accent stroke-[0.5] fill-none opacity-40" />
      {/* Mirror */}
      <rect x="95" y="12" width="35" height="3" className="stroke-accent stroke-[0.5] fill-accent/10" />
      {/* Toilet */}
      <ellipse cx="155" cy="90" rx="15" ry="18" className="stroke-accent stroke-[0.75] fill-none opacity-50" />
      <rect x="145" y="72" width="20" height="8" rx="3" className="stroke-accent stroke-[0.5] fill-none opacity-30" />
      {/* Floor tiles pattern */}
      <line x1="15" y1="75" x2="185" y2="75" className="stroke-accent stroke-[0.3] fill-none opacity-15" />
      <line x1="60" y1="15" x2="60" y2="135" className="stroke-accent stroke-[0.3] fill-none opacity-15" />
      <line x1="120" y1="15" x2="120" y2="135" className="stroke-accent stroke-[0.3] fill-none opacity-15" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Portfolio items
   -------------------------------------------------------------------------- */

const portfolioItems = [
  {
    label: "Interior Design",
    caption: "Living Room",
    Illustration: LivingRoomIllustration,
  },
  {
    label: "Interior Design",
    caption: "Kitchen & Dining",
    Illustration: KitchenIllustration,
  },
  {
    label: "Civil Contracting",
    caption: "Structural Renovation",
    Illustration: RenovationIllustration,
  },
  {
    label: "Civil Contracting",
    caption: "Bathroom Refit",
    Illustration: BathroomIllustration,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = getWhatsAppLink(
    "Hi, I'd like to see JP Enterprises' project album."
  );

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <span className="label-text text-accent block mb-3">
            Our Recent Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-fg leading-tight">
            The kind of work
            <br />
            we do every day
          </h2>
        </div>

        {/* Illustration grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className={`bg-card-bg border border-card-border rounded-xl p-6 transition-all duration-700 hover:border-accent/30 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/3] flex items-center justify-center mb-4">
                <item.Illustration />
              </div>
              <span className="label-text text-accent text-[9px] block mb-1">
                {item.label}
              </span>
              <p className="text-sm font-medium text-fg">{item.caption}</p>
            </div>
          ))}
        </div>

        {/* Honest empty state CTA */}
        <div
          className={`text-center max-w-lg mx-auto space-y-5 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="brass-rule w-12 mx-auto" />
          <p className="text-muted text-base leading-relaxed">
            Portfolio launching soon — we&apos;re photographing recent projects. In
            the meantime, request our project album on WhatsApp to see completed
            work firsthand.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <FaWhatsapp className="text-[#25D366] w-[18px] h-[18px]" />
            Request Project Album
          </a>
        </div>
      </div>
    </section>
  );
}
