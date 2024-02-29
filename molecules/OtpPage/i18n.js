import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './lang/en.json';
import hiTranslation from './lang/hi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
