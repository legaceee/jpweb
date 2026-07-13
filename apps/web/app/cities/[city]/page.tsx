import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { contactConfig } from "../../../lib/config";
import ServiceComparison from "../../../components/service-comparison";

interface CityData {
  slug: string;
  name: string;
  projectsCount: string;
  address: string;
  leadEngineer: string;
  description: string;
  multiplier: number;
}

const citiesData: Record<string, CityData> = {
  pune: {
    slug: "pune",
    name: "Pune",
    projectsCount: "240+ completed builds",
    address: "MG Road, Camp, Pune, Maharashtra 411001",
    leadEngineer: "Er. Ramesh Shinde (Senior Civil Consultant)",
    description: "JP Enterprises offers specialized structural foundation planning, concrete casting, and luxury modular wardrobe designing across Pune, Koregaon Park, Kalyani Nagar, and Aundh.",
    multiplier: 1.0
  },
  mumbai: {
    slug: "mumbai",
    name: "Mumbai",
    projectsCount: "140+ completed builds",
    address: "Bandra West, Link Road, Mumbai, Maharashtra 400050",
    leadEngineer: "Er. Amit Mehta (Lead Project Manager)",
    description: "Bespoke high-rise apartment interior renovations, modular acrylic kitchen configurations, and acoustic drywall installations in Mumbai, Bandra, and Andheri.",
    multiplier: 1.2
  },
  thane: {
    slug: "thane",
    name: "Thane",
    projectsCount: "90+ completed builds",
    address: "Ghodbunder Road, Thane West, Maharashtra 400607",
    leadEngineer: "Er. Sandeep Patil (Structural Specialist)",
    description: "Turnkey residential house constructions, structural pile reinforcements, and premium waterproofing designs across Thane and Ghodbunder districts.",
    multiplier: 1.15
  },
  "navi-mumbai": {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    projectsCount: "110+ completed builds",
    address: "Vashi Sector 17, Navi Mumbai, Maharashtra 400703",
    leadEngineer: "Er. Vikrant Desai (Commercial Architect)",
    description: "Corporate workspace configurations, glass partitions, linear lights, and custom modular cabinets across Vashi, Belapur, and Navi Mumbai IT hubs.",
    multiplier: 1.1
  }
};

export function generateStaticParams() {
  return [
    { city: "pune" },
    { city: "mumbai" },
    { city: "thane" },
    { city: "navi-mumbai" }
  ];
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = citiesData[city.toLowerCase()];
  if (!data) return {};

  return {
    title: `Premium Interior Design & Civil Contractor in ${data.name} | JP Enterprises`,
    description: `Crafting luxury residential and commercial layout spaces in ${data.name}. Over ${data.projectsCount}. Lead Engineer: ${data.leadEngineer}. Contact us today!`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const data = citiesData[city.toLowerCase()];
  if (!data) {
    notFound();
  }

  // Schema LD JSON structures
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://jpenterprises.com/cities/${data.slug}#localbusiness`,
        "name": `JP Enterprises - ${data.name} Division`,
        "image": "https://jpenterprises.com/images/hero_bg.png",
        "telephone": contactConfig.phone,
        "email": contactConfig.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address,
          "addressLocality": data.name,
          "addressRegion": "Maharashtra",
          "postalCode": data.address.match(/\b\d{6}\b/)?.[0] || "",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "InteriorDesign",
        "name": "Luxury Modular Kitchen & Wardrobe Design",
        "provider": { "@id": `https://jpenterprises.com/cities/${data.slug}#localbusiness` }
      },
      {
        "@type": "ConstructionBusiness",
        "name": "Turnkey RCC Concrete Construction & Contracting",
        "provider": { "@id": `https://jpenterprises.com/cities/${data.slug}#localbusiness` }
      }
    ]
  };

  return (
    <div className="bg-bg text-fg min-h-screen py-16 px-6">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* local hero */}
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-[10px] text-primary font-bold uppercase tracking-wider">
              <MapPin size={12} />
              <span>Operational Branch: {data.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              Bespoke Designing &amp; <br />
              <span className="italic font-light text-primary">Civil Engineering in {data.name}</span>
            </h1>
            <p className="text-sm text-foreground/60 leading-relaxed font-light">
              {data.description} Our localized team ensures rapid site inspection, coordinate validation, and structured masonry assembly supervision.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-foreground/80">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 size={15} className="text-primary" />
                <span>{data.projectsCount}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck size={15} className="text-primary" />
                <span>100% Quality Inspected</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-background border border-border p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest border-b border-border pb-2 block">
              Branch Leadership
            </h3>
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-foreground">{data.leadEngineer}</p>
              <p className="text-foreground/45 font-light">Lead Structural Engineering Supervisor</p>
            </div>
            <div className="space-y-2 text-xs pt-2">
              <p className="text-foreground/60 font-light flex items-center space-x-2">
                <MapPin size={13} className="text-primary shrink-0" />
                <span>{data.address}</span>
              </p>
              <p className="text-foreground/60 font-light flex items-center space-x-2">
                <Phone size={13} className="text-primary shrink-0" />
                <a href={`tel:${contactConfig.phone}`} className="hover:text-primary">{contactConfig.phone}</a>
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/book"
                className="w-full bg-primary hover:bg-primary-hover text-card py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center block transition-colors shadow-md"
              >
                Book Site Inspection
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing matrix block */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Local Packages for {data.name}</h2>
            <p className="text-xs text-foreground/50 font-light mt-1">
              Estimated pricing adjusted for regional labor variables.
            </p>
          </div>
          <ServiceComparison />
        </div>

      </div>
    </div>
  );
}
