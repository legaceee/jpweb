"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { getWhatsAppLink } from "../lib/config";
import { useI18n } from "../context/i18n-context";
import { Language } from "../lib/i18n";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { name: t.nav.services, href: "/#services" },
    { name: t.nav.process, href: "/#process" },
    { name: t.nav.portfolio, href: "/#portfolio" },
    { name: t.nav.estimator, href: "/estimate" },
    { name: t.nav.styleQuiz, href: "/style-quiz" },
    { name: t.nav.checklist, href: "/checklist" },
    { name: t.nav.refer, href: "/refer" },
    { name: t.nav.contact, href: "/#contact" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिं" },
    { code: "mr", label: "मरा" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/assets/logo-light.svg"
              alt="JP Enterprises"
              className="h-9 md:h-10 w-auto dark:hidden"
            />
            <img
              src="/assets/logo-dark.svg"
              alt="JP Enterprises"
              className="h-9 md:h-10 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="label-text text-muted hover:text-fg transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions: Language Toggle + Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-card-border bg-card-bg text-xs font-semibold text-fg hover:text-accent transition-colors cursor-pointer"
                aria-label="Language selector"
              >
                <Globe size={14} />
                <span>{languages.find((l) => l.code === lang)?.label}</span>
                <ChevronDown size={12} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-24 bg-card-bg border border-card-border rounded-xl shadow-lg py-1 z-50"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-xs font-semibold hover:bg-accent/10 transition-colors ${
                          lang === l.code ? "text-accent" : "text-fg"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <Phone size={13} />
              <span>{t.nav.bookVisit}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Lang Selector */}
            <div className="flex items-center gap-1 border border-card-border bg-card-bg rounded-full p-1 text-[11px] font-bold">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-0.5 rounded-full ${
                    lang === l.code ? "bg-accent text-paper" : "text-muted"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-fg cursor-pointer"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
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
            <div className="brass-rule w-12 mb-8" />

            <nav className="flex flex-col gap-5 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleAnchorClick}
                  className="text-fg text-base font-serif font-medium hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-auto pb-12">
              <Link
                href="/#contact"
                onClick={handleAnchorClick}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Phone size={14} />
                <span>{t.nav.bookVisit}</span>
              </Link>
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
