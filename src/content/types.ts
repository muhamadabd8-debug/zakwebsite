/**
 * Content model for ZAK Engineering Consultants.
 *
 * SOURCE OF TRUTH: docs/zak-source/ZAK-Corporate-Profile-67P-Z3.2-DESIGN-LOCK.pdf
 * Every factual field below traces to that profile. Nothing is inferred or invented.
 * Imagery is drawn from the same profile (which itself sources the earlier
 * "Company Profile - ZAK FINAL01" record).
 */

export type ProjectTier = "flagship" | "selected" | "extended";

export type DataPoint = {
  value: string;
  label: string;
};

export type ProjectParties = {
  owner?: string;
  contractor?: string;
  consultant?: string;
  designer?: string;
  costManagement?: string;
  leedConsultant?: string;
};

export type ProjectImage = {
  /** Path under /public. Omit when no rights-cleared image exists in the source. */
  src: string;
  /** Descriptive alt text — describes the subject, not the filename. */
  alt: string;
  /** Caption shown under the image, mirroring the profile's own caption discipline. */
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  location: string;
  /** Sector label as classified in the profile's Experience Index. */
  sector: string;
  sectorSlug: string;
  tier: ProjectTier;
  /** Profile page number the record came from — kept for traceability. */
  sourcePage: number;
  overview: string;
  /** "ZAK SCOPE / VERIFIED ROLE" — scope discipline carried over from the profile. */
  verifiedRole: string;
  data: DataPoint[];
  parties: ProjectParties;
  image?: ProjectImage;
  /** Capability slugs this project evidences. */
  capabilities: string[];
  /** Optional companion assignment on the same development (e.g. KAIA A/B). */
  relatedAssignment?: {
    slug: string;
    label: string;
  };
};

export type Capability = {
  slug: string;
  /** Number as presented in the profile's services grid. */
  index: string;
  name: string;
  shortName: string;
  proposition: string;
  clientProblem: string;
  provides: string[];
  scopeBoundary: {
    starts: string;
    ends: string;
  };
  deliverables: string[];
  projectSlugs: string[];
};

export type Sector = {
  slug: string;
  name: string;
  description: string;
  projectSlugs: string[];
};

export type DeliveryStage = {
  index: string;
  name: string;
  description: string;
};
