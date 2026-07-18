"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { getWhatsAppLink } from "../lib/config";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleAnchorClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo — swapped by theme via CSS */}
          <Link href="/" className="flex items-center shrink-0">
            {/* Light mode logo (dark text on transparent) */}
            <img
              src="/assets/logo-light.svg"
              alt="JP Enterprises"
              className="h-9 md:h-10 w-auto dark:hidden"
            />
            {/* Dark mode logo (light text on transparent) */}
            <img
              src="/assets/logo-dark.svg"
              alt="JP Enterprises"
              className="h-9 md:h-10 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="label-text text-muted hover:text-fg transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <Phone size={13} />
              <span>Book a Site Visit</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-fg cursor-pointer"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-bg lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            {/* Brass accent line at top */}
            <div className="brass-rule w-12 mb-8" />

            <nav className="flex flex-col gap-6 mb-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleAnchorClick}
                  className="text-fg text-lg font-serif font-medium hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-auto pb-12">
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Phone size={14} />
                <span>Book a Site Visit</span>
              </a>
              <a
                href={getWhatsAppLink(
                  "Hi, I'd like to discuss a project with JP Enterprises."
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAnchorClick}
                className="inline-flex items-center justify-center gap-2 border border-accent/30 text-fg hover:bg-accent/5 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <FaWhatsapp className="text-[#25D366] w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
