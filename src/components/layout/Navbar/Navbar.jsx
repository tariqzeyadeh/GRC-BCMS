import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MobileMenuButton from './MobileMenuButton';
import LanguageToggle from './LanguageToggle';
import LogoutButton from './LogoutButton';
import Notifications from './Notifications';
import ThemeToggle from '../../ui/ThemeToggle';

import { useAuth } from '../../../context/AuthContext';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';
import DtLogo from '../../../assets/dt-logo.png';

const Navbar = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();
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
          <Notifications />
          <ThemeToggle />
          <LanguageToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
