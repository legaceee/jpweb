"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  area: string;
  quote: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || total <= 1) return;

    // Respect reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, total]);

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  };

  if (total === 0) return null;

  return (
    <section id="testimonials" className="py-24 px-6 bg-card-bg">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="label-text text-accent block mb-3">
            What Our Clients Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-fg">
            Words from Mumbai homeowners
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Client testimonials carousel"
          aria-roledescription="carousel"
          tabIndex={0}
        >
          {/* Quote display */}
          <div className="text-center px-4 sm:px-12 min-h-[200px] flex flex-col items-center justify-center">
            {/* Opening quote mark */}
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              className="mb-6 opacity-30"
              aria-hidden="true"
            >
              <path
                d="M 0 16 Q 0 8, 6 4 Q 8 2, 12 2 L 12 6 Q 8 6, 6 10 Q 4 12, 4 16 Z M 18 16 Q 18 8, 24 4 Q 26 2, 30 2 L 30 6 Q 26 6, 24 10 Q 22 12, 22 16 Z"
                className="fill-accent"
              />
            </svg>

            <blockquote
              key={current}
              className="text-lg sm:text-xl text-fg leading-relaxed font-light italic max-w-2xl mx-auto mb-8 animate-[fade-in_0.4s_ease-out]"
              aria-live="polite"
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${current + 1} of ${total}`}
            >
              &ldquo;{testimonials[current]?.quote}&rdquo;
            </blockquote>

            {/* Client info */}
            <div className="space-y-1">
              <p className="text-sm font-semibold text-fg">
                {/* PLACEHOLDER: These are sample testimonials. Replace with real client names. */}
                {testimonials[current]?.clientName}
              </p>
              <p className="text-xs text-muted">
                {testimonials[current]?.area}, Mumbai
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-fg transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-fg transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="flex justify-center gap-2 mt-8" role="tablist">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "bg-accent w-6"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
