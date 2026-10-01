export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds an href for `path` (an unprefixed, canonical path starting with "/")
 * in the given locale. English is served unprefixed at the root; Arabic is
 * served under /ar.
 */
export function localizedHref(locale: Locale, path: string): string {
  const normalized = path === "" ? "/" : path;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? "/ar" : `/ar${normalized}`;
}

/**
 * Strips a locale prefix from a pathname, returning the canonical
 * (English-shaped) path. "/ar/projects" -> "/projects", "/ar" -> "/",
 * "/projects" -> "/projects".
 */
export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** The label shown on the switcher — the language you would switch *to*. */
export const switcherLabel: Record<Locale, string> = {
  en: "AR",
  ar: "EN",
};
