import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';

const LogoutButton = () => {
  const { t } = useTranslation('navbar');

  const handleLogout = () => {
    console.info('Logout clicked');
  };

  return (
    <button onClick={handleLogout} className={NAVBAR_CLASSES.logoutButton} aria-label={t('Logout')}>
      <LogOut size={20} strokeWidth={1} />
      <span className="whitespace-nowrap hidden sm:block">{t('Logout')}</span>
    </button>
  );
};

export default LogoutButton;
