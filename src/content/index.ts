import type { Locale } from "@/i18n/config";
import type { Capability, Project, Sector } from "./types";

import * as siteEn from "./en/site";
import * as siteAr from "./ar/site";
import { projects as projectsEn } from "./en/projects";
import { projects as projectsAr } from "./ar/projects";
import { capabilities as capabilitiesEn } from "./en/capabilities";
import { capabilities as capabilitiesAr } from "./ar/capabilities";
import { sectors as sectorsEn, prioritySectorSlugs } from "./en/sectors";
import { sectors as sectorsAr } from "./ar/sectors";
import * as credentialsEn from "./en/credentials";
import * as credentialsAr from "./ar/credentials";

export type { Locale };
export type { Project, Capability, Sector } from "./types";

/* --------------------------------------------------------------- site.ts */

const siteContent = { en: siteEn, ar: siteAr } as const;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}

/* ----------------------------------------------------------- projects.ts */

const projectsByLocale: Record<Locale, Project[]> = { en: projectsEn, ar: projectsAr };

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return projectsByLocale[locale].find((p) => p.slug === slug);
}

export function getFlagshipProjects(locale: Locale): Project[] {
  return projectsByLocale[locale].filter((p) => p.tier === "flagship");
}

export function getSelectedProjects(locale: Locale): Project[] {
  return projectsByLocale[locale].filter((p) => p.tier === "selected");
}

export function getExtendedProjects(locale: Locale): Project[] {
  return projectsByLocale[locale].filter((p) => p.tier === "extended");
}

export function getProjectsForCapability(locale: Locale, capabilitySlug: string): Project[] {
  return projectsByLocale[locale].filter((p) => p.capabilities.includes(capabilitySlug));
}

export function getProjectsForSector(locale: Locale, sectorSlug: string): Project[] {
  return projectsByLocale[locale].filter((p) => p.sectorSlug === sectorSlug);
}

/* -------------------------------------------------------- capabilities.ts */

const capabilitiesByLocale: Record<Locale, Capability[]> = {
  en: capabilitiesEn,
  ar: capabilitiesAr,
};

export function getCapabilities(locale: Locale): Capability[] {
  return capabilitiesByLocale[locale];
}

export function getCapability(locale: Locale, slug: string): Capability | undefined {
  return capabilitiesByLocale[locale].find((c) => c.slug === slug);
}

/* -------------------------------------------------------------- sectors.ts */

const sectorsByLocale: Record<Locale, Sector[]> = { en: sectorsEn, ar: sectorsAr };

export function getSectors(locale: Locale): Sector[] {
  return sectorsByLocale[locale];
}

export function getSector(locale: Locale, slug: string): Sector | undefined {
  return sectorsByLocale[locale].find((s) => s.slug === slug);
}

export function getPrioritySectors(locale: Locale): Sector[] {
  return sectorsByLocale[locale].filter((s) => prioritySectorSlugs.includes(s.slug));
}

/* ---------------------------------------------------------- credentials.ts */

const credentialsContent = { en: credentialsEn, ar: credentialsAr } as const;

export function getCredentialsContent(locale: Locale) {
  return credentialsContent[locale];
}
