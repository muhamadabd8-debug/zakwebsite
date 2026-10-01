/**
 * Credentials, Arabic. Mirrors en/credentials.ts field-for-field. ISO codes
 * and the source expiry date are kept as universal identifiers/date format;
 * everything else is a professional Arabic rendering of the same facts.
 */
import type { CertificateStatus } from "../en/credentials";

export const managementSystemCertificates = [
  {
    code: "ISO 9001:2015",
    name: "أنظمة إدارة الجودة",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
  {
    code: "ISO 14001:2015",
    name: "أنظمة الإدارة البيئية",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
  {
    code: "ISO 45001:2018",
    name: "أنظمة إدارة الصحة والسلامة المهنية",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
];

export const certificateNote =
  "تُحفظ الشهادات في الملف التعريفي للشركة كمستندات مصدرية. تحمل السجلات تاريخ انتهاء مصدريًا بتاريخ 02/07/2022، وتُعرض هنا كسجل تاريخي لا كإفادة اعتماد سارية.";

export const officialRecords = [
  { index: "01", name: "التحقق من السجل التجاري" },
  { index: "02", name: "السجل التجاري" },
  { index: "03", name: "رخصة النشاط التجاري" },
  { index: "04", name: "رخصة المكتب الهندسي" },
  { index: "05", name: "رخصة الاستثمار المهني" },
  { index: "06", name: "عضوية الغرفة التجارية" },
  { index: "07", name: "تسجيل الزكاة" },
  { index: "08", name: "معلومات المنشأة الموحدة" },
];

export const clientEvidence = {
  title: "أدلة العملاء",
  body: "يحتفظ الملف التعريفي بمراسلات العملاء وثلاثة تقارير رضا عملاء كمستندات مصدرية دون تعديل. وهي متاحة عند الطلب ضمن حزمة التأهيل المسبق.",
};
