"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  heightClass?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/civil_construction.png",
  afterImage = "/images/hero_bg.png",
  heightClass = "h-[500px] md:h-[600px]",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} rounded-3xl overflow-hidden border border-white/10 select-none cursor-ew-resize`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Before (Civil Structure)"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-6 left-6 bg-dark/70 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white">
        Before (Civil Structure)
      </div>

      {/* After Image (Foreground sliding layer) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={afterImage}
          alt="After (Luxury Interior)"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : "100%" }}
        />
        <div className="absolute top-6 right-6 bg-primary/80 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-dark">
          After (Luxury Interior)
        </div>
      </div>

      {/* Slider Bar & Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary/80 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handles */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-primary hover:scale-110 rounded-full flex items-center justify-center shadow-2xl border border-white/20 transition-transform duration-150">
          <MoveHorizontal className="text-dark w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
