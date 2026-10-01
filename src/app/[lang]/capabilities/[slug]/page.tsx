import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCapabilities, getCapability, getProject } from "@/content";
import { locales, isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ProjectCard } from "@/components/project/ProjectCard";
import { BreadcrumbJsonLd } from "@/components/seo/Breadcrumb";
import {
  Body,
  Container,
  Cta,
  DisplayTitle,
  Eyebrow,
  GoldRule,
  Lead,
  Section,
  SectionTag,
} from "@/components/ui/primitives";

export function generateStaticParams() {
  return locales.flatMap((lang) => getCapabilities(lang).map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/capabilities/[slug]">
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) return {};
  const capability = getCapability(lang, slug);
  if (!capability) return {};
  return {
    title: capability.name,
    description: capability.proposition,
    alternates: {
      canonical: localizedHref(lang, `/capabilities/${capability.slug}`),
      languages: {
        en: `/capabilities/${capability.slug}`,
        ar: `/ar/capabilities/${capability.slug}`,
        "x-default": `/capabilities/${capability.slug}`,
      },
    },
  };
}

export default async function CapabilityPage(
  props: PageProps<"/[lang]/capabilities/[slug]">
) {
  const { lang: rawLang, slug } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const capability = getCapability(lang, slug);
  if (!capability) notFound();

  const dict = getDictionary(lang);
  const proofProjects = capability.projectSlugs
    .map((s) => getProject(lang, s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.breadcrumb.home, path: localizedHref(lang, "/") },
          { name: dict.nav.capabilities, path: localizedHref(lang, "/capabilities") },
          {
            name: capability.shortName,
            path: localizedHref(lang, `/capabilities/${capability.slug}`),
          },
        ]}
      />

      <section className="bg-navy py-[clamp(56px,7vw,96px)] text-white">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <Eyebrow>{dict.capability.indexEyebrow(capability.index)}</Eyebrow>
              <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
                {capability.name}
              </DisplayTitle>
              <Lead onNavy className="mt-8">
                {capability.proposition}
              </Lead>
            </div>
            <div className="hidden shrink-0 md:block">
              <SectionTag onNavy>{lang === "ar" ? "02 / القدرات" : "02 / Capabilities"}</SectionTag>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="cream" size="lg">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{dict.capability.clientProblemEyebrow}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="measure text-[length:var(--step-2)] font-light leading-[1.4] text-navy-soft">
              {capability.clientProblem}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream-deep" size="lg">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{dict.capability.providesEyebrow}</Eyebrow>
          </div>
          <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:col-span-8">
            {capability.provides.map((item) => (
              <li
                key={item}
                className="border-t border-rule pt-4 text-[length:var(--step-0)] text-navy-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream" size="lg">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{dict.capability.scopeBoundaryEyebrow}</Eyebrow>
            <Body className="mt-4 text-[length:var(--step--1)]">{dict.capability.scopeBoundaryBody}</Body>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            <div>
              <GoldRule />
              <h2 className="label-xs mt-5 text-navy-soft">{dict.capability.scopeStartsHeading}</h2>
              <p className="mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {capability.scopeBoundary.starts}
              </p>
            </div>
            <div>
              <span aria-hidden className="block h-px w-10 bg-rule" />
              <h2 className="label-xs mt-5 text-navy-soft">{dict.capability.scopeEndsHeading}</h2>
              <p className="mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {capability.scopeBoundary.ends}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream-deep">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{dict.capability.deliverablesEyebrow}</Eyebrow>
          </div>
          <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:col-span-8">
            {capability.deliverables.map((d) => (
              <li
                key={d}
                className="border-t border-rule pt-4 text-[length:var(--step-0)] text-navy-soft"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {proofProjects.length > 0 && (
        <Section tone="cream" size="lg">
          <Eyebrow>{dict.capability.evidenceEyebrow}</Eyebrow>
          <DisplayTitle as="h2" size="md" className="mt-4">
            {dict.capability.evidenceHeading}
          </DisplayTitle>
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {proofProjects.slice(0, 6).map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {dict.capability.ctaHeading(capability.shortName)}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
