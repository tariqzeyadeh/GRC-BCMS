/** Mock active crisis — Phase 4 Active Crisis Dashboard */

/** ISO timestamp when the mock disruption started (fixed for demo clock). */
export const CRISIS_STARTED_AT = '2026-08-17T11:42:00';

export const crisisScenario = {
  id: 'CRISIS-2026-08-17',
  severity: 'Critical',
  status: 'Active',
  title: 'ACTIVE CRISIS MODE',
  scenario: 'Ransomware Attack on Main Data Center',
  location: 'Primary DC · Region A',
  commander: 'Elena Vasquez',
  startedAt: CRISIS_STARTED_AT,
};

export const crisisTimelineInitial = [
  {
    id: 'evt-1',
    time: '11:42',
    action: 'Ransomware indicators detected on core file servers. Incident declared.',
    user: 'Marcus Reid',
    type: 'alert',
  },
  {
    id: 'evt-2',
    time: '11:48',
    action: 'Business Continuity Plan BCP-013 activated. War room bridge opened.',
    user: 'Elena Vasquez',
    type: 'plan',
  },
  {
    id: 'evt-3',
    time: '11:55',
    action: 'Mass alert issued to IT, Finance, and Customer Ops on-call teams.',
    user: 'Priya Nair',
    type: 'comms',
  },
  {
    id: 'evt-4',
    time: '12:10',
    action: 'IT Failover Plan initiated — payment traffic steered to secondary region.',
    user: 'Wei Zhang',
    type: 'recovery',
  },
  {
    id: 'evt-5',
    time: '12:28',
    action: 'Executive Board notified. Regulatory disclosure playbook in review.',
    user: 'Laila Haddad',
    type: 'comms',
  },
  {
    id: 'evt-6',
    time: '12:45',
    action: 'Settlement queue integrity check in progress (step 4 of recovery).',
    user: 'Sarah Chen',
    type: 'recovery',
  },
  {
    id: 'evt-7',
    time: '13:02',
    action: 'Customer status page updated. Contact center scripts activated.',
    user: 'Jonah Fischer',
    type: 'comms',
  },
];

export const activatedPlansInitial = [
  {
    id: 'plan-it-failover',
    name: 'IT Failover Plan',
    type: 'DRP',
    owner: 'Marcus Reid',
    linkedBcp: 'BCP-013',
    progress: 65,
    stepsDone: 4,
    stepsTotal: 7,
    status: 'In Progress',
  },
  {
    id: 'plan-payment-bcp',
    name: 'Payment Authorization Continuity Plan',
    type: 'BCP',
    owner: 'Sarah Chen',
    linkedBcp: 'BCP-013',
    progress: 42,
    stepsDone: 3,
    stepsTotal: 7,
    status: 'In Progress',
  },
  {
    id: 'plan-comms',
    name: 'Crisis Communications Playbook',
    type: 'BCP',
    owner: 'Jonah Fischer',
    linkedBcp: 'BCP-COMMS',
    progress: 78,
    stepsDone: 7,
    stepsTotal: 9,
    status: 'In Progress',
  },
  {
    id: 'plan-vendor',
    name: 'Critical Vendor Escalation DRP',
    type: 'DRP',
    owner: 'Aisha Bello',
    linkedBcp: 'DRP-VEN-02',
    progress: 25,
    stepsDone: 1,
    stepsTotal: 4,
    status: 'Activated',
  },
];
