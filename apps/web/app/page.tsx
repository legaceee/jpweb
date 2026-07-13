"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, FileText, ArrowRight, Star, Award, Building, HardHat, Compass, ShieldCheck, MapPin, CheckCircle2, Sparkles, FileSearch, HelpCircle } from "lucide-react";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";

// Import config dynamic variables
import { contactConfig, getWhatsAppLink, getCallLink } from "../lib/config";

// Import interactive platform components
import BeforeAfterSlider from "../components/before-after-slider";
import InteriorVisualizer from "../components/interior-visualizer";
import ProjectCarousel from "../components/project-carousel";
import CostEstimator from "../components/cost-estimator";
import SearchableFAQ from "../components/searchable-faq";
import BrochureCta from "../components/brochure-cta";

// Flagship AI Lead Gen portals
import VisualizeMyHome from "../components/visualize-my-home";
import RoomAnalyzer from "../components/room-analyzer";
import InteriorConsultant from "../components/interior-consultant";
import ServiceComparison from "../components/service-comparison";
import AppointmentCalendar from "../components/appointment-calendar";

const stats = [
  { value: "500+", label: "Completed Projects" },
  { value: "12+", label: "Years of Craft" },
  { value: "4", label: "Cities Serviced" },
  { value: "100%", label: "Client Satisfaction" },
];

const partnerBrands = [
  "Blum Hardware", "Hettich", "Saint-Gobain Glass", "Asian Paints", "Berger Paints", "Kohler Fittings", "Jaquar Bath"
];

const cities = [
  { slug: "pune", name: "Pune", status: "Active HQ", desc: "Full contracting, structural casting & interior designs." },
  { slug: "mumbai", name: "Mumbai", status: "Operational", desc: "Bespoke high-rise apartment interior layouts." },
  { slug: "thane", name: "Thane", status: "Operational", desc: "Turnkey residential bungalow civil structures." },
  { slug: "navi-mumbai", name: "Navi Mumbai", status: "Active Site", desc: "Corporate IT workstation layouts & partition grids." }
];

const projectStories = [
  {
    title: "Double-Height Luxury Lounge",
    client: "Villa 42, Kalyani Nagar",
    timeline: "75 Days",
    challenge: "Uneven load distribution across a sloping site foundation, requiring customized structural reinforcements while maintaining high-ceiling open space templates.",
    solution: "Poured structural steel columns inside concrete framing combined with a light cantilevered composite wooden rafter ceiling to create a rigid, open interior.",
    outcome: "A double-height structural masterpiece featuring raw Italian marble flooring and custom integrated ambient grid lights completed 5 days ahead of schedule.",
    beforeImg: "/images/civil_construction.png",
    afterImg: "/images/hero_bg.png"
  },
  {
    title: "Corporate Workstation",
    client: "Veritas IT, Baner",
    timeline: "90 Days",
    challenge: "High acoustic echo profiles and lack of natural lighting access throughout deep internal corridor partition grids.",
    solution: "Engineered drywall partition walls with soundproof fiberglass cores, layered with acoustic panel frames and warm linear ceiling profiles.",
    outcome: "A low-noise corporate layout space housing modular desks and ergonomic conference cabins, verified at STC-52 soundproofing grade.",
    beforeImg: "/images/civil_construction.png",
    afterImg: "/images/commercial_office.png"
  }
];

const testimonials = [
  {
    name: "Dr. Sandeep Kulkarni",
    role: "Villa Proprietor",
    location: "Kalyani Nagar, Pune",
    quote: "JP Enterprises executed a flawless civil design-build. Their structural concrete pouring was completed with extreme accuracy, and the wood layouts and marble finish turned our lounge space into a timeless masterwork.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Meera Ranade",
    role: "Penthouse Owner",
    location: "Aundh, Pune",
    quote: "We loved selecting custom wall paint colors and parquet profiles on their material visualizer. The actual modular wardrobe units and bathroom trims look identical to their design configurations.",
    rating: 5,
    date: "1 month ago"
  }
];

export default function Home() {
  const whatsappUrl = getWhatsAppLink("Hi JP Enterprises, I would like to schedule a site consultation.");

  return (
    <div className="bg-bg text-fg min-h-screen transition-colors duration-300">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.png"
            alt="JP Enterprises Premium Space"
            className="w-full h-full object-cover opacity-25 dark:opacity-35"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-transparent"></div>
        </div>

        {/* Structural grids for architectural feel */}
        <div className="absolute inset-y-0 left-10 md:left-24 w-px bg-border/20 z-10" />
        <div className="absolute inset-y-0 right-10 md:right-24 w-px bg-border/20 z-10" />

        {/* Copy layout */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center space-y-8 mt-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4.5 py-1.8 rounded-full text-[10px] text-primary font-bold uppercase tracking-wider"
          >
            <Award size={13} />
            <span>AI-Powered Interior Designing &amp; Civil Contracting</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-tight"
            >
              Precision Engineering <br />
              <span className="italic font-light text-primary">Luxury Refined</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base md:text-lg text-foreground/75 leading-relaxed font-light max-w-3xl mx-auto"
          >
            We construct luxury properties and customize high-end modular woodwork cabinetry layouts with integrated AI estimation engines.
          </motion.p>

          {/* Dynamic Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#booking"
              className="bg-primary hover:bg-primary-hover text-card px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2 border border-primary/20 hover:scale-105 shadow-xl"
            >
              <Phone size={13} />
              <span>Book Appointment</span>
            </a>
            <a
              href="#calculator"
              className="bg-card border border-border hover:border-foreground/30 text-foreground px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2 hover:scale-105"
            >
              <FileText size={13} />
              <span>AI Cost Estimator</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-foreground px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2 hover:scale-105"
            >
              <FaWhatsapp className="text-[#25D366] w-4.5 h-4.5" />
              <span>Chat WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Mouse */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-20">
          <span className="text-[9px] text-foreground/30 uppercase tracking-widest font-semibold">Explore Showroom</span>
          <div className="w-5 h-9 border-2 border-border/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-primary rounded-full animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-card py-16 border-y border-border relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-serif text-3xl md:text-5xl text-primary font-bold">{stat.value}</h3>
              <p className="text-foreground/40 text-[10px] font-bold tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FLAGSHIP FEATURE: VISUALIZE MY HOME */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20" id="ai-visualizer">
        <VisualizeMyHome />
      </section>

      {/* 4. FLAGSHIP FEATURE: ROOM ANALYZER */}
      <section className="py-24 px-6 bg-card border-y border-border relative z-20" id="ai-analyzer">
        <div className="max-w-7xl mx-auto">
          <RoomAnalyzer />
        </div>
      </section>

      {/* 5. ESTIMATOR CALCULATOR */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20" id="calculator">
        <CostEstimator />
      </section>

      {/* 6. AI INTERIOR CONSULTANT */}
      <section className="py-24 px-6 bg-card border-y border-border relative z-20" id="ai-consultant">
        <div className="max-w-7xl mx-auto">
          <InteriorConsultant />
        </div>
      </section>

      {/* 7. ASYMMETRICAL PROJECT CASE STORIES */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="space-y-20">
          <div className="text-center space-y-3">
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Bespoke Case Files</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Project Stories</h2>
            <p className="text-sm text-foreground/50 font-light max-w-md mx-auto">
              Real-world structural engineering solutions and custom woodwork layouts designed for our clients.
            </p>
          </div>

          <div className="space-y-24">
            {projectStories.map((story, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  idx % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Images (Asymmetrical Grid) */}
                <div className={`lg:col-span-7 grid grid-cols-2 gap-4 ${idx % 2 === 0 ? "order-1" : "order-1 lg:order-2"}`}>
                  <div className="space-y-2">
                    <span className="text-[10px] text-foreground/40 font-semibold uppercase block text-center">Before (Site Frame)</span>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-black">
                      <img src={story.beforeImg} alt="Before Raw Construction" className="w-full h-full object-cover opacity-80" loading="lazy" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6 lg:mt-12">
                    <span className="text-primary text-[10px] font-semibold uppercase block text-center">After (Completed Build)</span>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-black">
                      <img src={story.afterImg} alt="Completed Finished Interior" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 0 ? "order-2" : "order-2 lg:order-1"}`}>
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold w-fit block">
                    Timeline: {story.timeline}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground font-bold leading-snug">
                    {story.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-2 border-red-500/30 pl-4 space-y-1">
                      <h4 className="text-[10px] text-red-500 font-bold uppercase tracking-wider">The Challenge</h4>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light">{story.challenge}</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                      <h4 className="text-[10px] text-primary font-bold uppercase tracking-wider">The Solution</h4>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light">{story.solution}</p>
                    </div>

                    <div className="border-l-2 border-green-500/30 pl-4 space-y-1">
                      <h4 className="text-[10px] text-green-500 font-bold uppercase tracking-wider">The Outcome</h4>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light">{story.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE SERVICE COMPARISON */}
      <section className="py-24 px-6 bg-card border-y border-border relative z-20" id="comparisons">
        <ServiceComparison />
      </section>

      {/* 9. COVERFLOW PROJECT CAROUSEL */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 relative z-20">
        <div className="text-center space-y-3">
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Completed Builds</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Featured Project Catalog</h2>
        </div>
        <ProjectCarousel />
      </section>

      {/* 10. PARTNER BRANDS BAR */}
      <section className="py-16 bg-card border-y border-border relative z-20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <h4 className="text-[10px] text-foreground/30 font-bold tracking-widest uppercase text-center block">
            Authorized Material Partners
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {partnerBrands.map((brand, idx) => (
              <span key={idx} className="text-xs md:text-sm font-semibold tracking-wider text-foreground font-sans">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 11. LOCAL SEO CITIES DIRECTORY */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 relative z-20">
        <div className="text-center space-y-3">
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Regional Engineering Divisions</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Cities We Service</h2>
          <p className="text-sm text-foreground/50 font-light max-w-md mx-auto">
            Providing on-site civil surveys and modular design deliveries across key regions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, idx) => (
            <Link
              href={`/cities/${city.slug}`}
              key={idx}
              className="bg-card border border-border p-6 rounded-2xl space-y-4 hover:border-primary/30 transition-colors shadow-lg block"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">{city.name}</h3>
                <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                  {city.status}
                </span>
              </div>
              <p className="text-xs text-foreground/50 leading-relaxed font-light">{city.desc}</p>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center space-x-1 pt-2">
                <span>View local packages</span>
                <ArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. GOOGLE REVIEWS SECTION */}
      <section className="py-24 px-6 bg-card border-y border-border relative z-20">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Verification</span>
            <div className="flex items-center justify-center space-x-2">
              <FaGoogle className="text-primary w-5 h-5" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Google Map Ratings</h2>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-foreground/60 font-light">
              <span className="text-primary font-bold font-sans">4.9 / 5.0 Rating</span>
              <span>based on 124 reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="bg-bg border border-border p-8 rounded-3xl shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-1 text-primary">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-foreground/30 text-[10px] font-light">{test.date}</span>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/75 italic leading-relaxed font-light">
                    "{test.quote}"
                  </p>
                </div>
                <div className="border-t border-border pt-6 mt-6 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-foreground">{test.name}</h4>
                    <p className="text-foreground/40 font-light pt-0.5">{test.role}</p>
                  </div>
                  <span className="text-foreground/30 font-light">{test.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. SLOT BASED APPOINTMENT CALENDAR */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20" id="booking">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Reservations</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Schedule Site Visitation</h2>
          </div>
          <AppointmentCalendar />
        </div>
      </section>

      {/* 14. DOWNLOAD BROCHURE */}
      <section className="py-24 px-6 bg-card border-y border-border relative z-20">
        <BrochureCta />
      </section>

      {/* 15. FAQ ACCORDION */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">Support</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <SearchableFAQ />
        </div>
      </section>

      {/* 16. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24 pt-12 relative z-20">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border rounded-3xl p-12 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground font-bold">Ready to build your structure?</h3>
            <p className="text-sm text-foreground/50 font-light max-w-xl">
              Collaborate with our structural planners and design engineers to draft your commercial and residential projects.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a
              href="#booking"
              className="bg-primary hover:bg-primary-hover text-card px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Schedule Site Visit</span>
              <ArrowRight size={13} />
            </a>
            <a
              href="#calculator"
              className="border border-border hover:border-foreground/30 text-foreground px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all inline-flex items-center justify-center space-x-2 hover:bg-foreground/5"
            >
              <span>Get Cost Proposal</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
