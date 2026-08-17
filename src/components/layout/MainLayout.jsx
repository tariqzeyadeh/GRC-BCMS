import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useSidebar } from '../../context';
import { useLanguage } from '../../hooks/useLanguage';

import Sidebar from './Sidebar';
import Navbar from './Navbar/Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { isCollapsed } = useSidebar();
  const { i18n } = useTranslation('sidebar');
  const { isRTL } = useLanguage();
  const dirRTL = isRTL || i18n.dir() === 'rtl';

  const mainSidebarOffsetClass = isCollapsed
    ? dirRTL
      ? 'lg:pr-20'
      : 'lg:pl-20'
    : dirRTL
      ? 'lg:pr-58'
      : 'lg:pl-58';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)} />

      <div className="flex flex-1 mt-14">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
        <div className={`flex-1 transition-all duration-300 flex flex-col h-auto max-w-full ${mainSidebarOffsetClass}`}>
          <div className="flex-1 p-2 md:p-4 md:pb-12 flex flex-col h-full">
            <main className="flex-1 flex flex-col h-full justify-between w-full sm:container-app">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
