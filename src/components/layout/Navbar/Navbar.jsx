import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import MobileMenuButton from './MobileMenuButton';
import LanguageToggle from './LanguageToggle';
import LogoutButton from './LogoutButton';
import ThemeToggle from '../../ui/ThemeToggle';

import { useAuth } from '../../../context/AuthContext';
import { useAppData } from '../../../context/AppDataContext';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';
import DtLogo from '../../../assets/dt-logo.png';

const Navbar = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();
  const { unreadCount } = useAppData();
  const { t } = useTranslation('grc');

  return (
    <header className={NAVBAR_CLASSES.header}>
      <div className="flex items-center justify-between w-full">
        <div className={NAVBAR_CLASSES.leftSection}>
          <MobileMenuButton onToggle={onToggleMobileMenu} />
          <Link to="/" className="flex items-center no-underline">
            <img
              src={DtLogo}
              alt="Devoteam"
              className="h-8 sm:h-9 lg:h-10 w-auto rounded-full object-contain"
            />
          </Link>
        </div>

        <div className={NAVBAR_CLASSES.rightSection}>
          {user && (
            <span className="hidden sm:inline text-xs text-text-muted truncate max-w-40">
              {user.name} · {t(user.role)}
            </span>
          )}
          <Link
            to="/notifications"
            className="relative btn btn-ghost h-9 w-9 p-0 no-underline text-text"
            aria-label={t('Notifications')}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <LanguageToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
