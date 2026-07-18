"use client";

import { useState } from "react";
import { Sparkles, Check, RefreshCw, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { getWhatsAppLink } from "../../lib/config";

interface Question {
  id: number;
  question: string;
  options: { label: string; profile: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What color palette resonates most with you?",
    options: [
      { label: "Soft plaster, beige, and warm muted woods", profile: "minimal" },
      { label: "Deep charcoal, bronze accents, and marble", profile: "luxury" },
      { label: "Exposed concrete, dark steel, and reclaimed timber", profile: "industrial" },
      { label: "Teak wood, rich brass, and classic ivory tones", profile: "traditional" },
    ],
  },
  {
    id: 2,
    question: "How do you prefer your space to feel?",
    options: [
      { label: "Clutter-free, calm, and naturally illuminated", profile: "minimal" },
      { label: "Opulent, grand, and sophisticated", profile: "luxury" },
      { label: "Raw, textured, and architectural", profile: "industrial" },
      { label: "Warm, heritage-inspired, and homely", profile: "traditional" },
    ],
  },
  {
    id: 3,
    question: "What material finish appeals to your touch?",
    options: [
      { label: "Matte satin laminates and natural oak veneer", profile: "minimal" },
      { label: "High-gloss lacquers and Italian Carrera marble", profile: "luxury" },
      { label: "Blackened iron framing and exposed brickwork", profile: "industrial" },
      { label: "Solid teak molding and antique brass hardware", profile: "traditional" },
    ],
  },
  {
    id: 4,
    question: "What is your main priority for storage & cabinetry?",
    options: [
      { label: "Seamless handleless push-to-open hidden cabinets", profile: "minimal" },
      { label: "Glass-fronted lighted display units & walk-in wardrobe", profile: "luxury" },
      { label: "Open metal shelving racks & industrial credenzas", profile: "industrial" },
      { label: "Carved wooden shutter wardrobes with brass handles", profile: "traditional" },
    ],
  },
];

const STYLE_PROFILES: Record<string, { name: string; description: string }> = {
  minimal: {
    name: "Warm Minimalist",
    description: "Focuses on uncluttered geometry, natural ivory plaster finishes, hidden storage, and subtle brass lines that bring tranquility to urban homes.",
  },
  luxury: {
    name: "Contemporary Luxury",
    description: "Features rich charcoal tones, integrated warm ambient lighting, Italian marble floorings, and sleek bronze metal accents.",
  },
  industrial: {
    name: "Architectural Loft",
    description: "Celebrates structural elements — exposed brickwork, matte black iron frames, raw wood grain, and functional architectural lines.",
  },
  traditional: {
    name: "Traditional Elegant",
    description: "Timeless Indian craftsmanship featuring rich teak wood cabinetry, classic molding details, antique brass accents, and enduring comfort.",
  },
};

export default function StyleQuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultProfile, setResultProfile] = useState<string | null>(null);

  const handleSelectOption = (profile: string) => {
    const newAnswers = [...answers, profile];
    setAnswers(newAnswers);

    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate dominant profile
      const counts: Record<string, number> = {};
      newAnswers.forEach((p) => (counts[p] = (counts[p] || 0) + 1));
      let topProfile = "minimal";
      let maxCount = 0;
      Object.entries(counts).forEach(([p, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topProfile = p;
        }
      });
      setResultProfile(topProfile);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setResultProfile(null);
  };

  const profileObj = resultProfile ? STYLE_PROFILES[resultProfile] : null;

  return (
    <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="mb-12 text-center space-y-3">
        <span className="label-text text-accent flex items-center justify-center gap-1.5">
          <Sparkles size={14} />
          Design Style Quiz
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-fg">
          Discover Your Aesthetic Profile
        </h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          Answer 4 quick questions to identify the ideal interior style for your Mumbai home.
        </p>
      </div>

      {!resultProfile ? (
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center text-xs text-muted pb-4 border-b border-card-border">
            <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}% Completed</span>
          </div>

          <h2 className="text-xl font-serif font-semibold text-fg">
            {QUESTIONS[currentQ]?.question}
          </h2>

          <div className="space-y-3">
            {QUESTIONS[currentQ]?.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(option.profile)}
                className="w-full text-left p-4 rounded-xl border border-card-border bg-bg hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium text-fg flex justify-between items-center cursor-pointer"
              >
                <span>{option.label}</span>
                <Check size={16} className="text-accent opacity-0 hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card-bg border border-accent/40 rounded-2xl p-8 text-center space-y-6 shadow-md">
          <span className="label-text text-accent">Your Matched Profile</span>
          <h2 className="text-3xl font-serif font-semibold text-fg">
            {profileObj?.name}
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto font-light">
            {profileObj?.description}
          </p>

          <div className="brass-rule w-16 mx-auto" />

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-paper px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
            >
              <Phone size={16} />
              Book Consultation with this Result
            </Link>

            <a
              href={getWhatsAppLink(
                `Hi JP Enterprises, I completed your Style Quiz and matched with the "${profileObj?.name}" profile. I'd like to discuss this for my project.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-fg hover:bg-accent/5 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
            >
              <FaWhatsapp className="text-[#25D366] w-5 h-5" />
              WhatsApp Result to Team
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-fg transition-colors"
            >
              <RefreshCw size={13} /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
