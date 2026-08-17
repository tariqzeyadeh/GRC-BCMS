import fs from 'fs';

const files = [
  'src/data/mockPolicies.js',
  'src/data/mockRisks.js',
  'src/data/mockInbox.js',
  'src/data/mockDashboard.js',
  'src/data/mockCompliance.js',
  'src/data/mockPermissions.js',
  'src/data/mockBcp.js',
  'src/data/mockBcms.js',
  'src/data/mockBia.js',
  'src/data/mockCrisis.js',
];

const fieldRe =
  /(?:title|description|text|time|name|department|category|summary|scenario|location|action|role|label|sublabel|scope|addLabel|detail|message|status|tier|responsibleRole|duration|processName|type):\s*['"]([^'"]+)['"]/g;

const set = new Set();
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = fieldRe.exec(s))) set.add(m[1]);
}

[
  'Policy authors should not solely own Audit approvals (SoD).',
  'Risk owners approving their own audits creates SoD conflict.',
  'Full configuration and access management',
  'Approve workflows and oversee module data',
  'Day-to-day create/update within granted modules',
  'Read-focused access for independent review',
  'Crisis Desk',
  'Vendor Mgmt',
  'Remove',
].forEach(x => set.add(x));

const ar = JSON.parse(fs.readFileSync('src/i18n/ar/grc.json', 'utf8'));
const bcms = JSON.parse(fs.readFileSync('src/i18n/ar/bcms.json', 'utf8'));
const miss = [...set]
  .filter(k => !ar[k] && !bcms[k] && !/^\d/.test(k) && k.length > 2)
  .sort();

fs.writeFileSync('scripts/missing-keys.json', JSON.stringify(miss, null, 2));
console.log('unique', set.size, 'missing', miss.length);
