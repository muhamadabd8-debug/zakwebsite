import type { Sector } from "../types";

/**
 * Sectors, Arabic. Mirrors en/sectors.ts field-for-field and slug-for-slug.
 */
export const sectors: Sector[] = [
  {
    slug: "high-rise",
    name: "الأبراج العالية",
    description:
      "تنفيذ إنشائي للأبراج العالية وفائقة الارتفاع، حيث يحكم تفصيل التسليح والتنسيق وحجم المخططات برنامج التنفيذ.",
    projectSlugs: [
      "jeddah-tower",
      "alrassam-twin-towers",
      "twin-towers-bayat-plaza",
      "al-shallal-towers",
    ],
  },
  {
    slug: "aviation",
    name: "الطيران",
    description:
      "مكتب فني ميداني، وتوثيق إنشائي، ورصد واقعي ضمن بيئة تطوير مطار قائم.",
    projectSlugs: [
      "king-abdulaziz-international-airport",
      "king-abdulaziz-international-airport-surveying",
    ],
  },
  {
    slug: "institutional",
    name: "المؤسسي والاستخدام المختلط",
    description:
      "إعداد مخططات تنفيذ إنشائية لمشاريع مؤسسية كبرى تجمع مرافق مدنية وتجارية وضيافية وطبية.",
    projectSlugs: ["king-saud-university-endowment"],
  },
  {
    slug: "infrastructure",
    name: "البنية التحتية والمرافق",
    description:
      "مكاتب فنية، ودعم تصميم إنشائي ومعماري، وسجلات تنفيذ فعلي لمشاريع البنية التحتية المائية والتطويرات العامة الكبرى.",
    projectSlugs: [
      "north-jeddah-wastewater-pumping-station",
      "al-faysaliyah-mixing-chamber",
      "national-guard-housing-bahra",
    ],
  },
  {
    slug: "industrial",
    name: "الصناعي",
    description:
      "تصميم خرسانة مسلحة وصلب منسّق مع متطلبات العمليات الصناعية والمعمارية والميكانيكية لمرافق المصانع والتخزين.",
    projectSlugs: ["almarai-cpp3", "sharbatly-cold-store"],
  },
  {
    slug: "healthcare",
    name: "الرعاية الصحية",
    description:
      "مراجعة مستقلة متعددة التخصصات لتصميم المرافق الطبية عبر الحزم المعمارية والإنشائية والكهربائية والميكانيكية.",
    projectSlugs: ["fakeeh-madina-hospital"],
  },
  {
    slug: "commercial",
    name: "التجاري",
    description:
      "هندسة قيمة، وتصميم إنشائي، وإشراف في مرحلة التنفيذ عبر مشاريع المكاتب والتجزئة والمباني الإدارية.",
    projectSlugs: [
      "hafez-building",
      "galleria-plaza",
      "jameel-square-tahlia",
      "al-rawda-building",
      "al-rofan-plaza",
      "awtad-trading-center",
      "mall-of-saudi-office-building",
    ],
  },
  {
    slug: "residential",
    name: "السكني",
    description:
      "تصميم ومخططات تنفيذ وعمارة وتصميم داخلي عبر المجمعات السكنية والعمائر السكنية والمساكن الخاصة.",
    projectSlugs: [
      "bayt-jameel-apartments",
      "al-morjan-residence",
      "al-shatee-private-villa",
      "al-basateen-private-villas",
      "al-basateen-bin-dawood-compound",
      "coral-palace",
    ],
  },
  {
    slug: "hospitality",
    name: "الضيافة",
    description:
      "تنفيذ إنشائي، ومراجعة تصميم، وإشراف عبر مشاريع الفنادق والضيافة المختلطة.",
    projectSlugs: [
      "the-hotel-galleria",
      "assila-twin-towers",
      "down-town-hotel",
      "al-twairki-10",
    ],
  },
  {
    slug: "assessment",
    name: "التقييم والتقوية",
    description:
      "فحص واختبار وتحليل للمنشآت القائمة، يسترشد به أعمال التقوية والإصلاح تحت الإشراف.",
    projectSlugs: [
      "al-sulaymaniyah-plaza",
      "al-rabeaa-tower",
      "private-villa-khalidiya",
    ],
  },
  {
    slug: "surveying",
    name: "المساحة والرصد الواقعي",
    description:
      "المسح الطبوغرافي ومسح الأراضي، والمسح الضوئي ثلاثي الأبعاد، ومعلومات كنتور منسّقة بأبعاد ثنائية وثلاثية.",
    projectSlugs: ["sawaco-project"],
  },
];

/** The six the profile itself frames as priority sectors (p.10). */
export const prioritySectorSlugs = [
  "high-rise",
  "aviation",
  "institutional",
  "infrastructure",
  "industrial",
  "healthcare",
];
