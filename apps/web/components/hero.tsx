"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Calculator } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";
import { useI18n } from "../context/i18n-context";

function CompassIllustration() {
  const lineStyle = "stroke-accent fill-none";
  const thinLine = "stroke-[0.5] opacity-40";
  const medLine = "stroke-[1]";
  const thickLine = "stroke-[1.5]";

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-[420px] mx-auto"
      aria-label="Architectural compass and dimension line illustration representing precision and craft"
      role="img"
    >
      <circle
        cx="200"
        cy="200"
        r="160"
        className={`${lineStyle} ${thinLine} draw-svg`}
        style={{ "--path-length": "1005" } as React.CSSProperties}
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        className={`${lineStyle} ${medLine} draw-svg`}
        style={{ "--path-length": "754" } as React.CSSProperties}
      />
      <line
        x1="200"
        y1="40"
        x2="200"
        y2="360"
        className={`${lineStyle} ${thinLine} draw-svg`}
        style={{ "--path-length": "320" } as React.CSSProperties}
      />
      <line
        x1="40"
        y1="200"
        x2="360"
        y2="200"
        className={`${lineStyle} ${thinLine} draw-svg`}
        style={{ "--path-length": "320" } as React.CSSProperties}
      />
      <line
        x1="87"
        y1="87"
        x2="313"
        y2="313"
        className={`${lineStyle} ${thinLine} draw-svg-delayed`}
        style={{ "--path-length": "320" } as React.CSSProperties}
      />
      <line
        x1="313"
        y1="87"
        x2="87"
        y2="313"
        className={`${lineStyle} ${thinLine} draw-svg-delayed`}
        style={{ "--path-length": "320" } as React.CSSProperties}
      />
      <path
        d="M 200 200 L 195 80 L 200 60 L 205 80 Z"
        className={`stroke-accent fill-accent/20 ${thickLine} draw-svg`}
        style={{ "--path-length": "400" } as React.CSSProperties}
      />
      <path
        d="M 200 200 L 195 320 L 200 340 L 205 320 Z"
        className={`stroke-stone fill-none ${medLine} draw-svg-delayed`}
        style={{ "--path-length": "400" } as React.CSSProperties}
      />
      <g
        className="draw-svg-delayed"
        style={{ "--path-length": "300" } as React.CSSProperties}
      >
        <line
          x1="70"
          y1="365"
          x2="330"
          y2="365"
          className={`${lineStyle} ${medLine}`}
        />
        <line
          x1="70"
          y1="358"
          x2="70"
          y2="372"
          className={`${lineStyle} ${medLine}`}
        />
        <line
          x1="330"
          y1="358"
          x2="330"
          y2="372"
          className={`${lineStyle} ${medLine}`}
        />
        <line
          x1="200"
          y1="361"
          x2="200"
          y2="369"
          className={`${lineStyle} ${thinLine}`}
        />
      </g>
      <g
        className="draw-svg-delayed"
        style={{ "--path-length": "300" } as React.CSSProperties}
      >
        <line
          x1="372"
          y1="70"
          x2="372"
          y2="330"
          className={`${lineStyle} ${medLine}`}
        />
        <line
          x1="365"
          y1="70"
          x2="379"
          y2="70"
          className={`${lineStyle} ${medLine}`}
        />
        <line
          x1="365"
          y1="330"
          x2="379"
          y2="330"
          className={`${lineStyle} ${medLine}`}
        />
      </g>
      <path
        d="M 220 200 A 20 20 0 0 0 200 180"
        className={`${lineStyle} ${medLine} draw-svg`}
        style={{ "--path-length": "32" } as React.CSSProperties}
      />
      <path
        d="M 55 55 L 55 40 M 55 55 L 40 55"
        className={`${lineStyle} ${medLine} draw-svg-delayed`}
        style={{ "--path-length": "30" } as React.CSSProperties}
      />
      <path
        d="M 345 55 L 345 40 M 345 55 L 360 55"
        className={`${lineStyle} ${medLine} draw-svg-delayed`}
        style={{ "--path-length": "30" } as React.CSSProperties}
      />
      <path
        d="M 55 345 L 55 360 M 55 345 L 40 345"
        className={`${lineStyle} ${medLine} draw-svg-delayed`}
        style={{ "--path-length": "30" } as React.CSSProperties}
      />
      <path
        d="M 345 345 L 345 360 M 345 345 L 360 345"
        className={`${lineStyle} ${medLine} draw-svg-delayed`}
        style={{ "--path-length": "30" } as React.CSSProperties}
      />
    </svg>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const whatsappUrl = getWhatsAppLink(
    "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
  );

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[8%] top-0 bottom-0 brass-rule-vertical" />
        <div className="absolute right-[8%] top-0 bottom-0 brass-rule-vertical" />
        <div className="absolute top-[30%] left-0 right-0 brass-rule" />
        <div className="absolute bottom-[20%] left-0 right-0 brass-rule" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="label-text text-accent inline-block"
            >
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-fg leading-[1.1] tracking-tight"
            >
              {t.hero.titleLine1}
              <br />
              <span className="text-accent italic">
                {t.hero.titleLine2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg text-muted leading-relaxed font-light max-w-md"
            >
              {t.hero.subline}
            </motion.p>

            {/* 3 CTAs: 1 Primary + 2 Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-accent/10"
              >
                <Phone size={16} />
                {t.hero.ctaBook}
              </a>

              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 border border-card-border bg-card-bg hover:border-accent/40 text-fg px-5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <Calculator size={16} className="text-accent" />
                {t.hero.ctaEstimate}
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <FaWhatsapp className="text-[#25D366] w-[18px] h-[18px]" />
                {t.hero.ctaWhatsapp}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-[280px] sm:w-[340px] lg:w-[400px]">
              <CompassIllustration />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="label-text text-muted/50 text-[8px]">Scroll</span>
        <div className="w-5 h-8 border border-muted/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-accent rounded-full animate-[scroll-hint_2.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
