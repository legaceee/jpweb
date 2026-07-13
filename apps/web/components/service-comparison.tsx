"use client";

import { Check, X, ShieldAlert, Award, Star } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  warranty: string;
  timeline: string;
  idealFor: string;
  woodwork: string;
  hardware: string;
  finishes: string;
  electrical: string;
  smartHome: boolean;
  architectAssoc: boolean;
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Basic Grade",
    price: "₹1,500 / sqft",
    warranty: "2 Years Warranty",
    timeline: "35 - 45 Days",
    idealFor: "Rental properties & budget apartment layout setups.",
    woodwork: "IS 303 MR Commercial Plywood core",
    hardware: "Standard branded mechanical handles",
    finishes: "0.8mm Gloss Laminate overlay",
    electrical: "Anchor wiring & standard sockets",
    smartHome: false,
    architectAssoc: false
  },
  {
    name: "Premium Luxe",
    price: "₹2,400 / sqft",
    warranty: "5 Years Warranty",
    timeline: "50 - 65 Days",
    idealFor: "Self-occupied family residences & modern flats.",
    woodwork: "IS 710 BWR Water-proof Plywood core",
    hardware: "Hettich soft-close sliders & hinges",
    finishes: "1.0mm Acrylic / Matte Laminate finishes",
    electrical: "Finolex conduits & Legrand sockets",
    smartHome: true,
    architectAssoc: true,
    popular: true
  },
  {
    name: "Ultra Luxury",
    price: "₹3,600 / sqft",
    warranty: "10 Years Warranty",
    timeline: "75 - 90 Days",
    idealFor: "Bespoke high-end private bungalows & penthouses.",
    woodwork: "HDMR core panels with termite shields",
    hardware: "Blum Motion access hinges & touch sensors",
    finishes: "Multi-layer PU Gloss / Veneer coatings",
    electrical: "Havells wire mesh & premium glass touchpads",
    smartHome: true,
    architectAssoc: true
  }
];

export default function ServiceComparison() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Transparency Grid</span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Specifications Matrix</h2>
        <p className="text-sm text-foreground/50 font-light max-w-md mx-auto">
          Compare materials, timelines, warranties, and prices to select the package that fits your build objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-3xl border p-8 flex flex-col justify-between h-[520px] transition-all duration-300 ${
              tier.popular
                ? "bg-primary/5 border-primary shadow-2xl scale-105"
                : "bg-card border-border hover:border-foreground/20 shadow-xl"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-card border border-primary/20 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <Star size={11} fill="currentColor" />
                <span>Best Value Selection</span>
              </span>
            )}

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-xs text-foreground/50 font-light leading-snug">{tier.idealFor}</p>
                <div className="pt-2">
                  <span className="text-xl md:text-2xl font-bold text-primary font-sans">{tier.price}</span>
                </div>
              </div>

              {/* Params */}
              <ul className="space-y-3 text-xs font-light text-foreground/80 border-t border-border/60 pt-4">
                <li className="flex items-center justify-between">
                  <span className="text-foreground/45">Warranty Coverage:</span>
                  <span className="font-semibold text-foreground font-sans">{tier.warranty}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-foreground/45">Timelines:</span>
                  <span className="font-semibold text-foreground font-sans">{tier.timeline}</span>
                </li>
                <li className="flex items-start justify-between">
                  <span className="text-foreground/45">Woodwork Core:</span>
                  <span className="font-semibold text-foreground text-right max-w-[180px] leading-tight block">{tier.woodwork}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-foreground/45">Access Hardware:</span>
                  <span className="font-semibold text-foreground">{tier.hardware.split(" ")[0]} Grade</span>
                </li>
                <li className="flex items-start justify-between">
                  <span className="text-foreground/45">Surface Finishes:</span>
                  <span className="font-semibold text-foreground text-right max-w-[150px] leading-tight block">{tier.finishes}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-foreground/45">Smart Home Automation:</span>
                  <span>
                    {tier.smartHome ? (
                      <Check className="text-primary w-4.5 h-4.5" />
                    ) : (
                      <X className="text-foreground/20 w-4.5 h-4.5" />
                    )}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-foreground/45">Architect Consultation:</span>
                  <span>
                    {tier.architectAssoc ? (
                      <Check className="text-primary w-4.5 h-4.5" />
                    ) : (
                      <X className="text-foreground/20 w-4.5 h-4.5" />
                    )}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="#calculator"
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md ${
                  tier.popular
                    ? "bg-primary hover:bg-primary-hover text-card"
                    : "bg-background hover:bg-foreground/5 text-foreground border border-border"
                }`}
              >
                <span>Select &amp; Estimate Cost</span>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
