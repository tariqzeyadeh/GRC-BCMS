/**
 * @typedef {Object} PermissionMatrix
 * @property {string[]} modules
 * @property {string[]} roles
 * @property {Record<string, Record<string, boolean>>} grants
 */

/** @type {PermissionMatrix} */
export const mockPermissions = {
  modules: ['Risks', 'Policies', 'Audits', 'Compliance', 'Inbox', 'Dashboard'],
  roles: ['Admin', 'Manager', 'User', 'Auditor'],
  grants: {
    Risks: { Admin: true, Manager: true, User: true, Auditor: true },
    Policies: { Admin: true, Manager: true, User: false, Auditor: true },
    Audits: { Admin: true, Manager: false, User: false, Auditor: true },
    Compliance: { Admin: true, Manager: true, User: false, Auditor: true },
    Inbox: { Admin: true, Manager: true, User: true, Auditor: false },
    Dashboard: { Admin: true, Manager: true, User: true, Auditor: true },
  },
};

/** Role descriptions for UI */
export const roleDescriptions = {
  Admin: 'Full configuration and access management',
  Manager: 'Approve workflows and oversee module data',
  User: 'Day-to-day create/update within granted modules',
  Auditor: 'Read-focused access for independent review',
};
