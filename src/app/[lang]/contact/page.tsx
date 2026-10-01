import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ContactForm } from "@/components/contact/ContactForm";
import { DisplayTitle, Eyebrow, HeroBackdrop, Lead, Section } from "@/components/ui/primitives";

export async function generateMetadata(
  props: PageProps<"/[lang]/contact">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.contact.heading,
    description:
      lang === "ar"
        ? "خطوة مباشرة نحو الاستفسارات المتعلقة بالمشاريع والجوانب الفنية والتأهيل المسبق. مكتب جدة، الهاتف، ونموذج الاستفسار."
        : "A direct next step for project, technical and prequalification enquiries. Jeddah office, telephone and enquiry form.",
    alternates: {
      canonical: localizedHref(lang, "/contact"),
      languages: { en: "/contact", ar: "/ar/contact", "x-default": "/contact" },
    },
  };
}

export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const { contact } = getSiteContent(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
        <DisplayTitle as="h1" size="xl" onNavy className="mt-6">
          {dict.contact.heading}
        </DisplayTitle>
        <Lead onNavy className="mt-8">
          {dict.contact.lead}
        </Lead>
      </Section>

      <Section tone="cream" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* corporate details — visible, not gated behind the form */}
          <div className="lg:col-span-4">
            <Eyebrow>{contact.city}</Eyebrow>
            <address className="mt-6 not-italic leading-relaxed text-navy-soft">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-8 border-t border-rule pt-5">
              <p className="label-xs text-ink-muted">{dict.credentials.telephone}</p>
              <a
                href={`tel:${contact.telephoneHref}`}
                dir="ltr"
                className="mt-2 inline-block text-[length:var(--step-1)] font-light text-navy-soft transition-colors hover:text-gold"
              >
                {contact.telephone}
              </a>
            </div>

            <div className="mt-8 border-t border-rule pt-5">
              <p className="label-xs text-ink-muted">{dict.contact.projectEnquiriesLabel}</p>
              <p className="mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {dict.contact.projectEnquiriesBody}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm lang={lang} />
          </div>
        </div>
      </Section>
    </>
  );
}
