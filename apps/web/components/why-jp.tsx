"use client";

import { useRef, useEffect, useState } from "react";

const differentiators = [
  {
    title: "One team for design and construction",
    description:
      "Most interior firms hand off civil work to a third-party contractor. We keep everything in-house, so there's no finger-pointing when something goes wrong and no delays from coordination gaps between separate teams.",
  },
  {
    title: "Transparent quoting, no surprises",
    description:
      "Every material, every labour charge, every contingency is itemised and shared with you before work starts. If something changes during execution, we discuss it and re-quote — you never see a surprise line item on the final bill.",
  },
  {
    title: "Mumbai-local, from materials to manpower",
    description:
      "We source from Mumbai suppliers we've worked with for years. Our team lives and works in this city — we know the building regulations, the monsoon-proofing requirements, and the right local trades for every job.",
  },
  {
    title: "The owner is on your site, not in an office",
    description:
      "This isn't a franchise or a tech platform dispatching anonymous contractors. The owner of JP Enterprises personally visits your site, checks the work, and is your direct point of contact throughout the project.",
  },
];

export default function WhyJP() {
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
    <section id="why-jp" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <span className="label-text text-accent block mb-3">
            Why JP Enterprises
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-fg leading-tight">
            What makes us
            <br />
            different to work with
          </h2>
        </div>

        {/* Differentiators — NOT an icon grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {differentiators.map((item, i) => (
            <div
              key={i}
              className={`relative pl-6 border-l-2 border-accent/30 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <h3 className="text-lg font-serif font-medium text-fg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
