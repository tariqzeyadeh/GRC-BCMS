/**
 * @typedef {Object} PolicyAttestation
 * @property {number} required
 * @property {number} completed
 * @property {string} dueDate
 */

/**
 * @typedef {Object} Policy
 * @property {string} id
 * @property {string} title
 * @property {string} version
 * @property {'Draft' | 'In Review' | 'Published' | 'Expired'} status
 * @property {string} owner
 * @property {string} department
 * @property {string} expiryDate
 * @property {string} lastReviewed
 * @property {string} summary
 * @property {string} content
 * @property {number} workflowStep
 * @property {string[]} tags
 * @property {PolicyAttestation} [attestation]
 * @property {string[]} [linkedRiskIds]
 * @property {string[]} [linkedControlIds]
 * @property {string[]} [versionHistory]
 */

/** @type {Omit<Policy, 'attestation' | 'linkedRiskIds' | 'linkedControlIds' | 'versionHistory'>[]} */
const rawPolicies = [
  {
    id: 'POL-001',
    title: 'Information Security Policy',
    version: '3.2',
    status: 'Published',
    owner: 'Sara Ahmed',
    department: 'IT',
    expiryDate: '2027-01-15',
    lastReviewed: '2026-01-10',
    summary: 'Baseline controls for protecting organizational information assets.',
    content:
      '1. Purpose\nProtect confidentiality, integrity, and availability of information.\n\n2. Scope\nApplies to all employees, contractors, and systems.\n\n3. Controls\n- Access control and least privilege\n- Encryption at rest and in transit\n- Incident response within SLA\n- Annual awareness training\n\n4. Responsibilities\nCISO owns the policy; managers enforce locally.',
    workflowStep: 3,
    tags: ['Security', 'Mandatory'],
  },
  {
    id: 'POL-002',
    title: 'Business Continuity Policy',
    version: '1.4',
    status: 'In Review',
    owner: 'Omar Khalid',
    department: 'Operations',
    expiryDate: '2026-11-01',
    lastReviewed: '2026-06-01',
    summary: 'Requirements for BCP, recovery objectives, and annual exercises.',
    content:
      'Defines RTO/RPO targets for critical services, crisis communication roles, alternate site activation, and annual tabletop + technical drills.',
    workflowStep: 1,
    tags: ['BCMS', 'Operations'],
  },
  {
    id: 'POL-003',
    title: 'Data Retention Policy',
    version: '2.0',
    status: 'Draft',
    owner: 'Layla Hassan',
    department: 'Legal',
    expiryDate: '2026-09-30',
    lastReviewed: '2026-05-20',
    summary: 'Retention periods, legal holds, and secure disposal.',
    content:
      'Structured and unstructured data retention schedules by record type. Legal hold overrides. Secure wipe / shredding procedures for end-of-life media.',
    workflowStep: 0,
    tags: ['Privacy', 'Legal'],
  },
  {
    id: 'POL-004',
    title: 'Acceptable Use Policy',
    version: '4.1',
    status: 'Published',
    owner: 'Nour Ibrahim',
    department: 'HR',
    expiryDate: '2027-03-20',
    lastReviewed: '2026-03-01',
    summary: 'Employee use of corporate systems, email, and internet.',
    content:
      'Prohibited activities, BYOD rules, monitoring notice, and disciplinary process for violations.',
    workflowStep: 3,
    tags: ['HR', 'Mandatory'],
  },
  {
    id: 'POL-005',
    title: 'Third-Party Risk Policy',
    version: '1.1',
    status: 'In Review',
    owner: 'Sara Ahmed',
    department: 'Procurement',
    expiryDate: '2026-12-15',
    lastReviewed: '2026-04-12',
    summary: 'Due diligence and monitoring of critical vendors.',
    content:
      'Risk tiering, security questionnaires, contractual clauses, and annual reassessment for Tier-1 vendors.',
    workflowStep: 2,
    tags: ['Vendors', 'Risk'],
  },
  {
    id: 'POL-006',
    title: 'Privacy Policy',
    version: '2.5',
    status: 'Published',
    owner: 'Layla Hassan',
    department: 'Legal',
    expiryDate: '2027-06-01',
    lastReviewed: '2026-02-18',
    summary: 'Collection, processing, and sharing of personal data.',
    content:
      'Lawful basis, data subject rights, cross-border transfers, and breach notification timelines.',
    workflowStep: 3,
    tags: ['Privacy'],
  },
  {
    id: 'POL-007',
    title: 'Change Management Policy',
    version: '1.0',
    status: 'Draft',
    owner: 'Omar Khalid',
    department: 'IT',
    expiryDate: '2026-08-31',
    lastReviewed: '2026-07-01',
    summary: 'Change intake, risk assessment, and approval gates.',
    content:
      'Standard / normal / emergency change types. CAB approval. Back-out plans required for high-risk changes.',
    workflowStep: 0,
    tags: ['ITIL', 'IT'],
  },
  {
    id: 'POL-008',
    title: 'Incident Response Policy',
    version: '3.0',
    status: 'Expired',
    owner: 'Nour Ibrahim',
    department: 'IT',
    expiryDate: '2025-12-01',
    lastReviewed: '2024-11-15',
    summary: 'Severity classification and communication for security incidents.',
    content:
      'Severity matrix S1–S4, war-room activation, regulator notification, and post-incident review within 10 days.',
    workflowStep: 3,
    tags: ['Security', 'IR'],
  },
  {
    id: 'POL-009',
    title: 'Remote Work Security Policy',
    version: '1.2',
    status: 'Published',
    owner: 'Sara Ahmed',
    department: 'IT',
    expiryDate: '2027-02-01',
    lastReviewed: '2026-01-22',
    summary: 'VPN, MFA, and endpoint hygiene for remote staff.',
    content:
      'Mandatory VPN + MFA, disk encryption, approved collaboration tools only, and quarterly remote-access reviews.',
    workflowStep: 3,
    tags: ['Security', 'Remote'],
  },
  {
    id: 'POL-010',
    title: 'Records Management Policy',
    version: '1.0',
    status: 'In Review',
    owner: 'Layla Hassan',
    department: 'Legal',
    expiryDate: '2026-10-10',
    lastReviewed: '2026-06-20',
    summary: 'Classification and lifecycle of corporate records.',
    content:
      'Public / Internal / Confidential / Restricted labels. Owners must classify new repositories within 30 days.',
    workflowStep: 1,
    tags: ['Legal', 'Records'],
  },
  {
    id: 'POL-011',
    title: 'Physical Security Policy',
    version: '2.1',
    status: 'Published',
    owner: 'Omar Khalid',
    department: 'Operations',
    expiryDate: '2027-04-01',
    lastReviewed: '2025-12-05',
    summary: 'Badge access, visitor logs, and secure areas.',
    content:
      'Badge issuance, escort rules for visitors, CCTV retention, and secure rack access for DC rooms.',
    workflowStep: 3,
    tags: ['Facilities'],
  },
  {
    id: 'POL-012',
    title: 'AI Acceptable Use Policy',
    version: '0.9',
    status: 'Draft',
    owner: 'Nour Ibrahim',
    department: 'IT',
    expiryDate: '2026-12-31',
    lastReviewed: '2026-07-15',
    summary: 'Safe use of generative AI tools with corporate data.',
    content:
      'Prohibits pasting confidential data into public LLMs. Approved enterprise AI tools only. Human review required for customer-facing outputs.',
    workflowStep: 0,
    tags: ['AI', 'Draft'],
  },
];

/** @type {Record<string, Partial<Policy>>} */
const POLICY_GOVERNANCE = {
  'POL-001': {
    attestation: { required: 420, completed: 268, dueDate: '2026-08-31' },
    linkedRiskIds: ['RSK-001', 'RSK-009', 'RSK-017'],
    linkedControlIds: ['CTL-01', 'CTL-12', 'CTL-20'],
    versionHistory: ['3.2 (2026-01-10)', '3.1 (2025-06-01)', '3.0 (2024-11-12)'],
  },
  'POL-002': {
    attestation: { required: 180, completed: 0, dueDate: '2026-11-15' },
    linkedRiskIds: ['RSK-002', 'RSK-012', 'RSK-016'],
    linkedControlIds: ['CTL-04', 'CTL-15', 'CTL-19'],
    versionHistory: ['1.4 (draft)', '1.3 (2025-09-01)'],
  },
  'POL-003': {
    attestation: { required: 90, completed: 0, dueDate: '2026-10-01' },
    linkedRiskIds: ['RSK-014'],
    linkedControlIds: ['CTL-17'],
    versionHistory: ['2.0 (draft)', '1.0 (2024-03-01)'],
  },
  'POL-004': {
    attestation: { required: 500, completed: 492, dueDate: '2026-09-01' },
    linkedRiskIds: ['RSK-011'],
    linkedControlIds: ['CTL-14'],
    versionHistory: ['4.1 (2026-03-01)', '4.0 (2025-03-01)'],
  },
  'POL-005': {
    attestation: { required: 60, completed: 12, dueDate: '2026-12-20' },
    linkedRiskIds: ['RSK-004', 'RSK-008'],
    linkedControlIds: ['CTL-07', 'CTL-11'],
    versionHistory: ['1.1 (in review)', '1.0 (2025-08-01)'],
  },
  'POL-006': {
    attestation: { required: 420, completed: 401, dueDate: '2026-09-15' },
    linkedRiskIds: ['RSK-014', 'RSK-007'],
    linkedControlIds: ['CTL-10', 'CTL-17'],
    versionHistory: ['2.5 (2026-02-18)', '2.4 (2025-02-01)'],
  },
  'POL-007': {
    attestation: { required: 80, completed: 0, dueDate: '2026-09-30' },
    linkedRiskIds: ['RSK-017'],
    linkedControlIds: ['CTL-20'],
    versionHistory: ['1.0 (draft)'],
  },
  'POL-008': {
    attestation: { required: 200, completed: 0, dueDate: '2026-08-20' },
    linkedRiskIds: ['RSK-001'],
    linkedControlIds: ['CTL-02'],
    versionHistory: ['3.0 (expired)', '2.0 (2023-12-01)'],
  },
  'POL-009': {
    attestation: { required: 350, completed: 310, dueDate: '2026-09-01' },
    linkedRiskIds: ['RSK-009'],
    linkedControlIds: ['CTL-12'],
    versionHistory: ['1.2 (2026-01-22)', '1.1 (2025-07-01)'],
  },
  'POL-010': {
    attestation: { required: 100, completed: 0, dueDate: '2026-10-20' },
    linkedRiskIds: ['RSK-003'],
    linkedControlIds: ['CTL-06'],
    versionHistory: ['1.0 (in review)'],
  },
  'POL-011': {
    attestation: { required: 150, completed: 140, dueDate: '2026-10-01' },
    linkedRiskIds: ['RSK-002'],
    linkedControlIds: ['CTL-05'],
    versionHistory: ['2.1 (2025-12-05)', '2.0 (2024-12-01)'],
  },
  'POL-012': {
    attestation: { required: 200, completed: 0, dueDate: '2027-01-15' },
    linkedRiskIds: ['RSK-011'],
    linkedControlIds: ['CTL-14'],
    versionHistory: ['0.9 (draft)'],
  },
};

/** @type {Policy[]} */
export const mockPolicies = rawPolicies.map(p => {
  const merged = {
    attestation: { required: 0, completed: 0, dueDate: '' },
    linkedRiskIds: [],
    linkedControlIds: [],
    versionHistory: [],
    ...p,
    ...POLICY_GOVERNANCE[p.id],
  };
  const ownerInitials = merged.owner
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
  return {
    ...merged,
    category: merged.category || merged.tags?.[0] || 'General',
    ownerInitials,
    nextReview: merged.nextReview || merged.lastReviewed,
    workflow: buildPolicyWorkflow(merged),
  };
});

export const POLICY_DEPARTMENTS = [...new Set(mockPolicies.map(p => p.department))].sort();

export const POLICY_WORKFLOW_STEPS = [
  'Draft',
  'Manager Review',
  'Risk Officer Approval',
  'Published',
];

/**
 * Build vertical workflow steps from policy status / workflowStep (executive-grc pattern).
 */
export function buildPolicyWorkflow(policy) {
  const actors = [
    { label: 'Draft', actor: policy.owner },
    { label: 'Manager Review', actor: 'Department Manager' },
    { label: 'Risk Officer Approval', actor: 'Risk Officer' },
    { label: 'Published', actor: 'Policy Admin' },
  ];
  const current =
    policy.status === 'Published'
      ? 3
      : policy.status === 'Expired'
        ? 3
        : policy.status === 'In Review'
          ? Math.max(1, Math.min(2, policy.workflowStep ?? 1))
          : 0;

  return actors.map((step, index) => {
    let status = 'upcoming';
    if (index < current) status = 'complete';
    else if (index === current) status = 'current';
    if (policy.status === 'Published' || policy.status === 'Expired') {
      status = index <= 3 ? 'complete' : 'upcoming';
    }
    return {
      ...step,
      status,
      date: index <= current && policy.lastReviewed ? policy.lastReviewed : null,
      note:
        status === 'current' && policy.status === 'In Review'
          ? 'Awaiting risk sign-off'
          : undefined,
    };
  });
}

/**
 * @param {string} id
 * @returns {Policy | undefined}
 */
export function getPolicyById(id) {
  return mockPolicies.find(p => p.id === id);
}

/** Policies expiring within N days or already expired */
export function getExpiringPolicies(withinDays = 90) {
  const now = new Date('2026-08-17');
  return mockPolicies.filter(p => {
    const exp = new Date(p.expiryDate);
    const diff = (exp - now) / (1000 * 60 * 60 * 24);
    return diff <= withinDays;
  });
}
