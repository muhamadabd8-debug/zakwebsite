import type { DeliveryStage } from "../types";

/**
 * Corporate facts, Arabic. Mirrors en/site.ts field-for-field. ZAK's
 * registered names (site.name, site.legalName) are kept untranslated per the
 * localisation brief; every other field is a professional Arabic rendering
 * of the same, verified source facts — nothing added, nothing invented.
 */
export const site = {
  name: "ZAK Engineering Consultants",
  legalName: "Z.A.K Engineering Consultants",
  positioning: "شريك متكامل في تنفيذ الأعمال الهندسية للمشاريع المعقدة",
  descriptor:
    "بيت خبرة هندسي متعدد التخصصات، يدعم التصميم والتنسيق والتنفيذ عبر برامج البيئة العمرانية المعقدة.",
  market: "المملكة العربية السعودية",
  profileEdition: "2026 / V3.1",
};

/** Profile p.67 — the only contact details published in the source. */
export const contact = {
  city: "جدة",
  addressLines: ["مركز أضهم - 23215", "ص.ب 50570 - 21533", "المملكة العربية السعودية"],
  telephone: "+966 12 6517477",
  telephoneHref: "+966126517477",
  /** No email address appears in the profile — see implementation report. */
  email: null as string | null,
};

export const hero = {
  eyebrow: "هندسة متكاملة",
  headline: "شريكك المتكامل في تنفيذ الأعمال الهندسية",
  headlineAccent: "للمشاريع المعقدة",
  supporting:
    "بيت خبرة هندسي متعدد التخصصات، يدعم التصميم والتنسيق والتنفيذ عبر برامج البيئة العمرانية المعقدة.",
  primaryCta: "ناقش مشروعك",
  secondaryCta: "استكشف مشاريعنا",
  locationLabel: "المملكة العربية السعودية",
  networkLabel: "شبكة هندسية دولية",
};

/** Profile p.4 — "INTEGRATED DELIVERY" positioning pillars. */
export const positioning = {
  sectionTag: "01 / التموضع",
  title: "تنفيذ متكامل",
  lead: "استجابة هندسية واحدة تجمع التخصصات والمعلومات وواجهات التنفيذ.",
  statement:
    "تربط ZAK بين مقصد التصميم والمعلومات اللازمة لتنسيق المشاريع المعقدة وتنفيذها ومراجعتها والتحقق منها.",
  pillars: [
    {
      index: "01",
      title: "عمق تقني",
      body: "معلومات هندسية إنشائية ومتعددة التخصصات تُطوَّر وفق متطلبات المشروع المعتمدة.",
    },
    {
      index: "02",
      title: "استمرارية التنفيذ",
      body: "دعم يمتد من التصميم والمراجعة إلى مخططات التنفيذ والاستجابة الميدانية ومعلومات التنفيذ الفعلي عند التكليف بها.",
    },
    {
      index: "03",
      title: "قابلية التنفيذ",
      body: "تنسيق يركّز على الواجهات العملية والحلول القابلة للتنفيذ ومخرجات تقنية منضبطة.",
    },
    {
      index: "04",
      title: "الأدلة الموثَّقة",
      body: "أدوار المشروع والمستندات الداعمة تُعرض وفق السجل المصدري الموثَّق المتاح.",
    },
  ],
};

/** Profile p.5 — engineering network presented as capability, not office count. */
export const network = {
  sectionTag: "01 / الشبكة الهندسية",
  title: "خبرة مترابطة",
  lead: "شبكة هندسية متعددة التخصصات تدعم تنفيذ المشاريع.",
  nodes: [
    {
      index: "01",
      title: "المملكة العربية السعودية",
      body: "مركز التنفيذ الرئيسي وواجهة التواصل مع العملاء.",
    },
    {
      index: "02",
      title: "التعاون الهندسي",
      body: "قدرات في الإنشاءات والعمارة والبنية التحتية وخدمات المباني.",
    },
    {
      index: "03",
      title: "دعم متخصص",
      body: "المساحة، والرصد الواقعي، ومخططات التنفيذ، وتنسيق نمذجة معلومات البناء (BIM).",
    },
    {
      index: "04",
      title: "استجابة المشروع",
      body: "المراجعة الفنية، وهندسة القيمة، والدعم الإنشائي.",
    },
  ],
  closing: "تُنسَّق التخصصات والمدخلات المتخصصة وفق متطلبات كل تكليف معتمد.",
};

/** Profile p.9 — delivery model. */
export const deliveryModel: DeliveryStage[] = [
  {
    index: "01",
    name: "التصميم",
    description:
      "خدمات التصميم الإنشائي والمعماري والمدني والبنية التحتية والكهروميكانيكي.",
  },
  {
    index: "02",
    name: "التنسيق",
    description:
      "مخططات التنفيذ، والواجهات متعددة التخصصات، ونماذج BIM، والمستندات الجاهزة للتنفيذ.",
  },
  {
    index: "03",
    name: "التحسين",
    description: "هندسة قيمة تركّز على الوظيفة والموثوقية وقابلية التنفيذ وضبط التكلفة.",
  },
  {
    index: "04",
    name: "الدعم",
    description: "فرق فنية، وإدارة إنشاءات، وإشراف، وتنسيق ميداني سريع الاستجابة.",
  },
  {
    index: "05",
    name: "التحقق",
    description:
      "مراجعة التصميم، وضبط الجودة، وسجلات التنفيذ الفعلي، ومعلومات تسليم المشروع عند شمولها في النطاق المعتمد.",
  },
];

/** Profile p.3 — about copy. */
export const about = {
  title: "شريك متكامل في تنفيذ الأعمال الهندسية للمشاريع المعقدة.",
  body: [
    "ZAK بيت خبرة هندسي سعودي يقدّم خدمات الهندسة الإنشائية، ومخططات التنفيذ، وهندسة القيمة، وإدارة الإنشاءات، والتصميم المعماري والمدني والبنية التحتية والكهروميكانيكي.",
    "يواكب عمل الشركة العملاء من مرحلة تطوير التصميم وحتى التنفيذ الفني المنسَّق والدعم الإنشائي.",
  ],
  disciplines: {
    title: "تخصصات متكاملة",
    body: "قدرات في الإنشاءات والعمارة والبنية التحتية والمساحة والأنظمة الكهروميكانيكية ونمذجة BIM، تتكامل حول تنفيذ المشروع.",
  },
  deliveryFocus: {
    title: "التركيز على التنفيذ",
    body: "إسهام فني موثَّق، ومعلومات منسَّقة، ومخرجات جاهزة للتنفيذ.",
  },
  principle:
    "تُبنى القرارات الهندسية استجابةً لوظيفة المشروع وجدوله الزمني وقابليته للتنفيذ ومتطلبات كل تكليف.",
};

/** Profile p.52 — coordinated systems. */
export const coordinatedSystems = {
  title: "أنظمة منسَّقة",
  lead: "من أدلة المشاريع الفردية إلى قدرة متعددة التخصصات قابلة للتكرار.",
  items: [
    {
      index: "01",
      title: "العمارة",
      body: "معلومات معمارية تفصيلية ومدخلات نماذج منسَّقة.",
    },
    {
      index: "02",
      title: "الإنشاءات",
      body: "معلومات التصميم الإنشائي ومخططات التنفيذ منسَّقة مع بقية التخصصات.",
    },
    {
      index: "03",
      title: "الكهرباء وتقنية المعلومات",
      body: "معلومات تصميم الأنظمة الكهربائية وتقنية المعلومات ضمن النطاقات المعتمدة متعددة التخصصات.",
    },
    {
      index: "04",
      title: "الميكانيكا",
      body: "معلومات التصميم الميكانيكي والواجهات الفنية المنسَّقة.",
    },
    {
      index: "05",
      title: "نمذجة BIM",
      body: "نماذج منسَّقة وواجهات موثَّقة عبر تخصصات المشروع.",
    },
    {
      index: "06",
      title: "الاستجابة الميدانية",
      body: "دعم المكتب الفني، والمراجعات، ومعلومات التنفيذ الفعلي عند التكليف بها.",
    },
  ],
  rule: "ترتبط بيانات القدرات دائمًا بنطاقات المشاريع المعتمدة والمخرجات الفنية الموثَّقة.",
};

/** Profile p.54 — surveying and reality-capture equipment. */
export const surveyInstruments = [
  {
    index: "01",
    category: "أنظمة تحديد المواقع (GNSS / GPS)",
    items: "Trimble GPS R8; Trimble GPS R6; Leica GPS Viva; Leica GPS CS09",
  },
  {
    index: "02",
    category: "المحطات المتكاملة",
    items: "Leica Viva TS16A; Leica Total Station Viva 11; Leica TS09; Leica TS06 Plus",
  },
  {
    index: "03",
    category: "المسح الضوئي",
    items: "Trimble Scanner SX10; Leica Level 720",
  },
  {
    index: "04",
    category: "الرصد الجوي",
    items: "Microdrone MD4; DJI Inspire 2; DJI Phantom 4 Pro V2.2; DJI Mavic Air",
  },
];

export const finalCta = {
  title: "شركة واحدة. ملف تعريفي واحد. استجابة هندسية واحدة.",
  body: "هندسة إنشائية، وتنسيق متعدد التخصصات، ومراجعة فنية، ودعم في مرحلة التنفيذ، تتكامل حول متطلبات المشروع الموثَّقة.",
  primaryCta: "ناقش مشروعك",
  secondaryCta: "عرض القدرات",
};
