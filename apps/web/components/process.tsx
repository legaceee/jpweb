"use client";

import { useRef, useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Site Visit",
    description:
      "We visit your space in person — measure the rooms, assess the structure, understand how you use each area, and discuss what you need. No guesswork, no assumptions.",
  },
  {
    number: "02",
    title: "Design & Quote",
    description:
      "You receive a detailed layout plan and an itemised cost breakdown — materials, labour, timelines — all transparent and upfront before any work begins.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our own team handles every trade on site. The owner checks in regularly. You get progress updates and never have to coordinate between separate contractors.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "Final walkthrough together. We address every punch-list item before handing over the keys. The job isn't done until you say it's done.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 px-6 bg-section-alt"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <span className="label-text text-brass-light block mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-paper leading-tight">
            Four steps from
            <br />
            first call to keys in hand
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connecting line (desktop) */}
          <div
            className={`hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-brass-light/30 transition-transform duration-1000 ease-out origin-left ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative p-8 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif font-semibold text-brass-light/80">
                  {step.number}
                </span>
                {/* Brass dot on the connecting line */}
                <div
                  className="hidden lg:block absolute top-[48px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brass-light border-2 border-section-alt z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Brass rule under number */}
              <div className="w-8 h-px bg-brass-light/40 mb-4" aria-hidden="true" />

              <h3 className="text-lg font-serif font-medium text-paper mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-paper/60 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
