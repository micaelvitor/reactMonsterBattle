import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from '../locales/pt.json';
import en from '../locales/en.json';

const resources = {
  pt: { translation: pt },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'querystring', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n; 