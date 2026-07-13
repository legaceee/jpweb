"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do you charge for the initial consultation and site visits?",
    answer: "Our preliminary telephone consultation is free. If a physical site visit, structural level assessment, and custom laser measurement is required, a nominal fee is charged, which is fully adjusted against the final design contract."
  },
  {
    question: "How do you ensure the quality of materials during civil construction?",
    answer: "We purchase steel, cement, and piping directly from authorized brand distributors. We provide cube compression test laboratory reports for concrete cast on-site and material invoice logs to clients."
  },
  {
    question: "What is your warranty policy on interior woodworking?",
    answer: "We offer a 5-year warranty on all modular cabinetry, including termites protection and laminate delamination, alongside manufacturing guarantees for Hettich/Blum hardware."
  },
  {
    question: "Which cities do you currently offer services in?",
    answer: "We currently provide full-service turnkey interior designing and civil contracting across Pune, Mumbai, Bangalore, and Nashik, with local engineers supervising each region."
  },
  {
    question: "What is the typical timeline for an apartment interior renovation?",
    answer: "An apartment interior project typically takes between 45 to 75 working days, from layout design sign-offs to final modular woodworking assembly on site."
  }
];

export default function SearchableFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-3.5 text-foreground/30" />
        <input
          type="text"
          placeholder="Search frequently asked questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card border border-border focus:border-primary/50 text-foreground rounded-2xl py-3 pl-12 pr-4 text-xs font-light focus:outline-none transition-colors shadow-sm"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="text-xs md:text-sm font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown
                    size={15}
                    className={`text-primary shrink-0 transition-transform duration-350 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {isOpen && (
                  <div className="mt-2 text-foreground/60 text-xs md:text-sm leading-relaxed font-light pl-1 transition-all duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-foreground/40 font-light text-center py-6">
            No matching questions found. Try search query terms like "warranty", "visit", or "rate".
          </p>
        )}
      </div>
    </div>
  );
}
