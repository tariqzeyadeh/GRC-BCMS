/**
 * @typedef {Object} ComplianceControl
 * @property {string} id
 * @property {string} code
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} ComplianceFramework
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {ComplianceControl[]} controls
 */

/** @type {ComplianceFramework[]} */
export const mockFrameworks = [
  {
    id: 'fw-iso27001',
    name: 'ISO 27001',
    description: 'Information security management system controls (Annex A subset).',
    controls: [
      {
        id: 'C1',
        code: 'A.5.1',
        title: 'Policies for information security',
        description: 'Management-approved security policies communicated to staff.',
      },
      {
        id: 'C2',
        code: 'A.8.1',
        title: 'User endpoint devices',
        description: 'Secure configuration and management of endpoints.',
      },
      {
        id: 'C3',
        code: 'A.8.8',
        title: 'Management of technical vulnerabilities',
        description: 'Timely identification and remediation of vulnerabilities.',
      },
      {
        id: 'C4',
        code: 'A.8.13',
        title: 'Information backup',
        description: 'Backup copies of information and tested restoration.',
      },
      {
        id: 'C5',
        code: 'A.8.15',
        title: 'Logging',
        description: 'Event logs produced, stored, and protected.',
      },
      {
        id: 'C6',
        code: 'A.5.24',
        title: 'Incident management planning',
        description: 'Processes to prepare for and respond to incidents.',
      },
      {
        id: 'C7',
        code: 'A.5.15',
        title: 'Access control',
        description: 'Rules to control physical and logical access.',
      },
      {
        id: 'C8',
        code: 'A.8.9',
        title: 'Configuration management',
        description: 'Secure configurations documented and applied.',
      },
    ],
  },
  {
    id: 'fw-nist',
    name: 'NIST CSF',
    description: 'Identify, Protect, Detect, Respond, Recover outcomes.',
    controls: [
      { id: 'N1', code: 'ID.AM-1', title: 'Asset inventory', description: 'Physical devices and systems inventoried.' },
      { id: 'N2', code: 'PR.AC-1', title: 'Identity and access management', description: 'Identities and credentials managed.' },
      { id: 'N3', code: 'PR.DS-1', title: 'Data-at-rest protection', description: 'Data at rest is protected.' },
      { id: 'N4', code: 'DE.CM-1', title: 'Network monitoring', description: 'Network monitored for potential events.' },
      { id: 'N5', code: 'RS.RP-1', title: 'Response plan executed', description: 'Response plan is executed during event.' },
      { id: 'N6', code: 'RC.RP-1', title: 'Recovery plan executed', description: 'Recovery plan is executed during event.' },
    ],
  },
  {
    id: 'fw-soc2',
    name: 'SOC 2',
    description: 'Trust Services Criteria sample controls for readiness.',
    controls: [
      { id: 'S1', code: 'CC6.1', title: 'Logical access security', description: 'Logical access restricted to authorized users.' },
      { id: 'S2', code: 'CC7.2', title: 'System monitoring', description: 'System monitored to detect anomalies.' },
      { id: 'S3', code: 'CC8.1', title: 'Change management', description: 'Changes authorized, designed, and implemented.' },
      { id: 'S4', code: 'A1.2', title: 'Recovery testing', description: 'Recovery plans tested periodically.' },
      { id: 'S5', code: 'CC5.1', title: 'Control activities', description: 'Control activities selected and developed.' },
    ],
  },
];
