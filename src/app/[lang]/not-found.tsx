"use client";

import { usePathname } from "next/navigation";
import { localeFromPathname, localizedHref } from "@/i18n/config";
import { Cta, DisplayTitle, Eyebrow, Lead, Section } from "@/components/ui/primitives";

/**
 * Reads the locale from the URL rather than route params — not-found
 * boundaries are not guaranteed to receive dynamic segment params, and this
 * mirrors the same pattern already used by Header's active-link detection.
 */
export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const lang = localeFromPathname(pathname);

  return (
    <Section tone="navy" size="lg">
      <Eyebrow>404</Eyebrow>
      <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
        {lang === "ar" ? "الصفحة غير موجودة" : "Page not found"}
      </DisplayTitle>
      <Lead onNavy className="mt-8">
        {lang === "ar"
          ? "تعذّر العثور على الصفحة المطلوبة. قد يكون الرابط قديمًا أو غير صحيح."
          : "The page you requested could not be found. The link may be outdated or incorrect."}
      </Lead>
      <div className="mt-10">
        <Cta href={localizedHref(lang, "/")} variant="onNavy">
          {lang === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return home"}
        </Cta>
      </div>
    </Section>
  );
}
