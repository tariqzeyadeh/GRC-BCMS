import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';

const LanguageToggle = () => {
  const { t } = useTranslation('navbar');
  const { currentLanguage, toggleLanguage } = useLanguage();
  const label = currentLanguage?.startsWith('ar') ? t('Switch to English') : t('Switch to Arabic');

  return (
    <button
      onClick={toggleLanguage}
      className={NAVBAR_CLASSES.languageButton}
      aria-label={label}
    >
      <Globe className="w-4 h-4 text-blue-500" />
      <span>{t('switch')}</span>
    </button>
  );
};

export default LanguageToggle;
