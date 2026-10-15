import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import it from './locales/it.json';
import en from './locales/en.json';

// To add a language: create locales/<code>.json with the same keys as it.json,
// import it here and add it to `resources` and LANGUAGES.
export const LANGUAGES = [
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'en', label: 'EN', name: 'English' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { it: { translation: it }, en: { translation: en } },
    fallbackLng: 'it',
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'yih-lang',
      caches: ['localStorage'],
    },
  });

const syncDocument = (lng) => {
  if (typeof document === 'undefined') return;
  const lang = lng.split('-')[0];
  document.documentElement.lang = lang;
  document.title = i18n.t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'));
};
i18n.on('languageChanged', syncDocument);
syncDocument(i18n.resolvedLanguage ?? 'it');

export default i18n;
