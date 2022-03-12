import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // https://react.i18next.com/latest/using-with-hooks
import Backend from 'i18next-http-backend'; // adding lazy loading for translations, more information here: https://github.com/i18next/i18next-http-backend
import detector from 'i18next-browser-languagedetector'; // auto detect the user language, more information here: https://github.com/i18next/i18next-browser-languageDetector
import { defaultlang, supportedlangs } from '@/config/defaultsConfig';

const resources = {};
const namespaces = [
  'common',
  'contact',
  'error',
  'footer',
  'form',
  'routes',
  'trade',
]; // Add all namespaces here
supportedlangs.forEach((lang) => {
  namespaces.forEach((namespace) => {
    resources[lang] = resources[lang] || {};
    resources[lang][
      namespace
    ] = require(`./assets/locales/${lang}/${namespace}.json`);
  });
});

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    debug: true,
    supportedLngs: supportedlangs,
    backend: {
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json', // locale files path
    },
    defaultNS: 'common',
    fallbackLng: defaultlang,
    detection: {
      order: ['path', 'navigator', 'localStorage'],
    },
    resources,
  });

export default i18n;
