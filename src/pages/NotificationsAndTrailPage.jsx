import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { getAuditTrail, clearAuditTrail } from '../lib/auditTrail';
import { useState } from 'react';

const NotificationsAndTrailPage = () => {
  const { t } = useTranslation('grc');
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const [trail, setTrail] = useState(() => getAuditTrail());

  const refreshTrail = () => setTrail(getAuditTrail());

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-text m-0">{t('Notifications & Audit Trail')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('Automated reminders and a local change log for transparency.')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-ghost border border-border" onClick={markAllNotificationsRead}>
            {t('Mark all read')}
          </button>
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() => {
              clearAuditTrail();
              refreshTrail();
            }}
          >
            {t('Clear audit trail')}
          </button>
        </div>
      </div>

      <section className="card p-4">
        <h2 className="text-base font-semibold m-0 mb-3">{t('Notifications')}</h2>
        <ul className="m-0 p-0 list-none space-y-2">
          {notifications.map(n => (
            <li
              key={n.id}
              className={`border rounded-lg p-3 ${n.read ? 'border-border bg-surface' : 'border-brand/40 bg-brand/5'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="m-0 text-sm font-medium text-text">{t(n.title)}</p>
                  <p className="m-0 mt-1 text-xs text-text-muted">{t(n.body)}</p>
                  <p className="m-0 mt-1 text-[11px] text-text-muted">{new Date(n.at).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {n.linkTo && (
                    <Link
                      to={n.linkTo}
                      className="text-xs text-brand no-underline"
                      onClick={() => markNotificationRead(n.id)}
                    >
                      {t('Open')}
                    </Link>
                  )}
                  {!n.read && (
                    <button
                      type="button"
                      className="btn btn-ghost h-7 px-2 text-xs"
                      onClick={() => markNotificationRead(n.id)}
                    >
                      {t('Mark read')}
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold m-0">{t('Audit Trail')}</h2>
          <button type="button" className="btn btn-ghost h-8 px-2 text-xs" onClick={refreshTrail}>
            {t('Refresh')}
          </button>
        </div>
        {trail.length === 0 ? (
          <p className="text-sm text-text-muted m-0">{t('No audit events yet.')}</p>
        ) : (
          <ul className="m-0 p-0 list-none space-y-2 max-h-96 overflow-y-auto">
            {trail.map(e => (
              <li key={e.id} className="border-b border-border pb-2 last:border-0">
                <p className="m-0 text-sm text-text">
                  <span className="font-medium">{e.user}</span> · {t(e.action)} · {t(e.entityType)}{' '}
                  {e.entityId}
                </p>
                <p className="m-0 text-xs text-text-muted">{t(e.summary)}</p>
                <p className="m-0 text-[11px] text-text-muted">{new Date(e.at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationsAndTrailPage;
