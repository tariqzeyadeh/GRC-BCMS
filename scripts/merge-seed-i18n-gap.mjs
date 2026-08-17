import fs from 'fs';

const ar = {
  'Open high residual risks': 'مخاطر متبقية مرتفعة مفتوحة',
  'Overdue BIA reviews': 'مراجعات BIA متأخرة',
  'Policy attestation below target': 'إقرار السياسات دون الهدف',
  'Failed drill findings open': 'ملاحظات تمارين فاشلة مفتوحة',
  'Control effectiveness average': 'متوسط فعالية الضوابط',
  'Business continuity planning': 'تخطيط استمرارية الأعمال',
  'MFA for remote access': 'المصادقة متعددة العوامل للوصول عن بُعد',
  'Break-glass accounts not individually attributable': 'حسابات الطوارئ غير قابلة للإسناد الفردي',
  'Migrate to PAM vault with named ownership': 'الترحيل إلى خزنة PAM بملكية مسماة',
  'Quarterly access review export is manual': 'تصدير مراجعة الوصول الربعية يدوي',
  'Automate review export and manager escalation': 'أتمتة تصدير المراجعة وتصعيد المدير',
  'Warm site failover not tested in 18 months': 'لم يُختبر تحويل الموقع الدافئ خلال 18 شهراً',
  'Schedule fail-over drill and capture evidence': 'جدولة تمرين التحويل وتوثيق الأدلة',
  'Firewall firmware behind vendor baseline': 'برنامج الجدار الناري متأخر عن خط أساس المورد',
  'Complete patch weekend and re-scan': 'إكمال عطلة التصحيح وإعادة الفحص',
  'GDPR': 'GDPR',
  'ISO 22301': 'ISO 22301',
  auth: 'المصادقة',
  finding: 'ملاحظة',
  control: 'ضابط',
  audit: 'تدقيق',
  drill: 'تمرين',
  bia: 'BIA',
  integration: 'تكامل',
  system: 'النظام',
  'process-risk-link': 'ربط عملية-مخاطر',
  'Connected (simulated)': 'متصل (محاكاة)',
  'Drill findings require follow-up': 'ملاحظات التمرين تتطلب متابعة',
  'Email placeholder': 'name@company.com',
  'Privileged access, joiner-mover-leaver': 'الوصول المميز وانضمام/نقل/مغادرة الموظفين',
  'Critical cloud processors': 'معالجو السحابة الحرجون',
  'Payment settlement failover evidence': 'أدلة تحويل تسوية المدفوعات',
  'Edge devices and servers': 'أجهزة الحافة والخوادم',
  'Cross-border transfers': 'التحويلات عبر الحدود',
  'IT Ops': 'عمليات تقنية المعلومات',
  IAM: 'إدارة الهوية',
  Network: 'الشبكة',
  'IT Security': 'أمن تقنية المعلومات',
  'Simulated sync finished for': 'اكتملت المزامنة المحاكاة لـ',
  'User signed in': 'تم تسجيل الدخول',
  'User signed out': 'تم تسجيل الخروج',
  'Finding updated': 'تم تحديث الملاحظة',
  'Finding created': 'تم إنشاء ملاحظة',
  'Control effectiveness updated': 'تم تحديث فعالية الضابط',
  'Audit updated': 'تم تحديث التدقيق',
  'Audit planned': 'تم تخطيط تدقيق',
  'Drill updated': 'تم تحديث التمرين',
  'Linked risks to process': 'تم ربط المخاطر بالعملية',
  'Simulated sync for integration': 'مزامنة محاكاة للتكامل',
  'Simulated sync finished.': 'اكتملت المزامنة المحاكاة.',
  'Saved risk links for process': 'تم حفظ روابط المخاطر للعملية',
  'Open the audit register to track related findings.': 'افتح سجل التدقيق لمتابعة الملاحظات المرتبطة.',
  'Drill findings require follow-up': 'ملاحظات التمرين تتطلب متابعة',
  'name@company.com': 'name@company.com',
  'Open high residual risks': 'مخاطر متبقية مرتفعة مفتوحة',
  'Overdue BIA reviews': 'مراجعات BIA متأخرة',
  'Policy attestation below target': 'إقرار السياسات دون الهدف',
  'Failed drill findings open': 'ملاحظات تمارين فاشلة مفتوحة',
  'Control effectiveness average': 'متوسط فعالية الضوابط',
  'Business continuity planning': 'تخطيط استمرارية الأعمال',
  'MFA for remote access': 'المصادقة متعددة العوامل للوصول عن بُعد',
  'Break-glass accounts not individually attributable': 'حسابات الطوارئ غير قابلة للإسناد الفردي',
  'Migrate to PAM vault with named ownership': 'الترحيل إلى خزنة PAM بملكية مسماة',
  'Quarterly access review export is manual': 'تصدير مراجعة الوصول الربعية يدوي',
  'Automate review export and manager escalation': 'أتمتة تصدير المراجعة وتصعيد المدير',
  'Warm site failover not tested in 18 months': 'لم يُختبر تحويل الموقع الدافئ خلال 18 شهراً',
  'Schedule fail-over drill and capture evidence': 'جدولة تمرين التحويل وتوثيق الأدلة',
  'Firewall firmware behind vendor baseline': 'برنامج الجدار الناري متأخر عن خط أساس المورد',
  'Complete patch weekend and re-scan': 'إكمال عطلة التصحيح وإعادة الفحص',
  GDPR: 'GDPR',
  'ISO 22301': 'ISO 22301',
  auth: 'المصادقة',
  finding: 'ملاحظة',
  control: 'ضابط',
  audit: 'تدقيق',
  drill: 'تمرين',
  bia: 'BIA',
  integration: 'تكامل',
  system: 'النظام',
  'process-risk-link': 'ربط عملية-مخاطر',
  'Connected (simulated)': 'متصل (محاكاة)',
  'IT Ops': 'عمليات تقنية المعلومات',
  IAM: 'إدارة الهوية',
  Network: 'الشبكة',
  'IT Security': 'أمن تقنية المعلومات',
  'Privileged access, joiner-mover-leaver': 'الوصول المميز وانضمام/نقل/مغادرة الموظفين',
  'Critical cloud processors': 'معالجو السحابة الحرجون',
  'Payment settlement failover evidence': 'أدلة تحويل تسوية المدفوعات',
  'Edge devices and servers': 'أجهزة الحافة والخوادم',
  'Cross-border transfers': 'التحويلات عبر الحدود',
};

// Full dynamic summary templates used in code (exact strings when possible via patterns displayed with t)
const more = {
  'Escalate high risk': 'تصعيد مخاطر مرتفعة',
  'name@company.com': 'name@company.com',
};

Object.assign(ar, more);

function mergeFile(path, map, identity = false) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  let n = 0;
  for (const [k, v] of Object.entries(map)) {
    if (!(k in data)) {
      data[k] = identity ? k : v;
      n += 1;
    }
  }
  fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  return n;
}

const keys = Object.keys(ar);
const enMap = Object.fromEntries(keys.map(k => [k, k]));
console.log('en grc', mergeFile('src/i18n/en/grc.json', enMap, true));
console.log('ar grc', mergeFile('src/i18n/ar/grc.json', ar));
console.log('en bcms', mergeFile('src/i18n/en/bcms.json', enMap, true));
console.log('ar bcms', mergeFile('src/i18n/ar/bcms.json', ar));
