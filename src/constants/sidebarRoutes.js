import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Inbox,
  Users,
  Shield,
  Activity,
  ClipboardList,
  BookOpen,
  Siren,
  Plus,
  List,
  UserCog,
  ShieldAlert,
  Target,
  Network,
  Bell,
  Plug,
  ClipboardCheck,
  ShieldCheck,
  FlaskConical,
} from 'lucide-react';

/**
 * Sidebar grouped into main sections (Governance, Risk, …).
 * Each section contains module routes; screens live as children (subtabs).
 */
export const SIDEBAR_SECTIONS = [
  {
    key: 'main',
    label: 'sectionMain',
    routes: [
      {
        key: 'dashboard',
        path: '/',
        label: 'dashboard',
        icon: LayoutDashboard,
        showInSidebar: true,
        children: [],
      },
      {
        key: 'inbox',
        path: '/inbox',
        label: 'inbox',
        icon: Inbox,
        showInSidebar: true,
        children: [
          { key: 'inbox-main', path: '/inbox', label: 'myInbox', icon: Inbox },
          { key: 'notifications', path: '/notifications', label: 'notificationsTrail', icon: Bell },
        ],
      },
    ],
  },
  {
    key: 'governance',
    label: 'sectionGovernance',
    routes: [
      {
        key: 'policies',
        path: '/policies',
        label: 'policies',
        icon: FileText,
        showInSidebar: true,
        children: [
          { key: 'policies-library', path: '/policies', label: 'policyLibrary', icon: List },
          { key: 'policies-new', path: '/policies/new', label: 'createPolicy', icon: Plus },
          { key: 'policies-goals', path: '/goals', label: 'strategicGoals', icon: Target },
          { key: 'policies-org', path: '/org', label: 'orgStructure', icon: Network },
        ],
      },
    ],
  },
  {
    key: 'risk',
    label: 'sectionRisk',
    routes: [
      {
        key: 'risks',
        path: '/risks',
        label: 'risks',
        icon: AlertTriangle,
        showInSidebar: true,
        children: [
          { key: 'risks-register', path: '/risks', label: 'riskRegister', icon: List },
          { key: 'risks-profile', path: '/risks/RSK-001', label: 'riskProfileSample', icon: ShieldAlert },
        ],
      },
    ],
  },
  {
    key: 'compliance',
    label: 'sectionCompliance',
    routes: [
      {
        key: 'compliance',
        path: '/compliance',
        label: 'compliance',
        icon: CheckCircle2,
        showInSidebar: true,
        children: [
          { key: 'compliance-assessment', path: '/compliance', label: 'complianceAssessment', icon: ClipboardList },
          { key: 'controls-library', path: '/controls', label: 'controlsLibrary', icon: ShieldCheck },
        ],
      },
      {
        key: 'audits',
        path: '/audits',
        label: 'audits',
        icon: ClipboardCheck,
        showInSidebar: true,
        children: [
          { key: 'audits-register', path: '/audits', label: 'auditManagement', icon: ClipboardCheck },
        ],
      },
    ],
  },
  {
    key: 'continuity',
    label: 'sectionContinuity',
    routes: [
      {
        key: 'continuity',
        path: '/bcms',
        label: 'continuity',
        icon: Shield,
        showInSidebar: true,
        children: [
          { key: 'bcms-resilience', path: '/bcms', label: 'resilienceDashboard', icon: Activity },
          { key: 'bcms-bia', path: '/bcms/bia', label: 'biaWizard', icon: ClipboardList },
          { key: 'bcms-bcp', path: '/bcms/bcp', label: 'continuityPlan', icon: BookOpen },
          { key: 'bcms-drills', path: '/bcms/drills', label: 'drillsSimulations', icon: FlaskConical },
          { key: 'bcms-crisis', path: '/bcms/crisis', label: 'crisisMode', icon: Siren },
        ],
      },
    ],
  },
  {
    key: 'admin',
    label: 'sectionAdmin',
    routes: [
      {
        key: 'admin',
        path: '/users-roles',
        label: 'admin',
        icon: Users,
        showInSidebar: true,
        children: [
          { key: 'users-matrix', path: '/users-roles', label: 'usersRolesMatrix', icon: UserCog },
          { key: 'integrations', path: '/integrations', label: 'integrations', icon: Plug },
        ],
      },
    ],
  },
];

/** Flat list of all module routes (for lookups / open-state). */
export const SIDEBAR_ROUTES = SIDEBAR_SECTIONS.flatMap(section => section.routes);
