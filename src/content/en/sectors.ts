import type { Sector } from "../types";

/**
 * Sectors derived from the profile's Experience Index classifications (p.55).
 * The first six are the priority sectors the profile uses to frame its
 * flagship section (p.10). Every sector below is backed by at least one
 * project record — none are promoted without evidence.
 */
export const sectors: Sector[] = [
  {
    slug: "high-rise",
    name: "High-rise",
    description:
      "Structural delivery on tall and supertall buildings, where reinforcement detail, coordination and drawing volume govern the construction programme.",
    projectSlugs: [
      "jeddah-tower",
      "alrassam-twin-towers",
      "twin-towers-bayat-plaza",
      "al-shallal-towers",
    ],
  },
  {
    slug: "aviation",
    name: "Aviation",
    description:
      "On-site technical office, structural documentation and reality capture within a live airport development environment.",
    projectSlugs: [
      "king-abdulaziz-international-airport",
      "king-abdulaziz-international-airport-surveying",
    ],
  },
  {
    slug: "institutional",
    name: "Institutional & mixed-use",
    description:
      "Structural shop-drawing production across large institutional developments combining civic, retail, hospitality and medical facilities.",
    projectSlugs: ["king-saud-university-endowment"],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure & utilities",
    description:
      "Technical offices, structural and architectural design support and as-built records for water infrastructure and major public developments.",
    projectSlugs: [
      "north-jeddah-wastewater-pumping-station",
      "al-faysaliyah-mixing-chamber",
      "national-guard-housing-bahra",
    ],
  },
  {
    slug: "industrial",
    name: "Industrial",
    description:
      "Reinforced-concrete and steel design coordinated with process, architectural and mechanical requirements for plant and storage facilities.",
    projectSlugs: ["almarai-cpp3", "sharbatly-cold-store"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Independent multidisciplinary review of clinical facility design across architecture, structure, electrical and mechanical packages.",
    projectSlugs: ["fakeeh-madina-hospital"],
  },
  {
    slug: "commercial",
    name: "Commercial",
    description:
      "Value engineering, structural design and construction-stage supervision across offices, retail and administrative developments.",
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
    name: "Residential",
    description:
      "Design, shop drawings, architecture and interiors across compounds, apartment blocks and private residences.",
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
    name: "Hospitality",
    description:
      "Structural delivery, design review and supervision across hotel and mixed hospitality developments.",
    projectSlugs: [
      "the-hotel-galleria",
      "assila-twin-towers",
      "down-town-hotel",
      "al-twairki-10",
    ],
  },
  {
    slug: "assessment",
    name: "Assessment & strengthening",
    description:
      "Investigation, testing and analysis of existing structures, informing supervised strengthening and repair.",
    projectSlugs: [
      "al-sulaymaniyah-plaza",
      "al-rabeaa-tower",
      "private-villa-khalidiya",
    ],
  },
  {
    slug: "surveying",
    name: "Surveying & reality capture",
    description:
      "Topographic and land survey, 3D scanning and coordinated contour information in 2D and 3D.",
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
