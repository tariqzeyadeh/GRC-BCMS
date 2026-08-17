import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';
import { useAuth } from '../../../context/AuthContext';

const LogoutButton = () => {
  const { t } = useTranslation('navbar');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <button onClick={handleLogout} className={NAVBAR_CLASSES.logoutButton} aria-label={t('Logout')}>
      <LogOut size={18} />
      <span className="whitespace-nowrap hidden sm:block">{t('Logout')}</span>
    </button>
  );
};

export default LogoutButton;
