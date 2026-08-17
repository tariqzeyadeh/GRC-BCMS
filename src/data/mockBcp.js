export const planHeader = {
  id: 'BCP-013',
  title: 'Payment Authorization & Settlement',
  status: 'Active',
  linkedBiaId: 'BIA-001',
  department: 'Finance',
  owner: 'Sarah Chen',
  version: 'v3.2',
  lastUpdated: 'Nov 4, 2025',
  nextReview: 'Feb 4, 2026',
  rto: '1h',
  rpo: '15m',
  scope:
    'Covers restoration of payment authorization, clearing, and settlement services in the event of a data center outage, core banking failure, or extended vendor disruption. Applies to the Finance and IT & Security teams and their designated backups.',
};

export const callTreeChains = [
  {
    id: 'incident-command',
    label: 'Incident Command',
    description: 'Declares the incident and coordinates the overall response.',
    contacts: [
      { tier: 'Primary', name: 'Sarah Chen', role: 'Head of Settlements', phone: '+1 (415) 555-0142', email: 's.chen@aegisbank.com', initials: 'SC' },
      { tier: 'Backup 1', name: 'David Okafor', role: 'VP, Finance Operations', phone: '+1 (415) 555-0198', email: 'd.okafor@aegisbank.com', initials: 'DO' },
      { tier: 'Backup 2', name: 'Elena Vasquez', role: 'Director, Business Continuity', phone: '+1 (415) 555-0176', email: 'e.vasquez@aegisbank.com', initials: 'EV' },
    ],
  },
  {
    id: 'technical-recovery',
    label: 'Technical Recovery',
    description: 'Executes the failover and restores system availability.',
    contacts: [
      { tier: 'Primary', name: 'Marcus Reid', role: 'Lead Platform Engineer', phone: '+1 (415) 555-0113', email: 'm.reid@aegisbank.com', initials: 'MR' },
      { tier: 'Backup 1', name: 'Wei Zhang', role: 'Senior Site Reliability Engineer', phone: '+1 (415) 555-0187', email: 'w.zhang@aegisbank.com', initials: 'WZ' },
      { tier: 'Backup 2', name: 'Aisha Bello', role: 'Infrastructure Manager', phone: '+1 (415) 555-0164', email: 'a.bello@aegisbank.com', initials: 'AB' },
    ],
  },
  {
    id: 'customer-comms',
    label: 'Customer Communications',
    description: 'Manages customer and regulatory notifications during the outage.',
    contacts: [
      { tier: 'Primary', name: 'Priya Nair', role: 'Treasury Operations Lead', phone: '+1 (415) 555-0129', email: 'p.nair@aegisbank.com', initials: 'PN' },
      { tier: 'Backup 1', name: 'Jonah Fischer', role: 'Head of Customer Communications', phone: '+1 (415) 555-0155', email: 'j.fischer@aegisbank.com', initials: 'JF' },
      { tier: 'Backup 2', name: 'Laila Haddad', role: 'Compliance & Regulatory Affairs', phone: '+1 (415) 555-0140', email: 'l.haddad@aegisbank.com', initials: 'LH' },
    ],
  },
];

export const recoveryStepsInitial = [
  { id: 'step-1', order: 1, action: 'Declare incident and activate the Business Continuity Plan via the on-call bridge.', responsibleRole: 'Incident Commander', duration: '10 mins' },
  { id: 'step-2', order: 2, action: 'Notify the call tree and confirm attendance of primary and backup responders.', responsibleRole: 'Head of Settlements', duration: '15 mins' },
  { id: 'step-3', order: 3, action: 'Failover payment authorization traffic to the secondary data center region.', responsibleRole: 'Lead Platform Engineer', duration: '30 mins' },
  { id: 'step-4', order: 4, action: 'Validate settlement queue integrity and reconcile in-flight transactions.', responsibleRole: 'Treasury Operations Lead', duration: '45 mins' },
  { id: 'step-5', order: 5, action: 'Restore customer-facing payment status endpoints and confirm health checks.', responsibleRole: 'Senior Site Reliability Engineer', duration: '20 mins' },
  { id: 'step-6', order: 6, action: 'Issue regulatory and customer notifications per the disclosure playbook.', responsibleRole: 'Compliance & Regulatory Affairs', duration: '30 mins' },
  { id: 'step-7', order: 7, action: 'Conduct post-incident review and update the plan with lessons learned.', responsibleRole: 'Director, Business Continuity', duration: '60 mins' },
];
