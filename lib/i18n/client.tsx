"use client";

import { createContext, useCallback, useContext, useMemo, useState, useTransition } from "react";
import { setLocale } from "@/app/actions";
import { Language, t as translate } from "./config";

interface I18nContextValue {
  lang: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isPending: boolean;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  initialLang: Language;
  children: React.ReactNode;
}

export function I18nProvider({ initialLang, children }: I18nProviderProps) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [isPending, startTransition] = useTransition();

  const handleSetLanguage = useCallback(
    (next: Language) => {
      if (next === lang) return;
      setLang(next);
      startTransition(() => setLocale(next));
    },
    [lang, startTransition],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t: (key: string) => translate(lang, key),
      setLanguage: handleSetLanguage,
      toggleLanguage: () => handleSetLanguage(lang === "en" ? "tr" : "en"),
      isPending,
    }),
    [handleSetLanguage, isPending, lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
