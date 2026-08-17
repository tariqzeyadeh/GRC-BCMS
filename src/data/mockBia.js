export const wizardSteps = [
  { id: 'details', index: 1, title: 'Process Details', description: 'Identify the process and its owner' },
  { id: 'impact', index: 2, title: 'Impact Assessment', description: 'Rate disruption impact over time' },
  { id: 'dependencies', index: 3, title: 'Dependencies', description: 'Systems, people, and vendors' },
  { id: 'rto-rpo', index: 4, title: 'RTO / RPO Calculation', description: 'Derive recovery objectives' },
];

export const impactCategories = [
  { id: 'financial', label: 'Financial', description: 'Lost revenue, penalties, and recovery cost' },
  { id: 'operational', label: 'Operational', description: 'Service delivery and productivity loss' },
  { id: 'reputational', label: 'Reputational', description: 'Brand, customer trust, and media exposure' },
];

export const timeframes = [
  { id: '1h', label: '1 Hour', sublabel: 'Immediate' },
  { id: '24h', label: '24 Hours', sublabel: 'Same day' },
  { id: '3d', label: '3 Days', sublabel: 'Short term' },
  { id: '1w', label: '1 Week', sublabel: 'Sustained' },
];

export const initialImpactGrid = {
  financial: { '1h': 'Low', '24h': 'Med', '3d': 'High', '1w': 'High' },
  operational: { '1h': 'Med', '24h': 'High', '3d': 'High', '1w': 'High' },
  reputational: { '1h': 'Low', '24h': 'Low', '3d': 'Med', '1w': 'High' },
};

export const dependencyLists = [
  {
    id: 'it-systems',
    title: 'Required IT Systems',
    icon: 'systems',
    addLabel: 'Add system',
    items: [
      { id: 'sys-1', name: 'Core Banking Ledger', detail: 'On-prem · Tier 1' },
      { id: 'sys-2', name: 'Payment Gateway API', detail: 'SaaS · Stripe' },
      { id: 'sys-3', name: 'Identity Provider (SSO)', detail: 'Cloud · Okta' },
      { id: 'sys-4', name: 'Data Warehouse', detail: 'Cloud · Snowflake' },
    ],
  },
  {
    id: 'personnel',
    title: 'Key Personnel',
    icon: 'personnel',
    addLabel: 'Add person',
    items: [
      { id: 'per-1', name: 'Sarah Chen', detail: 'Head of Settlements' },
      { id: 'per-2', name: 'Marcus Reid', detail: 'Lead Platform Engineer' },
      { id: 'per-3', name: 'Priya Nair', detail: 'Treasury Operations' },
    ],
  },
  {
    id: 'vendors',
    title: 'Third-Party Vendors',
    icon: 'vendors',
    addLabel: 'Add vendor',
    items: [
      { id: 'ven-1', name: 'Stripe Inc.', detail: 'Payment processing · Critical' },
      { id: 'ven-2', name: 'Amazon Web Services', detail: 'Infrastructure · Critical' },
      { id: 'ven-3', name: 'Twilio', detail: 'SMS / OTP delivery · Important' },
    ],
  },
];

export const biaDraftMeta = {
  id: 'BIA-013',
  status: 'Draft',
  processName: 'Payment Authorization & Settlement',
  department: 'Finance',
  owner: 'Sarah Chen',
};
