import fs from 'fs';

/** Arabic translations for mock/content strings shown in the UI */
const ar = {
  '10 min ago': 'منذ 10 دقائق',
  '45 min ago': 'منذ 45 دقيقة',
  '2 hours ago': 'منذ ساعتين',
  Yesterday: 'أمس',
  '2 days ago': 'منذ يومين',
  'Nov 4, 2025': '4 نوفمبر 2025',
  'Feb 4, 2026': '4 فبراير 2026',
  'AI Acceptable Use Policy': 'سياسة الاستخدام المقبول للذكاء الاصطناعي',
  'Acceptable Use Policy': 'سياسة الاستخدام المقبول',
  'Access control': 'التحكم في الوصول',
  'Access revocation lagged end dates.': 'تأخر إلغاء الوصول عن تواريخ الانتهاء.',
  'Acknowledge vendor risk RSK-004': 'الإقرار بمخاطر المورد RSK-004',
  'Aisha Bello': 'Aisha Bello',
  'Amazon Web Services': 'Amazon Web Services',
  'Amend processor contracts': 'تعديل عقود المعالجين',
  'Annual BC budget gate': 'بوابة موازنة استمرارية الأعمال السنوية',
  'Appetite breach: RSK-016 residual 12': 'تجاوز الشهية: RSK-016 متبقي 12',
  'Approve Policy POL-002': 'اعتماد السياسة POL-002',
  'Approve Policy POL-005': 'اعتماد السياسة POL-005',
  'Approve workflows and oversee module data': 'اعتماد سير العمل والإشراف على بيانات الوحدات',
  'Approved SaaS catalog': 'كتالوج SaaS المعتمد',
  'Asset inventory': 'جرد الأصول',
  'Attestation 64% for InfoSec Policy': 'إقرار 64% لسياسة أمن المعلومات',
  'Automate access review export': 'أتمتة تصدير مراجعة الوصول',
  'BC Drill Evidence Check': 'فحص أدلة تمرين استمرارية الأعمال',
  'BC playbooks': 'أدلة استمرارية الأعمال',
  'BIA procedure': 'إجراء تحليل أثر الأعمال',
  'BIA workshop outcomes for RSK-012 require executive sign-off.':
    'نتائج ورشة BIA لـ RSK-012 تتطلب اعتماداً تنفيذياً.',
  'Backup copies of information and tested restoration.': 'نسخ احتياطية للمعلومات واستعادة مختبرة.',
  'Badge access, visitor logs, and secure areas.': 'صلاحيات الشارات وسجلات الزوار والمناطق الآمنة.',
  'Baseline controls for protecting organizational information assets.':
    'ضوابط أساسية لحماية أصول المعلومات المؤسسية.',
  'Budget overrun on continuity drills': 'تجاوز الميزانية في تمارين الاستمرارية',
  'Business Continuity Policy': 'سياسة استمرارية الأعمال',
  'Business Continuity Policy awaiting manager review before Risk Officer stage.':
    'سياسة استمرارية الأعمال بانتظار مراجعة المدير قبل مرحلة مسؤول المخاطر.',
  'CASB discovery pilot': 'تجربة اكتشاف CASB',
  'Call center alternate site untested': 'موقع بديل لمركز الاتصال غير مختبر',
  'Change Management Policy': 'سياسة إدارة التغيير',
  'Change intake, risk assessment, and approval gates.':
    'استقبال التغيير وتقييم المخاطر وبوابات الاعتماد.',
  'Change management': 'إدارة التغيير',
  'Changes authorized, designed, and implemented.': 'تغييرات مصرّح بها ومصممة ومنفّذة.',
  'Classification and lifecycle of corporate records.': 'تصنيف ودورة حياة السجلات المؤسسية.',
  'Close mitigation on RSK-005': 'إغلاق المعالجة لـ RSK-005',
  'Cloud · Okta': 'سحابة · Okta',
  'Cloud · Snowflake': 'سحابة · Snowflake',
  'Collection, processing, and sharing of personal data.': 'جمع ومعالجة ومشاركة البيانات الشخصية.',
  'Complete ISO control evidence': 'إكمال أدلة ضوابط ISO',
  'Configuration management': 'إدارة التهيئة',
  'Confirm Manager permissions still accurate for Audits module.':
    'تأكيد أن صلاحيات المدير ما زالت دقيقة لوحدة التدقيق.',
  'Confirm firewall patching weekend completed and update residual score.':
    'تأكيد اكتمال تصحيح الجدار الناري وتحديث الدرجة المتبقية.',
  'Contractor offboarding delays': 'تأخر إنهاء عقود المقاولين',
  'Contractual SLA gaps with processors': 'فجوات SLA تعاقدية مع المعالجين',
  'Control activities': 'أنشطة الضوابط',
  'Control activities selected and developed.': 'أنشطة ضوابط مختارة ومطوّرة.',
  'Covers restoration of payment authorization, clearing, and settlement services in the event of a data center outage, core banking failure, or extended vendor disruption. Applies to the Finance and IT & Security teams and their designated backups.':
    'يغطي استعادة تفويض المدفوعات والمقاصة والتسوية عند انقطاع مركز البيانات أو فشل الأنظمة المصرفية الأساسية أو تعطل ممتد للموردين. ينطبق على فرق المالية وتقنية المعلومات والأمن ونوابهم المعينين.',
  'Crisis Desk': 'مكتب الأزمات',
  'Cross-border transfer documentation lag': 'تأخر وثائق النقل عبر الحدود',
  'Cross-train two deputies': 'تدريب تبادلي لنائبين',
  'Cyber insurance policy': 'وثيقة تأمين سيبراني',
  'DPA template v3': 'نموذج اتفاقية معالجة البيانات v3',
  'DPAs missing breach notification timelines.': 'اتفاقيات المعالجة تفتقد جداول إشعار الخرق.',
  'Data Retention Policy': 'سياسة الاحتفاظ بالبيانات',
  'Data Warehouse': 'مستودع البيانات',
  'Data at rest is protected.': 'البيانات الساكنة محمية.',
  'Data-at-rest protection': 'حماية البيانات الساكنة',
  'David Okafor': 'David Okafor',
  'Day-to-day create/update within granted modules': 'إنشاء/تحديث يومي ضمن الوحدات الممنوحة',
  'Draft multi-cloud exit runbook': 'مسودة دليل الخروج متعدد السحابة',
  'Drill costs above allocation.': 'تكاليف التمرين أعلى من المخصص.',
  'Due diligence and monitoring of critical vendors.': 'العناية الواجبة ومراقبة الموردين الحرجين.',
  'EDR coverage on all servers': 'تغطية EDR على جميع الخوادم',
  'EDR on servers': 'EDR على الخوادم',
  'Elena Vasquez': 'Elena Vasquez',
  'Employee use of corporate systems, email, and internet.':
    'استخدام الموظفين للأنظمة والبريد والإنترنت المؤسسي.',
  'Enable immutable backups': 'تفعيل النسخ الاحتياطي غير القابل للتغيير',
  'Encryption of production workloads by threat actors.': 'تشفير أحمال الإنتاج من قبل مهاجمين.',
  'Endpoint Patch Compliance': 'امتثال تصحيح الأجهزة الطرفية',
  'Enforce MFA on all VPN groups': 'فرض المصادقة متعددة العوامل على كل مجموعات VPN',
  'Escalation emails to managers': 'رسائل تصعيد للمديرين',
  'Event logs produced, stored, and protected.': 'سجلات الأحداث منتَجة ومخزّنة ومحمية.',
  'Final publication checklist completed.': 'اكتملت قائمة التحقق النهائية للنشر.',
  'Firewall firmware behind vendor baseline.': 'برنامج الجدار الناري متأخر عن خط الأساس للمورد.',
  'Full configuration and access management': 'إعداد كامل وإدارة الوصول',
  'Generator contract': 'عقد المولد',
  'Generator load test quarterly': 'اختبار حمل المولد ربع سنوي',
  'HRIS auto-ticket': 'تذكرة تلقائية من نظام الموارد البشرية',
  'HRIS auto-ticket on end date': 'تذكرة تلقائية عند تاريخ الانتهاء',
  'HVAC spare lead times exceed RTO.': 'أوقات توريد قطع HVAC تتجاوز RTO.',
  'ISO 27001': 'ISO 27001',
  'ISO 27001 assessment started': 'بدء تقييم ISO 27001',
  'Identify, Protect, Detect, Respond, Recover outcomes.':
    'مخرجات التحديد والحماية والكشف والاستجابة والتعافي.',
  'Identities and credentials managed.': 'الهويات وبيانات الاعتماد مُدارة.',
  'Identity Provider (SSO)': 'مزود الهوية (SSO)',
  'Identity and access management': 'إدارة الهوية والوصول',
  'Immutable backups': 'نسخ احتياطي غير قابل للتغيير',
  'Inbox task approved: Publish AUP': 'مهمة واردة معتمدة: نشر سياسة الاستخدام المقبول',
  'Incident Response Policy': 'سياسة الاستجابة للحوادث',
  'Incident management planning': 'تخطيط إدارة الحوادث',
  'Incomplete BIA for new digital channel': 'BIA غير مكتمل للقناة الرقمية الجديدة',
  'Incomplete evidence for access reviews': 'أدلة غير مكتملة لمراجعات الوصول',
  'Information Security Policy': 'سياسة أمن المعلومات',
  'Information backup': 'النسخ الاحتياطي للمعلومات',
  'Information security management system controls (Annex A subset).':
    'ضوابط نظام إدارة أمن المعلومات (مجموعة فرعية من الملحق أ).',
  'Infrastructure · Critical': 'البنية التحتية · حرج',
  'Install secondary UPS path': 'تركيب مسار UPS ثانوي',
  'Insurance coverage gap for cyber': 'فجوة تغطية التأمين السيبراني',
  'Jonah Fischer': 'Jonah Fischer',
  'Key-person dependency in BC team': 'اعتماد على شخص رئيسي في فريق الاستمرارية',
  'LMS mandatory courses': 'دورات إلزامية في نظام التعلم',
  'Laila Haddad': 'Laila Haddad',
  'Legacy partner VPN without MFA.': 'VPN شريك قديم بدون مصادقة متعددة العوامل.',
  'Legal and IT comments needed on POL-012 before workflow advance.':
    'تعليقات قانونية وتقنية مطلوبة على POL-012 قبل تقدم سير العمل.',
  Logging: 'التسجيل',
  'Logical access restricted to authorized users.': 'الوصول المنطقي مقتصر على المستخدمين المصرح لهم.',
  'Logical access security': 'أمن الوصول المنطقي',
  'Management of technical vulnerabilities': 'إدارة الثغرات التقنية',
  'Management-approved security policies communicated to staff.':
    'سياسات أمنية معتمدة من الإدارة ومبلّغة للموظفين.',
  'Marcus Reid': 'Marcus Reid',
  'Missing quarterly reviews for privileged apps.': 'غياب المراجعات الربعية للتطبيقات ذات الامتيازات.',
  'NCA ECC': 'NCA ECC',
  'NIST CSF': 'NIST CSF',
  'Network monitored for potential events.': 'الشبكة مراقبة للأحداث المحتملة.',
  'Network monitoring': 'مراقبة الشبكة',
  'On-prem · Tier 1': 'محلي · المستوى 1',
  'Only one trained crisis communications lead.': 'قائد اتصالات أزمات مدرّب واحد فقط.',
  'PAM vault for break-glass': 'خزنة PAM لحسابات الطوارئ',
  'PAM vault progress check': 'متابعة تقدم خزنة PAM',
  'PCI DSS': 'PCI DSS',
  'POL-008 expired — create revision and restart workflow.':
    'انتهت صلاحية POL-008 — أنشئ مراجعة وأعد تشغيل سير العمل.',
  'Patch weekend window': 'نافذة تصحيح نهاية الأسبوع',
  'Payment Gateway API': 'واجهة بوابة الدفع',
  'Payment processing · Critical': 'معالجة المدفوعات · حرج',
  'Phishing awareness campaign': 'حملة توعية بالتصيد',
  'Phishing simulation': 'محاكاة تصيد',
  'Physical Security Policy': 'سياسة الأمن المادي',
  'Physical devices and systems inventoried.': 'الأجهزة والأنظمة المادية مجرودة.',
  'Policies for information security': 'سياسات أمن المعلومات',
  'Policy POL-002 moved to Manager Review': 'السياسة POL-002 انتقلت لمراجعة المدير',
  'Policy authors should not solely own Audit approvals (SoD).':
    'لا ينبغي لمؤلفي السياسات امتلاك اعتمادات التدقيق وحدهم (فصل المهام).',
  'Portal launched without BIA.': 'تم إطلاق البوابة دون BIA.',
  'Primary UPS': 'UPS أساسي',
  'Privacy DPIA Spot Check': 'فحص موضعي لتقييم أثر الخصوصية',
  'Privacy Policy': 'سياسة الخصوصية',
  'Privileged access policy': 'سياسة الوصول المميز',
  'Privileged account shared credentials': 'بيانات اعتماد مشتركة لحساب مميز',
  'Priya Nair': 'Priya Nair',
  'Processes to prepare for and respond to incidents.': 'عمليات للاستعداد والاستجابة للحوادث.',
  'Publish Acceptable Use Policy': 'نشر سياسة الاستخدام المقبول',
  'Q2 Access Control Audit': 'تدقيق التحكم في الوصول للربع الثاني',
  'Quarterly access review': 'مراجعة وصول ربع سنوية',
  'Ransomware on critical servers': 'برمجيات فدية على خوادم حرجة',
  'Read-focused access for independent review': 'وصول للقراءة للمراجعة المستقلة',
  'Records Management Policy': 'سياسة إدارة السجلات',
  'Recovery plan executed': 'تنفيذ خطة التعافي',
  'Recovery plan is executed during event.': 'يتم تنفيذ خطة التعافي أثناء الحدث.',
  'Recovery plans tested periodically.': 'خطط التعافي تُختبر دورياً.',
  'Recovery testing': 'اختبار التعافي',
  'Refresh SCCs pack': 'تحديث حزمة البنود التعاقدية القياسية',
  'Remote Work Security Policy': 'سياسة أمن العمل عن بُعد',
  'Reopen Incident Response Policy': 'إعادة فتح سياسة الاستجابة للحوادث',
  'Requirements for BCP, recovery objectives, and annual exercises.':
    'متطلبات خطة الاستمرارية وأهداف التعافي والتمارين السنوية.',
  'Response plan executed': 'تنفيذ خطة الاستجابة',
  'Response plan is executed during event.': 'يتم تنفيذ خطة الاستجابة أثناء الحدث.',
  'Retention periods, legal holds, and secure disposal.':
    'فترات الاحتفاظ والحجز القانوني والتخلص الآمن.',
  'Review AI Acceptable Use draft': 'مراجعة مسودة الاستخدام المقبول للذكاء الاصطناعي',
  'Review Risk RSK-001': 'مراجعة المخاطر RSK-001',
  'Risk RSK-001 residual score updated': 'تحديث الدرجة المتبقية للمخاطر RSK-001',
  'Risk acceptance formally recorded by Finance.': 'تسجيل قبول المخاطر رسمياً من المالية.',
  'Risk owners approving their own audits creates SoD conflict.':
    'اعتماد مالكي المخاطر لتدقيقاتهم يخلق تعارض فصل المهام.',
  'Rules to control physical and logical access.': 'قواعد للتحكم في الوصول المادي والمنطقي.',
  'Run BIA workshop with product': 'عقد ورشة BIA مع المنتج',
  'SCCs not refreshed for two EU processors.': 'لم تُحدَّث البنود القياسية لمعالجَين أوروبيين.',
  'SMS / OTP delivery · Important': 'توصيل SMS / OTP · مهم',
  'SOC 2': 'SOC 2',
  'SaaS · Stripe': 'SaaS · Stripe',
  'Safe use of generative AI tools with corporate data.':
    'استخدام آمن لأدوات الذكاء الاصطناعي التوليدي مع البيانات المؤسسية.',
  'Sarah Chen': 'Sarah Chen',
  'Schedule fail-over drill': 'جدولة تمرين التحويل الاحتياطي',
  'Secure configuration and management of endpoints.': 'تهيئة وإدارة آمنة للأجهزة الطرفية.',
  'Secure configurations documented and applied.': 'تهيئات آمنة موثّقة ومطبّقة.',
  'Security training at 82% vs 95% target.': 'التدريب الأمني عند 82% مقابل هدف 95%.',
  'Severity classification and communication for security incidents.':
    'تصنيف الخطورة والتواصل لحوادث الأمن.',
  'Shadow IT SaaS sprawl': 'انتشار SaaS غير معتمد (ظل تقنية المعلومات)',
  'Shared break-glass without individual accountability.':
    'حساب طوارئ مشترك دون مساءلة فردية.',
  'Sign off BIA for digital channel': 'اعتماد BIA للقناة الرقمية',
  'Single point of failure in DC power': 'نقطة فشل واحدةحدة في طاقة مركز البيانات',
  'Stripe Inc.': 'Stripe Inc.',
  'Sublimit may not cover ransomware scenario.': 'الحد الفرعي قد لا يغطي سيناريو الفدية.',
  'Supply chain delay for spare parts': 'تأخر سلسلة التوريد لقطع الغيار',
  'System monitored to detect anomalies.': 'النظام مراقب لاكتشاف الشذوذ.',
  'System monitoring': 'مراقبة النظام',
  'Third-Party Risk Policy': 'سياسة مخاطر الأطراف الثالثة',
  'Third-Party Risk Policy at Risk Officer Approval stage.':
    'سياسة مخاطر الأطراف الثالثة في مرحلة اعتماد مسؤول المخاطر.',
  'Timely identification and remediation of vulnerabilities.':
    'تحديد ومعالجة الثغرات في الوقت المناسب.',
  'Training completion below target': 'إكمال التدريب دون الهدف',
  'Transfer impact assessments': 'تقييمات أثر النقل',
  'Treasury Operations': 'عمليات الخزينة',
  'Trust Services Criteria sample controls for readiness.':
    'عيّنة ضوابط معايير خدمات الثقة للجاهزية.',
  Twilio: 'Twilio',
  'UPS redundancy below Tier III target.': 'تكرار UPS دون هدف المستوى الثالث.',
  'Unpatched edge devices': 'أجهزة حافة غير مصحّحة',
  'Unsanctioned SaaS with customer data.': 'SaaS غير معتمد يحتوي بيانات عملاء.',
  'Upload evidence for A.8.13 backup and A.8.15 logging controls.':
    'رفع أدلة لضوابط النسخ الاحتياطي A.8.13 والتسجيل A.8.15.',
  'User endpoint devices': 'أجهزة المستخدم الطرفية',
  'Users & Roles quarterly review': 'مراجعة ربع سنوية للمستخدمين والأدوار',
  'VPN MFA policy': 'سياسة المصادقة متعددة العوامل لـ VPN',
  'VPN, MFA, and endpoint hygiene for remote staff.':
    'VPN والمصادقة متعددة العوامل ونظافة الأجهزة للموظفين عن بُعد.',
  'Validate residual score after immutable backup mitigation progress.':
    'التحقق من الدرجة المتبقية بعد تقدم معالجة النسخ غير القابل للتغيير.',
  'Vendor Mgmt': 'إدارة الموردين',
  'Vendor SLA': 'اتفاقية مستوى خدمة المورد',
  'Vendor SOC2 Review': 'مراجعة SOC2 للمورد',
  'Vendor concentration risk': 'مخاطر تركز الموردين',
  'Vendor risk assessments': 'تقييمات مخاطر الموردين',
  'Verify break-glass accounts migrated for RSK-017.':
    'التحقق من ترحيل حسابات الطوارئ لـ RSK-017.',
  'Vulnerability management': 'إدارة الثغرات',
  'Warm site contract': 'عقد الموقع الدافئ',
  'Warm site not fail-over tested in 18 months.':
    'لم يُختبر التحويل للموقع الدافئ خلال 18 شهراً.',
  'Weak MFA coverage on remote access': 'تغطية ضعيفة للمصادقة متعددة العوامل على الوصول عن بُعد',
  'Wei Zhang': 'Wei Zhang',
  Remove: 'إزالة',
  Risks: 'المخاطر',
  Policies: 'السياسات',
  Audits: 'التدقيق',
  Compliance: 'الامتثال',
  Inbox: 'الوارد',
  Dashboard: 'لوحة المعلومات',
};

function merge(file, extra) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const [k, v] of Object.entries(extra)) {
    if (!(k in data)) {
      data[k] = v;
      added += 1;
    }
  }
  // EN identity for same keys when writing EN file
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  return added;
}

function mergeEn(file, keys) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const k of keys) {
    if (!(k in data)) {
      data[k] = k;
      added += 1;
    }
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  return added;
}

const keys = Object.keys(ar);
const enGrc = mergeEn('src/i18n/en/grc.json', keys);
const arGrc = merge('src/i18n/ar/grc.json', ar);
const enBcms = mergeEn('src/i18n/en/bcms.json', keys);
const arBcms = merge('src/i18n/ar/bcms.json', ar);
console.log({ enGrc, arGrc, enBcms, arBcms });
