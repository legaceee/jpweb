"use client";

import { useRef, useEffect, useState } from "react";

/* --------------------------------------------------------------------------
   SVG line-art illustrations for each service — brass linework style
   -------------------------------------------------------------------------- */

function InteriorDesignIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full max-w-[240px]"
      aria-label="Line illustration of interior room layout"
      role="img"
    >
      {/* Room outline */}
      <rect
        x="20" y="20" width="200" height="140"
        className="stroke-accent fill-none stroke-[1.5] draw-svg"
        style={{ "--path-length": "680" } as React.CSSProperties}
      />
      {/* Floor line */}
      <line
        x1="20" y1="130" x2="220" y2="130"
        className="stroke-accent fill-none stroke-[0.75] opacity-40 draw-svg-delayed"
        style={{ "--path-length": "200" } as React.CSSProperties}
      />
      {/* Sofa — side view */}
      <path
        d="M 40 130 L 40 110 L 45 105 L 105 105 L 110 110 L 110 130"
        className="stroke-accent fill-none stroke-[1] draw-svg-delayed"
        style={{ "--path-length": "160" } as React.CSSProperties}
      />
      {/* Sofa back */}
      <line
        x1="45" y1="105" x2="45" y2="95"
        className="stroke-accent fill-none stroke-[1] draw-svg-delayed"
        style={{ "--path-length": "10" } as React.CSSProperties}
      />
      <line
        x1="45" y1="95" x2="105" y2="95"
        className="stroke-accent fill-none stroke-[1] draw-svg-delayed"
        style={{ "--path-length": "60" } as React.CSSProperties}
      />
      <line
        x1="105" y1="95" x2="105" y2="105"
        className="stroke-accent fill-none stroke-[1] draw-svg-delayed"
        style={{ "--path-length": "10" } as React.CSSProperties}
      />
      {/* Window */}
      <rect
        x="140" y="35" width="50" height="45"
        className="stroke-accent fill-none stroke-[0.75] opacity-60 draw-svg-delayed"
        style={{ "--path-length": "190" } as React.CSSProperties}
      />
      <line
        x1="165" y1="35" x2="165" y2="80"
        className="stroke-accent fill-none stroke-[0.5] opacity-40"
      />
      <line
        x1="140" y1="57" x2="190" y2="57"
        className="stroke-accent fill-none stroke-[0.5] opacity-40"
      />
      {/* Pendant light */}
      <line
        x1="120" y1="20" x2="120" y2="45"
        className="stroke-accent fill-none stroke-[0.5] opacity-50 draw-svg"
        style={{ "--path-length": "25" } as React.CSSProperties}
      />
      <circle
        cx="120" cy="50" r="8"
        className="stroke-accent fill-none stroke-[0.75] draw-svg-delayed"
        style={{ "--path-length": "50" } as React.CSSProperties}
      />
      {/* Table */}
      <rect
        x="55" y="115" width="40" height="2"
        className="stroke-accent fill-accent/10 stroke-[0.5]"
      />
      <line
        x1="60" y1="117" x2="60" y2="130"
        className="stroke-accent fill-none stroke-[0.5] opacity-40"
      />
      <line
        x1="90" y1="117" x2="90" y2="130"
        className="stroke-accent fill-none stroke-[0.5] opacity-40"
      />
    </svg>
  );
}

function CivilContractingIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full max-w-[240px]"
      aria-label="Line illustration of building cross-section showing structural work"
      role="img"
    >
      {/* Building outline */}
      <path
        d="M 30 150 L 30 50 L 120 20 L 210 50 L 210 150"
        className="stroke-accent fill-none stroke-[1.5] draw-svg"
        style={{ "--path-length": "500" } as React.CSSProperties}
      />
      {/* Foundation */}
      <line
        x1="20" y1="150" x2="220" y2="150"
        className="stroke-accent fill-none stroke-[2] draw-svg"
        style={{ "--path-length": "200" } as React.CSSProperties}
      />
      {/* Floor levels */}
      <line
        x1="30" y1="100" x2="210" y2="100"
        className="stroke-accent fill-none stroke-[0.75] opacity-50 draw-svg-delayed"
        style={{ "--path-length": "180" } as React.CSSProperties}
      />
      {/* Columns */}
      <line
        x1="70" y1="40" x2="70" y2="150"
        className="stroke-accent fill-none stroke-[1] opacity-40 draw-svg-delayed"
        style={{ "--path-length": "110" } as React.CSSProperties}
      />
      <line
        x1="170" y1="40" x2="170" y2="150"
        className="stroke-accent fill-none stroke-[1] opacity-40 draw-svg-delayed"
        style={{ "--path-length": "110" } as React.CSSProperties}
      />
      {/* Window openings */}
      <rect
        x="45" y="108" width="20" height="25"
        className="stroke-accent fill-none stroke-[0.75] opacity-60 draw-svg-delayed"
        style={{ "--path-length": "90" } as React.CSSProperties}
      />
      <rect
        x="175" y="108" width="20" height="25"
        className="stroke-accent fill-none stroke-[0.75] opacity-60 draw-svg-delayed"
        style={{ "--path-length": "90" } as React.CSSProperties}
      />
      {/* Door */}
      <path
        d="M 110 150 L 110 120 L 130 120 L 130 150"
        className="stroke-accent fill-none stroke-[1] draw-svg-delayed"
        style={{ "--path-length": "80" } as React.CSSProperties}
      />
      {/* Roof truss detail */}
      <path
        d="M 60 50 L 120 25 L 180 50"
        className="stroke-accent fill-none stroke-[0.5] opacity-30 draw-svg-delayed"
        style={{ "--path-length": "150" } as React.CSSProperties}
      />
      {/* Dimension line bottom */}
      <g className="draw-svg-delayed" style={{ "--path-length": "220" } as React.CSSProperties}>
        <line x1="30" y1="165" x2="210" y2="165" className="stroke-accent fill-none stroke-[0.5] opacity-40" />
        <line x1="30" y1="161" x2="30" y2="169" className="stroke-accent fill-none stroke-[0.5] opacity-40" />
        <line x1="210" y1="161" x2="210" y2="169" className="stroke-accent fill-none stroke-[0.5] opacity-40" />
      </g>
      {/* Brick texture hint */}
      <line x1="35" y1="110" x2="45" y2="110" className="stroke-accent fill-none stroke-[0.3] opacity-20" />
      <line x1="37" y1="115" x2="43" y2="115" className="stroke-accent fill-none stroke-[0.3] opacity-20" />
      <line x1="35" y1="120" x2="45" y2="120" className="stroke-accent fill-none stroke-[0.3] opacity-20" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Service data
   -------------------------------------------------------------------------- */

const services = [
  {
    id: "interior",
    eyebrow: "Interior Design",
    title: "Spaces designed around the way you actually live",
    description:
      "We don't sell catalogue templates — every layout is drawn after understanding your family's routines, storage needs, and how each room is used daily.",
    includes: [
      "Space planning and room layout customised to your flat or bungalow",
      "Material selection — tiles, laminates, hardware, paint finishes",
      "Modular kitchen design with Indian cooking workflows in mind",
      "Custom wardrobes, storage units, and built-in cabinetry",
      "Lighting design — ambient, task, and accent layers",
      "Full project management from design sign-off to handover",
    ],
    Illustration: InteriorDesignIllustration,
  },
  {
    id: "civil",
    eyebrow: "Civil Contracting",
    title: "Structural work you can build on — literally",
    description:
      "From breaking down old walls to raising new ones, we handle the heavy civil work that most interior firms outsource. One team, one timeline, one point of accountability.",
    includes: [
      "Residential and commercial construction",
      "Full-flat and room-by-room renovation",
      "Structural repair, waterproofing, and dampness treatment",
      "Plastering, flooring, and tiling",
      "Plumbing and electrical rough-in and finishing",
      "Turnkey execution — we manage every trade so you don't have to",
    ],
    Illustration: CivilContractingIllustration,
  },
];

export default function Services() {
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

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 max-w-xl">
          <span className="label-text text-accent block mb-3">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-fg leading-tight">
            Two disciplines,
            <br />
            one accountable team
          </h2>
        </div>

        {/* Service cards */}
        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Illustration */}
              <div
                className={`lg:col-span-4 flex justify-center ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="p-8 bg-card-bg rounded-2xl border border-card-border">
                  <service.Illustration />
                </div>
              </div>

              {/* Content */}
              <div
                className={`lg:col-span-8 space-y-6 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <span className="label-text text-accent">{service.eyebrow}</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-fg leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted text-base leading-relaxed max-w-xl">
                  {service.description}
                </p>

                {/* What's included */}
                <div className="pt-4">
                  <span className="label-text text-muted/60 block mb-4">
                    What&apos;s included
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        {/* Brass tick mark */}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          className="shrink-0 mt-1"
                          aria-hidden="true"
                        >
                          <path
                            d="M 2 7 L 5.5 10.5 L 12 3.5"
                            className="stroke-accent fill-none stroke-[1.5]"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm text-muted leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
