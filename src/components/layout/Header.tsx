"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { localizedHref, stripLocaleFromPathname, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const canonicalPath = stripLocaleFromPathname(pathname ?? "/");

  const NAV = [
    { label: dict.nav.capabilities, href: "/capabilities" },
    { label: dict.nav.projects, href: "/projects" },
    { label: dict.nav.sectors, href: "/sectors" },
    { label: dict.nav.engineeringNetwork, href: "/engineering-network" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.credentials, href: "/credentials" },
  ];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream/95 backdrop-blur-sm">
      <div className="container-zak flex h-[72px] items-center justify-between lg:h-[88px]">
        <Link
          href={localizedHref(lang, "/")}
          aria-label={dict.nav.homeAriaLabel}
          className="shrink-0"
        >
          <Image
            src="/brand/zak-logo-transparent.png"
            alt="ZAK Engineering Consultants"
            width={1726}
            height={576}
            priority
            className="h-8 w-auto lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const href = localizedHref(lang, item.href);
            const active = canonicalPath === item.href || canonicalPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label-xs transition-colors",
                  active ? "text-gold" : "text-navy-soft hover:text-gold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher
            lang={lang}
            ariaLabel={dict.nav.switchLanguageTo}
            className="border-navy/25 text-navy-soft hover:border-gold hover:text-gold"
          />
          <Link
            href={localizedHref(lang, "/contact")}
            className="inline-flex bg-navy px-5 py-3 label-xs text-white transition-colors hover:bg-navy-soft"
          >
            {dict.nav.discussProject}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher
            lang={lang}
            ariaLabel={dict.nav.switchLanguageTo}
            className="border-navy/25 text-navy-soft"
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="-me-2 flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span
                className={cn(
                  "absolute start-0 block h-px w-6 bg-navy transition-transform duration-200",
                  open ? "top-2 rotate-45" : "top-0.5"
                )}
              />
              <span
                className={cn(
                  "absolute start-0 top-2 block h-px w-6 bg-navy transition-opacity duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute start-0 block h-px w-6 bg-navy transition-transform duration-200",
                  open ? "top-2 -rotate-45" : "top-3.5"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-rule bg-cream-deep lg:hidden"
        >
          <nav className="container-zak flex flex-col py-2" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(lang, item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-4 text-[length:var(--step-1)] font-light text-navy-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localizedHref(lang, "/contact")}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center bg-navy px-5 py-4 label-xs text-white"
            >
              {dict.nav.discussProject}
            </Link>
            <Link
              href={`${localizedHref(lang, "/contact")}#prequalification`}
              onClick={() => setOpen(false)}
              className="mt-3 mb-8 inline-flex items-center justify-center border border-navy/25 px-5 py-4 label-xs text-navy-soft"
            >
              {dict.nav.requestCorporateProfile}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
