"use client";

import { useState, useTransition } from "react";
import { Phone, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { submitAppointment } from "../app/actions";
import { contactConfig, getWhatsAppLink } from "../lib/config";

export default function AppointmentForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setDbError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("serviceType") as string,
      preferredDate: formData.get("preferredDate") as string,
      message: formData.get("message") as string,
    };

    // Build WhatsApp message
    const whatsappText = [
      `Hi JP Enterprises, I'd like to book a site visit.`,
      ``,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Service: ${data.serviceType}`,
      `Preferred Date: ${data.preferredDate}`,
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = getWhatsAppLink(whatsappText);

    startTransition(async () => {
      try {
        const result = await submitAppointment(data);

        if (!result.success && result.errors) {
          setErrors(result.errors);
          return;
        }

        if (!result.success) {
          // DB failed but we still redirect to WhatsApp
          setDbError(true);
        }

        setSubmitted(true);

        // Open WhatsApp regardless of DB result
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // If server action completely fails, still open WhatsApp
        setDbError(true);
        setSubmitted(true);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    });
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <CheckCircle2 size={48} className="text-accent mx-auto" />
          <h2 className="text-2xl font-serif font-semibold text-fg">
            We&apos;ve received your request
          </h2>
          <p className="text-muted">
            A WhatsApp message has been prepared for you. If it didn&apos;t open
            automatically, you can reach us directly:
          </p>

          {dbError && (
            <div className="flex items-center gap-2 justify-center text-sm text-amber-600 dark:text-amber-400">
              <AlertCircle size={14} />
              <span>
                Your request was sent via WhatsApp but couldn&apos;t be saved to
                our system. We&apos;ll still get back to you.
              </span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={`tel:${contactConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 border border-accent/30 text-fg px-5 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-accent/5"
            >
              <Phone size={16} />
              {contactConfig.phone}
            </a>
            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-flex items-center gap-2 border border-accent/30 text-fg px-5 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-accent/5"
            >
              <Mail size={16} />
              {contactConfig.email}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Context */}
          <div className="lg:col-span-2 space-y-6">
            <span className="label-text text-accent block">
              Book a Site Visit
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-fg leading-tight">
              Let&apos;s start with
              <br />
              your space
            </h2>
            <p className="text-muted leading-relaxed">
              Fill in the form and we&apos;ll reach out to schedule a visit to
              your site in Mumbai. No commitment, no charges for the initial
              consultation.
            </p>

            <div className="brass-rule w-12" />

            {/* Secondary contact options */}
            <div className="space-y-3 pt-2">
              <p className="label-text text-muted/60">Or reach us directly</p>
              <a
                href={`tel:${contactConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-muted hover:text-fg transition-colors"
              >
                <Phone size={15} className="text-accent" />
                {contactConfig.phone}
              </a>
              <a
                href={`mailto:${contactConfig.email}`}
                className="flex items-center gap-3 text-sm text-muted hover:text-fg transition-colors"
              >
                <Mail size={15} className="text-accent" />
                {contactConfig.email}
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card-bg border border-card-border rounded-2xl p-8 space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="appointment-name"
                  className="label-text text-muted/70 block mb-2"
                >
                  Your Name
                </label>
                <input
                  id="appointment-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="appointment-phone"
                  className="label-text text-muted/70 block mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="appointment-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="appointment-service"
                  className="label-text text-muted/70 block mb-2"
                >
                  Service Required
                </label>
                <select
                  id="appointment-service"
                  name="serviceType"
                  required
                  defaultValue=""
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none cursor-pointer appearance-none"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Civil Contracting">Civil Contracting</option>
                  <option value="Both — Interior + Civil">
                    Both — Interior + Civil
                  </option>
                </select>
                {errors.serviceType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.serviceType[0]}
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="appointment-date"
                  className="label-text text-muted/70 block mb-2"
                >
                  Preferred Date
                </label>
                <input
                  id="appointment-date"
                  name="preferredDate"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none"
                />
                {errors.preferredDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.preferredDate[0]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="appointment-message"
                  className="label-text text-muted/70 block mb-2"
                >
                  Tell Us About Your Project{" "}
                  <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="appointment-message"
                  name="message"
                  rows={3}
                  placeholder="e.g. 2BHK flat renovation in Borivali, looking for kitchen remodel and bathroom waterproofing..."
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Book Site Visit
                  </>
                )}
              </button>

              <p className="text-xs text-muted/50 text-center pt-1">
                Your details will be sent via WhatsApp for quick confirmation
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
