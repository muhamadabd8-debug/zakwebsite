/**
 * Credentials. SOURCE: profile pp.56-65.
 *
 * ACCURACY NOTE — the most important correction in this rebuild.
 * The profile records all three management-system certificates as
 * "HISTORICAL / EXPIRED — SOURCE EXPIRY 02/07/2022". They are therefore
 * presented as a historical register with the expiry stated, and are NOT used
 * as a current trust badge anywhere on the site (no footer badge, no homepage
 * proof point). Renewal status must be confirmed by ZAK before any
 * current-certification claim is published.
 */

export type CertificateStatus = "historical" | "current";

export const managementSystemCertificates = [
  {
    code: "ISO 9001:2015",
    name: "Quality management systems",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
  {
    code: "ISO 14001:2015",
    name: "Environmental management systems",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
  {
    code: "ISO 45001:2018",
    name: "Occupational health and safety management systems",
    status: "historical" as CertificateStatus,
    sourceExpiry: "02/07/2022",
  },
];

export const certificateNote =
  "Certificates are retained in the corporate profile as source documents. The records carry a source expiry of 02/07/2022 and are shown here as a historical register rather than a current certification claim.";

/**
 * Official records held, per profile pp.62-65. The profile reproduces the
 * documents themselves; the registration numbers within them are Arabic-language
 * scans and are not transcribed here. Numbers require confirmation from ZAK
 * before publication — see the implementation report.
 */
export const officialRecords = [
  { index: "01", name: "Commercial registration verification" },
  { index: "02", name: "Commercial registration" },
  { index: "03", name: "Commercial activity licence" },
  { index: "04", name: "Engineering office licence" },
  { index: "05", name: "Professional investment licence" },
  { index: "06", name: "Chamber membership" },
  { index: "07", name: "Zakat registration" },
  { index: "08", name: "Unified establishment information" },
];

export const clientEvidence = {
  title: "Client evidence",
  body: "The profile retains client correspondence and three client satisfaction reports as unaltered source documents. These are available on request as part of a prequalification pack.",
};
