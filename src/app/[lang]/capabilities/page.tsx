import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCapabilities, getProject, getSiteContent } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  ArrowLink,
  Body,
  Cta,
  DisplayTitle,
  Eyebrow,
  HeroBackdrop,
  Lead,
  Section,
  SectionTag,
} from "@/components/ui/primitives";

export async function generateMetadata(
  props: PageProps<"/[lang]/capabilities">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.capabilities,
    description:
      lang === "ar"
        ? "ست مجموعات قدرات متكاملة: التصميم الإنشائي ومخططات التنفيذ، وهندسة القيمة، وإدارة الإنشاءات، والعمارة والتصميم الداخلي، والأعمال المدنية والمساحة، والتنسيق الكهروميكانيكي ونمذجة BIM."
        : "Six integrated capability families: structural design and shop drawings, value engineering, construction management, architecture and interiors, civil and surveying, MEP and BIM coordination.",
    alternates: {
      canonical: localizedHref(lang, "/capabilities"),
      languages: { en: "/capabilities", ar: "/ar/capabilities", "x-default": "/capabilities" },
    },
  };
}

export default async function CapabilitiesPage(props: PageProps<"/[lang]/capabilities">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const capabilities = getCapabilities(lang);
  const { deliveryModel, coordinatedSystems } = getSiteContent(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <Eyebrow>{dict.nav.capabilities}</Eyebrow>
        <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
          {lang === "ar"
            ? "استجابة هندسية واحدة منسّقة عبر التخصصات"
            : "One coordinated engineering response across disciplines"}
        </DisplayTitle>
        <Lead onNavy className="mt-8">
          {lang === "ar"
            ? "قدرات متخصصة متكاملة تتمحور حول تنفيذ المشروع وقابلية البناء والجدول الزمني والتكلفة."
            : "Integrated specialist capabilities aligned around project delivery, buildability, programme and cost."}
        </Lead>
      </Section>

      <Section tone="cream" size="lg">
        <div className="grid gap-x-14 gap-y-16 lg:grid-cols-2">
          {capabilities.map((c) => {
            const proof = c.projectSlugs.map((slug) => getProject(lang, slug)).find(Boolean);
            return (
              <article key={c.slug} className="border-t border-rule pt-6">
                <span className="label-xs text-gold">{c.index}</span>
                <h2 className="display mt-4 text-[length:var(--step-3)] text-navy-soft">
                  <Link
                    href={localizedHref(lang, `/capabilities/${c.slug}`)}
                    className="transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </h2>
                <p className="measure mt-4 text-[length:var(--step-0)] leading-relaxed text-ink-muted">
                  {c.proposition}
                </p>

                <p className="label-xs mt-8 text-ink-muted">{dict.capability.clientProblemEyebrow}</p>
                <p className="measure mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                  {c.clientProblem}
                </p>

                {proof && (
                  <p className="label-xs mt-8 text-ink-muted">
                    {dict.capability.evidenceLabel} ·{" "}
                    <Link
                      href={localizedHref(lang, `/projects/${proof.slug}`)}
                      className="text-navy-soft transition-colors hover:text-gold"
                    >
                      {proof.shortTitle}
                    </Link>
                  </p>
                )}

                <div className="mt-6">
                  <ArrowLink href={localizedHref(lang, `/capabilities/${c.slug}`)}>
                    {dict.common.exploreCapability}
                  </ArrowLink>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="cream-deep" size="lg">
        <div className="flex items-start justify-between gap-8">
          <div>
            <Eyebrow>{lang === "ar" ? "نموذج التنفيذ" : "Delivery model"}</Eyebrow>
            <DisplayTitle as="h2" size="lg" className="mt-4">
              {lang === "ar" ? "من الفكرة إلى التنفيذ" : "From concept to delivery"}
            </DisplayTitle>
          </div>
          <div className="hidden shrink-0 md:block">
            <SectionTag>{lang === "ar" ? "02 / نموذج التنفيذ" : "02 / Delivery model"}</SectionTag>
          </div>
        </div>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {deliveryModel.map((s) => (
            <li key={s.index} className="border-t border-rule pt-5">
              <span className="label-xs text-gold">{s.index}</span>
              <h3 className="mt-3 text-[length:var(--step-1)] font-medium text-navy-soft">
                {s.name}
              </h3>
              <p className="mt-2 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cream" size="lg">
        <Eyebrow>{lang === "ar" ? "الأنظمة المنسّقة" : "Coordinated systems"}</Eyebrow>
        <DisplayTitle as="h2" size="lg" className="mt-4">
          {coordinatedSystems.title}
        </DisplayTitle>
        <Body className="mt-4">{coordinatedSystems.lead}</Body>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {coordinatedSystems.items.map((item) => (
            <div key={item.index} className="border-t border-rule pt-5">
              <span className="label-xs text-gold">{item.index}</span>
              <h3 className="mt-3 text-[length:var(--step-1)] font-medium text-navy-soft">
                {item.title}
              </h3>
              <p className="mt-2 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="measure mt-12 border-s-2 border-gold ps-6 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
          {coordinatedSystems.rule}
        </p>
      </Section>

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {lang === "ar"
              ? "ناقش إحدى القدرات مع الفريق الهندسي"
              : "Discuss a capability with the engineering team"}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
