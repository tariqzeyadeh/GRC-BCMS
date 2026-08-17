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
} from 'lucide-react';

/**
 * Nested sidebar: each module is a parent; screens live as children (subtabs).
 */
export const SIDEBAR_ROUTES = [
  {
    key: 'dashboard',
    path: '/',
    label: 'dashboard',
    icon: LayoutDashboard,
    showInSidebar: true,
    children: [],
  },
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
      { key: 'bcms-crisis', path: '/bcms/crisis', label: 'crisisMode', icon: Siren },
    ],
  },
  {
    key: 'policies',
    path: '/policies',
    label: 'policies',
    icon: FileText,
    showInSidebar: true,
    children: [
      { key: 'policies-library', path: '/policies', label: 'policyLibrary', icon: List },
      { key: 'policies-new', path: '/policies/new', label: 'createPolicy', icon: Plus },
      { key: 'policies-sample', path: '/policies/POL-001', label: 'policyEditorSample', icon: FileText },
    ],
  },
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
  {
    key: 'compliance',
    path: '/compliance',
    label: 'compliance',
    icon: CheckCircle2,
    showInSidebar: true,
    children: [
      { key: 'compliance-assessment', path: '/compliance', label: 'complianceAssessment', icon: ClipboardList },
    ],
  },
  {
    key: 'inbox',
    path: '/inbox',
    label: 'inbox',
    icon: Inbox,
    showInSidebar: true,
    children: [
      { key: 'inbox-main', path: '/inbox', label: 'myInbox', icon: Inbox },
    ],
  },
  {
    key: 'users-roles',
    path: '/users-roles',
    label: 'usersRoles',
    icon: Users,
    showInSidebar: true,
    children: [
      { key: 'users-matrix', path: '/users-roles', label: 'usersRolesMatrix', icon: UserCog },
    ],
  },
];
