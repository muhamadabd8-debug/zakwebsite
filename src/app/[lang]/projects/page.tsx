import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getSectors } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ProjectBrowser } from "@/components/project/ProjectBrowser";
import { Cta, DisplayTitle, Eyebrow, Lead, Section } from "@/components/ui/primitives";

export async function generateMetadata(
  props: PageProps<"/[lang]/projects">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.projects,
    description:
      lang === "ar"
        ? "سجل مشاريع ZAK الموثّق عبر الأبراج العالية والطيران والمشاريع المؤسسية والبنية التحتية والصناعة والرعاية الصحية والتجارة والسكن."
        : "The verified ZAK project record across high-rise, aviation, institutional, infrastructure, industrial, healthcare, commercial and residential work.",
    alternates: {
      canonical: localizedHref(lang, "/projects"),
      languages: { en: "/projects", ar: "/ar/projects", "x-default": "/projects" },
    },
  };
}

export default async function ProjectsPage(props: PageProps<"/[lang]/projects">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const projects = getProjects(lang);
  const sectors = getSectors(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy">
        <Eyebrow>{dict.nav.projects}</Eyebrow>
        <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
          {lang === "ar" ? "سجل المشاريع الموثّق" : "The verified project record"}
        </DisplayTitle>
        <Lead onNavy className="mt-8">
          {lang === "ar"
            ? "يذكر كل سجل نطاق عمل ZAK إلى جانب السجل الأوسع للمشروع — يُذكر المالك والمقاول والاستشاري كل على حدة، بحيث تبقى حدود إسهام ZAK واضحة دون لبس."
            : "Each entry states ZAK’s own scope alongside the wider project record — owner, contractor and consultant are named separately so the boundary of ZAK’s contribution is never in question."}
        </Lead>
      </Section>

      <Section tone="cream" size="lg">
        <ProjectBrowser projects={projects} sectors={sectors} lang={lang} />
      </Section>

      <Section tone="cream-deep">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <DisplayTitle as="h2" size="md" className="max-w-xl">
            {lang === "ar"
              ? "تبحث عن أدلة على نوع مشروع محدد؟"
              : "Looking for evidence on a specific project type?"}
          </DisplayTitle>
          <Cta href={localizedHref(lang, "/contact")}>{dict.nav.discussProject}</Cta>
        </div>
      </Section>
    </>
  );
}
