import { Link } from 'react-router-dom';

import MobileMenuButton from './MobileMenuButton';
import LanguageToggle from './LanguageToggle';
import LogoutButton from './LogoutButton';
import ThemeToggle from '../../ui/ThemeToggle';

import { useTheme } from '../../../context/ThemeContext';
import { NAVBAR_CLASSES } from '../../../constants/navbarConstants';
import DevoteamLogo from '../../../assets/logo_name.png';
import DevoteamLogoWhite from '../../../assets/logo_name_white.png';

const Navbar = ({ onToggleMobileMenu }) => {
  const { theme } = useTheme();

  return (
    <header className={NAVBAR_CLASSES.header}>
      <div className="flex items-center justify-between w-full">
        <div className={NAVBAR_CLASSES.leftSection}>
          <MobileMenuButton onToggle={onToggleMobileMenu} />
          <Link to="/" className="flex items-center no-underline">
            <img
              src={theme === 'dark' ? DevoteamLogoWhite : DevoteamLogo}
              alt="logo"
              className="w-24 sm:w-36 lg:w-48"
            />
          </Link>
        </div>

        <div className={NAVBAR_CLASSES.rightSection}>
          <ThemeToggle />
          <LanguageToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
