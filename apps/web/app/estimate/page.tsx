"use client";

import { useState } from "react";
import { Calculator, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { PRICING_CONFIG, SPACE_TYPES } from "../../config/pricing";
import { getWhatsAppLink } from "../../lib/config";

export default function CostEstimatorPage() {
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<"interior" | "civil" | "both">("both");
  const [spaceType, setSpaceType] = useState<string>("2bhk");
  const [sqFt, setSqFt] = useState<number>(850);
  const [tier, setTier] = useState<"essential" | "premium" | "luxury">("premium");

  const calculateEstimate = () => {
    const band = PRICING_CONFIG[tier]!;
    let rates = band.bothPerSqFt;
    if (service === "interior") rates = band.interiorPerSqFt;
    if (service === "civil") rates = band.civilPerSqFt;

    const minCostINR = sqFt * rates.min;
    const maxCostINR = sqFt * rates.max;

    const minLakh = (minCostINR / 100000).toFixed(2);
    const maxLakh = (maxCostINR / 100000).toFixed(2);

    return { minLakh, maxLakh };
  };

  const estimate = calculateEstimate();

  const getEstimateWhatsAppMsg = () => {
    const spaceObj = SPACE_TYPES.find((s) => s.id === spaceType);
    const bandObj = PRICING_CONFIG[tier]!;
    return [
      `Hi JP Enterprises, I calculated an indicative estimate on your website:`,
      ``,
      `Service: ${service.toUpperCase()}`,
      `Space: ${spaceObj?.label ?? spaceType}`,
      `Area: ${sqFt} sq. ft.`,
      `Finish Tier: ${bandObj.label}`,
      `Estimated Cost: ₹${estimate.minLakh} Lakh - ₹${estimate.maxLakh} Lakh`,
      ``,
      `I would like to discuss this and schedule a site visit in Mumbai.`,
    ].join("\n");
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12 text-center space-y-3">
        <span className="label-text text-accent flex items-center justify-center gap-1.5">
          <Calculator size={14} />
          Interactive Cost Estimator
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-fg">
          Calculate Your Project Estimate
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          Get an immediate indicative cost range for your Mumbai interior or civil contracting project in four quick steps.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-card-border h-1.5 rounded-full mb-10 overflow-hidden">
        <div
          className="bg-accent h-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-8 shadow-sm">
        {/* STEP 1: Service Type */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-semibold text-fg">
              1. What service do you require?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "interior", title: "Interior Design", desc: "Modular kitchen, woodwork, lighting & decor" },
                { id: "civil", title: "Civil Contracting", desc: "Renovation, masonry, waterproofing, tiling" },
                { id: "both", title: "Both (Turnkey)", desc: "Full civil execution + complete interior fit-out" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setService(item.id as any)}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    service === item.id
                      ? "border-accent bg-accent/10"
                      : "border-card-border bg-bg hover:border-accent/40"
                  }`}
                >
                  <h3 className="font-semibold text-fg mb-1">{item.title}</h3>
                  <p className="text-xs text-muted">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Space Type */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-semibold text-fg">
              2. Select your property type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SPACE_TYPES.map((space) => (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => {
                    setSpaceType(space.id);
                    setSqFt(space.avgSqFt);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    spaceType === space.id
                      ? "border-accent bg-accent/10"
                      : "border-card-border bg-bg hover:border-accent/40"
                  }`}
                >
                  <h3 className="font-semibold text-fg text-sm">{space.label}</h3>
                  <p className="text-xs text-muted">~{space.avgSqFt} sq. ft.</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Area Slider */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-semibold text-fg">
              3. Approximate Area (sq. ft.)
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-fg font-semibold">
                <span>Selected Area:</span>
                <span className="text-2xl text-accent font-serif">{sqFt} sq. ft.</span>
              </div>

              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />

              <div className="flex justify-between text-xs text-muted">
                <span>200 sq. ft.</span>
                <span>5,000 sq. ft.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Finish Tier & Results */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-semibold text-fg">
                4. Select Material & Finish Tier
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(["essential", "premium", "luxury"] as const).map((tKey) => {
                  const item = PRICING_CONFIG[tKey];
                  if (!item) return null;
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => setTier(tKey)}
                      className={`p-5 rounded-xl border text-left transition-all ${
                        tier === tKey
                          ? "border-accent bg-accent/10"
                          : "border-card-border bg-bg hover:border-accent/40"
                      }`}
                    >
                      <h3 className="font-semibold text-fg mb-1">{item.label}</h3>
                      <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculated Result Display */}
            <div className="p-6 rounded-2xl bg-bg border border-accent/30 text-center space-y-4">
              <span className="label-text text-accent">Indicative Estimate</span>
              <div className="text-3xl sm:text-5xl font-serif font-semibold text-fg">
                ₹{estimate.minLakh} – ₹{estimate.maxLakh} <span className="text-xl font-sans font-normal">Lakh</span>
              </div>

              <p className="text-xs text-muted max-w-md mx-auto italic">
                *Note: This is a preliminary calculation based on Mumbai rate bands. The final accurate quote is provided following a detailed site visit and layout measurement.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
                >
                  <Phone size={16} />
                  Book Site Visit with this Estimate
                </Link>

                <a
                  href={getWhatsAppLink(getEstimateWhatsAppMsg())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
                >
                  <FaWhatsapp className="text-[#25D366] w-5 h-5" />
                  Send Estimate to WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex justify-between items-center pt-8 border-t border-card-border mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-fg transition-colors"
            >
              <ArrowLeft size={16} /> Previous
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
