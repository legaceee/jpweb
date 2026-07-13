import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { contactConfig } from "../lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-white/5 text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Company Info */}
        <div className="space-y-4">
          <Link href="/">
            <img src="/logo-dark.svg" alt="JP Enterprises" className="h-12 w-auto mb-4" />
          </Link>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            Crafting premium residential and commercial spaces. From architectural foundations to luxury interior finishes, we deliver excellence and timeless quality.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaFacebookF size={18} /></a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaLinkedinIn size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-white font-semibold text-lg mb-6 border-b border-primary/20 pb-2 w-16">Services</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/services/residential-interiors" className="hover:text-primary transition-colors">Residential Interiors</Link></li>
            <li><Link href="/services/commercial-interiors" className="hover:text-primary transition-colors">Commercial Design</Link></li>
            <li><Link href="/services/civil-contracting" className="hover:text-primary transition-colors">Civil Contracting</Link></li>
            <li><Link href="/services/modular-kitchen" className="hover:text-primary transition-colors">Modular Kitchens</Link></li>
            <li><Link href="/services/construction" className="hover:text-primary transition-colors">House Construction</Link></li>
            <li><Link href="/services/renovation" className="hover:text-primary transition-colors">Home Renovation</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-white font-semibold text-lg mb-6 border-b border-primary/20 pb-2 w-16">Contact</h3>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <span>{contactConfig.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-primary shrink-0" />
              <a href={`tel:${contactConfig.phone}`} className="hover:text-primary">{contactConfig.phone}</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href={`mailto:${contactConfig.email}`} className="hover:text-primary">{contactConfig.email}</a>
            </li>
            <li className="flex items-start space-x-3">
              <Clock size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-white/40">Sunday: Closed</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Google Maps Mockup / Embed */}
        <div>
          <h3 className="font-serif text-white font-semibold text-lg mb-6 border-b border-primary/20 pb-2 w-16">Location</h3>
          <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3768233762885!2d73.8727402!3d18.5118742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzQyLjciTiA3M8KwNTInMjEuOSJFOg!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-light">
        <p>© {new Date().getFullYear()} JP Enterprises. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
