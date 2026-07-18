"use client";

import { useRef, useEffect, useState } from "react";

const facts = [
  "Decades of hands-on contracting experience in Mumbai",
  "Interior design & civil contracting under one roof",
  "Serving homes and businesses across Mumbai",
  "Owner-managed — single point of contact from start to finish",
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-12 border-y border-card-border bg-card-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {facts.map((fact, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Brass dot */}
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm text-muted font-light">{fact}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
