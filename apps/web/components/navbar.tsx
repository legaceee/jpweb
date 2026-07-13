"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#121212]/90 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo-dark.svg"
              alt="JP Enterprises"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.isMega && setActiveMegaMenu(true)}
                onMouseLeave={() => link.isMega && setActiveMegaMenu(false)}
              >
                {link.isMega ? (
                  <button
                    className={`flex items-center space-x-1 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                      activeMegaMenu || pathname.startsWith("/services")
                        ? "text-primary font-semibold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeMegaMenu ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      pathname === link.href
                        ? "text-primary font-semibold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
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
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px] z-50 pointer-events-auto"
                      >
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 shadow-2xl grid grid-cols-3 gap-6">
                          {services.map((group) => (
                            <div key={group.category}>
                              <h4 className="text-primary text-xs font-semibold tracking-wider uppercase mb-3 border-b border-white/5 pb-1">
                                {group.category}
                              </h4>
                              <ul className="space-y-2">
                                {group.items.map((item) => (
                                  <li key={item.slug}>
                                    <Link
                                      href={`/services/${item.slug}`}
                                      className="text-white/70 hover:text-white text-xs block transition-all hover:translate-x-1 py-1"
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

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/book"
              className="bg-primary hover:bg-primary-hover text-dark px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 border border-primary/20 hover:scale-105"
            >
              <Phone size={13} />
              <span>Book Appointment</span>
            </Link>
            <Link
              href="/quote"
              className="bg-transparent border border-white/20 hover:border-white/50 text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 hover:bg-white/5"
            >
              <FileText size={13} />
              <span>Get Free Quote</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#121212] lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-lg font-medium border-b border-white/5 pb-8 mb-6">
              <Link href="/" className="text-white hover:text-primary">
                Home
              </Link>
              <Link href="/portfolio" className="text-white hover:text-primary">
                Portfolio
              </Link>
              <Link href="/contact" className="text-white hover:text-primary">
                Contact
              </Link>
              
              {/* Mobile Services Sections */}
              <div>
                <h4 className="text-primary text-xs font-semibold tracking-wider uppercase mb-3">
                  Our Services
                </h4>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  {services.flatMap(g => g.items).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="text-white/70 hover:text-white text-sm py-1"
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
                className="bg-primary hover:bg-primary-hover text-dark px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2"
              >
                <Phone size={15} />
                <span>Book Appointment</span>
              </Link>
              <Link
                href="/quote"
                className="border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2"
              >
                <FileText size={15} />
                <span>Get Free Quote</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
