"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { contactConfig } from "../lib/config";
import { useI18n } from "../context/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { name: t.nav.services, href: "/#services" },
    { name: t.nav.process, href: "/#process" },
    { name: t.nav.portfolio, href: "/#portfolio" },
    { name: t.nav.testimonials, href: "/#testimonials" },
    { name: t.nav.contact, href: "/#contact" },
  ];

  const toolLinks = [
    { name: t.nav.estimator, href: "/estimate" },
    { name: t.nav.styleQuiz, href: "/style-quiz" },
    { name: t.nav.checklist, href: "/checklist" },
    { name: t.nav.refer, href: "/refer" },
    { name: t.nav.status, href: "/admin" },
  ];

  return (
    <footer className="bg-ink text-paper/80 pt-16 pb-8 border-t border-paper/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <img
              src="/assets/logo-dark.svg"
              alt="JP Enterprises"
              className="h-10 w-auto"
            />
            <p className="text-sm text-paper/50 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="label-text text-brass-light mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/50 hover:text-paper transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h3 className="label-text text-brass-light mb-6">Interactive Tools</h3>
            <ul className="space-y-3">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/50 hover:text-paper transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label-text text-brass-light mb-6">{t.footer.contact}</h3>
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
              {t.footer.serving}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-paper/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/30">
          <p>© {new Date().getFullYear()} JP Enterprises. {t.footer.rights}</p>
          <p>Interior Design & Civil Contracting — Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
