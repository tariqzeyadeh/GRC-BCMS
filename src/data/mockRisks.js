/**
 * @typedef {Object} MitigationTask
 * @property {string} id
 * @property {string} title
 * @property {string} assignee
 * @property {'Open' | 'In Progress' | 'Done'} status
 * @property {string} [dueDate]
 */

/**
 * @typedef {Object} RiskControl
 * @property {string} id
 * @property {string} name
 * @property {'Effective' | 'Partially Effective' | 'Ineffective'} effectiveness
 */

/**
 * @typedef {Object} Risk
 * @property {string} id
 * @property {string} category
 * @property {string} title
 * @property {string} description
 * @property {string} cause
 * @property {string} effect
 * @property {number} inherentLikelihood
 * @property {number} inherentImpact
 * @property {number} inherentScore
 * @property {number} residualLikelihood
 * @property {number} residualImpact
 * @property {number} residualScore
 * @property {boolean} withinAppetite
 * @property {'Mitigate' | 'Transfer' | 'Accept' | 'Avoid'} treatment
 * @property {'Open' | 'Mitigating' | 'Closed' | 'Accepted'} status
 * @property {string} owner
 * @property {string} department
 * @property {string} identifiedOn
 * @property {string} nextReview
 * @property {RiskControl[]} controls
 * @property {MitigationTask[]} mitigations
 * @property {number} [impact] alias inherentImpact for heatmap
 * @property {number} [likelihood] alias inherentLikelihood for heatmap
 */

import { RISK_APPETITE_THRESHOLD } from '../constants/riskScore';

/** @param {Omit<Risk, 'inherentScore' | 'residualScore' | 'withinAppetite' | 'impact' | 'likelihood'> & { inherentLikelihood: number, inherentImpact: number, residualLikelihood: number, residualImpact: number }} seed */
function buildRisk(seed) {
  const inherentScore = seed.inherentLikelihood * seed.inherentImpact;
  const residualScore = seed.residualLikelihood * seed.residualImpact;
  return {
    ...seed,
    inherentScore,
    residualScore,
    withinAppetite: residualScore <= RISK_APPETITE_THRESHOLD,
    impact: seed.inherentImpact,
    likelihood: seed.inherentLikelihood,
  };
}

/** @type {Risk[]} */
export const mockRisks = [
  buildRisk({
    id: 'RSK-001',
    category: 'Cybersecurity',
    title: 'Ransomware on critical servers',
    description: 'Encryption of production workloads by threat actors.',
    cause: 'Phishing + unpatched edge systems',
    effect: 'Core service outage and data recovery cost',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualLikelihood: 3,
    residualImpact: 4,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Sara Ahmed',
    department: 'IT',
    identifiedOn: '2026-03-12',
    nextReview: '2026-09-01',
    controls: [
      { id: 'CTL-01', name: 'EDR on servers', effectiveness: 'Partially Effective' },
      { id: 'CTL-02', name: 'Immutable backups', effectiveness: 'Effective' },
      { id: 'CTL-03', name: 'Phishing simulation', effectiveness: 'Partially Effective' },
    ],
    mitigations: [
      { id: 'MIT-1', title: 'Enable immutable backups', assignee: 'IT Ops', status: 'In Progress', dueDate: '2026-08-20' },
      { id: 'MIT-2', title: 'Phishing awareness campaign', assignee: 'HR', status: 'Open', dueDate: '2026-08-30' },
      { id: 'MIT-2b', title: 'EDR coverage on all servers', assignee: 'SecOps', status: 'In Progress', dueDate: '2026-08-25' },
    ],
  }),
  buildRisk({
    id: 'RSK-002',
    category: 'Operational',
    title: 'Single point of failure in DC power',
    description: 'UPS redundancy below Tier III target.',
    cause: 'Single UPS path in primary DC',
    effect: 'Prolonged facility outage',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 3,
    residualImpact: 3,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Omar Khalid',
    department: 'Operations',
    identifiedOn: '2026-02-01',
    nextReview: '2026-08-20',
    controls: [
      { id: 'CTL-04', name: 'Primary UPS', effectiveness: 'Partially Effective' },
      { id: 'CTL-05', name: 'Generator contract', effectiveness: 'Effective' },
    ],
    mitigations: [
      { id: 'MIT-3', title: 'Install secondary UPS path', assignee: 'Facilities', status: 'Open', dueDate: '2026-09-15' },
      { id: 'MIT-3b', title: 'Generator load test quarterly', assignee: 'Facilities', status: 'Open', dueDate: '2026-08-28' },
    ],
  }),
  buildRisk({
    id: 'RSK-003',
    category: 'Compliance',
    title: 'Incomplete evidence for access reviews',
    description: 'Missing quarterly reviews for privileged apps.',
    cause: 'Manual export process',
    effect: 'Audit finding / regulatory exposure',
    inherentLikelihood: 4,
    inherentImpact: 3,
    residualLikelihood: 2,
    residualImpact: 3,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Layla Hassan',
    department: 'Legal',
    identifiedOn: '2026-04-08',
    nextReview: '2026-08-28',
    controls: [{ id: 'CTL-06', name: 'Quarterly access review', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-4', title: 'Automate access review export', assignee: 'IAM', status: 'In Progress', dueDate: '2026-08-22' },
    ],
  }),
  buildRisk({
    id: 'RSK-004',
    category: 'Financial',
    title: 'Vendor concentration risk',
    description: '70%+ cloud spend with one hyperscaler.',
    cause: 'No multi-cloud exit plan',
    effect: 'Pricing / lock-in / outage concentration',
    inherentLikelihood: 3,
    inherentImpact: 5,
    residualLikelihood: 3,
    residualImpact: 4,
    treatment: 'Accept',
    status: 'Accepted',
    owner: 'Nour Ibrahim',
    department: 'Finance',
    identifiedOn: '2025-11-20',
    nextReview: '2026-11-20',
    controls: [{ id: 'CTL-07', name: 'Vendor risk assessments', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-4b', title: 'Draft multi-cloud exit runbook', assignee: 'Architecture', status: 'Open', dueDate: '2026-10-01' },
    ],
  }),
  buildRisk({
    id: 'RSK-005',
    category: 'Cybersecurity',
    title: 'Unpatched edge devices',
    description: 'Firewall firmware behind vendor baseline.',
    cause: 'Missed patch windows',
    effect: 'External exploit of perimeter',
    inherentLikelihood: 3,
    inherentImpact: 3,
    residualLikelihood: 2,
    residualImpact: 2,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Sara Ahmed',
    department: 'IT',
    identifiedOn: '2026-05-02',
    nextReview: '2026-08-15',
    controls: [{ id: 'CTL-08', name: 'Vulnerability management', effectiveness: 'Effective' }],
    mitigations: [
      { id: 'MIT-5', title: 'Patch weekend window', assignee: 'Network', status: 'Done', dueDate: '2026-08-01' },
    ],
  }),
  buildRisk({
    id: 'RSK-006',
    category: 'HR',
    title: 'Key-person dependency in BC team',
    description: 'Only one trained crisis communications lead.',
    cause: 'No deputies trained',
    effect: 'Crisis response delay',
    inherentLikelihood: 2,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 4,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Omar Khalid',
    department: 'Operations',
    identifiedOn: '2026-01-15',
    nextReview: '2026-09-10',
    controls: [{ id: 'CTL-09', name: 'BC playbooks', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-6b', title: 'Cross-train two deputies', assignee: 'BC Team', status: 'Open', dueDate: '2026-09-30' },
    ],
  }),
  buildRisk({
    id: 'RSK-007',
    category: 'Legal',
    title: 'Contractual SLA gaps with processors',
    description: 'DPAs missing breach notification timelines.',
    cause: 'Legacy contracts',
    effect: 'Regulatory breach exposure',
    inherentLikelihood: 5,
    inherentImpact: 2,
    residualLikelihood: 2,
    residualImpact: 2,
    treatment: 'Mitigate',
    status: 'Closed',
    owner: 'Layla Hassan',
    department: 'Legal',
    identifiedOn: '2025-09-01',
    nextReview: '2026-09-01',
    controls: [{ id: 'CTL-10', name: 'DPA template v3', effectiveness: 'Effective' }],
    mitigations: [
      { id: 'MIT-6', title: 'Amend processor contracts', assignee: 'Legal', status: 'Done', dueDate: '2026-06-01' },
    ],
  }),
  buildRisk({
    id: 'RSK-008',
    category: 'Operational',
    title: 'Supply chain delay for spare parts',
    description: 'HVAC spare lead times exceed RTO.',
    cause: 'Single supplier',
    effect: 'Facility cooling failure prolongs outage',
    inherentLikelihood: 3,
    inherentImpact: 2,
    residualLikelihood: 2,
    residualImpact: 2,
    treatment: 'Transfer',
    status: 'Open',
    owner: 'Omar Khalid',
    department: 'Operations',
    identifiedOn: '2026-06-11',
    nextReview: '2026-10-01',
    controls: [{ id: 'CTL-11', name: 'Vendor SLA', effectiveness: 'Partially Effective' }],
    mitigations: [],
  }),
  buildRisk({
    id: 'RSK-009',
    category: 'Cybersecurity',
    title: 'Weak MFA coverage on remote access',
    description: 'Legacy partner VPN without MFA.',
    cause: 'Exception accounts not retired',
    effect: 'Account takeover of remote access',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 4,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Sara Ahmed',
    department: 'IT',
    identifiedOn: '2026-03-28',
    nextReview: '2026-08-22',
    controls: [{ id: 'CTL-12', name: 'VPN MFA policy', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-7', title: 'Enforce MFA on all VPN groups', assignee: 'IAM', status: 'In Progress', dueDate: '2026-08-18' },
    ],
  }),
  buildRisk({
    id: 'RSK-010',
    category: 'Financial',
    title: 'Budget overrun on continuity drills',
    description: 'Drill costs above allocation.',
    cause: 'Unscoped vendor quotes',
    effect: 'Reduced drill frequency',
    inherentLikelihood: 2,
    inherentImpact: 2,
    residualLikelihood: 2,
    residualImpact: 2,
    treatment: 'Accept',
    status: 'Open',
    owner: 'Nour Ibrahim',
    department: 'Finance',
    identifiedOn: '2026-07-01',
    nextReview: '2026-12-01',
    controls: [{ id: 'CTL-13', name: 'Annual BC budget gate', effectiveness: 'Effective' }],
    mitigations: [],
  }),
  buildRisk({
    id: 'RSK-011',
    category: 'Cybersecurity',
    title: 'Shadow IT SaaS sprawl',
    description: 'Unsanctioned SaaS with customer data.',
    cause: 'No CASB discovery',
    effect: 'Data leakage / DPA gaps',
    inherentLikelihood: 4,
    inherentImpact: 3,
    residualLikelihood: 3,
    residualImpact: 3,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Sara Ahmed',
    department: 'IT',
    identifiedOn: '2026-05-20',
    nextReview: '2026-09-05',
    controls: [{ id: 'CTL-14', name: 'Approved SaaS catalog', effectiveness: 'Ineffective' }],
    mitigations: [
      { id: 'MIT-8', title: 'CASB discovery pilot', assignee: 'SecOps', status: 'Open', dueDate: '2026-09-10' },
    ],
  }),
  buildRisk({
    id: 'RSK-012',
    category: 'Operational',
    title: 'Incomplete BIA for new digital channel',
    description: 'Portal launched without BIA.',
    cause: 'Fast-track release',
    effect: 'Unknown RTO/RPO for customer channel',
    inherentLikelihood: 2,
    inherentImpact: 5,
    residualLikelihood: 2,
    residualImpact: 5,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Omar Khalid',
    department: 'Operations',
    identifiedOn: '2026-07-10',
    nextReview: '2026-08-31',
    controls: [{ id: 'CTL-15', name: 'BIA procedure', effectiveness: 'Ineffective' }],
    mitigations: [
      { id: 'MIT-9', title: 'Run BIA workshop with product', assignee: 'BC Team', status: 'Open', dueDate: '2026-08-25' },
    ],
  }),
  buildRisk({
    id: 'RSK-013',
    category: 'Compliance',
    title: 'Training completion below target',
    description: 'Security training at 82% vs 95% target.',
    cause: 'No manager escalation',
    effect: 'Control operating ineffectiveness',
    inherentLikelihood: 4,
    inherentImpact: 2,
    residualLikelihood: 2,
    residualImpact: 2,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Nour Ibrahim',
    department: 'HR',
    identifiedOn: '2026-06-01',
    nextReview: '2026-09-15',
    controls: [{ id: 'CTL-16', name: 'LMS mandatory courses', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-10', title: 'Escalation emails to managers', assignee: 'HR', status: 'In Progress', dueDate: '2026-08-20' },
    ],
  }),
  buildRisk({
    id: 'RSK-014',
    category: 'Legal',
    title: 'Cross-border transfer documentation lag',
    description: 'SCCs not refreshed for two EU processors.',
    cause: 'Template update not rolled out',
    effect: 'Transfer mechanism challenge',
    inherentLikelihood: 3,
    inherentImpact: 3,
    residualLikelihood: 2,
    residualImpact: 3,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Layla Hassan',
    department: 'Legal',
    identifiedOn: '2026-04-22',
    nextReview: '2026-09-01',
    controls: [{ id: 'CTL-17', name: 'Transfer impact assessments', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-11', title: 'Refresh SCCs pack', assignee: 'Legal', status: 'Open', dueDate: '2026-09-05' },
    ],
  }),
  buildRisk({
    id: 'RSK-015',
    category: 'Financial',
    title: 'Insurance coverage gap for cyber',
    description: 'Sublimit may not cover ransomware scenario.',
    cause: 'Policy renewal without scenario update',
    effect: 'Uninsured residual financial loss',
    inherentLikelihood: 3,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 4,
    treatment: 'Accept',
    status: 'Accepted',
    owner: 'Nour Ibrahim',
    department: 'Finance',
    identifiedOn: '2026-02-14',
    nextReview: '2027-01-01',
    controls: [{ id: 'CTL-18', name: 'Cyber insurance policy', effectiveness: 'Partially Effective' }],
    mitigations: [],
  }),
  buildRisk({
    id: 'RSK-016',
    category: 'Operational',
    title: 'Call center alternate site untested',
    description: 'Warm site not fail-over tested in 18 months.',
    cause: 'Drill deferrals',
    effect: 'Contact center RTO breach',
    inherentLikelihood: 3,
    inherentImpact: 5,
    residualLikelihood: 3,
    residualImpact: 4,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Omar Khalid',
    department: 'Operations',
    identifiedOn: '2026-01-30',
    nextReview: '2026-08-25',
    controls: [{ id: 'CTL-19', name: 'Warm site contract', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-12', title: 'Schedule fail-over drill', assignee: 'BC Team', status: 'Open', dueDate: '2026-08-28' },
    ],
  }),
  buildRisk({
    id: 'RSK-017',
    category: 'Cybersecurity',
    title: 'Privileged account shared credentials',
    description: 'Shared break-glass without individual accountability.',
    cause: 'No PAM vault',
    effect: 'Unattributable privileged actions',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 3,
    treatment: 'Mitigate',
    status: 'Mitigating',
    owner: 'Sara Ahmed',
    department: 'IT',
    identifiedOn: '2026-05-08',
    nextReview: '2026-08-18',
    controls: [{ id: 'CTL-20', name: 'Privileged access policy', effectiveness: 'Partially Effective' }],
    mitigations: [
      { id: 'MIT-13', title: 'PAM vault for break-glass', assignee: 'IAM', status: 'In Progress', dueDate: '2026-08-20' },
    ],
  }),
  buildRisk({
    id: 'RSK-018',
    category: 'HR',
    title: 'Contractor offboarding delays',
    description: 'Access revocation lagged end dates.',
    cause: 'Manual HRIS process',
    effect: 'Orphan accounts',
    inherentLikelihood: 3,
    inherentImpact: 3,
    residualLikelihood: 1,
    residualImpact: 2,
    treatment: 'Mitigate',
    status: 'Closed',
    owner: 'Nour Ibrahim',
    department: 'HR',
    identifiedOn: '2025-12-10',
    nextReview: '2026-12-10',
    controls: [{ id: 'CTL-21', name: 'HRIS auto-ticket', effectiveness: 'Effective' }],
    mitigations: [
      { id: 'MIT-14', title: 'HRIS auto-ticket on end date', assignee: 'HRIS', status: 'Done', dueDate: '2026-03-01' },
    ],
  }),
];

/** @param {string} id */
export function getRiskById(id) {
  return mockRisks.find(r => r.id === id);
}
