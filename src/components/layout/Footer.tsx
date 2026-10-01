import Link from "next/link";
import { getSiteContent, getCapabilities } from "@/content";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function Footer({ lang }: { lang: Locale }) {
  const { site, contact } = getSiteContent(lang);
  const capabilities = getCapabilities(lang);
  const dict = getDictionary(lang);

  const COMPANY_LINKS = [
    { label: dict.footer.aboutZak, href: "/about" },
    { label: dict.nav.projects, href: "/projects" },
    { label: dict.nav.sectors, href: "/sectors" },
    { label: dict.nav.engineeringNetwork, href: "/engineering-network" },
    { label: dict.nav.credentials, href: "/credentials" },
    { label: dict.footer.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container-zak py-[clamp(56px,7vw,88px)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <p className="display text-[length:var(--step-2)] text-white">{site.name}</p>
            <p className="mt-4 max-w-xs text-[length:var(--step--1)] leading-relaxed text-white/65">
              {site.positioning}
            </p>
          </div>

          <nav aria-label={dict.footer.capabilitiesHeading}>
            <p className="label-xs text-white/45">{dict.footer.capabilitiesHeading}</p>
            <ul className="mt-5 space-y-3">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={localizedHref(lang, `/capabilities/${c.slug}`)}
                    className="text-[length:var(--step--1)] text-white/75 transition-colors hover:text-gold"
                  >
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.companyHeading}>
            <p className="label-xs text-white/45">{dict.footer.companyHeading}</p>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localizedHref(lang, l.href)}
                    className="text-[length:var(--step--1)] text-white/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-xs text-white/45">{contact.city}</p>
            <address className="mt-5 not-italic text-[length:var(--step--1)] leading-relaxed text-white/75">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a
                href={`tel:${contact.telephoneHref}`}
                className="mt-4 inline-block transition-colors hover:text-gold"
                dir="ltr"
              >
                {contact.telephone}
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-zak flex flex-col gap-3 py-6 text-[length:var(--step--2)] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {dict.footer.allRightsReserved}
          </p>
          <p>
            {dict.footer.companyProfile} {site.profileEdition}
          </p>
        </div>
      </div>
    </footer>
  );
}
