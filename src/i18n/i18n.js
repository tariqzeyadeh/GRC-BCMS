import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enNavbar from './en/navbar.json';
import arNavbar from './ar/navbar.json';
import enSidebar from './en/sidebar.json';
import arSidebar from './ar/sidebar.json';
import enGrc from './en/grc.json';
import arGrc from './ar/grc.json';
import enBcms from './en/bcms.json';
import arBcms from './ar/bcms.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { navbar: enNavbar, sidebar: enSidebar, grc: enGrc, bcms: enBcms },
      ar: { navbar: arNavbar, sidebar: arSidebar, grc: arGrc, bcms: arBcms },
    },
    fallbackLng: 'en',
    defaultNS: 'sidebar',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
