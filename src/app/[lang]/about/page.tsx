import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteContent, getProjects } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  ArrowLink,
  Body,
  Cta,
  DisplayTitle,
  Eyebrow,
  HeroBackdrop,
  NumberedItem,
  Section,
  SectionTag,
} from "@/components/ui/primitives";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const { about } = getSiteContent(lang);
  const dict = getDictionary(lang);
  return {
    title: dict.nav.about,
    description: about.body[0],
    alternates: {
      canonical: localizedHref(lang, "/about"),
      languages: { en: "/about", ar: "/ar/about", "x-default": "/about" },
    },
  };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const { about, positioning, network, site } = getSiteContent(lang);
  const projects = getProjects(lang);
  const dict = getDictionary(lang);
  const sectorCount = new Set(projects.map((p) => p.sectorSlug)).size;

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-4xl">
            <Eyebrow>{dict.nav.about}</Eyebrow>
            <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
              {about.title}
            </DisplayTitle>
          </div>
          <div className="hidden shrink-0 md:block">
            <SectionTag onNavy>{dict.about.sectionTag}</SectionTag>
          </div>
        </div>
      </Section>

      <Section tone="cream" size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{dict.about.whoWeAreEyebrow}</Eyebrow>
            {about.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i === 0
                    ? "measure mt-6 text-[length:var(--step-2)] font-light leading-[1.4] text-navy-soft"
                    : "measure mt-6 leading-relaxed text-ink-muted"
                }
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              <NumberedItem index="01" title={about.disciplines.title}>
                {about.disciplines.body}
              </NumberedItem>
              <NumberedItem index="02" title={about.deliveryFocus.title}>
                {about.deliveryFocus.body}
              </NumberedItem>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-cream-deep">
                <Image
                  src="/projects/about-built-environment.webp"
                  alt="Built-environment project from ZAK's selected project experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
              </div>
              <figcaption className="label-xs mt-4 text-ink-muted">
                {dict.about.builtEnvironmentCaption}
              </figcaption>
            </figure>

            <p className="measure mt-10 border-s-2 border-gold ps-6 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
              {about.principle}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream-deep" size="lg">
        <div className="flex items-start justify-between gap-8">
          <div>
            <Eyebrow>{lang === "ar" ? "التموضع" : "Positioning"}</Eyebrow>
            <DisplayTitle as="h2" size="lg" className="mt-4 uppercase">
              {positioning.title}
            </DisplayTitle>
          </div>
          <div className="hidden shrink-0 md:block">
            <SectionTag>{positioning.sectionTag}</SectionTag>
          </div>
        </div>
        <p className="measure mt-10 text-[length:var(--step-2)] font-light leading-[1.4] text-navy-soft">
          {positioning.statement}
        </p>
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {positioning.pillars.map((p) => (
            <NumberedItem key={p.index} index={p.index} title={p.title}>
              {p.body}
            </NumberedItem>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>{dict.about.theRecordEyebrow}</Eyebrow>
        <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-3">
          <div className="border-t border-rule pt-5">
            <dd className="display text-[length:var(--step-4)] text-navy-soft">
              {projects.length}
            </dd>
            <dt className="label-xs mt-3 text-ink-muted">{dict.about.documentedProjects}</dt>
          </div>
          <div className="border-t border-rule pt-5">
            <dd className="display text-[length:var(--step-4)] text-navy-soft">
              {sectorCount}
            </dd>
            <dt className="label-xs mt-3 text-ink-muted">{dict.about.sectorsRepresented}</dt>
          </div>
          <div className="border-t border-rule pt-5">
            <dd className="display text-[length:var(--step-4)] text-navy-soft">6</dd>
            <dt className="label-xs mt-3 text-ink-muted">{dict.about.capabilityFamilies}</dt>
          </div>
        </dl>
        <p className="measure mt-10 text-[length:var(--step--2)] leading-relaxed text-ink-muted">
          {dict.about.recordDisclaimer(site.profileEdition)}
        </p>
        <div className="mt-8">
          <ArrowLink href={localizedHref(lang, "/projects")}>{dict.common.seeProjectRecord}</ArrowLink>
        </div>
      </Section>

      <Section tone="cream-deep">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>{dict.nav.engineeringNetwork}</Eyebrow>
            <DisplayTitle as="h2" size="md" className="mt-4">
              {network.title}
            </DisplayTitle>
            <Body className="mt-4">{network.lead}</Body>
            <div className="mt-6">
              <ArrowLink href={localizedHref(lang, "/engineering-network")}>
                {dict.common.howZakDelivers}
              </ArrowLink>
            </div>
          </div>
          <div>
            <Eyebrow>{dict.about.governanceEyebrow}</Eyebrow>
            <DisplayTitle as="h2" size="md" className="mt-4">
              {dict.about.corporateRecordsHeading}
            </DisplayTitle>
            <Body className="mt-4">{dict.about.corporateRecordsBody}</Body>
            <div className="mt-6">
              <ArrowLink href={localizedHref(lang, "/credentials")}>{dict.common.viewCredentials}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {dict.about.ctaHeading}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
