import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locales/it.json';
import en from './locales/en.json';
import { DEFAULT_LANG, langFromPath } from './paths.js';

// To add a language: create locales/<code>.json with the same keys as it.json,
// import it here, add it to `resources` and LANGUAGES, and give it a URL prefix in paths.js.
export const LANGUAGES = [
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'en', label: 'EN', name: 'English' },
];

// The language comes from the URL, so the prerendered HTML and the browser agree.
const initialLang = typeof window === 'undefined' ? DEFAULT_LANG : langFromPath(window.location.pathname);

i18n.use(initReactI18next).init({
  resources: { it: { translation: it }, en: { translation: en } },
  lng: initialLang,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: LANGUAGES.map((l) => l.code),
  interpolation: { escapeValue: false },
  initAsync: false,
});

export default i18n;
