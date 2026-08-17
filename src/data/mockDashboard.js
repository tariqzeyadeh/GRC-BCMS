/**
 * @typedef {Object} TrendPoint
 * @property {string} month
 * @property {number} value
 */

/** Executive KPIs with trends & appetite */
export const kpiSummary = {
  totalRisks: 18,
  compliancePercent: 78,
  openAudits: 5,
  pendingPolicies: 8,
  controlEffectiveness: 72,
  issueMttrDays: 14,
  appetiteBreaches: 4,
  thirdPartyHighRisk: 3,
};

export const complianceDonut = {
  compliant: 78,
  gap: 22,
};

export const complianceByFramework = [
  { name: 'ISO 27001', percent: 81, value: 81, trend: 3 },
  { name: 'NIST CSF', percent: 74, value: 74, trend: -1 },
  { name: 'SOC 2', percent: 88, value: 88, trend: 2 },
  { name: 'NCA ECC', percent: 78, value: 78, trend: 1 },
  { name: 'PCI DSS', percent: 71, value: 71, trend: -2 },
];

export const risksByDept = [
  { name: 'IT', count: 8 },
  { name: 'Operations', count: 6 },
  { name: 'Finance', count: 4 },
  { name: 'HR', count: 3 },
  { name: 'Legal', count: 3 },
  { name: 'Procurement', count: 2 },
];

/** Stacked severity by department (executive-grc-dashboard chart) */
export const risksByDepartmentStacked = [
  { department: 'IT & Security', high: 9, medium: 14, low: 6 },
  { department: 'Finance', high: 5, medium: 10, low: 8 },
  { department: 'Operations', high: 7, medium: 12, low: 9 },
  { department: 'HR', high: 2, medium: 6, low: 11 },
  { department: 'Legal', high: 4, medium: 7, low: 5 },
  { department: 'Vendor Mgmt', high: 6, medium: 9, low: 4 },
];

export const kpiSparklines = {
  risks: [{ value: 22 }, { value: 21 }, { value: 20 }, { value: 19 }, { value: 18 }, { value: 18 }],
  compliance: [{ value: 72 }, { value: 74 }, { value: 75 }, { value: 76 }, { value: 77 }, { value: 78 }],
  controls: [{ value: 65 }, { value: 67 }, { value: 68 }, { value: 70 }, { value: 71 }, { value: 72 }],
  mttr: [{ value: 18 }, { value: 17 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 14 }],
  audits: [{ value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 5 }],
  policies: [{ value: 12 }, { value: 11 }, { value: 10 }, { value: 9 }, { value: 8 }, { value: 8 }],
};

/** Residual risk score trend (avg of top risks) */
export const residualRiskTrend = [
  { month: 'Mar', value: 14 },
  { month: 'Apr', value: 13 },
  { month: 'May', value: 13 },
  { month: 'Jun', value: 12 },
  { month: 'Jul', value: 11 },
  { month: 'Aug', value: 11 },
];

export const issueAging = [
  { severity: 'Critical', open: 2, avgAgeDays: 21, mttrDays: 18 },
  { severity: 'High', open: 5, avgAgeDays: 16, mttrDays: 12 },
  { severity: 'Medium', open: 9, avgAgeDays: 11, mttrDays: 8 },
  { severity: 'Low', open: 4, avgAgeDays: 7, mttrDays: 5 },
];

export const recentActivity = [
  { id: 'A1', text: 'Policy POL-002 moved to Manager Review', time: '10 min ago', linkTo: '/policies/POL-002' },
  { id: 'A2', text: 'Risk RSK-001 residual score updated', time: '45 min ago', linkTo: '/risks/RSK-001' },
  { id: 'A3', text: 'ISO 27001 assessment started', time: '2 hours ago', linkTo: '/compliance' },
  { id: 'A4', text: 'Inbox task approved: Publish AUP', time: 'Yesterday', linkTo: '/inbox' },
  { id: 'A5', text: 'Appetite breach: RSK-016 residual 12', time: 'Yesterday', linkTo: '/risks/RSK-016' },
  { id: 'A6', text: 'Attestation 64% for InfoSec Policy', time: '2 days ago', linkTo: '/policies/POL-001' },
];

export const openAuditsList = [
  { id: 'AUD-01', title: 'Q2 Access Control Audit', owner: 'Sara Ahmed', dueDate: '2026-08-25', status: 'In Progress', ageDays: 18 },
  { id: 'AUD-02', title: 'Vendor SOC2 Review', owner: 'Layla Hassan', dueDate: '2026-08-30', status: 'Open', ageDays: 12 },
  { id: 'AUD-03', title: 'BC Drill Evidence Check', owner: 'Omar Khalid', dueDate: '2026-09-05', status: 'Open', ageDays: 9 },
  { id: 'AUD-04', title: 'Endpoint Patch Compliance', owner: 'Nour Ibrahim', dueDate: '2026-09-12', status: 'In Progress', ageDays: 6 },
  { id: 'AUD-05', title: 'Privacy DPIA Spot Check', owner: 'Layla Hassan', dueDate: '2026-09-18', status: 'Open', ageDays: 4 },
];
