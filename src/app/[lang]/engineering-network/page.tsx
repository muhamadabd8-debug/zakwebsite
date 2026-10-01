import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  Body,
  Cta,
  DisplayTitle,
  Eyebrow,
  HeroBackdrop,
  Lead,
  NumberedItem,
  Section,
  SectionTag,
} from "@/components/ui/primitives";

export async function generateMetadata(
  props: PageProps<"/[lang]/engineering-network">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.engineeringNetwork,
    description:
      lang === "ar"
        ? "شبكة هندسية متعددة التخصصات تدعم تنفيذ المشاريع: المملكة العربية السعودية بوصفها مركز التنفيذ الرئيسي وواجهة التواصل مع العملاء، مع تنسيق التعاون الهندسي والدعم المتخصص واستجابة المشروع حول كل تكليف."
        : "A multidisciplinary engineering network supporting project delivery: Saudi Arabia as the primary delivery and client interface, with engineering collaboration, specialist support and project response coordinated around each commission.",
    alternates: {
      canonical: localizedHref(lang, "/engineering-network"),
      languages: {
        en: "/engineering-network",
        ar: "/ar/engineering-network",
        "x-default": "/engineering-network",
      },
    },
  };
}

export default async function EngineeringNetworkPage(
  props: PageProps<"/[lang]/engineering-network">
) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const { network, deliveryModel, surveyInstruments, contact } = getSiteContent(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-4xl">
            <Eyebrow>{dict.nav.engineeringNetwork}</Eyebrow>
            <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
              {network.title}
            </DisplayTitle>
            <Lead onNavy className="mt-8">
              {network.lead}
            </Lead>
          </div>
          <div className="hidden shrink-0 md:block">
            <SectionTag onNavy>{network.sectionTag}</SectionTag>
          </div>
        </div>
      </Section>

      <Section tone="cream" size="lg">
        <div className="grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {network.nodes.map((n) => (
            <NumberedItem key={n.index} index={n.index} title={n.title}>
              {n.body}
            </NumberedItem>
          ))}
        </div>
        <p className="measure mt-14 border-s-2 border-gold ps-6 text-[length:var(--step-1)] font-light leading-relaxed text-navy-soft">
          {network.closing}
        </p>
      </Section>

      <Section tone="cream-deep" size="lg">
        <Eyebrow>{lang === "ar" ? "نموذج التنفيذ" : "Delivery model"}</Eyebrow>
        <DisplayTitle as="h2" size="lg" className="mt-4">
          {lang === "ar" ? "نظام تنفيذ واحد، بخمس مراحل" : "One delivery system, five stages"}
        </DisplayTitle>
        <Body className="mt-4">
          {lang === "ar"
            ? "تسلسل منضبط يربط قرارات التصميم بالمعلومات المنسّقة والاستجابة الميدانية."
            : "A disciplined sequence connecting design decisions, coordinated information and site response."}
        </Body>

        <ol className="mt-14 flex flex-col">
          {deliveryModel.map((stage) => (
            <li
              key={stage.index}
              className="grid gap-4 border-t border-rule py-7 lg:grid-cols-12 lg:gap-8"
            >
              <span className="label-xs text-gold lg:col-span-1">{stage.index}</span>
              <h3 className="text-[length:var(--step-2)] font-light text-navy-soft lg:col-span-3">
                {stage.name}
              </h3>
              <p className="text-[length:var(--step--1)] leading-relaxed text-ink-muted lg:col-span-8">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cream" size="lg">
        <Eyebrow>{lang === "ar" ? "تقنية المساحة" : "Surveying technology"}</Eyebrow>
        <DisplayTitle as="h2" size="lg" className="mt-4">
          {lang === "ar" ? "القدرة الميدانية" : "Field capability"}
        </DisplayTitle>
        <Body className="mt-4">
          {lang === "ar"
            ? "معدات المساحة والرصد الواقعي المسجّلة في الملف التعريفي لشركة ZAK، وتدعم المسح الطبوغرافي والمسح الضوئي والسجلات المكانية المنسّقة."
            : "Surveying and reality-capture equipment recorded in ZAK’s corporate profile, supporting topographic survey, scanning and coordinated spatial records."}
        </Body>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {surveyInstruments.map((group) => (
            <div key={group.index} className="border-t border-rule pt-5">
              <span className="label-xs text-gold">{group.index}</span>
              <h3 className="label-xs mt-3 text-navy-soft">{group.category}</h3>
              <p className="mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted" dir="ltr">
                {group.items}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
              {lang === "ar"
                ? `يُنسَّق التنفيذ من ${contact.city}`
                : `Delivery is coordinated from ${contact.city}`}
            </DisplayTitle>
            <p className="label-xs mt-4 text-white/50">{contact.addressLines.join(" · ")}</p>
          </div>
          <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
            {dict.nav.discussProject}
          </Cta>
        </div>
      </Section>
    </>
  );
}
