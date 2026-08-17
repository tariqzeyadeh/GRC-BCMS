import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';

const MobileMenuButton = ({ onToggle }) => {
  const { t } = useTranslation('navbar');
  return (
    <button onClick={onToggle} className={NAVBAR_CLASSES.mobileMenuButton} aria-label={t('Toggle mobile menu')}>
      <Menu className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default MobileMenuButton;
