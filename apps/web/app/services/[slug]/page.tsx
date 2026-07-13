import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData } from "../../../lib/services-data";
import { contactConfig, getWhatsAppLink } from "../../../lib/config";
import { CheckCircle2, ChevronRight, Phone, FileText, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};

  return {
    title: `${service.title} | JP Enterprises`,
    description: service.tagline + " " + service.description.substring(0, 100),
    openGraph: {
      title: `${service.title} | JP Enterprises`,
      description: service.description,
      images: [{ url: service.image }],
    }
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white/90 pb-24">
      {/* Service Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
            {service.category} Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Column: Description & Sub-services */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-white border-l-2 border-primary pl-4 py-1">
              Service Overview
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          {/* Sub-services Grid */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-serif text-white">
              What We Offer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.subServices.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex items-start space-x-3 hover:border-primary/20 transition-colors"
                >
                  <CheckCircle2 className="text-primary mt-1 shrink-0" size={16} />
                  <span className="text-sm text-white/80 font-medium">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-serif text-white">
              Why Choose Our {service.category} Team?
            </h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-white/70 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Contact Widget & Actions */}
        <div className="space-y-8">
          {/* Booking Widget */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">
            <h3 className="font-serif text-xl text-white font-semibold">
              Get Started Today
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Schedule a site inspection or get an approximate quotation estimation for your property.
            </p>

            <div className="space-y-4">
              <Link
                href="/book"
                className="w-full bg-primary hover:bg-primary-hover text-dark py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center space-x-2 transition-all hover:scale-102"
              >
                <Phone size={14} />
                <span>Book Free Appointment</span>
              </Link>
              <Link
                href="/quote"
                className="w-full bg-transparent border border-white/20 hover:border-white/50 text-white py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center space-x-2 transition-all hover:bg-white/5"
              >
                <FileText size={14} />
                <span>Request Free Quote</span>
              </Link>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 space-y-4">
            <h4 className="font-serif text-lg text-primary font-medium">
              Direct Contact
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Need immediate assistance? Call our projects head directly or chat on WhatsApp.
            </p>
            <div className="space-y-2 pt-2 text-sm">
              <p className="text-white/60">Phone: <a href={`tel:${contactConfig.phone.replace(/[^\d+]/g, "")}`} className="text-white hover:text-primary font-semibold">{contactConfig.phone}</a></p>
              <p className="text-white/60">WhatsApp: <a href={getWhatsAppLink("Hi JP Enterprises, I have a query about services.")} className="text-white hover:text-primary font-semibold">Chat Now</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-serif text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
            {service.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border-b border-white/5 pb-4 [&_summary::-webkit-details-marker]:hidden last:border-b-0"
              >
                <summary className="flex justify-between items-center cursor-pointer text-white/90 hover:text-primary transition-colors py-2 font-medium">
                  <span className="text-sm md:text-base pr-4">{faq.question}</span>
                  <span className="text-primary shrink-0 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-2 text-white/60 text-xs md:text-sm leading-relaxed font-light pl-2">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Section CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-gradient-to-r from-primary/20 via-bronze/10 to-transparent border border-white/5 rounded-3xl p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-3">
            <h3 className="font-serif text-3xl text-white">Ready to renovate your space?</h3>
            <p className="text-sm text-white/60 font-light max-w-xl">
              Let's create something extraordinary. Contact us to schedule an on-site consultation with our design engineer today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="bg-primary hover:bg-primary-hover text-dark px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Book Appointment</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
