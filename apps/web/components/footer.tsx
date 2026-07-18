import { MapPin, Phone, Mail } from "lucide-react";
import { contactConfig } from "../lib/config";

const quickLinks = [
  { name: "Services", href: "#services" },
  { name: "Our Process", href: "#process" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Book a Visit", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 pt-16 pb-8 border-t border-paper/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/assets/logo-dark.svg"
              alt="JP Enterprises"
              className="h-10 w-auto"
            />
            <p className="text-sm text-paper/50 leading-relaxed max-w-xs">
              Interior design and civil contracting in Mumbai. Decades of
              hands-on experience, from structural foundations to finished
              interiors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="label-text text-brass-light mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/50 hover:text-paper transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label-text text-brass-light mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brass-light shrink-0 mt-0.5" />
                <span className="text-paper/50">{contactConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brass-light shrink-0" />
                <a
                  href={`tel:${contactConfig.phone.replace(/\s/g, "")}`}
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brass-light shrink-0" />
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  {contactConfig.email}
                </a>
              </li>
            </ul>
            <p className="text-xs text-paper/30 mt-4">
              Serving Mumbai
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-paper/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/30">
          <p>© {new Date().getFullYear()} JP Enterprises. All rights reserved.</p>
          <p>Interior Design & Civil Contracting — Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
