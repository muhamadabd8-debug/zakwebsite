import type { Dictionary } from "./en";

/**
 * Arabic UI dictionary. Must mirror en.ts key-for-key (enforced by the
 * `Dictionary` type). ZAK and internationally recognised technical terms
 * (e.g. LEED) are kept untranslated per the localisation brief.
 */
export const ar: Dictionary = {
  a11y: {
    skipToContent: "تخطَّ إلى المحتوى",
  },
  nav: {
    capabilities: "القدرات",
    projects: "المشاريع",
    sectors: "القطاعات",
    engineeringNetwork: "الشبكة الهندسية",
    about: "من نحن",
    credentials: "الاعتمادات",
    discussProject: "ناقش مشروعك",
    requestCorporateProfile: "طلب الملف التعريفي للشركة",
    homeAriaLabel: "ZAK للاستشارات الهندسية — الصفحة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLanguageTo: "التبديل إلى الإنجليزية",
  },
  footer: {
    capabilitiesHeading: "القدرات",
    companyHeading: "الشركة",
    aboutZak: "عن ZAK",
    contact: "تواصل معنا",
    allRightsReserved: "جميع الحقوق محفوظة.",
    companyProfile: "الملف التعريفي للشركة",
  },
  breadcrumb: {
    home: "الرئيسية",
  },
  common: {
    discussProject: "ناقش مشروعك",
    exploreCapability: "استكشاف القدرة",
    viewCapabilities: "عرض القدرات",
    viewCredentials: "عرض الاعتمادات",
    seeProjectRecord: "عرض سجل المشاريع",
    howZakDelivers: "كيف تُنفّذ ZAK مشاريعها",
    allSectors: "جميع القطاعات",
    viewAllProjects: "عرض جميع المشاريع",
    browseFullRecord: "تصفح السجل الكامل للمشاريع",
  },
  project: {
    verifiedRoleEyebrow: "نطاق ZAK / الدور الموثَّق",
    overviewEyebrow: "نظرة عامة على المشروع",
    dataEyebrow: "بيانات المشروع",
    partiesEyebrow: "أطراف المشروع",
    relatedAssignmentEyebrow: "مهمة ذات صلة",
    relatedCapabilitiesEyebrow: "قدرات ذات صلة",
    relatedProjectsEyebrow: "مشاريع ذات صلة",
    noImage: "لا تتوفر صورة معتمدة الحقوق لهذا المشروع في الملف التعريفي للشركة",
    partiesDisclaimer:
      "الأطراف مدرجة كما وردت في الملف التعريفي لشركة ZAK. الأدوار التي تخص جهات أخرى تبقى ملكًا لها؛ ويقتصر إسهام ZAK على النطاق المذكور أعلاه.",
    flagshipTag: "المشاريع الرائدة",
    recordTag: "سجل المشاريع",
    ctaHeading: "هل تحتاج إلى هذا المستوى من الخبرة الهندسية في مشروعك؟",
    partyLabels: {
      owner: "المالك",
      contractor: "المقاول",
      consultant: "الاستشاري",
      designer: "المصمِّم",
      costManagement: "إدارة التكاليف",
      leedConsultant: "استشاري LEED",
    },
  },
  projectBrowser: {
    tierFlagship: "الرائدة",
    tierSelected: "المختارة",
    tierExtended: "الخبرة الموسَّعة",
    allProjects: "جميع المشاريع",
    filterAriaLabel: "تصفية المشاريع حسب القطاع",
    showingCount: (visible: number, total: number) =>
      `عرض ${visible} من أصل ${total} مشروعًا`,
    moreCount: (n: number) => `+ ${n} أخرى`,
    projectCount: (n: number) => {
      if (n === 1) return "مشروع واحد";
      if (n === 2) return "مشروعان";
      if (n >= 3 && n <= 10) return `${n} مشاريع`;
      return `${n} مشروعًا`;
    },
    /** Word only (no digit) — pairs with a separately rendered numeral. */
    projectWord: (n: number) => {
      if (n === 1) return "مشروع";
      if (n === 2) return "مشروعان";
      if (n >= 3 && n <= 10) return "مشاريع";
      return "مشروعًا";
    },
  },
  capability: {
    indexEyebrow: (index: string) => `القدرة ${index}`,
    clientProblemEyebrow: "تحدي العميل",
    providesEyebrow: "ما تقدمه ZAK",
    scopeBoundaryEyebrow: "حدود النطاق",
    scopeBoundaryBody: "مذكورة بوضوح حتى لا تُفترض أي ملكية أو مسؤولية دون سند.",
    scopeStartsHeading: "أين يبدأ دور ZAK",
    scopeEndsHeading: "أين ينتهي دور ZAK",
    deliverablesEyebrow: "المخرجات الرئيسية",
    evidenceEyebrow: "أدلة المشاريع",
    evidenceHeading: "أين تم تنفيذ هذه القدرة",
    evidenceLabel: "دليل",
    ctaHeading: (shortName: string) => `ناقش ${shortName} في مشروعك`,
  },
  sector: {
    priorityTag: "قطاع ذو أولوية",
    relevantCapability: "القدرة ذات الصلة",
    ctaHeading: "ناقش مشروعك في هذا القطاع",
  },
  credentials: {
    heading: "الاعتمادات والمستندات الرسمية للشركة",
    lead: "تُحفظ الشهادات والمراسلات مع العملاء والسجلات الرسمية كأدلة مصدرية، مع بيان حالتها خارج المستندات الأصلية.",
    sectionTag: "06 / الاعتمادات",
    corporateInfoEyebrow: "معلومات الشركة",
    legalEntity: "الكيان القانوني",
    office: "المكتب",
    telephone: "الهاتف",
    certificatesEyebrow: "شهادات أنظمة الإدارة",
    certificateRegister: "سجل الشهادات",
    historicalExpiry: (date: string) => `تاريخية · تاريخ الانتهاء المصدري ${date}`,
    officialRecordsEyebrow: "السجلات الرسمية",
    officialRecordsHeading: "التسجيلات والتراخيص القائمة",
    officialRecordsBody:
      "تُحفظ السجلات التالية في الملف التعريفي للشركة كمستندات مصدرية دون تعديل. تُقدَّم أرقام التسجيل كاملة ضمن حزمة التأهيل المسبق.",
    ctaHeading: "تستعدّون لتقديم عطاء أو طلب تأهيل مسبق؟",
    requestPrequalificationPack: "طلب حزمة التأهيل المسبق",
  },
  about: {
    sectionTag: "01 / الشركة",
    whoWeAreEyebrow: "من نحن",
    builtEnvironmentCaption: "البيئة العمرانية / نماذج مختارة من خبرة المشاريع",
    theRecordEyebrow: "السجل",
    documentedProjects: "مشاريع موثَّقة",
    sectorsRepresented: "قطاعات ممثَّلة",
    capabilityFamilies: "مجموعات القدرات",
    recordDisclaimer: (edition: string) =>
      `تشير الأعداد إلى سجل المشاريع المنشور في الملف التعريفي لشركة ZAK (${edition}).`,
    governanceEyebrow: "الحوكمة",
    corporateRecordsHeading: "السجلات المؤسسية",
    corporateRecordsBody:
      "يُحتفظ بالسجل التجاري وتراخيص المكتب الهندسي والاستثمار المهني وعضوية الغرفة التجارية وشهادات أنظمة الإدارة كأدلة موثَّقة.",
    ctaHeading: "أشركوا ZAK في فريق التنفيذ",
  },
  contact: {
    eyebrow: "تواصل معنا",
    heading: "ناقش مشروعك",
    lead: "خطوة مباشرة نحو الاستفسارات المتعلقة بالمشاريع والجوانب الفنية والتأهيل المسبق.",
    projectEnquiriesLabel: "استفسارات المشاريع",
    projectEnquiriesBody: "استشارات هندسية وتنسيق فني واستفسارات التأهيل المسبق.",
  },
  form: {
    name: "الاسم",
    company: "الشركة",
    workEmail: "البريد الإلكتروني للعمل",
    phone: "الهاتف",
    opportunity: "المشروع أو الفرصة",
    projectLocation: "موقع المشروع",
    requiredCapability: "القدرة المطلوبة",
    selectCapability: "اختر القدرة",
    notSureYet: "لم أحدد بعد",
    projectStage: "مرحلة المشروع",
    selectStage: "اختر المرحلة",
    stageOptions: [
      "المفهوم / دراسة الجدوى",
      "تطوير التصميم",
      "المناقصة / الشراء",
      "قيد التنفيذ",
      "أصل قائم / تقييم",
    ],
    message: "الرسالة",
    documentRequests: "طلبات المستندات",
    requestCorporateProfile: "طلب الملف التعريفي للشركة",
    requestPrequalification: "طلب معلومات التأهيل المسبق",
    submit: "إرسال استفسار المشروع",
    sending: "جارٍ الإرسال…",
    validation: {
      requiredFields: "يرجى تعبئة الاسم والشركة والرسالة.",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح للعمل.",
      deliveryFailed: "تعذّر إرسال استفساركم. يرجى المحاولة مرة أخرى، أو الاتصال بمكتب جدة.",
      success: "شكرًا لكم — تم استلام استفساركم وسيتم توجيهه إلى الفريق الهندسي.",
      honeypotSuccess: "شكرًا لكم — تم استلام استفساركم.",
    },
  },
  metadata: {
    homeTitle: (name: string, positioning: string) => `${name} — ${positioning}`,
  },
};
