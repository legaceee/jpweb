import { MapPin, ExternalLink } from "lucide-react";
import { contactConfig } from "../lib/config";

export default function ServiceAreaMap() {
  return (
    <section className="py-24 px-6 bg-card-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="w-full aspect-[4/3] lg:aspect-[3/2] rounded-xl overflow-hidden border border-card-border">
            <iframe
              src={contactConfig.googleMapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JP Enterprises location on Google Maps — Rashmi Avenue, Shop No. 6, Thakur Complex, Mumbai"
            />
          </div>

          {/* Address + CTA */}
          <div className="space-y-6">
            <span className="label-text text-accent block">
              Visit Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-fg">
              Find our office
            </h2>

            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                className="text-accent shrink-0 mt-1"
              />
              <p className="text-muted leading-relaxed">
                {contactConfig.address}
              </p>
            </div>

            <p className="text-sm text-muted/70">
              Serving homes and businesses across Mumbai
            </p>

            <a
              href={contactConfig.googleMapDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              <ExternalLink size={15} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
