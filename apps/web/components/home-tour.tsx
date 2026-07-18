"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";
import { TOUR_ROOM_POSITIONS, RoomConfig } from "./home-tour-scene";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import WebGL 3D Canvas scene (SSR disabled for Three.js)
const HomeTourScene = dynamic(() => import("./home-tour-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1C1B19] flex items-center justify-center">
      <span className="label-text text-brass-light animate-pulse">
        Loading 3D Walkthrough...
      </span>
    </div>
  ),
});

/* --------------------------------------------------------------------------
   Progress Dots
   -------------------------------------------------------------------------- */

function ProgressDots({
  activeIndex,
  onJump,
  orientation = "vertical",
}: {
  activeIndex: number;
  onJump: (index: number) => void;
  orientation?: "vertical" | "horizontal";
}) {
  const isVertical = orientation === "vertical";

  return (
    <nav
      role="tablist"
      aria-label="Room tour progress"
      className={`flex ${
        isVertical ? "flex-col gap-5" : "flex-row gap-4 justify-center"
      } items-center`}
    >
      {TOUR_ROOM_POSITIONS.map((room, i) => (
        <button
          key={room.id}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`View ${room.eyebrow}`}
          onClick={() => onJump(i)}
          className="group flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-2.5 h-2.5 bg-accent shadow-[0_0_8px_var(--color-accent)]"
                : "w-1.5 h-1.5 bg-muted/40 group-hover:bg-accent/60"
            }`}
          />
          {isVertical && (
            <span
              className={`label-text text-[8px] transition-all duration-300 whitespace-nowrap ${
                i === activeIndex
                  ? "text-accent opacity-100"
                  : "text-muted/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              {room.eyebrow}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

/* --------------------------------------------------------------------------
   WebGL 3D Scroll Dolly Tour Component (Desktop + Mobile)
   -------------------------------------------------------------------------- */

function WebGL3DTour({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const whatsappUrl = useMemo(
    () =>
      getWhatsAppLink(
        "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
      ),
    []
  );

  useGSAP(
    () => {
      if (!containerRef.current || !pinnedRef.current) return;

      const totalRooms = TOUR_ROOM_POSITIONS.length;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinnedRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (totalRooms - 1)}`,
        scrub: 0.5,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          const idx = Math.min(
            Math.floor(prog * totalRooms),
            totalRooms - 1
          );
          setActiveIndex(idx);
        },
      });

      return () => st.kill();
    },
    { scope: containerRef }
  );

  const handleJump = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const perRoom = window.innerHeight;
    const targetScroll = containerTop + index * perRoom;
    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: false },
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, []);

  const handleSkip = useCallback(() => {
    if (!containerRef.current) return;
    const containerBottom =
      containerRef.current.getBoundingClientRect().bottom + window.scrollY;
    gsap.to(window, {
      scrollTo: { y: containerBottom + 10, autoKill: false },
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  const activeRoom = (TOUR_ROOM_POSITIONS[activeIndex] || TOUR_ROOM_POSITIONS[0])!;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${TOUR_ROOM_POSITIONS.length * 100}vh` }}
    >
      <div ref={pinnedRef} className="relative w-full h-screen overflow-hidden bg-[#1C1B19]">
        {/* WebGL 3D Canvas Scene */}
        <div className="absolute inset-0">
          <HomeTourScene scrollProgress={scrollProgress} isMobile={isMobile} />
        </div>

        {/* Ambient Dark Gradient for text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />

        {/* Overlay Copy — transitions as room index updates */}
        <div className="absolute bottom-0 left-0 right-0 pb-28 sm:pb-32 px-6 lg:px-16 z-20 pointer-events-none">
          <div className="max-w-2xl transition-all duration-500 transform translate-y-0">
            <span className="label-text text-accent text-[9px] sm:text-[10px] block mb-2 sm:mb-3">
              {activeRoom.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white leading-[1.15] mb-3 sm:mb-4">
              {activeRoom.headline}
            </h2>
            <p className="text-sm sm:text-lg text-white/80 font-light leading-relaxed max-w-lg">
              {activeRoom.subline}
            </p>
          </div>
        </div>

        {/* Concept visualization badge */}
        <div className="absolute top-6 right-6 z-30">
          <span className="label-text text-[8px] text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
            Concept visualization
          </span>
        </div>

        {/* Progress dots */}
        <div
          className={`absolute z-30 ${
            isMobile
              ? "bottom-6 left-1/2 -translate-x-1/2"
              : "left-6 lg:left-10 top-1/2 -translate-y-1/2"
          }`}
        >
          <ProgressDots
            activeIndex={activeIndex}
            onJump={handleJump}
            orientation={isMobile ? "horizontal" : "vertical"}
          />
        </div>

        {/* Skip tour button */}
        {!isMobile && (
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 z-30 label-text text-[9px] text-white/40 hover:text-white/80 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            Skip tour
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="opacity-60"
            >
              <path
                d="M5 2L5 8M5 8L2 5.5M5 8L8 5.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* End-of-tour CTA — resolves on last room (Bathroom) */}
        <div
          className={`absolute bottom-20 sm:bottom-24 left-0 right-0 flex justify-center z-30 transition-all duration-500 ${
            activeIndex === TOUR_ROOM_POSITIONS.length - 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="text-center px-6">
            <p className="text-base sm:text-xl text-white/90 font-serif italic mb-4 sm:mb-6">
              Ready to design a space like this?
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-accent/20"
              >
                <Phone size={16} />
                Book a Site Visit
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-5 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                <FaWhatsapp className="text-[#25D366] w-[18px] h-[18px]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reduced Motion / WebGL Unavailable Fallback Component
   -------------------------------------------------------------------------- */

function ReducedMotionTour() {
  const whatsappUrl = useMemo(
    () =>
      getWhatsAppLink(
        "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
      ),
    []
  );

  return (
    <div>
      {TOUR_ROOM_POSITIONS.map((room) => (
        <section key={room.id} className="relative w-full h-[70vh] min-h-[500px]">
          <Image
            src={room.src}
            alt={room.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

          {/* Concept badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="label-text text-[8px] text-white/50 bg-black/30 px-2 py-0.5 rounded">
              Concept visualization
            </span>
          </div>

          <div className="absolute bottom-12 left-0 right-0 px-6 lg:px-16">
            <div className="max-w-2xl">
              <span className="label-text text-accent text-[10px] block mb-2">
                {room.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-white leading-[1.15] mb-3">
                {room.headline}
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-lg">
                {room.subline}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* End-of-tour CTA */}
      <div className="py-12 px-6 bg-bg text-center">
        <p className="text-lg text-fg/80 font-serif italic mb-5">
          Ready to design a space like this?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <Phone size={16} />
            Book a Site Visit
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <FaWhatsapp className="text-[#25D366] w-[18px] h-[18px]" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Main HomeTour Component
   -------------------------------------------------------------------------- */

export default function HomeTour() {
  const [mode, setMode] = useState<"webgl" | "reduced">("webgl");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check WebGL availability
    let webglAvailable = false;
    try {
      const canvas = document.createElement("canvas");
      webglAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webglAvailable = false;
    }

    if (prefersReduced || !webglAvailable) {
      setMode("reduced");
    } else {
      setMode("webgl");
    }

    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section aria-label="Interactive 3D home design walkthrough tour">
      {mode === "webgl" ? (
        <WebGL3DTour isMobile={isMobile} />
      ) : (
        <ReducedMotionTour />
      )}
    </section>
  );
}
