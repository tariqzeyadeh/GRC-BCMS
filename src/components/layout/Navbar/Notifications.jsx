import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bell, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../../context/AppDataContext';

const PANEL_Z_INDEX = 9999;
const PANEL_WIDTH = 320;

const Notifications = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('grc');
  const isRTL = i18n.language?.startsWith('ar');
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const [panelStyle, setPanelStyle] = useState({});

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    let left = isRTL ? rect.right - PANEL_WIDTH : rect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - PANEL_WIDTH - 8));
    setPanelStyle({
      position: 'fixed',
      top: rect.bottom + 8,
      left,
      width: PANEL_WIDTH,
      zIndex: PANEL_Z_INDEX,
    });
  }, [isOpen, isRTL]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClick = e => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        close();
      }
    };
    const handleEsc = e => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleNotificationClick = item => {
    markNotificationRead(item.id);
    if (item.linkTo) {
      navigate(item.linkTo);
      close();
    }
  };

  const preview = notifications.slice(0, 10);

  const panel = isOpen ? (
    <div
      ref={panelRef}
      style={panelStyle}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-2xl"
    >
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h4 className="m-0 text-sm font-semibold text-text">{t('Notifications')}</h4>
            <p className="m-0 mt-0.5 text-xs text-text-muted">
              {unreadCount > 0
                ? t('{{count}} unread', { count: unreadCount })
                : t('You are all caught up')}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-brand hover:opacity-80"
            >
              {t('Mark all read')}
            </button>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-auto">
        {preview.length ? (
          preview.map(item => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className="cursor-pointer border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-surface"
              onClick={() => handleNotificationClick(item)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleNotificationClick(item);
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-border' : 'bg-brand'}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="m-0 line-clamp-1 text-sm font-medium text-text">{t(item.title)}</h5>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-text-muted">
                      <Clock size={12} />
                      {new Date(item.at).toLocaleString()}
                    </span>
                  </div>
                  <p className="m-0 mt-1 line-clamp-2 text-xs text-text-muted">{t(item.body)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="m-0 px-4 py-6 text-center text-sm text-text-muted">{t('No notifications yet.')}</p>
        )}
      </div>

      <div
        className="cursor-pointer border-t border-border bg-surface px-4 py-2.5 transition-colors hover:bg-surface-elevated"
        onClick={() => {
          navigate('/notifications');
          close();
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            navigate('/notifications');
            close();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <button
          type="button"
          className="w-full cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-brand hover:opacity-80"
        >
          {t('View all notifications')}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className="relative btn btn-ghost h-9 w-9 p-0 text-text"
        aria-label={t('Notifications')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <Bell className="h-5 w-5 text-text-muted" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -end-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] leading-4 text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </button>
      {createPortal(panel, document.body)}
    </div>
  );
};

export default Notifications;
