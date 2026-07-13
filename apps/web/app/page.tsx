"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, FileText, ArrowRight, CheckCircle2, Star, Award, Building, HardHat, Compass } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "12+", label: "Years Experience" },
  { value: "5-Year", label: "Woodwork Warranty" },
  { value: "99.8%", label: "Client Satisfaction" },
];

const featuredServices = [
  {
    icon: <Compass className="text-primary w-6 h-6" />,
    title: "Interior Design",
    slug: "interior-design",
    description: "Bespoke spatial design, custom modular woodwork, ceiling art, and luxury color textures tailored to you.",
  },
  {
    icon: <Building className="text-primary w-6 h-6" />,
    title: "Civil Contracting",
    slug: "civil-contracting",
    description: "Solid foundational work, structural columns concrete castings, brick laying, and site engineering.",
  },
  {
    icon: <HardHat className="text-primary w-6 h-6" />,
    title: "Turnkey Contracting",
    slug: "turnkey-projects",
    description: "End-to-end design and construction responsibility from vacant land excavation to ready-to-move keys.",
  },
];

const chooseReasons = [
  { title: "Certified Engineers", desc: "Our team includes government-certified structural engineers and gold-medalist design consultants." },
  { title: "Transparent Pricing", desc: "Itemized spreadsheets and zero cost-overrun contracts signed prior to project execution." },
  { title: "Premium Materials", desc: "We use laboratory-tested concrete, TMT reinforcement steel, and IS 710 BWR Marine Plywood." },
  { title: "On-Time Handover", desc: "Strict milestones with delay penalty clauses built directly into our design-build agreements." },
];

const processSteps = [
  { num: "01", name: "Consultation", desc: "Discussing layout requirements, aesthetics, and budget allocations." },
  { num: "02", name: "Site Visit", desc: "Laser-guided dimension scanning, level check, and soil analysis check." },
  { num: "03", name: "Quotation", desc: "Itemized commercial breakdowns and proposed material specifications." },
  { num: "04", name: "Design Rendering", desc: "Delivering detailed AutoCAD drawings and virtual 3D rendering views." },
  { num: "05", name: "Execution", desc: "On-site construction and installation managed by dedicated project engineers." },
  { num: "06", name: "Handover", desc: "Deep post-construction cleaning and layout walkthrough prior to keys delivery." },
];

const testimonials = [
  {
    name: "Rajesh Sen",
    role: "Villa Owner",
    location: "Kalyani Nagar, Pune",
    quote: "JP Enterprises handled both our building's RCC construction and our interior wood paneling. Having a single contracting company do structural and finish work saved us huge coordination overhead and the quality is outstanding.",
    rating: 5,
  },
  {
    name: "Ananya Mehta",
    role: "Penthouse Owner",
    location: "Koregaon Park, Pune",
    quote: "The modular kitchen cabinetry and custom glass wardrobes they built feel incredibly premium. German soft-close accessories, flawless acrylic finishes, and excellent after-sales maintenance support.",
    rating: 5,
  },
];

const faqs = [
  { q: "Do you charge for the initial consultation and site visits?", a: "Our preliminary telephone consultation is free. If a physical site visit, structural level assessment, and custom laser measurement is required, a nominal fee is charged, which is fully adjusted against the final design contract." },
  { q: "How do you ensure the quality of materials during civil construction?", a: "We purchase steel, cement, and piping directly from authorized brand distributors. We provide cube compression test laboratory reports for concrete cast on-site and material invoice logs to clients." },
  { q: "What is your warranty policy on interior woodworking?", a: "We offer a 5-year warranty on all modular cabinetry, including termites protection and laminate delamination, alongside manufacturing guarantees for Hettich/Blum hardware." },
];

export default function Home() {
  return (
    <div className="bg-[#121212] min-h-screen text-white/90">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.png"
            alt="Premium Interior Design"
            className="w-full h-full object-cover opacity-35 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs text-primary font-semibold tracking-wider uppercase uppercase-letter"
            >
              <Award size={14} />
              <span>Timeless Design &amp; Precision Engineering</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight"
            >
              Crafting Luxury Interiors <br />
              <span className="gold-text-gradient font-light">&amp; Solid Structures</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-white/70 leading-relaxed font-light max-w-2xl"
            >
              JP Enterprises brings together premium architecture, luxurious interior woodworking, and heavy civil contracting to deliver production-ready homes and corporate structures.
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-hover text-dark px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 border border-primary/20 shadow-lg hover:scale-105"
              >
                <Phone size={13} />
                <span>Book Site Inspection</span>
              </Link>
              <Link
                href="/quote"
                className="bg-transparent border border-white/20 hover:border-white/50 text-white px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 hover:bg-white/5"
              >
                <FileText size={13} />
                <span>Get Cost Estimate</span>
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 text-white px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 border border-white/10"
              >
                <FaWhatsapp className="text-[#25D366] w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-[#1A1A1A] py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-serif text-3xl md:text-4xl text-primary font-bold">{stat.value}</h3>
              <p className="text-white/50 text-xs font-light tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Our Scope</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">Bespoke Design-Build Services</h2>
          <p className="text-sm text-white/50 font-light max-w-md mx-auto">
            From modern residential layout detailing to heavy concrete framing and structural civil engineering projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((serv, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#121212] rounded-xl w-fit">{serv.icon}</div>
                <h3 className="font-serif text-xl text-white font-semibold">{serv.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">{serv.description}</p>
              </div>
              <Link
                href={`/services/${serv.slug}`}
                className="text-xs text-primary font-semibold tracking-wider uppercase mt-8 flex items-center space-x-1 hover:text-white transition-colors"
              >
                <span>Read Service Details</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center pt-4">
          <p className="text-xs text-white/40 font-light">
            Need customized jobs? We also specialize in{" "}
            <Link href="/services/modular-kitchen" className="text-primary hover:underline">Modular Kitchens</Link>,{" "}
            <Link href="/services/false-ceiling" className="text-primary hover:underline">Ceiling Work</Link>,{" "}
            <Link href="/services/painting" className="text-primary hover:underline">Painting</Link>, and{" "}
            <Link href="/services/flooring" className="text-primary hover:underline">Flooring</Link>.
          </p>
        </div>
      </section>

      {/* 4. WHY CHOOSE SECTION */}
      <section className="bg-[#1A1A1A] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text and Badges */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white leading-tight">
              Engineering Trust <br />&amp; Crafting Excellence
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              For over a decade, JP Enterprises has committed to providing uncompromising quality. We build frameworks to stand for decades and interiors that define luxury.
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <CheckCircle2 className="text-primary shrink-0" size={16} />
                <span>Zero Cost Overruns Guarantee</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <CheckCircle2 className="text-primary shrink-0" size={16} />
                <span>5-Year Comprehensive Wood Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <CheckCircle2 className="text-primary shrink-0" size={16} />
                <span>Government-Approved Materials Log</span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {chooseReasons.map((reason, idx) => (
              <div
                key={idx}
                className="bg-[#121212] p-6 rounded-2xl border border-white/5 space-y-2 hover:border-primary/20 transition-all shadow-md"
              >
                <h3 className="font-serif text-base font-semibold text-white">{reason.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO PREVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-3">
            <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Projects</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">Our Masterwork Portfolio</h2>
          </div>
          <Link
            href="/portfolio"
            className="bg-transparent border border-white/20 hover:border-primary/30 text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 hover:bg-white/5"
          >
            <span>Explore All Projects</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Short Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="group relative aspect-square bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer">
            <img src="/images/interior_kitchen.png" alt="Modular Kitchen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-primary text-[10px] uppercase font-bold tracking-wider">Interior</span>
              <h3 className="font-serif text-lg text-white font-semibold pt-1">Bespoke Modular Kitchen</h3>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group relative aspect-square bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer">
            <img src="/images/civil_construction.png" alt="Civil Construction" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-primary text-[10px] uppercase font-bold tracking-wider">Civil</span>
              <h3 className="font-serif text-lg text-white font-semibold pt-1">Commercial Structure Framing</h3>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group relative aspect-square bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer">
            <img src="/images/interior_bedroom.png" alt="Bedroom Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-primary text-[10px] uppercase font-bold tracking-wider">Residential</span>
              <h3 className="font-serif text-lg text-white font-semibold pt-1">Luxury Master Bedroom</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS TIMELINE ROADMAP */}
      <section className="bg-[#1A1A1A] py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Our Method</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">Execution Process Roadmap</h2>
            <p className="text-sm text-white/50 font-light max-w-md mx-auto">
              How we guide your project from first introductory details to final key handover.
            </p>
          </div>

          {/* Grid Process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#121212] p-8 rounded-2xl border border-white/5 space-y-4 hover:border-primary/20 transition-all shadow-md relative"
              >
                <div className="font-serif text-3xl text-primary/30 font-bold">{step.num}</div>
                <h3 className="font-serif text-lg text-white font-semibold">{step.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block">Testimonials</span>
          <h2 className="text-3xl font-serif font-bold text-white">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex space-x-1 text-primary">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-white/70 italic leading-relaxed font-light">
                  "{test.quote}"
                </p>
              </div>
              <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-semibold text-white">{test.name}</h4>
                  <p className="text-white/40 font-light pt-0.5">{test.role}</p>
                </div>
                <span className="text-white/35 font-light">{test.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-serif font-semibold text-white text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group border-b border-white/5 pb-4 last:border-0 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer text-white/90 hover:text-primary transition-colors py-2 font-medium">
                <span className="text-sm md:text-base pr-4">{faq.q}</span>
                <span className="text-primary shrink-0 transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-2 text-white/60 text-xs md:text-sm leading-relaxed font-light pl-2">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-primary/10 via-bronze/10 to-transparent border border-white/5 rounded-3xl p-12 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-2xl">
          <div className="space-y-3">
            <h3 className="font-serif text-3xl text-white">Create your landmark with JP Enterprises</h3>
            <p className="text-sm text-white/60 font-light max-w-xl">
              Get an accurate budget estimation report or arrange a structural/interior site visit with our chief engineer today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="bg-primary hover:bg-primary-hover text-dark px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Book Appointment</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/quote"
              className="border border-white/20 hover:border-white/50 text-white px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-all inline-flex items-center justify-center space-x-2 hover:bg-white/5"
            >
              <span>Get Free Estimate</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
