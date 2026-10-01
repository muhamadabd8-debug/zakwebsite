import type { Capability } from "../types";

/**
 * Six capability families exactly as structured in the new corporate profile
 * (p.6 services grid, p.7 core capabilities, p.8 specialist capabilities).
 * Scope boundaries use the profile's own qualifying language
 * ("where commissioned", "within confirmed multidisciplinary scopes").
 */
export const capabilities: Capability[] = [
  {
    slug: "structural-design-shop-drawings",
    index: "01",
    name: "Structural design & shop drawings",
    shortName: "Structural & shop drawings",
    proposition:
      "Detailed reinforced-concrete and steel design, coordinated documentation and construction-ready information.",
    clientProblem:
      "Design intent has to become information a contractor can build from — reinforcement resolved, interfaces coordinated, quantities scheduled — at the volume and pace the programme demands.",
    provides: [
      "Reinforced-concrete and steel design",
      "Structural calculations and design models",
      "Structural shop drawings",
      "Bar-bending schedules and quantities",
      "As-built records where commissioned",
      "Coordinated structural information",
    ],
    scopeBoundary: {
      starts:
        "At a confirmed structural package — design, detailing or shop-drawing production for the scope named in the commission.",
      ends: "At the boundary of that commission. Where another firm holds design authority for the wider development, ZAK's record states it on the project page.",
    },
    deliverables: [
      "Structural design and calculation reports",
      "Structural shop-drawing packages",
      "Bar-bending schedules",
      "Quantity documentation",
      "As-built drawings where included",
    ],
    projectSlugs: [
      "jeddah-tower",
      "king-abdulaziz-international-airport",
      "king-saud-university-endowment",
      "north-jeddah-wastewater-pumping-station",
      "almarai-cpp3",
    ],
  },
  {
    slug: "value-engineering",
    index: "02",
    name: "Value engineering",
    shortName: "Value engineering",
    proposition:
      "Performance-led optimisation with disciplined attention to function, reliability, buildability and cost.",
    clientProblem:
      "A design may be sound but not efficient — or an existing structure may need independent assessment before anyone commits to strengthening, redesign or additional spend.",
    provides: [
      "Design review and validation",
      "Performance and constructability review",
      "Independent multidisciplinary peer review",
      "Structural assessment of existing buildings",
      "Concrete coring, chemical and non-destructive testing",
      "Strengthening and repair solutions",
    ],
    scopeBoundary: {
      starts:
        "At review of design decisions or physical assessment of an existing structure, within an agreed brief.",
      ends: "At findings, recommendations and supporting documentation. Review informs the design team's decisions; it does not transfer design authorship to ZAK.",
    },
    deliverables: [
      "Design review and validation reports",
      "Peer-review findings across disciplines",
      "Testing and assessment records",
      "Strengthening design and supervision",
    ],
    projectSlugs: [
      "fakeeh-madina-hospital",
      "hafez-building",
      "alrassam-twin-towers",
      "al-sulaymaniyah-plaza",
      "assila-twin-towers",
      "al-rabeaa-tower",
    ],
  },
  {
    slug: "construction-management-supervision",
    index: "03",
    name: "Construction management & supervision",
    shortName: "Construction management",
    proposition:
      "Technical support, supervision, quality control and responsive coordination through project delivery.",
    clientProblem:
      "Once construction starts, technical questions arrive faster than a design team can answer them, and quality has to be verified against the documentation as work proceeds.",
    provides: [
      "Site and embedded technical offices",
      "Full construction supervision",
      "Quality control across construction phases",
      "Construction technical support",
      "Design review during construction",
      "Responsive site coordination",
    ],
    scopeBoundary: {
      starts:
        "At mobilisation of technical-office or supervision resource against a confirmed construction-stage brief.",
      ends: "At supervision, quality control and technical response. ZAK is not the main contractor and does not carry construction delivery responsibility.",
    },
    deliverables: [
      "Technical-office response and revisions",
      "Supervision and quality-control records",
      "Construction-stage design reviews",
      "As-built information where commissioned",
    ],
    projectSlugs: [
      "al-rofan-plaza",
      "al-twairki-10",
      "coral-palace",
      "awtad-trading-center",
      "down-town-hotel",
      "bayt-jameel-apartments",
    ],
  },
  {
    slug: "architecture-interior-design",
    index: "04",
    name: "Architecture & interior design",
    shortName: "Architecture & interiors",
    proposition:
      "Architectural and interior solutions developed from concept, through visualisation, to detailed delivery.",
    clientProblem:
      "Architectural intent has to survive the journey from concept to executed detail — with interiors, furniture and finishes resolved to the same standard as the shell.",
    provides: [
      "Architectural design and detailed drawings",
      "Interior design",
      "Executive and furniture drawings",
      "3D perspectives and visualisation",
      "Coordinated architectural model inputs",
    ],
    scopeBoundary: {
      starts: "At an architectural or interior commission with a defined brief and deliverable set.",
      ends: "At the drawings, interiors and visualisation produced for that commission.",
    },
    deliverables: [
      "Detailed architectural drawings",
      "Interior design packages",
      "Executive and furniture drawings",
      "Rendered perspectives",
    ],
    projectSlugs: [
      "al-morjan-residence",
      "al-shatee-private-villa",
      "al-basateen-private-villas",
      "al-basateen-bin-dawood-compound",
    ],
  },
  {
    slug: "civil-infrastructure-surveying",
    index: "05",
    name: "Civil, infrastructure & surveying",
    shortName: "Civil, infrastructure & surveying",
    proposition:
      "Infrastructure design and professional survey services using contemporary field methods and technologies.",
    clientProblem:
      "Infrastructure and existing-condition work depends on accurate spatial information — and drawings that no longer match the ground cost time on site.",
    provides: [
      "Infrastructure and utilities design",
      "Detailed shop drawings for utility networks",
      "Topographic and land survey",
      "Contour generation in 2D and 3D",
      "3D scanning and reality capture",
      "Aerial capture and coordinated spatial records",
    ],
    scopeBoundary: {
      starts: "At a survey brief or an infrastructure design and documentation package.",
      ends: "At the survey record, contour information or infrastructure documentation delivered under that brief.",
    },
    deliverables: [
      "Topographic survey data and contour models",
      "3D scan and point-cloud records",
      "Infrastructure and utility shop drawings",
      "Coordinated site information",
    ],
    projectSlugs: [
      "king-abdulaziz-international-airport-surveying",
      "sawaco-project",
      "national-guard-housing-bahra",
      "al-faysaliyah-mixing-chamber",
      "north-jeddah-wastewater-pumping-station",
    ],
  },
  {
    slug: "mep-bim-coordination",
    index: "06",
    name: "MEP & BIM coordination",
    shortName: "MEP & BIM",
    proposition:
      "Electromechanical design, coordinated models and multidisciplinary technical documentation.",
    clientProblem:
      "Architectural, structural, electrical, ICT and mechanical packages each generate their own information, and those sets have to agree with one another before they reach site.",
    provides: [
      "Electromechanical design information",
      "Multidisciplinary model coordination",
      "Coordinated architectural, structural, electrical, ICT and mechanical drawings",
      "BIM models and documented interfaces",
      "Technical interfaces aligned to confirmed project scope",
    ],
    scopeBoundary: {
      starts:
        "At a confirmed multidisciplinary scope — the disciplines and packages named in the commission.",
      ends: "At coordinated information within those confirmed disciplines. Packages outside the commission remain with the parties who hold them.",
    },
    deliverables: [
      "Coordinated discipline models",
      "Multidisciplinary drawing sets",
      "Documented model interfaces",
      "Technical-office revisions and site response",
    ],
    projectSlugs: [
      "mall-of-saudi-office-building",
      "al-basateen-bin-dawood-compound",
      "fakeeh-madina-hospital",
      "al-shallal-towers",
    ],
  },
];
