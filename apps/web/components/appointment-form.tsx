"use client";

import { useState, useTransition, useEffect } from "react";
import { Phone, Mail, Send, CheckCircle2, AlertCircle, Calendar, Clock } from "lucide-react";
import { submitAppointment, getBookedSlotsAction } from "../app/actions";
import { contactConfig, getWhatsAppLink } from "../lib/config";

interface AppointmentFormProps {
  initialService?: string;
  source?: "booking" | "checklist" | "estimate";
  prefilledMessage?: string;
}

const HOURLY_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function AppointmentForm({
  initialService = "",
  source = "booking",
  prefilledMessage = "",
}: AppointmentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    getBookedSlotsAction(selectedDate)
      .then((slots) => setBookedSlots(slots))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setDbError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("serviceType") as string,
      preferredDate: selectedDate,
      scheduledSlot: selectedSlot,
      message: formData.get("message") as string,
      source,
    };

    const whatsappText = [
      `Hi JP Enterprises, I'd like to book a site visit.`,
      ``,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Service: ${data.serviceType}`,
      `Date: ${data.preferredDate}`,
      data.scheduledSlot ? `Time Slot: ${data.scheduledSlot}` : "",
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
          setDbError(true);
        }

        setSubmitted(true);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
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
          {/* Left Context */}
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
              Select your preferred date and available hour slot. We&apos;ll reach
              out to confirm your site visit in Mumbai. No commitment, no charges for the initial consultation.
            </p>

            <div className="brass-rule w-12" />

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

          {/* Right Form with Slot Scheduler */}
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
                  defaultValue={initialService}
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none cursor-pointer appearance-none"
                >
                  <option value="" disabled={!initialService}>
                    Select a service
                  </option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Civil Contracting">Civil Contracting</option>
                  <option value="Both — Interior + Civil">
                    Both — Interior + Civil
                  </option>
                </select>
              </div>

              {/* Slot Scheduler Date & Time */}
              <div className="space-y-3">
                <label
                  htmlFor="appointment-date"
                  className="label-text text-muted/70 flex items-center gap-1.5"
                >
                  <Calendar size={13} className="text-accent" />
                  Select Date
                </label>
                <input
                  id="appointment-date"
                  name="preferredDate"
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none"
                />

                {/* Available Time Slots */}
                {selectedDate && (
                  <div className="pt-2">
                    <label className="label-text text-muted/70 flex items-center gap-1.5 mb-2">
                      <Clock size={13} className="text-accent" />
                      Select Available Hourly Slot (Mon–Sat)
                    </label>

                    {loadingSlots ? (
                      <p className="text-xs text-muted">Checking available slots...</p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {HOURLY_SLOTS.map((slot) => {
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = selectedSlot === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                                isBooked
                                  ? "bg-stone/10 border-stone/20 text-muted/40 cursor-not-allowed line-through"
                                  : isSelected
                                  ? "bg-accent border-accent text-paper"
                                  : "bg-bg border-card-border text-fg hover:border-accent/40"
                              }`}
                            >
                              {slot} {isBooked ? "(Booked)" : ""}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
                  defaultValue={prefilledMessage}
                  placeholder="e.g. 2BHK flat renovation in Borivali, looking for kitchen remodel..."
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-60 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Confirm Site Visit & WhatsApp Handoff
                  </>
                )}
              </button>

              <p className="text-xs text-muted/50 text-center pt-1">
                Your slot booking is saved permanently and sent via WhatsApp for quick confirmation
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
