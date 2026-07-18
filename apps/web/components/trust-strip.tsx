"use client";

import { useRef, useEffect, useState } from "react";
import { useI18n } from "../context/i18n-context";

export default function TrustStrip() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const facts = [
    t.trust.fact1,
    t.trust.fact2,
    t.trust.fact3,
    t.trust.fact4,
  ];

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
