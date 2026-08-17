/**
 * @typedef {'todo' | 'pending' | 'completed'} InboxColumn
 * @typedef {'High' | 'Medium' | 'Low'} TaskPriority
 */

/**
 * @typedef {Object} InboxTask
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {InboxColumn} column
 * @property {TaskPriority} priority
 * @property {string} dueDate
 * @property {string} requester
 * @property {string} [linkTo]
 */

/** @type {InboxTask[]} */
export const mockInboxTasks = [
  {
    id: 'TSK-001',
    title: 'Approve Policy POL-002',
    description: 'Business Continuity Policy awaiting manager review before Risk Officer stage.',
    column: 'todo',
    priority: 'High',
    dueDate: '2026-08-18',
    requester: 'Omar Khalid',
    linkTo: '/policies/POL-002',
  },
  {
    id: 'TSK-002',
    title: 'Review Risk RSK-001',
    description: 'Validate residual score after immutable backup mitigation progress.',
    column: 'todo',
    priority: 'High',
    dueDate: '2026-08-17',
    requester: 'Sara Ahmed',
    linkTo: '/risks/RSK-001',
  },
  {
    id: 'TSK-003',
    title: 'Complete ISO control evidence',
    description: 'Upload evidence for A.8.13 backup and A.8.15 logging controls.',
    column: 'pending',
    priority: 'Medium',
    dueDate: '2026-08-22',
    requester: 'Compliance Office',
    linkTo: '/compliance',
  },
  {
    id: 'TSK-004',
    title: 'Approve Policy POL-005',
    description: 'Third-Party Risk Policy at Risk Officer Approval stage.',
    column: 'pending',
    priority: 'High',
    dueDate: '2026-08-20',
    requester: 'Sara Ahmed',
    linkTo: '/policies/POL-005',
  },
  {
    id: 'TSK-005',
    title: 'Close mitigation on RSK-005',
    description: 'Confirm firewall patching weekend completed and update residual score.',
    column: 'todo',
    priority: 'Medium',
    dueDate: '2026-08-19',
    requester: 'Network Team',
    linkTo: '/risks/RSK-005',
  },
  {
    id: 'TSK-006',
    title: 'Publish Acceptable Use Policy',
    description: 'Final publication checklist completed.',
    column: 'completed',
    priority: 'Low',
    dueDate: '2026-08-10',
    requester: 'Nour Ibrahim',
    linkTo: '/policies/POL-004',
  },
  {
    id: 'TSK-007',
    title: 'Acknowledge vendor risk RSK-004',
    description: 'Risk acceptance formally recorded by Finance.',
    column: 'completed',
    priority: 'Medium',
    dueDate: '2026-08-08',
    requester: 'Nour Ibrahim',
    linkTo: '/risks/RSK-004',
  },
  {
    id: 'TSK-008',
    title: 'Sign off BIA for digital channel',
    description: 'BIA workshop outcomes for RSK-012 require executive sign-off.',
    column: 'todo',
    priority: 'High',
    dueDate: '2026-08-21',
    requester: 'Omar Khalid',
    linkTo: '/risks/RSK-012',
  },
  {
    id: 'TSK-009',
    title: 'Review AI Acceptable Use draft',
    description: 'Legal and IT comments needed on POL-012 before workflow advance.',
    column: 'pending',
    priority: 'Medium',
    dueDate: '2026-08-25',
    requester: 'Nour Ibrahim',
    linkTo: '/policies/POL-012',
  },
  {
    id: 'TSK-010',
    title: 'Reopen Incident Response Policy',
    description: 'POL-008 expired — create revision and restart workflow.',
    column: 'todo',
    priority: 'High',
    dueDate: '2026-08-16',
    requester: 'CISO Office',
    linkTo: '/policies/POL-008',
  },
  {
    id: 'TSK-011',
    title: 'PAM vault progress check',
    description: 'Verify break-glass accounts migrated for RSK-017.',
    column: 'pending',
    priority: 'Medium',
    dueDate: '2026-08-23',
    requester: 'IAM',
    linkTo: '/risks/RSK-017',
  },
  {
    id: 'TSK-012',
    title: 'Users & Roles quarterly review',
    description: 'Confirm Manager permissions still accurate for Audits module.',
    column: 'completed',
    priority: 'Low',
    dueDate: '2026-08-05',
    requester: 'Admin',
    linkTo: '/users-roles',
  },
];
