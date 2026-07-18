"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";

/* --------------------------------------------------------------------------
   Design concept items — honest labeling, concept renders not project photos
   -------------------------------------------------------------------------- */

const conceptItems = [
  {
    label: "Interior Design",
    caption: "Living Room",
    src: "/images/concepts/living-room.webp",
    alt: "Concept visualization of a warm minimal living room with charcoal sofa and brass floor lamp",
  },
  {
    label: "Interior Design",
    caption: "Kitchen & Dining",
    src: "/images/concepts/kitchen.webp",
    alt: "Concept visualization of a contemporary Indian kitchen with modular cabinetry",
  },
  {
    label: "Interior Design",
    caption: "Bedroom",
    src: "/images/concepts/bedroom.webp",
    alt: "Concept visualization of a contemporary bedroom with linen headboard and layered bedding",
  },
  {
    label: "Interior Design",
    caption: "Bathroom",
    src: "/images/concepts/bathroom.webp",
    alt: "Concept visualization of a modern bathroom with large-format tiles",
  },
  {
    label: "Interior Design",
    caption: "Hall & Entryway",
    src: "/images/concepts/hall.webp",
    alt: "Concept visualization of a warm contemporary entryway with console table",
  },
  {
    label: "Civil Contracting",
    caption: "Structural Renovation",
    src: "/images/concepts/civil.webp",
    alt: "Concept visualization of a residential building under renovation in Mumbai",
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
      { threshold: 0.1 }
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
            Design Concepts
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-fg leading-tight">
            A preview of the styles
            <br />
            we work in
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed">
            These are concept visualizations — a taste of the aesthetics and
            spatial thinking we bring to every project. Real project photography
            is coming soon.
          </p>
        </div>

        {/* Concept grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {conceptItems.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-card-bg border border-card-border rounded-xl overflow-hidden transition-all duration-700 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Concept badge */}
                <div className="absolute top-3 right-3">
                  <span className="label-text text-[7px] text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                    Concept visualization
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="label-text text-accent text-[9px] block mb-1.5">
                  {item.label}
                </span>
                <p className="text-sm font-medium text-fg">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Honest CTA */}
        <div
          className={`text-center max-w-lg mx-auto space-y-5 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="brass-rule w-12 mx-auto" />
          <p className="text-muted text-base leading-relaxed">
            Want to see real completed work? We&apos;re photographing recent
            projects — in the meantime, request our project album on WhatsApp.
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
