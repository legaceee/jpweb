"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, FileText, Compass, HardHat, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { contactConfig } from "../lib/config";

const services = [
  {
    category: "Interior Design",
    items: [
      { name: "Residential Interiors", slug: "residential-interiors" },
      { name: "Modular Kitchen", slug: "modular-kitchen" },
      { name: "Wardrobes & Storage", slug: "wardrobes" },
      { name: "False Ceiling & POP", slug: "false-ceiling" },
    ]
  },
  {
    category: "Civil Contracting",
    items: [
      { name: "Civil Contracting Overview", slug: "civil-contracting" },
      { name: "Construction Services", slug: "construction" },
      { name: "Renovation & Remodeling", slug: "renovation" },
      { name: "Painting & Finishing", slug: "painting" },
    ]
  },
  {
    category: "Specialized Services",
    items: [
      { name: "Commercial Interiors", slug: "commercial-interiors" },
      { name: "Turnkey Projects", slug: "turnkey-projects" },
      { name: "Plumbing & Electrical", slug: "plumbing" },
      { name: "Flooring & Tiling", slug: "flooring" },
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#", isMega: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.img
              src="/logo-dark.svg"
              alt="JP Enterprises Logo"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              animate={{
                filter: isScrolled ? "brightness(100%)" : "brightness(110%)",
                scale: isScrolled ? 0.95 : 1,
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.isMega && setActiveMegaMenu(true)}
                onMouseLeave={() => link.isMega && setActiveMegaMenu(false)}
              >
                {link.isMega ? (
                  <button
                    className={`flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                      activeMegaMenu || pathname.startsWith("/services")
                        ? "text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={12} className={`transition-transform duration-300 ${activeMegaMenu ? 'rotate-180 text-primary' : 'text-white/40'}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative py-1 ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {link.isMega && (
                  <AnimatePresence>
                    {activeMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-5 w-[650px] z-50 pointer-events-auto"
                      >
                        <div className="bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl grid grid-cols-3 gap-8">
                          {services.map((group) => (
                            <div key={group.category} className="space-y-4">
                              <h4 className="text-primary text-[10px] font-bold tracking-widest uppercase border-b border-white/5 pb-2 flex items-center space-x-2">
                                {group.category === "Interior Design" && <Compass size={11} />}
                                {group.category === "Civil Contracting" && <HardHat size={11} />}
                                {group.category === "Specialized Services" && <ShieldCheck size={11} />}
                                <span>{group.category}</span>
                              </h4>
                              <ul className="space-y-2.5">
                                {group.items.map((item) => (
                                  <li key={item.slug}>
                                    <Link
                                      href={`/services/${item.slug}`}
                                      className="text-white/70 hover:text-white text-xs block transition-all hover:translate-x-1.5 font-light"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs with Magnetic scale animation */}
          <div className="hidden lg:flex items-center space-x-5">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-hover text-dark px-5.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center space-x-2 border border-primary/20 shadow-lg"
              >
                <Phone size={13} />
                <span>Book Appointment</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/quote"
                className="bg-transparent border border-white/10 hover:border-white/30 text-white px-5.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center space-x-2 hover:bg-white/5"
              >
                <FileText size={13} />
                <span>Get Free Quote</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/80 hover:text-white cursor-pointer p-1"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-base font-semibold border-b border-white/5 pb-8 mb-6">
              <Link href="/" className="text-white hover:text-primary tracking-widest uppercase text-sm">
                Home
              </Link>
              <Link href="/portfolio" className="text-white hover:text-primary tracking-widest uppercase text-sm">
                Portfolio
              </Link>
              <Link href="/contact" className="text-white hover:text-primary tracking-widest uppercase text-sm">
                Contact
              </Link>
              
              {/* Mobile Services Sections */}
              <div className="space-y-3">
                <h4 className="text-primary text-[10px] font-bold tracking-widest uppercase">
                  Our Design Services
                </h4>
                <div className="grid grid-cols-1 gap-2.5 pl-3 border-l border-white/5">
                  {services.flatMap(g => g.items).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="text-white/60 hover:text-white text-xs py-0.5 font-light"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="flex flex-col space-y-4 pb-12">
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-hover text-dark px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center space-x-2"
              >
                <Phone size={14} />
                <span>Book Appointment</span>
              </Link>
              <Link
                href="/quote"
                className="border border-white/10 hover:border-white/30 text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center space-x-2 hover:bg-white/5"
              >
                <FileText size={14} />
                <span>Get Free Quote</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
