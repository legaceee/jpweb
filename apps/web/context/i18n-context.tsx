"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "../lib/i18n";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations["en"];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("jp-lang") as Language | null;
    if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("jp-lang", newLang);
  };

  const t = translations[lang] || translations.en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
