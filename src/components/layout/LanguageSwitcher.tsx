"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeCookieName,
  localizedHref,
  stripLocaleFromPathname,
  switcherLabel,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Minimal AR/EN switcher — shows the language you would switch *to*.
 * Preserves the current page: strips the active locale prefix from the
 * pathname and re-applies the other locale's prefix (or lack of one).
 */
export function LanguageSwitcher({
  lang,
  ariaLabel,
  className,
}: {
  lang: Locale;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const canonicalPath = stripLocaleFromPathname(pathname);
  const otherLocale: Locale = lang === "en" ? "ar" : "en";
  const href = localizedHref(otherLocale, canonicalPath);

  return (
    <Link
      href={href}
      hrefLang={otherLocale}
      aria-label={ariaLabel}
      onClick={() => {
        try {
          document.cookie = `${localeCookieName}=${otherLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
        } catch {
          /* cookies unavailable — locale still switches via the link itself */
        }
      }}
      className={cn(
        "label-xs inline-flex h-8 min-w-8 items-center justify-center border px-2 tracking-[0.12em] transition-colors",
        className
      )}
    >
      {switcherLabel[lang]}
    </Link>
  );
}
