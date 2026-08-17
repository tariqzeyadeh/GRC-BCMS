import fs from 'fs';

const ar = JSON.parse(fs.readFileSync('src/i18n/ar/grc.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/en/grc.json', 'utf8'));
const arB = JSON.parse(fs.readFileSync('src/i18n/ar/bcms.json', 'utf8'));
const enB = JSON.parse(fs.readFileSync('src/i18n/en/bcms.json', 'utf8'));
const arS = JSON.parse(fs.readFileSync('src/i18n/ar/sidebar.json', 'utf8'));
const enS = JSON.parse(fs.readFileSync('src/i18n/en/sidebar.json', 'utf8'));

const has = k => ar[k] || arB[k] || arS[k];

const files = [
  'src/pages/LoginPage.jsx',
  'src/pages/AuditRegister.jsx',
  'src/pages/ControlsLibrary.jsx',
  'src/pages/DrillsPage.jsx',
  'src/pages/StrategicGoalsPage.jsx',
  'src/pages/OrgStructurePage.jsx',
  'src/pages/NotificationsAndTrailPage.jsx',
  'src/pages/IntegrationsPage.jsx',
  'src/pages/ExecutiveDashboard.jsx',
  'src/pages/BiaWizard.jsx',
  'src/components/layout/Navbar/Navbar.jsx',
];

const tRe = /\bt(?:g)?\(['"]([^'"]+)['"]\)/g;
const used = new Set();
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = tRe.exec(s))) used.add(m[1]);
}

const usedMiss = [...used].filter(k => !has(k)).sort();

const seed = fs.readFileSync('src/data/seedExtended.js', 'utf8');
const seedRe =
  /(?:title|body|name|recommendation|head|result|type|status|framework|action|summary):\s*['"]([^'"]+)['"]/g;
const seedKeys = new Set();
let m;
while ((m = seedRe.exec(seed))) {
  const k = m[1];
  if (k.length > 2 && /[A-Za-z]/.test(k) && !/^\d/.test(k) && !k.includes('@') && !k.includes('simulated')) {
    seedKeys.add(k);
  }
}
// also capture SEED_KRIS names and integration statuses partially
const seedMiss = [...seedKeys].filter(k => !has(k)).sort();

const enOnly = Object.keys(en).filter(k => !(k in ar));
const enBOnly = Object.keys(enB).filter(k => !(k in arB));
const enSOnly = Object.keys(enS).filter(k => !(k in arS));

const report = {
  usedMiss,
  seedMiss,
  enOnly,
  enBOnly,
  enSOnly,
};
fs.writeFileSync('scripts/i18n-gap-report.json', JSON.stringify(report, null, 2));
console.log('usedMiss', usedMiss.length);
console.log(usedMiss.join('\n'));
console.log('seedMiss', seedMiss.length);
console.log(seedMiss.join('\n'));
console.log('enOnly', enOnly.length, 'enBOnly', enBOnly.length, 'enSOnly', enSOnly.length);
if (enOnly.length) console.log('enOnly sample', enOnly.slice(0, 30).join('\n'));
if (enBOnly.length) console.log('enBOnly', enBOnly.join('\n'));
if (enSOnly.length) console.log('enSOnly', enSOnly.join('\n'));
