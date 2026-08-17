import { ensureSeed, loadJson, saveJson } from './storage';

const KEY = 'audit-trail';

export function getAuditTrail() {
  return ensureSeed(KEY, () => []);
}

export function appendAudit({ action, entityType, entityId, summary, user, meta }) {
  const entry = {
    id: `AT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    action: action || 'update',
    entityType: entityType || 'system',
    entityId: entityId || '',
    summary: summary || '',
    user: user || 'System',
    meta: meta || null,
  };
  const list = loadJson(KEY, []);
  const next = [entry, ...list].slice(0, 500);
  saveJson(KEY, next);
  return entry;
}

export function clearAuditTrail() {
  saveJson(KEY, []);
}
