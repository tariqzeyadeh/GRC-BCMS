import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  SEED_AUDITS,
  SEED_CONTROLS,
  SEED_DRILLS,
  SEED_FINDINGS,
  SEED_GOALS,
  SEED_INTEGRATIONS,
  SEED_KRIS,
  SEED_NOTIFICATIONS,
  SEED_ORG_UNITS,
  SEED_PROCESS_RISK_LINKS,
} from '../data/seedExtended';
import { ensureSeed, saveJson } from '../lib/storage';
import { appendAudit } from '../lib/auditTrail';
import { useAuth } from './AuthContext';

const AppDataContext = createContext(null);

function useSeededList(key, seed) {
  const [items, setItems] = useState(() => ensureSeed(key, () => seed));

  const replace = useCallback(
    (next, audit) => {
      setItems(prev => {
        const value = typeof next === 'function' ? next(prev) : next;
        saveJson(key, value);
        if (audit) appendAudit(audit);
        return value;
      });
    },
    [key]
  );

  return [items, replace];
}

export function AppDataProvider({ children }) {
  const { user } = useAuth();
  const actor = user?.name || 'System';

  const [audits, setAudits] = useSeededList('audits', SEED_AUDITS);
  const [findings, setFindings] = useSeededList('findings', SEED_FINDINGS);
  const [controls, setControls] = useSeededList('controls', SEED_CONTROLS);
  const [kris, setKris] = useSeededList('kris', SEED_KRIS);
  const [drills, setDrills] = useSeededList('drills', SEED_DRILLS);
  const [goals, setGoals] = useSeededList('goals', SEED_GOALS);
  const [orgUnits, setOrgUnits] = useSeededList('org-units', SEED_ORG_UNITS);
  const [notifications, setNotifications] = useSeededList('notifications', SEED_NOTIFICATIONS);
  const [processRiskLinks, setProcessRiskLinks] = useSeededList(
    'process-risk-links',
    SEED_PROCESS_RISK_LINKS
  );
  const [integrations, setIntegrations] = useSeededList('integrations', SEED_INTEGRATIONS);

  const updateFinding = useCallback(
    (id, patch) => {
      setFindings(
        prev => prev.map(f => (f.id === id ? { ...f, ...patch } : f)),
        {
          action: 'update',
          entityType: 'finding',
          entityId: id,
          summary: 'Finding updated',
          user: actor,
        }
      );
    },
    [setFindings, actor]
  );

  const addFinding = useCallback(
    finding => {
      const row = {
        id: `FND-${String(findings.length + 1).padStart(2, '0')}`,
        status: 'Open',
        ...finding,
      };
      setFindings(prev => [row, ...prev], {
        action: 'create',
        entityType: 'finding',
        entityId: row.id,
        summary: 'Finding created',
        user: actor,
      });
      return row;
    },
    [findings.length, setFindings, actor]
  );

  const updateControl = useCallback(
    (id, patch) => {
      setControls(
        prev => prev.map(c => (c.id === id ? { ...c, ...patch } : c)),
        {
          action: 'update',
          entityType: 'control',
          entityId: id,
          summary: 'Control effectiveness updated',
          user: actor,
        }
      );
    },
    [setControls, actor]
  );

  const updateAudit = useCallback(
    (id, patch) => {
      setAudits(
        prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)),
        {
          action: 'update',
          entityType: 'audit',
          entityId: id,
          summary: 'Audit updated',
          user: actor,
        }
      );
    },
    [setAudits, actor]
  );

  const addAudit = useCallback(
    audit => {
      const row = {
        id: `AUD-${String(audits.length + 1).padStart(2, '0')}`,
        status: 'Open',
        type: 'Internal',
        ...audit,
      };
      setAudits(prev => [row, ...prev], {
        action: 'create',
        entityType: 'audit',
        entityId: row.id,
        summary: 'Audit planned',
        user: actor,
      });
      return row;
    },
    [audits.length, setAudits, actor]
  );

  const updateDrill = useCallback(
    (id, patch) => {
      setDrills(
        prev => prev.map(d => (d.id === id ? { ...d, ...patch } : d)),
        {
          action: 'update',
          entityType: 'drill',
          entityId: id,
          summary: 'Drill updated',
          user: actor,
        }
      );
    },
    [setDrills, actor]
  );

  const markNotificationRead = useCallback(
    id => {
      setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    },
    [setNotifications]
  );

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [setNotifications]);

  const pushNotification = useCallback(
    ntf => {
      const row = {
        id: `NTF-${Date.now()}`,
        at: new Date().toISOString(),
        read: false,
        ...ntf,
      };
      setNotifications(prev => [row, ...prev]);
      return row;
    },
    [setNotifications]
  );

  const linkProcessRisks = useCallback(
    (processId, riskIds) => {
      setProcessRiskLinks(
        prev => {
          const others = prev.filter(x => x.processId !== processId);
          return [...others, { processId, riskIds }];
        },
        {
          action: 'update',
          entityType: 'process-risk-link',
          entityId: processId,
          summary: 'Linked risks to process',
          user: actor,
        }
      );
    },
    [setProcessRiskLinks, actor]
  );

  const simulateIntegrationSync = useCallback(
    id => {
      const now = new Date().toISOString();
      setIntegrations(
        prev =>
          prev.map(i =>
            i.id === id ? { ...i, status: 'Connected (simulated)', lastSync: now } : i
          ),
        {
          action: 'sync',
          entityType: 'integration',
          entityId: id,
          summary: 'Simulated sync for integration',
          user: actor,
        }
      );
      pushNotification({
        type: 'system',
        title: 'Integration sync completed',
        body: 'Simulated sync finished.',
        linkTo: '/integrations',
      });
    },
    [setIntegrations, actor, pushNotification]
  );

  const value = useMemo(
    () => ({
      audits,
      findings,
      controls,
      kris,
      drills,
      goals,
      orgUnits,
      notifications,
      processRiskLinks,
      integrations,
      unreadCount: notifications.filter(n => !n.read).length,
      updateFinding,
      addFinding,
      updateControl,
      updateAudit,
      addAudit,
      updateDrill,
      markNotificationRead,
      markAllNotificationsRead,
      pushNotification,
      linkProcessRisks,
      simulateIntegrationSync,
      setGoals,
      setOrgUnits,
      setKris,
      setControls,
    }),
    [
      audits,
      findings,
      controls,
      kris,
      drills,
      goals,
      orgUnits,
      notifications,
      processRiskLinks,
      integrations,
      updateFinding,
      addFinding,
      updateControl,
      updateAudit,
      addAudit,
      updateDrill,
      markNotificationRead,
      markAllNotificationsRead,
      pushNotification,
      linkProcessRisks,
      simulateIntegrationSync,
      setGoals,
      setOrgUnits,
      setKris,
      setControls,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
