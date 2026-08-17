export const bcmsKpis = {
  criticalProcesses: {
    label: 'Total Critical Processes',
    value: 42,
    delta: 4,
    deltaLabel: '+4 newly classified',
    trend: [{ value: 34 }, { value: 35 }, { value: 37 }, { value: 38 }, { value: 40 }, { value: 41 }, { value: 42 }],
  },
  averageRto: {
    label: 'Average RTO (Actual)',
    value: 5.4,
    suffix: 'h',
    delta: 1.4,
    deltaLabel: 'Target 4.0h · 1.4h over',
    trend: [{ value: 7.1 }, { value: 6.8 }, { value: 6.4 }, { value: 6.0 }, { value: 5.9 }, { value: 5.6 }, { value: 5.4 }],
  },
  overdueBiaReviews: {
    label: 'Overdue BIA Reviews',
    value: 7,
    delta: 2,
    deltaLabel: '+2 past due date',
    trend: [{ value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 6 }, { value: 7 }],
  },
  upcomingDrills: {
    label: 'Upcoming Drills (30d)',
    value: 6,
    delta: 3,
    deltaLabel: '+3 vs. last cycle',
    trend: [{ value: 2 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 6 }],
  },
};

export const biaCompletionByDepartment = [
  { department: 'IT & Security', completed: 11, inProgress: 3, overdue: 1 },
  { department: 'Finance', completed: 8, inProgress: 2, overdue: 2 },
  { department: 'Operations', completed: 9, inProgress: 4, overdue: 1 },
  { department: 'Customer Ops', completed: 6, inProgress: 2, overdue: 2 },
  { department: 'Supply Chain', completed: 5, inProgress: 3, overdue: 1 },
  { department: 'HR', completed: 4, inProgress: 1, overdue: 0 },
];

export const exerciseSuccessRate = [
  { period: 'Q1 24', rate: 62 },
  { period: 'Q2 24', rate: 68 },
  { period: 'Q3 24', rate: 71 },
  { period: 'Q4 24', rate: 69 },
  { period: 'Q1 25', rate: 77 },
  { period: 'Q2 25', rate: 82 },
  { period: 'Q3 25', rate: 85 },
  { period: 'Q4 25', rate: 91 },
];

export const processTiers = ['Tier 1 Critical', 'Tier 2 Important', 'Tier 3 Normal'];

export const criticalProcesses = [
  { rank: 1, id: 'BIA-001', name: 'Payment Authorization & Settlement', department: 'Finance', tier: 'Tier 1 Critical', rto: '1h', rpo: '15m', dependencies: 9 },
  { rank: 2, id: 'BIA-002', name: 'Core Banking Ledger', department: 'IT & Security', tier: 'Tier 1 Critical', rto: '2h', rpo: '15m', dependencies: 12 },
  { rank: 3, id: 'BIA-003', name: 'Customer Authentication Service', department: 'IT & Security', tier: 'Tier 1 Critical', rto: '2h', rpo: '30m', dependencies: 7 },
  { rank: 4, id: 'BIA-004', name: 'Fraud Detection & Monitoring', department: 'Risk', tier: 'Tier 1 Critical', rto: '3h', rpo: '30m', dependencies: 6 },
  { rank: 5, id: 'BIA-005', name: 'Order Management & Fulfilment', department: 'Operations', tier: 'Tier 2 Important', rto: '4h', rpo: '1h', dependencies: 8 },
  { rank: 6, id: 'BIA-006', name: 'Customer Support Contact Center', department: 'Customer Ops', tier: 'Tier 2 Important', rto: '4h', rpo: '2h', dependencies: 5 },
  { rank: 7, id: 'BIA-007', name: 'Supplier Procurement Portal', department: 'Supply Chain', tier: 'Tier 2 Important', rto: '6h', rpo: '2h', dependencies: 4 },
  { rank: 8, id: 'BIA-008', name: 'Regulatory Reporting Pipeline', department: 'Finance', tier: 'Tier 2 Important', rto: '8h', rpo: '4h', dependencies: 6 },
  { rank: 9, id: 'BIA-009', name: 'Corporate Email & Collaboration', department: 'IT & Security', tier: 'Tier 3 Normal', rto: '12h', rpo: '4h', dependencies: 3 },
  { rank: 10, id: 'BIA-010', name: 'Employee Payroll Processing', department: 'HR', tier: 'Tier 3 Normal', rto: '24h', rpo: '12h', dependencies: 2 },
  { rank: 11, id: 'BIA-011', name: 'Internal Knowledge Base', department: 'Operations', tier: 'Tier 3 Normal', rto: '24h', rpo: '24h', dependencies: 1 },
  { rank: 12, id: 'BIA-012', name: 'Marketing Campaign Platform', department: 'Customer Ops', tier: 'Tier 3 Normal', rto: '48h', rpo: '24h', dependencies: 2 },
];
