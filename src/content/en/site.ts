import type { DeliveryStage } from "../types";

/**
 * Corporate facts. SOURCE: ZAK-Corporate-Profile-67P-Z3.2-DESIGN-LOCK.pdf.
 *
 * Deliberately absent because the new profile does not state them:
 * headcount, number of offices/design centres, aggregate portfolio value,
 * founding year, named leadership, current ISO status (see credentials.ts).
 */
export const site = {
  name: "ZAK Engineering Consultants",
  legalName: "Z.A.K Engineering Consultants",
  positioning: "Integrated engineering delivery partner for complex projects",
  descriptor:
    "Multidisciplinary engineering consultancy supporting design, coordination and delivery across complex built-environment programmes.",
  market: "Saudi Arabia",
  profileEdition: "2026 / V3.1",
};

/** Profile p.67 — the only contact details published in the source. */
export const contact = {
  city: "Jeddah",
  addressLines: [
    "Adham Center - 23215",
    "P.O. Box 50570 - 21533",
    "Kingdom of Saudi Arabia",
  ],
  telephone: "+966 12 6517477",
  telephoneHref: "+966126517477",
  /** No email address appears in the profile — see implementation report. */
  email: null as string | null,
};

export const hero = {
  eyebrow: "Integrated engineering",
  headline: "Integrated engineering delivery partner",
  headlineAccent: "for complex projects",
  supporting:
    "Multidisciplinary engineering consultancy supporting design, coordination and delivery across complex built-environment programmes.",
  primaryCta: "Discuss a Project",
  secondaryCta: "Explore Our Projects",
  locationLabel: "Saudi Arabia",
  networkLabel: "International engineering network",
};

/** Profile p.4 — "INTEGRATED DELIVERY" positioning pillars. */
export const positioning = {
  sectionTag: "01 / Positioning",
  title: "Integrated delivery",
  lead: "A single engineering response across disciplines, information and construction interfaces.",
  statement:
    "ZAK connects design intent with the information required to coordinate, construct, review and verify complex projects.",
  pillars: [
    {
      index: "01",
      title: "Technical depth",
      body: "Structural and multidisciplinary engineering information developed around confirmed project requirements.",
    },
    {
      index: "02",
      title: "Delivery continuity",
      body: "Support extending from design and review to shop drawings, site response and as-built information where commissioned.",
    },
    {
      index: "03",
      title: "Constructability",
      body: "Coordination focused on practical interfaces, buildable solutions and disciplined technical output.",
    },
    {
      index: "04",
      title: "Evidence",
      body: "Project roles and supporting documents presented according to the available verified source record.",
    },
  ],
};

/** Profile p.5 — engineering network presented as capability, not office count. */
export const network = {
  sectionTag: "01 / Engineering network",
  title: "Connected expertise",
  lead: "A multidisciplinary engineering network supporting project delivery.",
  nodes: [
    {
      index: "01",
      title: "Saudi Arabia",
      body: "Primary project delivery and client interface.",
    },
    {
      index: "02",
      title: "Engineering collaboration",
      body: "Structural, architectural, infrastructure and building-services capability.",
    },
    {
      index: "03",
      title: "Specialist support",
      body: "Surveying, reality capture, shop drawings and BIM coordination.",
    },
    {
      index: "04",
      title: "Project response",
      body: "Technical review, value engineering and construction support.",
    },
  ],
  closing:
    "Disciplines and specialist inputs are coordinated around the requirements of each confirmed commission.",
};

/** Profile p.9 — delivery model. */
export const deliveryModel: DeliveryStage[] = [
  {
    index: "01",
    name: "Design",
    description:
      "Structural, architectural, civil, infrastructure and electromechanical design services.",
  },
  {
    index: "02",
    name: "Coordinate",
    description:
      "Shop drawings, multidisciplinary interfaces, BIM models and construction-ready documentation.",
  },
  {
    index: "03",
    name: "Optimise",
    description:
      "Value engineering focused on function, reliability, buildability and cost control.",
  },
  {
    index: "04",
    name: "Support",
    description:
      "Technical teams, construction management, supervision and responsive site coordination.",
  },
  {
    index: "05",
    name: "Verify",
    description:
      "Design review, quality control, as-built records and project handover information where included in the confirmed scope.",
  },
];

/** Profile p.3 — about copy. */
export const about = {
  title: "Integrated engineering delivery partner for complex projects.",
  body: [
    "ZAK is a Saudi engineering consultancy providing structural engineering, shop drawings, value engineering, construction management, architectural, civil, infrastructure and electromechanical design services.",
    "Its work supports clients from design development through coordinated technical delivery and construction support.",
  ],
  disciplines: {
    title: "Integrated disciplines",
    body: "Structural, architectural, infrastructure, surveying, MEP and BIM capability aligned around project delivery.",
  },
  deliveryFocus: {
    title: "Delivery focus",
    body: "Verified technical contribution, coordinated information and construction-ready outputs.",
  },
  principle:
    "Engineering decisions are developed in response to project function, programme, constructability and the requirements of each commission.",
};

/** Profile p.52 — coordinated systems. */
export const coordinatedSystems = {
  title: "Coordinated systems",
  lead: "From individual project evidence to repeatable multidisciplinary capability.",
  items: [
    { index: "01", title: "Architecture", body: "Detailed architectural information and coordinated model inputs." },
    { index: "02", title: "Structure", body: "Structural design and shop-drawing information coordinated with other disciplines." },
    { index: "03", title: "Electrical + ICT", body: "Electrical and ICT design information within confirmed multidisciplinary scopes." },
    { index: "04", title: "Mechanical", body: "Mechanical design information and coordinated technical interfaces." },
    { index: "05", title: "BIM", body: "Coordinated models and documented interfaces across project disciplines." },
    { index: "06", title: "Site response", body: "Technical-office support, revisions and as-built information where commissioned." },
  ],
  rule: "Capability statements remain tied to confirmed project scopes and documented technical outputs.",
};

/** Profile p.54 — surveying and reality-capture equipment. */
export const surveyInstruments = [
  { index: "01", category: "GNSS / GPS", items: "Trimble GPS R8; Trimble GPS R6; Leica GPS Viva; Leica GPS CS09" },
  { index: "02", category: "Total stations", items: "Leica Viva TS16A; Leica Total Station Viva 11; Leica TS09; Leica TS06 Plus" },
  { index: "03", category: "Scanning", items: "Trimble Scanner SX10; Leica Level 720" },
  { index: "04", category: "Aerial capture", items: "Microdrone MD4; DJI Inspire 2; DJI Phantom 4 Pro V2.2; DJI Mavic Air" },
];

export const finalCta = {
  title: "One company. One profile. One engineering response.",
  body: "Structural engineering, multidisciplinary coordination, technical review and construction-stage support aligned around verified project requirements.",
  primaryCta: "Discuss a Project",
  secondaryCta: "View Capabilities",
};
