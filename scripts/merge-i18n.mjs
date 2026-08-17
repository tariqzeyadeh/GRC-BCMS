import fs from 'fs';

function merge(file, additions) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const [k, v] of Object.entries(additions)) {
    if (!(k in data)) {
      data[k] = v;
      added++;
    } else if (data[k] === k && v !== k) {
      data[k] = v;
      added++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  return added;
}

const grcEn = {
  Monitoring: 'Monitoring',
  Mitigated: 'Mitigated',
  Active: 'Active',
  Overview: 'Overview',
  'Call Tree': 'Call Tree',
  'Recovery Procedures': 'Recovery Procedures',
  'PDF, PNG, or DOCX up to 10MB': 'PDF, PNG, or DOCX up to 10MB',
  Minimal: 'Minimal',
  Severe: 'Severe',
  MTTR: 'MTTR',
  'Expand sidebar': 'Expand sidebar',
  'Collapse sidebar': 'Collapse sidebar',
  Close: 'Close',
  'Toggle mobile menu': 'Toggle mobile menu',
  'Switch to light mode': 'Switch to light mode',
  'Switch to dark mode': 'Switch to dark mode',
  Cybersecurity: 'Cybersecurity',
  Operational: 'Operational',
  Compliance: 'Compliance',
  Financial: 'Financial',
  Legal: 'Legal',
  HR: 'HR',
  IT: 'IT',
  Operations: 'Operations',
  Finance: 'Finance',
  Procurement: 'Procurement',
  'Department Manager': 'Department Manager',
  'Risk Officer': 'Risk Officer',
  'Policy Admin': 'Policy Admin',
  'Manager Review': 'Manager Review',
  'Risk Officer Approval': 'Risk Officer Approval',
  'Awaiting risk sign-off': 'Awaiting risk sign-off',
};

const grcAr = {
  Monitoring: 'مراقبة',
  Mitigated: 'مُعالَج',
  Active: 'نشط',
  Overview: 'نظرة عامة',
  'Call Tree': 'شجرة الاتصال',
  'Recovery Procedures': 'إجراءات الاستعادة',
  'PDF, PNG, or DOCX up to 10MB': 'PDF أو PNG أو DOCX حتى 10 ميجابايت',
  Minimal: 'أدنى',
  Severe: 'شديد',
  MTTR: 'متوسط زمن المعالجة',
  'Expand sidebar': 'توسيع الشريط الجانبي',
  'Collapse sidebar': 'طي الشريط الجانبي',
  Close: 'إغلاق',
  'Toggle mobile menu': 'تبديل قائمة الجوال',
  'Switch to light mode': 'التبديل للوضع الفاتح',
  'Switch to dark mode': 'التبديل للوضع الداكن',
  Cybersecurity: 'الأمن السيبراني',
  Operational: 'تشغيلي',
  Compliance: 'امتثال',
  Financial: 'مالي',
  Legal: 'قانوني',
  HR: 'الموارد البشرية',
  IT: 'تقنية المعلومات',
  Operations: 'العمليات',
  Finance: 'المالية',
  Procurement: 'المشتريات',
  'Department Manager': 'مدير القسم',
  'Risk Officer': 'مسؤول المخاطر',
  'Policy Admin': 'مسؤول السياسات',
  'Manager Review': 'مراجعة المدير',
  'Risk Officer Approval': 'موافقة مسؤول المخاطر',
  'Awaiting risk sign-off': 'بانتظار اعتماد المخاطر',
};

const bcmsEn = {
  Active: 'Active',
  'Tier 1 Critical': 'Tier 1 Critical',
  'Tier 2 Important': 'Tier 2 Important',
  'Tier 3 Normal': 'Tier 3 Normal',
  Primary: 'Primary',
  'Backup 1': 'Backup 1',
  'Backup 2': 'Backup 2',
  '1 Hour': '1 Hour',
  '24 Hours': '24 Hours',
  '3 Days': '3 Days',
  '1 Week': '1 Week',
  Low: 'Low',
  Med: 'Med',
  High: 'High',
  RTO: 'RTO',
  RPO: 'RPO',
  hours: 'hours',
  minutes: 'minutes',
  'HH : MM : SS': 'HH : MM : SS',
  Call: 'Call',
  Email: 'Email',
  'Reorder step': 'Reorder step',
  '+4 newly classified': '+4 newly classified',
  'Target 4.0h · 1.4h over': 'Target 4.0h · 1.4h over',
  '+2 past due date': '+2 past due date',
  '+3 vs. last cycle': '+3 vs. last cycle',
  'Incident Command': 'Incident Command',
  'Declares the incident and coordinates the overall response.':
    'Declares the incident and coordinates the overall response.',
  'Technical Recovery': 'Technical Recovery',
  'Executes the failover and restores system availability.':
    'Executes the failover and restores system availability.',
  'Customer Communications': 'Customer Communications',
  'Manages customer and regulatory notifications during the outage.':
    'Manages customer and regulatory notifications during the outage.',
  'Head of Settlements': 'Head of Settlements',
  'VP, Finance Operations': 'VP, Finance Operations',
  'Director, Business Continuity': 'Director, Business Continuity',
  'Lead Platform Engineer': 'Lead Platform Engineer',
  'Senior Site Reliability Engineer': 'Senior Site Reliability Engineer',
  'Infrastructure Manager': 'Infrastructure Manager',
  'Treasury Operations Lead': 'Treasury Operations Lead',
  'Head of Customer Communications': 'Head of Customer Communications',
  'Compliance & Regulatory Affairs': 'Compliance & Regulatory Affairs',
  'Incident Commander': 'Incident Commander',
  '10 mins': '10 mins',
  '15 mins': '15 mins',
  '20 mins': '20 mins',
  '30 mins': '30 mins',
  '45 mins': '45 mins',
  '60 mins': '60 mins',
  'Declare incident and activate the Business Continuity Plan via the on-call bridge.':
    'Declare incident and activate the Business Continuity Plan via the on-call bridge.',
  'Notify the call tree and confirm attendance of primary and backup responders.':
    'Notify the call tree and confirm attendance of primary and backup responders.',
  'Failover payment authorization traffic to the secondary data center region.':
    'Failover payment authorization traffic to the secondary data center region.',
  'Validate settlement queue integrity and reconcile in-flight transactions.':
    'Validate settlement queue integrity and reconcile in-flight transactions.',
  'Restore customer-facing payment status endpoints and confirm health checks.':
    'Restore customer-facing payment status endpoints and confirm health checks.',
  'Issue regulatory and customer notifications per the disclosure playbook.':
    'Issue regulatory and customer notifications per the disclosure playbook.',
  'Conduct post-incident review and update the plan with lessons learned.':
    'Conduct post-incident review and update the plan with lessons learned.',
  'IT & Security': 'IT & Security',
  Finance: 'Finance',
  Operations: 'Operations',
  'Customer Ops': 'Customer Ops',
  'Supply Chain': 'Supply Chain',
  HR: 'HR',
  Risk: 'Risk',
  BCP: 'BCP',
  DRP: 'DRP',
  'IT Failover Plan': 'IT Failover Plan',
  'Payment Authorization Continuity Plan': 'Payment Authorization Continuity Plan',
  'Crisis Communications Playbook': 'Crisis Communications Playbook',
  'Critical Vendor Escalation DRP': 'Critical Vendor Escalation DRP',
  'Ransomware indicators detected on core file servers. Incident declared.':
    'Ransomware indicators detected on core file servers. Incident declared.',
  'Business Continuity Plan BCP-013 activated. War room bridge opened.':
    'Business Continuity Plan BCP-013 activated. War room bridge opened.',
  'Mass alert issued to IT, Finance, and Customer Ops on-call teams.':
    'Mass alert issued to IT, Finance, and Customer Ops on-call teams.',
  'IT Failover Plan initiated — payment traffic steered to secondary region.':
    'IT Failover Plan initiated — payment traffic steered to secondary region.',
  'Executive Board notified. Regulatory disclosure playbook in review.':
    'Executive Board notified. Regulatory disclosure playbook in review.',
  'Settlement queue integrity check in progress (step 4 of recovery).':
    'Settlement queue integrity check in progress (step 4 of recovery).',
  'Customer status page updated. Contact center scripts activated.':
    'Customer status page updated. Contact center scripts activated.',
  Activated: 'Activated',
  'Primary DC · Region A': 'Primary DC · Region A',
  'Payment Authorization & Settlement': 'Payment Authorization & Settlement',
  'Core Banking Ledger': 'Core Banking Ledger',
  'Customer Authentication Service': 'Customer Authentication Service',
  'Fraud Detection & Monitoring': 'Fraud Detection & Monitoring',
  'Order Management & Fulfilment': 'Order Management & Fulfilment',
  'Customer Support Contact Center': 'Customer Support Contact Center',
  'Supplier Procurement Portal': 'Supplier Procurement Portal',
  'Regulatory Reporting Pipeline': 'Regulatory Reporting Pipeline',
  'Corporate Email & Collaboration': 'Corporate Email & Collaboration',
  'Employee Payroll Processing': 'Employee Payroll Processing',
  'Internal Knowledge Base': 'Internal Knowledge Base',
  'Marketing Campaign Platform': 'Marketing Campaign Platform',
};

const bcmsAr = {
  Active: 'نشط',
  'Tier 1 Critical': 'المستوى 1 — حرج',
  'Tier 2 Important': 'المستوى 2 — مهم',
  'Tier 3 Normal': 'المستوى 3 — عادي',
  Primary: 'أساسي',
  'Backup 1': 'احتياطي 1',
  'Backup 2': 'احتياطي 2',
  '1 Hour': 'ساعة واحدة',
  '24 Hours': '24 ساعة',
  '3 Days': '3 أيام',
  '1 Week': 'أسبوع واحد',
  Low: 'منخفض',
  Med: 'متوسط',
  High: 'مرتفع',
  RTO: 'RTO',
  RPO: 'RPO',
  hours: 'ساعات',
  minutes: 'دقائق',
  'HH : MM : SS': 'س : د : ث',
  Call: 'اتصال',
  Email: 'بريد',
  'Reorder step': 'إعادة ترتيب الخطوة',
  '+4 newly classified': '+4 مصنّفة حديثاً',
  'Target 4.0h · 1.4h over': 'الهدف 4.0س · تجاوز 1.4س',
  '+2 past due date': '+2 تجاوزت الموعد',
  '+3 vs. last cycle': '+3 مقابل الدورة السابقة',
  'Incident Command': 'قيادة الحادث',
  'Declares the incident and coordinates the overall response.':
    'يعلن الحادث وينسّق الاستجابة الشاملة.',
  'Technical Recovery': 'الاستعادة التقنية',
  'Executes the failover and restores system availability.':
    'ينفّذ التحويل ويستعيد توفر الأنظمة.',
  'Customer Communications': 'اتصالات العملاء',
  'Manages customer and regulatory notifications during the outage.':
    'يدير إشعارات العملاء والجهات الرقابية أثناء الانقطاع.',
  'Head of Settlements': 'رئيس التسويات',
  'VP, Finance Operations': 'نائب رئيس عمليات المالية',
  'Director, Business Continuity': 'مدير استمرارية الأعمال',
  'Lead Platform Engineer': 'مهندس منصة رئيسي',
  'Senior Site Reliability Engineer': 'مهندس موثوقية أول',
  'Infrastructure Manager': 'مدير البنية التحتية',
  'Treasury Operations Lead': 'قائد عمليات الخزينة',
  'Head of Customer Communications': 'رئيس اتصالات العملاء',
  'Compliance & Regulatory Affairs': 'الامتثال والشؤون الرقابية',
  'Incident Commander': 'قائد الحادث',
  '10 mins': '10 دقائق',
  '15 mins': '15 دقيقة',
  '20 mins': '20 دقيقة',
  '30 mins': '30 دقيقة',
  '45 mins': '45 دقيقة',
  '60 mins': '60 دقيقة',
  'Declare incident and activate the Business Continuity Plan via the on-call bridge.':
    'إعلان الحادث وتفعيل خطة الاستمرارية عبر جسر المناوبة.',
  'Notify the call tree and confirm attendance of primary and backup responders.':
    'إخطار شجرة الاتصال وتأكيد حضور المستجيبين الأساسيين والاحتياطيين.',
  'Failover payment authorization traffic to the secondary data center region.':
    'تحويل حركة تفويض المدفوعات إلى مركز البيانات الثانوي.',
  'Validate settlement queue integrity and reconcile in-flight transactions.':
    'التحقق من سلامة طابور التسوية ومطابقة المعاملات الجارية.',
  'Restore customer-facing payment status endpoints and confirm health checks.':
    'استعادة واجهات حالة الدفع للعملاء وتأكيد فحوصات الصحة.',
  'Issue regulatory and customer notifications per the disclosure playbook.':
    'إصدار إشعارات رقابية وللعملاء وفق دليل الإفصاح.',
  'Conduct post-incident review and update the plan with lessons learned.':
    'إجراء مراجعة ما بعد الحادث وتحديث الخطة بالدروس المستفادة.',
  'IT & Security': 'تقنية المعلومات والأمن',
  Finance: 'المالية',
  Operations: 'العمليات',
  'Customer Ops': 'عمليات العملاء',
  'Supply Chain': 'سلسلة التوريد',
  HR: 'الموارد البشرية',
  Risk: 'المخاطر',
  BCP: 'خطة استمرارية',
  DRP: 'خطة تعافٍ',
  'IT Failover Plan': 'خطة التحويل التقني',
  'Payment Authorization Continuity Plan': 'خطة استمرارية تفويض المدفوعات',
  'Crisis Communications Playbook': 'دليل اتصالات الأزمة',
  'Critical Vendor Escalation DRP': 'خطة تصعيد الموردين الحرجين',
  'Ransomware indicators detected on core file servers. Incident declared.':
    'رُصدت مؤشرات فدية على خوادم الملفات الأساسية. تم إعلان الحادث.',
  'Business Continuity Plan BCP-013 activated. War room bridge opened.':
    'تم تفعيل خطة الاستمرارية BCP-013. فُتح جسر غرفة العمليات.',
  'Mass alert issued to IT, Finance, and Customer Ops on-call teams.':
    'صدر تنبيه جماعي لفرق تقنية المعلومات والمالية وعمليات العملاء.',
  'IT Failover Plan initiated — payment traffic steered to secondary region.':
    'بدأ التحويل التقني — توجيه حركة المدفوعات للمنطقة الثانوية.',
  'Executive Board notified. Regulatory disclosure playbook in review.':
    'تم إبلاغ المجلس التنفيذي. دليل الإفصاح الرقابي قيد المراجعة.',
  'Settlement queue integrity check in progress (step 4 of recovery).':
    'فحص سلامة طابور التسوية جارٍ (الخطوة 4 من الاستعادة).',
  'Customer status page updated. Contact center scripts activated.':
    'تم تحديث صفحة حالة العملاء. تفعيل نصوص مركز الاتصال.',
  Activated: 'مفعّل',
  'Primary DC · Region A': 'مركز البيانات الرئيسي · المنطقة أ',
  'Payment Authorization & Settlement': 'تفويض المدفوعات والتسوية',
  'Core Banking Ledger': 'دفتر الأستاذ المصرفي الأساسي',
  'Customer Authentication Service': 'خدمة مصادقة العملاء',
  'Fraud Detection & Monitoring': 'كشف الاحتيال والمراقبة',
  'Order Management & Fulfilment': 'إدارة الطلبات والتنفيذ',
  'Customer Support Contact Center': 'مركز دعم العملاء',
  'Supplier Procurement Portal': 'بوابة مشتريات الموردين',
  'Regulatory Reporting Pipeline': 'مسار التقارير الرقابية',
  'Corporate Email & Collaboration': 'البريد والتعاون المؤسسي',
  'Employee Payroll Processing': 'معالجة رواتب الموظفين',
  'Internal Knowledge Base': 'قاعدة المعرفة الداخلية',
  'Marketing Campaign Platform': 'منصة الحملات التسويقية',
};

const sidebarEn = {
  'Expand sidebar': 'Expand sidebar',
  'Collapse sidebar': 'Collapse sidebar',
};

const sidebarAr = {
  'Expand sidebar': 'توسيع الشريط الجانبي',
  'Collapse sidebar': 'طي الشريط الجانبي',
};

console.log('grc en', merge('src/i18n/en/grc.json', grcEn));
console.log('grc ar', merge('src/i18n/ar/grc.json', grcAr));
console.log('bcms en', merge('src/i18n/en/bcms.json', bcmsEn));
console.log('bcms ar', merge('src/i18n/ar/bcms.json', bcmsAr));
console.log('sidebar en', merge('src/i18n/en/sidebar.json', sidebarEn));
console.log('sidebar ar', merge('src/i18n/ar/sidebar.json', sidebarAr));
