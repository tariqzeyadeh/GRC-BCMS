import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      document.body.classList.add('ar-font');
    } else {
      document.body.classList.remove('ar-font');
    }
  }, [i18n.language]);

  const toggleLanguage = () => {
    const nextLang = i18n.language?.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  const isRTL = i18n.language?.startsWith('ar');

  return {
    currentLanguage: i18n.language,
    toggleLanguage,
    isRTL,
  };
};
