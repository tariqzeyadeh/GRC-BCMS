import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, X, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SIDEBAR_ROUTES, SIDEBAR_SECTIONS } from '../../constants/sidebarRoutes';
import { useSidebar, useAuth } from '../../context';
import { cn } from '../../lib/utils';

function pathMatches(pathname, routePath) {
  if (routePath === '/') return pathname === '/';
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

function isChildActive(pathname, child) {
  if (child.path === '/policies') {
    return pathname === '/policies';
  }
  if (child.path === '/risks') {
    return pathname === '/risks';
  }
  if (child.path === '/bcms') {
    return pathname === '/bcms';
  }
  return pathname === child.path || pathname.startsWith(`${child.path}/`);
}

function isParentActive(pathname, route) {
  if (!route.children?.length) return pathMatches(pathname, route.path);
  if (route.path === '/') return pathname === '/';
  return pathMatches(pathname, route.path);
}

const Sidebar = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('sidebar');
  const location = useLocation();
  const isRTL = i18n.dir() === 'rtl';
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const next = {};
    SIDEBAR_ROUTES.forEach(route => {
      const childActive = route.children?.some(c => isChildActive(location.pathname, c));
      if (route.children?.length && (isParentActive(location.pathname, route) || childActive)) {
        next[route.key] = true;
      }
    });
    setOpenGroups(prev => ({ ...prev, ...next }));
  }, [location.pathname]);

  const handleMobileMenuClose = () => onCloseMobileMenu();

  const handleLinkClick = () => {
    if (isMobileMenuOpen) handleMobileMenuClose();
  };

  const toggleGroup = key => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showLabels = !isCollapsed || isMobileMenuOpen;

  const renderRoute = route => {
    const hasChildren = route.children?.length > 0;
    const parentActive = isParentActive(location.pathname, route);
    const expanded = Boolean(openGroups[route.key]) && showLabels;

    if (hasChildren) {
      return (
        <li key={route.key}>
          <div className="flex items-center gap-1">
            <Link
              to={route.path}
              onClick={handleLinkClick}
              className={cn(
                'flex flex-1 items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-text no-underline min-w-0',
                parentActive && !expanded ? 'bg-brand/15 text-brand' : '',
                parentActive && expanded ? 'text-brand' : ''
              )}
              title={!showLabels ? t(route.label) : ''}
            >
              {route.icon && (
                <span className="shrink-0">
                  <route.icon size={22} strokeWidth={1} />
                </span>
              )}
              {showLabels && <span className="truncate">{t(route.label)}</span>}
            </Link>
            {showLabels && (
              <button
                type="button"
                className="btn btn-ghost h-8 w-8 p-0 shrink-0 text-text-muted"
                aria-expanded={expanded}
                aria-label={t(route.label)}
                onClick={() => toggleGroup(route.key)}
              >
                <ChevronDown
                  size={16}
                  className={cn('transition-transform', expanded && 'rotate-180')}
                />
              </button>
            )}
          </div>

          {expanded && (
            <ul className="mt-1 mb-2 ms-3 ps-3 border-s border-border space-y-0.5 list-none m-0">
              {route.children.map(child => {
                const childActive = isChildActive(location.pathname, child);
                return (
                  <li key={child.key}>
                    <Link
                      to={child.path}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm no-underline transition-colors',
                        childActive
                          ? 'bg-brand text-white font-medium'
                          : 'text-text-muted hover:text-text hover:bg-surface'
                      )}
                    >
                      {child.icon && (
                        <child.icon size={16} strokeWidth={1.5} className="shrink-0 opacity-90" />
                      )}
                      <span className="truncate">{t(child.label)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={route.key}>
        <Link
          to={route.path}
          onClick={handleLinkClick}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-text no-underline',
            parentActive ? 'bg-brand text-white' : ''
          )}
          title={!showLabels ? t(route.label) : ''}
        >
          {route.icon && (
            <span>
              <route.icon size={22} strokeWidth={1} />
            </span>
          )}
          {showLabels && <span className="whitespace-nowrap">{t(route.label)}</span>}
        </Link>
      </li>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-x-hidden">
      <div className="shrink-0 p-4 pb-0">
        {isMobileMenuOpen && (
          <div className="flex items-center justify-end mb-4">
            <button
              type="button"
              onClick={handleMobileMenuClose}
              className="p-1 rounded-lg transition-colors duration-200 hover:bg-surface-elevated"
            >
              <X className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          </div>
        )}

        <div className="border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3 px-2 py-1 rounded-lg bg-surface">
            <User className="text-brand" size={20} />
            {showLabels && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text text-sm truncate">{user?.name || t('user')}</p>
                {user?.role && showLabels && (
                  <p className="text-[10px] text-text-muted m-0 truncate">{user.role}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-2">
        <div className="space-y-3">
          {SIDEBAR_SECTIONS.map(section => {
            const visibleRoutes = section.routes.filter(route => route.showInSidebar);
            if (!visibleRoutes.length) return null;

            return (
              <div key={section.key} className="space-y-1">
                {showLabels && (
                  <p className="px-3 pt-2 pb-1 m-0 text-[10px] font-bold uppercase tracking-[0.08em] text-text-muted">
                    {t(section.label)}
                  </p>
                )}
                {!showLabels && section.key !== 'main' && (
                  <div className="mx-3 my-2 border-t border-border" aria-hidden="true" />
                )}
                <ul className="space-y-1 m-0 p-0 list-none">{visibleRoutes.map(renderRoute)}</ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-border pt-4 px-4 pb-4">
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/login', { replace: true });
          }}
          className="w-full flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200 font-medium text-red-600 hover:bg-red-50 hover:text-red-700 border border-border"
          title={!showLabels ? t('logout') : ''}
        >
          <LogOut size={22} strokeWidth={1} />
          {showLabels && <span className="whitespace-nowrap">{t('logout')}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`fixed top-14 ${isRTL ? 'right-0' : 'left-0'} h-[calc(100vh-3.5rem)] border-x border-border text-white bg-surface-elevated 
        transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-58'} hidden lg:block`}
      >
        {sidebarContent}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-left-3' : '-right-3'} w-6 h-10 flex items-center justify-center rounded-full bg-surface-elevated text-text-muted border border-border shadow-sm hover:bg-brand hover:text-white hover:border-brand transition-colors duration-200 z-40 cursor-pointer`}
          aria-label={isCollapsed ? t('Expand sidebar') : t('Collapse sidebar')}
        >
          {isCollapsed ? (
            isRTL ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : isRTL ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={handleMobileMenuClose}>
          <div
            className={`fixed top-0 ${
              isRTL ? 'right-0' : 'left-0'
            } h-screen w-64 bg-surface-elevated border-x border-border text-white shadow-lg transform transition-transform duration-300 ease-in-out z-[60]`}
            onClick={e => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
