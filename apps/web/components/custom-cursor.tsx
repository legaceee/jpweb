"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer cursor circle
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices (mobiles/tablets)
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent has interactive cursor markers
      const hoverAction = target.closest("[data-cursor]");
      if (hoverAction) {
        const type = hoverAction.getAttribute("data-cursor");
        const text = hoverAction.getAttribute("data-cursor-text") || "";
        
        if (type === "view") {
          setCursorType("view");
          setHoverText(text || "VIEW");
        } else if (type === "hover") {
          setCursorType("hover");
        }
      } else {
        // Standard interactive tags
        const isInteractive = target.closest("a, button, select, input, [role='button']");
        if (isInteractive) {
          setCursorType("hover");
        } else {
          setCursorType("default");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Larger outer trailing circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center font-semibold text-[8px] uppercase tracking-widest text-dark"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "default" ? 36 : cursorType === "hover" ? 54 : 80,
          height: cursorType === "default" ? 36 : cursorType === "hover" ? 54 : 80,
          backgroundColor: cursorType === "view" ? "rgba(197, 168, 128, 0.9)" : "rgba(255, 255, 255, 0)",
          border: cursorType === "view" ? "1px solid rgba(197, 168, 128, 0.9)" : "1px solid rgba(197, 168, 128, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      >
        {cursorType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-dark font-bold font-sans"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
