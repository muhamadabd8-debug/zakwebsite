import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCredentialsContent, getSiteContent } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
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
  props: PageProps<"/[lang]/credentials">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.credentials,
    description:
      lang === "ar"
        ? "السجلات المؤسسية والتراخيص وشهادات أنظمة الإدارة محفوظة كأدلة مصدرية، مع بيان صلاحية الشهادات كاملة."
        : "Corporate records, licences and management-system certificates retained as documentary evidence, with certificate validity stated in full.",
    alternates: {
      canonical: localizedHref(lang, "/credentials"),
      languages: { en: "/credentials", ar: "/ar/credentials", "x-default": "/credentials" },
    },
  };
}

export default async function CredentialsPage(props: PageProps<"/[lang]/credentials">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const { managementSystemCertificates, certificateNote, officialRecords, clientEvidence } =
    getCredentialsContent(lang);
  const { contact, site } = getSiteContent(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-4xl">
            <Eyebrow>{dict.nav.credentials}</Eyebrow>
            <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
              {dict.credentials.heading}
            </DisplayTitle>
            <Lead onNavy className="mt-8">
              {dict.credentials.lead}
            </Lead>
          </div>
          <div className="hidden shrink-0 md:block">
            <SectionTag onNavy>{dict.credentials.sectionTag}</SectionTag>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>{dict.credentials.corporateInfoEyebrow}</Eyebrow>
        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-t border-rule pt-4">
            <dt className="label-xs text-ink-muted">{dict.credentials.legalEntity}</dt>
            <dd className="mt-2 text-[length:var(--step-0)] text-navy-soft">
              {site.legalName}
            </dd>
          </div>
          <div className="border-t border-rule pt-4">
            <dt className="label-xs text-ink-muted">{dict.credentials.office}</dt>
            <dd className="mt-2 text-[length:var(--step-0)] leading-relaxed text-navy-soft">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div className="border-t border-rule pt-4">
            <dt className="label-xs text-ink-muted">{dict.credentials.telephone}</dt>
            <dd className="mt-2 text-[length:var(--step-0)] text-navy-soft" dir="ltr">
              <a
                href={`tel:${contact.telephoneHref}`}
                className="transition-colors hover:text-gold"
              >
                {contact.telephone}
              </a>
            </dd>
          </div>
        </dl>
      </Section>

      <Section tone="cream-deep" size="lg">
        <Eyebrow>{dict.credentials.certificatesEyebrow}</Eyebrow>
        <DisplayTitle as="h2" size="lg" className="mt-4">
          {dict.credentials.certificateRegister}
        </DisplayTitle>

        <ul className="mt-12 flex flex-col">
          {managementSystemCertificates.map((cert) => (
            <li
              key={cert.code}
              className="grid gap-3 border-t border-rule py-6 lg:grid-cols-12 lg:items-baseline lg:gap-8"
            >
              <span className="display text-[length:var(--step-2)] text-navy-soft lg:col-span-3" dir="ltr">
                {cert.code}
              </span>
              <span className="text-[length:var(--step--1)] text-ink-muted lg:col-span-6">
                {cert.name}
              </span>
              <span className="label-xs text-ink-muted lg:col-span-3 lg:text-end">
                {dict.credentials.historicalExpiry(cert.sourceExpiry)}
              </span>
            </li>
          ))}
        </ul>

        <p className="measure mt-10 border-s-2 border-gold ps-6 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
          {certificateNote}
        </p>
      </Section>

      <Section tone="cream" size="lg">
        <Eyebrow>{dict.credentials.officialRecordsEyebrow}</Eyebrow>
        <DisplayTitle as="h2" size="lg" className="mt-4">
          {dict.credentials.officialRecordsHeading}
        </DisplayTitle>
        <Body className="mt-4">{dict.credentials.officialRecordsBody}</Body>

        <ul className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {officialRecords.map((record) => (
            <li key={record.index} className="flex gap-4 border-t border-rule pt-4">
              <span className="label-xs text-gold">{record.index}</span>
              <span className="text-[length:var(--step-0)] text-navy-soft">
                {record.name}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream-deep">
        <Eyebrow>{clientEvidence.title}</Eyebrow>
        <Body className="mt-5 text-[length:var(--step-0)]">{clientEvidence.body}</Body>
      </Section>

      <Section tone="navy">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <DisplayTitle as="h2" size="md" onNavy className="max-w-xl">
            {dict.credentials.ctaHeading}
          </DisplayTitle>
          <Cta href={`${localizedHref(lang, "/contact")}#prequalification`} variant="onNavy">
            {dict.credentials.requestPrequalificationPack}
          </Cta>
        </div>
      </Section>
    </>
  );
}
