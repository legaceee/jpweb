"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../lib/config";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------------------------------
   Room data
   -------------------------------------------------------------------------- */

const ROOMS = [
  {
    id: "hall",
    src: "/images/concepts/hall.png",
    alt: "Concept visualization of a warm contemporary Indian entryway with console table, mirror, and natural stone flooring",
    eyebrow: "Entryway Design",
    headline: "The first impression your home makes",
    subline:
      "A console, a mirror, the right light — we design entryways that set the tone for everything beyond.",
  },
  {
    id: "bedroom",
    src: "/images/concepts/bedroom.png",
    alt: "Concept visualization of a contemporary bedroom with linen headboard, layered bedding, and warm afternoon light",
    eyebrow: "Bedroom Interiors",
    headline: "Rest starts with thoughtful design",
    subline:
      "Layered textures, considered storage, lighting that adapts from morning to night — bedrooms built for how you actually sleep and wake.",
  },
  {
    id: "kitchen",
    src: "/images/concepts/kitchen.png",
    alt: "Concept visualization of a contemporary Indian kitchen with modular cabinetry, quartz countertop, and pendant lighting",
    eyebrow: "Kitchen Design",
    headline: "Where every Indian kitchen works harder",
    subline:
      "Chimneys that clear, counters that last, layouts shaped for the way Mumbai families actually cook — not imported templates.",
  },
  {
    id: "bathroom",
    src: "/images/concepts/bathroom.png",
    alt: "Concept visualization of a modern bathroom with large-format tiles, freestanding tub, and frosted window light",
    eyebrow: "Bathroom Refit",
    headline: "Small rooms, precise craft",
    subline:
      "Waterproofing, tile alignment, fixture placement — bathrooms demand the most precision per square foot. We bring it.",
  },
] as const;

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
      className={`flex ${isVertical ? "flex-col gap-5" : "flex-row gap-4 justify-center"} items-center`}
    >
      {ROOMS.map((room, i) => (
        <button
          key={room.id}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`View ${room.eyebrow}`}
          onClick={() => onJump(i)}
          className={`group flex items-center gap-2.5 transition-all duration-300 ${
            isVertical ? "" : ""
          }`}
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
                i === activeIndex ? "text-accent opacity-100" : "text-muted/50 opacity-0 group-hover:opacity-100"
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
   Desktop: Pinned scroll sequence
   -------------------------------------------------------------------------- */

function DesktopTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const whatsappUrl = getWhatsAppLink(
    "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
  );

  useGSAP(
    () => {
      if (!containerRef.current || !pinnedRef.current) return;

      const totalRooms = ROOMS.length;

      // Main pinning trigger
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinnedRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (totalRooms - 1)}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * totalRooms),
            totalRooms - 1
          );
          setActiveIndex(idx);

          // Update image opacities and parallax
          const roomEls =
            pinnedRef.current?.querySelectorAll<HTMLElement>("[data-room]");
          const copyEls =
            pinnedRef.current?.querySelectorAll<HTMLElement>("[data-room-copy]");

          roomEls?.forEach((el, i) => {
            const roomProgress =
              (progress - i / totalRooms) * totalRooms;

            // Opacity: fully visible when roomProgress is 0-1, fade out/in at boundaries
            let opacity = 0;
            if (i === 0 && roomProgress <= 1) {
              opacity = roomProgress <= 0.8 ? 1 : 1 - (roomProgress - 0.8) * 5;
            } else if (i === totalRooms - 1 && roomProgress >= 0) {
              opacity = roomProgress >= 0.2 ? 1 : roomProgress * 5;
            } else {
              const fadeIn = Math.min(roomProgress * 5, 1);
              const fadeOut =
                roomProgress > 0.8 ? 1 - (roomProgress - 0.8) * 5 : 1;
              opacity = Math.max(0, Math.min(fadeIn, fadeOut));
            }
            el.style.opacity = String(Math.max(0, Math.min(1, opacity)));

            // Subtle parallax: slight upward drift
            const parallax = -roomProgress * 30;
            const scale = 1 + Math.abs(roomProgress - 0.5) * 0.04;
            el.style.transform = `translateY(${parallax}px) scale(${scale})`;
          });

          copyEls?.forEach((el, i) => {
            const roomProgress =
              (progress - i / totalRooms) * totalRooms;
            let opacity = 0;
            if (i === 0 && roomProgress <= 1) {
              opacity =
                roomProgress <= 0.15
                  ? 1
                  : roomProgress <= 0.7
                    ? 1
                    : 1 - (roomProgress - 0.7) * 3.33;
            } else if (i === totalRooms - 1 && roomProgress >= 0) {
              opacity = roomProgress >= 0.3 ? 1 : roomProgress * 3.33;
            } else {
              const fadeIn = Math.min(roomProgress * 3.33, 1);
              const fadeOut =
                roomProgress > 0.7 ? 1 - (roomProgress - 0.7) * 3.33 : 1;
              opacity = Math.max(0, Math.min(fadeIn, fadeOut));
            }
            el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
            el.style.transform = `translateY(${(1 - opacity) * 20}px)`;
          });
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

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${ROOMS.length * 100}vh` }}
    >
      <div ref={pinnedRef} className="relative w-full h-screen overflow-hidden">
        {/* Room images */}
        {ROOMS.map((room, i) => (
          <div
            key={room.id}
            data-room={room.id}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={room.src}
              alt={room.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89P9/PQAJWwN5SQzFjwAAAABJRU5ErkJggg=="
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </div>
        ))}

        {/* Per-room copy */}
        {ROOMS.map((room, i) => (
          <div
            key={`copy-${room.id}`}
            data-room-copy={room.id}
            className="absolute bottom-0 left-0 right-0 pb-32 px-8 lg:px-16 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="max-w-2xl">
              <span className="label-text text-accent text-[10px] block mb-3">
                {room.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white leading-[1.15] mb-4">
                {room.headline}
              </h2>
              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-lg">
                {room.subline}
              </p>
            </div>
          </div>
        ))}

        {/* Concept visualization badge */}
        <div className="absolute top-6 right-6 z-30">
          <span className="label-text text-[8px] text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded">
            Concept visualization
          </span>
        </div>

        {/* Progress dots — left side */}
        <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30">
          <ProgressDots
            activeIndex={activeIndex}
            onJump={handleJump}
            orientation="vertical"
          />
        </div>

        {/* Skip tour link */}
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-30 label-text text-[9px] text-white/40 hover:text-white/80 transition-colors duration-200 flex items-center gap-1.5"
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

        {/* End-of-tour CTA — shown when last room is active */}
        <div
          className={`absolute bottom-24 left-0 right-0 flex justify-center z-30 transition-all duration-500 ${
            activeIndex === ROOMS.length - 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="text-center px-6">
            <p className="text-lg sm:text-xl text-white/90 font-serif italic mb-6">
              Ready to design a space like this?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-accent/20"
              >
                <Phone size={16} />
                Book a Site Visit
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 backdrop-blur-sm"
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
   Mobile: Horizontal snap carousel
   -------------------------------------------------------------------------- */

function MobileTour() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const whatsappUrl = getWhatsAppLink(
    "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const idx = Math.round(scrollLeft / slideWidth);
      setActiveIndex(Math.min(idx, ROOMS.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJump = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative">
      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {ROOMS.map((room, i) => (
          <div
            key={room.id}
            className="relative flex-none w-full h-[85vh] snap-start"
          >
            <Image
              src={room.src}
              alt={room.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89P9/PQAJWwN5SQzFjwAAAABJRU5ErkJggg=="
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

            {/* Concept badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="label-text text-[7px] text-white/50 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                Concept visualization
              </span>
            </div>

            {/* Room copy */}
            <div className="absolute bottom-20 left-0 right-0 px-6">
              <span className="label-text text-accent text-[9px] block mb-2">
                {room.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white leading-[1.15] mb-3">
                {room.headline}
              </h2>
              <p className="text-sm text-white/75 font-light leading-relaxed max-w-sm">
                {room.subline}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots — horizontal below carousel */}
      <div className="py-5 bg-bg">
        <ProgressDots
          activeIndex={activeIndex}
          onJump={handleJump}
          orientation="horizontal"
        />
      </div>

      {/* End-of-tour CTA */}
      <div
        className={`px-6 pb-8 bg-bg text-center transition-all duration-500 ${
          activeIndex === ROOMS.length - 1
            ? "opacity-100"
            : "opacity-60"
        }`}
      >
        <p className="text-base text-fg/80 font-serif italic mb-4">
          Ready to design a space like this?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-accent/10"
          >
            <Phone size={15} />
            Book a Site Visit
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <FaWhatsapp className="text-[#25D366] w-[17px] h-[17px]" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reduced motion: Simple stacked sections
   -------------------------------------------------------------------------- */

function ReducedMotionTour() {
  const whatsappUrl = getWhatsAppLink(
    "Hi JP Enterprises, I'd like to schedule a site visit for my project in Mumbai."
  );

  return (
    <div>
      {ROOMS.map((room) => (
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
   Main HomeTour: picks desktop/mobile/reduced-motion variant
   -------------------------------------------------------------------------- */

export default function HomeTour() {
  const [mode, setMode] = useState<"desktop" | "mobile" | "reduced">("desktop");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion) {
      setMode("reduced");
    } else if (isMobile) {
      setMode("mobile");
    } else {
      setMode("desktop");
    }

    const handleResize = () => {
      const prefReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefReduced) {
        setMode("reduced");
      } else if (window.innerWidth < 1024) {
        setMode("mobile");
      } else {
        setMode("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section aria-label="Interactive home design tour">
      {mode === "desktop" && <DesktopTour />}
      {mode === "mobile" && <MobileTour />}
      {mode === "reduced" && <ReducedMotionTour />}
    </section>
  );
}
