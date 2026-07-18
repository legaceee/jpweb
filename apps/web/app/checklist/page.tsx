"use client";

import { useState } from "react";
import { CheckSquare, Printer, Lock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { submitAppointment } from "../actions";
import { getWhatsAppLink } from "../../lib/config";

const CHECKLIST_CATEGORIES = [
  {
    category: "Living & Dining Room",
    items: [
      "Full flat repainting (Satin / Velvet finish)",
      "False ceiling design with LED cove lighting",
      "TV unit back-paneling & hidden cable conduits",
      "Modular shoe rack & foyer seating",
    ],
  },
  {
    category: "Kitchen & Utility",
    items: [
      "Modular kitchen cabinets (L-shape / Parallel layout)",
      "Granite / Quartz countertop installation",
      "Chimney & gas-pipeline rough-in points",
      "Damp-proof under-sink storage box",
    ],
  },
  {
    category: "Bathrooms & Sanitary",
    items: [
      "Complete waterproofing treatment (3-coat system)",
      "Anti-skid floor tiling & wall dado tiles",
      "Concealed plumbing replacement (CPVC fittings)",
      "Glass shower partition installation",
    ],
  },
  {
    category: "Electrical & Plumbing",
    items: [
      "Modular switches & MCB distribution board",
      "Inverter / UPS backup wiring",
      "Geyser, AC, and washing machine power points",
      "Main door video door-phone cabling",
    ],
  },
];

export default function ChecklistPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      await submitAppointment({
        name,
        phone,
        serviceType: "Renovation Checklist Lead",
        preferredDate: new Date().toISOString().split("T")[0] ?? "",
        message: `Selected Items: ${selectedItems.join(", ")}`,
        source: "checklist",
      });
    } catch {
      // Continue even if DB write fails
    } finally {
      setSubmitting(false);
      setUnlocked(true);
      setShowModal(false);
    }
  };

  const getWhatsAppSummary = () => {
    return [
      `Hi JP Enterprises, I created a renovation checklist on your website:`,
      ``,
      `Selected Items (${selectedItems.length}):`,
      ...selectedItems.map((i) => `• ${i}`),
      ``,
      `Please contact me to schedule a site review in Mumbai.`,
    ].join("\n");
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12 text-center space-y-3">
        <span className="label-text text-accent flex items-center justify-center gap-1.5">
          <CheckSquare size={14} />
          Interactive Checklist
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-fg">
          Renovation Planning Checklist
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          Tick the work items required for your home renovation to generate a customized project summary.
        </p>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8 mb-12">
        {CHECKLIST_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-serif font-semibold text-fg mb-4 pb-2 border-b border-card-border">
              {cat.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.items.map((item, iIdx) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <button
                    key={iIdx}
                    type="button"
                    onClick={() => toggleItem(item)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isChecked
                        ? "border-accent bg-accent/10 text-fg font-medium"
                        : "border-card-border bg-bg text-muted hover:border-accent/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isChecked ? "bg-accent border-accent text-paper" : "border-card-border bg-bg"
                      }`}
                    >
                      {isChecked && <span className="text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-xs leading-relaxed">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Actions / Lead Capture */}
      <div className="bg-card-bg border border-accent/30 rounded-2xl p-8 text-center space-y-6">
        <div className="space-y-2">
          <span className="label-text text-accent">Summary Ready</span>
          <h2 className="text-2xl font-serif font-semibold text-fg">
            Selected Items: {selectedItems.length}
          </h2>
        </div>

        {!unlocked ? (
          <div className="space-y-4 max-w-md mx-auto">
            <p className="text-xs text-muted">
              Enter your contact details to download your checklist as PDF or send to WhatsApp.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
            >
              <Lock size={15} /> Unlock PDF & WhatsApp Share
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
            >
              <Printer size={16} /> Print / Save as PDF
            </button>

            <a
              href={getWhatsAppLink(getWhatsAppSummary())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
            >
              <FaWhatsapp className="text-[#25D366] w-5 h-5" />
              Send Checklist to WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Modal for Lead Capture */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 max-w-md w-full space-y-5">
            <h3 className="text-xl font-serif font-semibold text-fg">
              Unlock Your Renovation Checklist
            </h3>
            <p className="text-xs text-muted">
              Please enter your details so we can assist you with your project plan.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="label-text text-muted/70 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="label-text text-muted/70 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-card-border text-xs font-semibold text-muted hover:text-fg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-accent text-paper text-xs font-semibold hover:bg-accent-hover"
                >
                  {submitting ? "Unlocking..." : "Unlock Summary"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
