import { createContext } from "react";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

export type Language = "ja" | "en";
export type LocalizedText = string | Record<Language, string>;

export const storageKey = "portfolio-language";
export const defaultLanguage: Language = "ja";

export const translations = { ja, en } as const;

export type Translation = (typeof translations)[Language];

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translation;
  text: (value: LocalizedText) => string;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const isLanguage = (value: string | null): value is Language =>
  value === "ja" || value === "en";
