import fs from 'fs';

const causeEffectAr = {
  'Phishing + unpatched edge systems': 'تصيد + أنظمة حافة غير مصحّحة',
  'Core service outage and data recovery cost': 'انقطاع الخدمة الأساسية وتكلفة استعادة البيانات',
  'Single UPS path in primary DC': 'مسار UPS واحد في مركز البيانات الرئيسي',
  'Prolonged facility outage': 'انقطاع ممتد للمنشأة',
  'Manual export process': 'عملية تصدير يدوية',
  'Audit finding / regulatory exposure': 'ملاحظة تدقيق / تعرض رقابي',
  'No multi-cloud exit plan': 'لا توجد خطة خروج متعددة السحابة',
  'Pricing / lock-in / outage concentration': 'تسعير / احتكار / تركز الانقطاع',
  'Missed patch windows': 'فوات نوافذ التصحيح',
  'External exploit of perimeter': 'استغلال خارجي للمحيط',
  'No deputies trained': 'لا يوجد نواب مدرّبون',
  'Crisis response delay': 'تأخر الاستجابة للأزمات',
  'Legacy contracts': 'عقود قديمة',
  'Regulatory breach exposure': 'تعرض لخرق رقابي',
  'Single supplier': 'مورد واحد',
  'Facility cooling failure prolongs outage': 'فشل تبريد المنشأة يطيل الانقطاع',
  'Exception accounts not retired': 'حسابات استثناء لم تُلغَ',
  'Account takeover of remote access': 'استيلاء على الوصول عن بُعد',
  'Unscoped vendor quotes': 'عروض موردين غير محددة النطاق',
  'Reduced drill frequency': 'انخفاض تكرار التمارين',
  'No CASB discovery': 'لا يوجد اكتشاف CASB',
  'Data leakage / DPA gaps': 'تسرب بيانات / فجوات اتفاقيات المعالجة',
  'Fast-track release': 'إطلاق سريع',
  'Unknown RTO/RPO for customer channel': 'RTO/RPO غير معروفين لقناة العملاء',
  'No manager escalation': 'لا يوجد تصعيد للمدير',
  'Control operating ineffectiveness': 'عدم فعالية تشغيل الضابط',
  'Template update not rolled out': 'تحديث القالب لم يُنشر',
  'Transfer mechanism challenge': 'تحدي آلية النقل',
  'Policy renewal without scenario update': 'تجديد الوثيقة دون تحديث السيناريو',
  'Uninsured residual financial loss': 'خسارة مالية متبقية غير مؤمّنة',
  'Drill deferrals': 'تأجيل التمارين',
  'Contact center RTO breach': 'خرق RTO لمركز الاتصال',
  'No PAM vault': 'لا توجد خزنة PAM',
  'Unattributable privileged actions': 'إجراءات مميزة غير قابلة للإسناد',
  'Manual HRIS process': 'عملية يدوية في نظام الموارد البشرية',
  'Orphan accounts': 'حسابات يتيمة',
};

function mergeBoth(extra) {
  for (const file of ['src/i18n/en/grc.json', 'src/i18n/en/bcms.json']) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const k of Object.keys(extra)) {
      if (!(k in data)) data[k] = k;
    }
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  }
  for (const file of ['src/i18n/ar/grc.json', 'src/i18n/ar/bcms.json']) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const [k, v] of Object.entries(extra)) {
      if (!(k in data)) data[k] = v;
    }
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}

mergeBoth(causeEffectAr);
console.log('merged', Object.keys(causeEffectAr).length);
