"use client";

import { useState } from "react";
import { Gift, Share2, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { submitReferralAction } from "../actions";
import { getWhatsAppLink } from "../../lib/config";

export default function ReferPage() {
  const [submitting, setSubmitting] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      referrerName: formData.get("referrerName") as string,
      referrerPhone: formData.get("referrerPhone") as string,
      refereeName: formData.get("refereeName") as string,
      refereePhone: formData.get("refereePhone") as string,
    };

    const res = await submitReferralAction(data);
    setSubmitting(false);

    if (res.success && res.code) {
      setReferralCode(res.code);
    } else {
      setError(res.error || "Failed to register referral.");
    }
  };

  const getReferralWhatsAppMsg = () => {
    return [
      `Hi! I'm referring you to JP Enterprises for interior design and civil contracting in Mumbai.`,
      ``,
      `Use my referral code: ${referralCode}`,
      `They provide hands-on quality, transparent quoting, and owner-led execution.`,
      ``,
      `Check out their website: https://jpenterprises.com`,
    ].join("\n");
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="mb-12 text-center space-y-3">
        <span className="label-text text-accent flex items-center justify-center gap-1.5">
          <Gift size={14} />
          Referral Program
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-fg">
          Refer a Friend & Earn Benefits
        </h1>
        <p className="text-muted text-base max-w-md mx-auto">
          {/* TODO: Client to confirm actual referral incentive terms */}
          Know someone planning an interior renovation or civil construction in Mumbai? Introduce them to JP Enterprises.
        </p>
      </div>

      {!referralCode ? (
        <form
          onSubmit={handleSubmit}
          className="bg-card-bg border border-card-border rounded-2xl p-8 space-y-6 shadow-sm"
        >
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-fg border-b border-card-border pb-2">
              Your Details (Referrer)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text text-muted/70 block mb-1">Your Name</label>
                <input
                  name="referrerName"
                  type="text"
                  required
                  placeholder="e.g. Anil Kapoor"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="label-text text-muted/70 block mb-1">Your Phone</label>
                <input
                  name="referrerPhone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-serif font-semibold text-fg border-b border-card-border pb-2">
              Person Being Referred (Referee)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text text-muted/70 block mb-1">Friend&apos;s Name</label>
                <input
                  name="refereeName"
                  type="text"
                  required
                  placeholder="e.g. Sameer Mehta"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="label-text text-muted/70 block mb-1">Friend&apos;s Phone</label>
                <input
                  name="refereePhone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-bg border border-card-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent hover:bg-accent-hover text-paper py-3.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
          >
            {submitting ? "Registering..." : "Generate Referral Code & Share"}
          </button>
        </form>
      ) : (
        <div className="bg-card-bg border border-accent/40 rounded-2xl p-8 text-center space-y-6">
          <CheckCircle2 size={48} className="text-accent mx-auto" />
          <h2 className="text-2xl font-serif font-semibold text-fg">
            Referral Registered Successfully!
          </h2>
          <div className="p-4 bg-bg border border-card-border rounded-xl inline-block">
            <span className="label-text text-muted block mb-1">Your Referral Code</span>
            <span className="text-2xl font-mono font-bold text-accent">{referralCode}</span>
          </div>

          <p className="text-xs text-muted max-w-md mx-auto">
            Share this referral code with your friend. Our team will get in touch with them regarding their site visit.
          </p>

          <div>
            <a
              href={getWhatsAppLink(getReferralWhatsAppMsg())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
            >
              <FaWhatsapp className="text-[#25D366] w-5 h-5" />
              Share Referral Code on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
