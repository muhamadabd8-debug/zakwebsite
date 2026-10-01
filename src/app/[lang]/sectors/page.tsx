import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSectors, getProject, getCapability } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  ArrowLink,
  Cta,
  DisplayTitle,
  Eyebrow,
  HeroBackdrop,
  Lead,
  Section,
} from "@/components/ui/primitives";

const prioritySectorSlugs = [
  "high-rise",
  "aviation",
  "institutional",
  "infrastructure",
  "industrial",
  "healthcare",
];

export async function generateMetadata(
  props: PageProps<"/[lang]/sectors">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.sectors,
    description:
      lang === "ar"
        ? "سجل ZAK الهندسي عبر الأبراج العالية والطيران والمشاريع المؤسسية والبنية التحتية والصناعة والرعاية الصحية والتجارة والسكن والضيافة والتقييم والمساحة."
        : "ZAK's engineering record across high-rise, aviation, institutional, infrastructure, industrial, healthcare, commercial, residential, hospitality, assessment and surveying work.",
    alternates: {
      canonical: localizedHref(lang, "/sectors"),
      languages: { en: "/sectors", ar: "/ar/sectors", "x-default": "/sectors" },
    },
  };
}

export default async function SectorsPage(props: PageProps<"/[lang]/sectors">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const sectors = getSectors(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <Eyebrow>{dict.nav.sectors}</Eyebrow>
        <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
          {lang === "ar"
            ? "خبرة هندسية عبر بيئات مشاريع معقدة"
            : "Engineering experience across demanding project environments"}
        </DisplayTitle>
        <Lead onNavy className="mt-8">
          {lang === "ar"
            ? "كل قطاع أدناه مدعوم بمشاريع في السجل الموثّق. وقد صُنِّفت ستة منها كقطاعات ذات أولوية في الملف التعريفي للشركة."
            : "Every sector below is backed by projects in the verified record. Six are designated priority sectors in the corporate profile."}
        </Lead>
      </Section>

      <Section tone="cream" size="lg">
        <div className="flex flex-col">
          {sectors.map((sector, i) => {
            const sectorProjects = sector.projectSlugs
              .map((slug) => getProject(lang, slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            const capability = sectorProjects[0]?.capabilities[0]
              ? getCapability(lang, sectorProjects[0].capabilities[0])
              : undefined;
            const isPriority = prioritySectorSlugs.includes(sector.slug);

            return (
              <article
                key={sector.slug}
                id={sector.slug}
                className="grid scroll-mt-28 gap-8 border-t border-rule py-12 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="label-xs text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {isPriority && (
                      <span className="label-xs text-ink-muted">{dict.sector.priorityTag}</span>
                    )}
                  </div>
                  <h2 className="display mt-4 text-[length:var(--step-3)] text-navy-soft">
                    {sector.name}
                  </h2>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                    {sector.description}
                  </p>
                  {capability && (
                    <p className="label-xs mt-6 text-ink-muted">
                      {dict.sector.relevantCapability} ·{" "}
                      <Link
                        href={localizedHref(lang, `/capabilities/${capability.slug}`)}
                        className="text-navy-soft transition-colors hover:text-gold"
                      >
                        {capability.shortName}
                      </Link>
                    </p>
                  )}
                </div>

                <div className="lg:col-span-4">
                  <p className="label-xs text-ink-muted">
                    {dict.projectBrowser.projectCount(sectorProjects.length)}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {sectorProjects.slice(0, 4).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={localizedHref(lang, `/projects/${p.slug}`)}
                          className="text-[length:var(--step--1)] text-navy-soft transition-colors hover:text-gold"
                        >
                          {p.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {sectorProjects.length > 4 && (
                    <p className="label-xs mt-3 text-ink-muted">
                      {dict.projectBrowser.moreCount(sectorProjects.length - 4)}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 border-t border-rule pt-8">
          <ArrowLink href={localizedHref(lang, "/projects")}>{dict.common.browseFullRecord}</ArrowLink>
        </div>
      </Section>

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {dict.sector.ctaHeading}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
