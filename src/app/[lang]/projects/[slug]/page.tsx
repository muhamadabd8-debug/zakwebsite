import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects, getProject, getCapability } from "@/content";
import { locales, isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { VerifiedRole } from "@/components/project/VerifiedRole";
import { ProjectCard } from "@/components/project/ProjectCard";
import { BreadcrumbJsonLd } from "@/components/seo/Breadcrumb";
import {
  ArrowLink,
  Body,
  Container,
  Cta,
  DataGrid,
  DisplayTitle,
  Eyebrow,
  PartyList,
  Section,
  SectionTag,
} from "@/components/ui/primitives";

export function generateStaticParams() {
  return locales.flatMap((lang) => getProjects(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/projects/[slug]">
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) return {};
  const project = getProject(lang, slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.overview.slice(0, 155)}…`,
    alternates: {
      canonical: localizedHref(lang, `/projects/${project.slug}`),
      languages: {
        en: `/projects/${project.slug}`,
        ar: `/ar/projects/${project.slug}`,
        "x-default": `/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — ZAK Engineering Consultants`,
      description: project.overview,
      images: project.image ? [{ url: project.image.src }] : undefined,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/[lang]/projects/[slug]">) {
  const { lang: rawLang, slug } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const project = getProject(lang, slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const projects = getProjects(lang);

  const sameSector = projects
    .filter((p) => p.slug !== project.slug && p.sectorSlug === project.sectorSlug)
    .slice(0, 3);
  const fallback = projects
    .filter((p) => p.slug !== project.slug && p.tier === "flagship")
    .slice(0, 3);
  const relatedProjects = sameSector.length > 0 ? sameSector : fallback;

  const capabilityLinks = project.capabilities
    .map((c) => getCapability(lang, c))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const companion = project.relatedAssignment
    ? getProject(lang, project.relatedAssignment.slug)
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.breadcrumb.home, path: localizedHref(lang, "/") },
          { name: dict.nav.projects, path: localizedHref(lang, "/projects") },
          { name: project.shortTitle, path: localizedHref(lang, `/projects/${project.slug}`) },
        ]}
      />

      {/* 01 — hero */}
      <section className="border-b border-rule bg-cream pt-[clamp(40px,5vw,64px)] pb-[clamp(32px,4vw,48px)]">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <div>
              <DisplayTitle as="h1" size="xl" className="uppercase">
                {project.title}
              </DisplayTitle>
              <p className="label-xs mt-4 text-ink-muted">{project.location}</p>
            </div>
            <div className="hidden shrink-0 md:block">
              <SectionTag>
                {project.tier === "flagship" ? dict.project.flagshipTag : dict.project.recordTag}
              </SectionTag>
            </div>
          </div>
        </Container>
      </section>

      {/* 02-04 — image, overview, verified role, data */}
      <Section tone="cream" size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            {project.image ? (
              <figure>
                <div className="relative w-full overflow-hidden bg-cream-deep">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="label-xs mt-4 text-ink-muted">
                  {project.image.caption}
                </figcaption>
              </figure>
            ) : (
              <div className="border border-rule bg-cream-deep p-8">
                <p className="label-xs text-ink-muted">{dict.project.noImage}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <Eyebrow>{dict.project.overviewEyebrow}</Eyebrow>
            <Body className="mt-5 text-[length:var(--step-0)]">{project.overview}</Body>

            <div className="mt-12">
              <VerifiedRole role={project.verifiedRole} eyebrow={dict.project.verifiedRoleEyebrow} />
            </div>

            {project.data.length > 0 && (
              <div className="mt-12">
                <Eyebrow className="mb-6">{dict.project.dataEyebrow}</Eyebrow>
                <DataGrid items={project.data} columns={2} />
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 05 — project parties */}
      <Section tone="cream-deep">
        <Eyebrow className="mb-8">{dict.project.partiesEyebrow}</Eyebrow>
        <PartyList parties={project.parties} labels={dict.project.partyLabels} />
        <p className="measure mt-10 text-[length:var(--step--2)] leading-relaxed text-ink-muted">
          {dict.project.partiesDisclaimer}
        </p>
      </Section>

      {/* companion assignment */}
      {companion && project.relatedAssignment && (
        <Section tone="cream" size="sm">
          <div className="flex flex-wrap items-center justify-between gap-6 border-s-2 border-gold ps-6">
            <div>
              <Eyebrow>{dict.project.relatedAssignmentEyebrow}</Eyebrow>
              <p className="mt-3 text-[length:var(--step-1)] font-light text-navy-soft">
                {project.relatedAssignment.label}
              </p>
            </div>
            <ArrowLink href={localizedHref(lang, `/projects/${companion.slug}`)}>
              {companion.shortTitle}
            </ArrowLink>
          </div>
        </Section>
      )}

      {/* 06 — related capabilities */}
      {capabilityLinks.length > 0 && (
        <Section tone="cream">
          <Eyebrow>{dict.project.relatedCapabilitiesEyebrow}</Eyebrow>
          <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {capabilityLinks.map((c) => (
              <div key={c.slug} className="border-t border-rule pt-5">
                <h2 className="text-[length:var(--step-1)] font-medium text-navy-soft">
                  {c.name}
                </h2>
                <p className="mt-2 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                  {c.proposition}
                </p>
                <div className="mt-4">
                  <ArrowLink href={localizedHref(lang, `/capabilities/${c.slug}`)}>
                    {dict.common.exploreCapability}
                  </ArrowLink>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 07 — related projects */}
      {relatedProjects.length > 0 && (
        <Section tone="cream-deep" size="lg">
          <Eyebrow>{dict.project.relatedProjectsEyebrow}</Eyebrow>
          <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {/* 08 — CTA */}
      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {dict.project.ctaHeading}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
