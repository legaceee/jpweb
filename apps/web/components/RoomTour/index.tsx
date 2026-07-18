"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../../lib/config";
import { ROOMS, ROOM_SPACING, TourRoom } from "./Scene";

const RoomTourScene = dynamic(() => import("./Scene"), {
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
   Progress Dots Component
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
      {ROOMS.map((room, i) => (
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
   Main WebGL 3D RoomTour Component
   -------------------------------------------------------------------------- */

export default function RoomTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState<"webgl" | "reduced">("webgl");

  const whatsappUrl = useMemo(
    () =>
      getWhatsAppLink(
        "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
      ),
    []
  );

  // Detect WebGL & Reduced Motion preference
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

  // IntersectionObserver to lazy-mount WebGL Canvas only when scrolled near viewport
  useEffect(() => {
    if (mode !== "webgl" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mode]);

  // Handle scroll progress updates
  useEffect(() => {
    if (mode !== "webgl") return;

    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      scrollProgress.current = progress;

      const idx = Math.min(
        Math.floor(progress * ROOMS.length),
        ROOMS.length - 1
      );
      setActiveIndex(idx);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  const handleJump = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const perRoom = window.innerHeight;
    const targetScroll = containerTop + index * perRoom;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  const handleSkip = useCallback(() => {
    if (!containerRef.current) return;
    const containerBottom =
      containerRef.current.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: containerBottom + 10,
      behavior: "smooth",
    });
  }, []);

  if (mode === "reduced") {
    return <ReducedMotionFallback whatsappUrl={whatsappUrl} />;
  }

  const activeRoom = (ROOMS[activeIndex] || ROOMS[0])!;

  return (
    <section
      aria-label="Interactive 3D home design walkthrough tour"
      ref={containerRef}
      style={{ height: `${ROOMS.length * 100}vh`, position: "relative" }}
    >
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#1C1B19]"
      >
        {/* Lazy-mounted 3D WebGL Canvas Scene */}
        {isNearViewport && (
          <div className="absolute inset-0">
            <RoomTourScene
              scrollProgress={scrollProgress}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Ambient Dark Gradient for text legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />

        {/* Overlay Copy — transitions cleanly on active room */}
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
            activeIndex === ROOMS.length - 1
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
    </section>
  );
}

/* --------------------------------------------------------------------------
   Reduced Motion / WebGL Fallback Component
   -------------------------------------------------------------------------- */

function ReducedMotionFallback({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <div>
      {ROOMS.map((room) => (
        <section key={room.id} className="relative w-full h-[70vh] min-h-[500px]">
          <Image
            src={room.texture}
            alt={room.headline}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

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
