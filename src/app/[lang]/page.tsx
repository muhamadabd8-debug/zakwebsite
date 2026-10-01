import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent, getCapabilities, getFlagshipProjects, getPrioritySectors } from "@/content";
import { getCredentialsContent } from "@/content";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ProjectCard } from "@/components/project/ProjectCard";
import { RevealObserver } from "@/components/ui/reveal";
import {
  ArrowLink,
  Body,
  ColumnNode,
  Container,
  Cta,
  DatumRule,
  DisplayTitle,
  DuotoneFrame,
  Eyebrow,
  GoldRule,
  Lead,
  NumberedItem,
  Section,
  SectionTag,
  SplitHeading,
  StructuralGrid,
  stagger,
} from "@/components/ui/primitives";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang: rawLang } = await props.params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;

  const dict = getDictionary(lang);
  const { hero, positioning, network, deliveryModel, finalCta, site } = getSiteContent(lang);
  const capabilities = getCapabilities(lang);
  const flagshipProjects = getFlagshipProjects(lang);
  const prioritySectors = getPrioritySectors(lang);
  const { managementSystemCertificates } = getCredentialsContent(lang);

  const [lead, ...restFlagship] = flagshipProjects;
  const [positioningFirst, ...positioningRest] = positioning.title.split(" ");

  return (
    <>
      <RevealObserver />

      {/* ------------------------------------------------------------ hero
          Poster headline on the 12-bay structural grid; the plate stands on
          a datum line that opens into a drawing-sheet title block. */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <StructuralGrid onNavy />
        <Container>
          <div className="grid gap-14 pt-[clamp(56px,8vw,112px)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <div className="enter" style={stagger(0)}>
                <Eyebrow>{hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="enter display-hero mt-7 text-balance text-[length:var(--step-6)] text-white"
                style={stagger(1)}
              >
                {hero.headline}
              </h1>
              <div className="enter mt-8 flex items-center gap-4" style={stagger(2)}>
                <GoldRule />
                <p className="label-xs text-gold">{hero.headlineAccent}</p>
              </div>
              <p
                className="enter measure mt-8 text-[length:var(--step-1)] font-light leading-relaxed text-white/70"
                style={stagger(3)}
              >
                {hero.supporting}
              </p>
              <div className="enter mt-10 flex flex-col gap-3 sm:flex-row" style={stagger(4)}>
                <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
                  {hero.primaryCta}
                </Cta>
                <Cta
                  href={localizedHref(lang, "/projects")}
                  variant="secondary"
                  className="border-white/25 text-white hover:border-white"
                >
                  {hero.secondaryCta}
                </Cta>
              </div>
            </div>

            <figure className="enter-fade lg:col-span-5 lg:self-end" style={stagger(2)}>
              <DuotoneFrame
                onNavy
                className="mx-auto aspect-[4/5] w-full max-w-[420px] lg:me-0 lg:max-w-none"
              >
                <Image
                  src="/projects/hero-cover.webp"
                  alt="Completed ZAK project — a commercial tower in Jeddah shown in the corporate profile"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 470px"
                  className="object-cover"
                />
              </DuotoneFrame>
              <figcaption className="label-xs mt-6 text-center text-white/45 lg:text-end">
                {lang === "ar"
                  ? "صورة معمارية للمشروع / الملف التعريفي المصدري"
                  : "Architectural project image / source profile"}
              </figcaption>
            </figure>
          </div>

          <div className="enter mt-[clamp(48px,6vw,80px)]" style={stagger(5)}>
            <DatumRule onNavy ticks animate="enter" />
            <div className="grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-0">
              <p className="label-xs text-white lg:col-span-4">{hero.locationLabel}</p>
              <p className="label-xs font-normal tracking-[0.08em] text-white/45 sm:col-span-2 lg:col-span-8 lg:border-s lg:border-white/15 lg:ps-5">
                {hero.networkLabel}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- positioning
          SplitHeading (use 1 of 2). Lead as a narrow sidebar against a large
          statement; pillars as full-width ledger rows. */}
      <Section tone="cream" size="lg">
        <SectionTag>{positioning.sectionTag}</SectionTag>
        <div data-reveal className="mt-6">
          <SplitHeading as="h2" left={positioningFirst} right={positioningRest.join(" ")} />
        </div>

        <div data-reveal className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Body className="r-rise lg:col-span-4">{positioning.lead}</Body>
          <p
            className="r-rise text-pretty text-[length:var(--step-3)] font-light leading-[1.3] text-navy-soft lg:col-span-7 lg:col-start-6"
            style={stagger(1)}
          >
            {positioning.statement}
          </p>
        </div>

        <div className="mt-16 border-b border-rule lg:mt-24">
          {positioning.pillars.map((p) => (
            <div key={p.index} data-reveal className="r-rise">
              <NumberedItem layout="row" index={p.index} title={p.title}>
                {p.body}
              </NumberedItem>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------- flagship projects
          8/4 header with the intro bottom-aligned right; 8/4 feature grid. */}
      <Section tone="cream-deep" size="lg">
        <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="r-rise lg:col-span-8">
            <Eyebrow>{dict.project.flagshipTag}</Eyebrow>
            <DisplayTitle as="h2" size="lg" className="mt-4 text-balance">
              {lang === "ar"
                ? "سلطة هندسية تتجلى من خلال التنفيذ"
                : "Engineering authority, shown through delivery"}
            </DisplayTitle>
          </div>
          <div className="r-rise lg:col-span-4" style={stagger(1)}>
            <Body>
              {lang === "ar"
                ? "ست حالات ذات أولوية ترسّخ سجل ZAK الهندسي عبر الأبراج العالية والطيران والمشاريع المؤسسية والبنية التحتية والصناعة والرعاية الصحية."
                : "Six priority cases establish ZAK’s engineering record across high-rise, aviation, institutional, infrastructure, industrial and healthcare work."}
            </Body>
            <div className="mt-6">
              <ArrowLink href={localizedHref(lang, "/projects")}>
                {dict.common.viewAllProjects}
              </ArrowLink>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div data-reveal className="r-rise lg:col-span-8">
            <ProjectCard project={lead} lang={lang} size="feature" priority />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {restFlagship.slice(0, 2).map((p, i) => (
              <div key={p.slug} data-reveal className="r-rise" style={stagger(i)}>
                <ProjectCard project={p} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {restFlagship.slice(2).map((p, i) => (
            <div key={p.slug} data-reveal className="r-rise" style={stagger(i % 3)}>
              <ProjectCard project={p} lang={lang} />
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------- capabilities
          Navy index: one full-width row per capability. Hover draws a gold
          hairline across the row, nudges the name, reveals the arrow. */}
      <Section tone="navy" size="lg">
        <div className="flex items-baseline justify-between gap-8">
          <Eyebrow>{dict.nav.capabilities}</Eyebrow>
          <SectionTag onNavy className="hidden md:block">
            {lang === "ar" ? "02 / القدرات" : "02 / Capabilities"}
          </SectionTag>
        </div>
        <div data-reveal className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <DisplayTitle as="h2" size="lg" onNavy className="r-rise text-balance lg:col-span-6">
            {lang === "ar" ? "استجابة هندسية واحدة منسّقة" : "One coordinated engineering response"}
          </DisplayTitle>
          <div className="r-rise lg:col-span-5 lg:col-start-8" style={stagger(1)}>
            <Lead onNavy>
              {lang === "ar"
                ? "قدرات متخصصة متكاملة تتمحور حول تنفيذ المشروع وقابلية البناء والجدول الزمني والتكلفة."
                : "Integrated specialist capabilities aligned around project delivery, buildability, programme and cost."}
            </Lead>
          </div>
        </div>

        <ul className="mt-16 border-b border-white/15 lg:mt-20">
          {capabilities.map((c) => (
            <li key={c.slug} data-reveal className="r-rise">
              <Link
                href={localizedHref(lang, `/capabilities/${c.slug}`)}
                className="group relative grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-x-10 before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-px before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-700 before:ease-[var(--ease)] hover:before:scale-x-100 focus-visible:before:scale-x-100"
              >
                <span aria-hidden className="r-draw-x absolute inset-x-0 top-0 h-px bg-white/15" />
                <span className="label-xs text-gold md:col-span-1">{c.index}</span>
                <h3 className="display text-[length:var(--step-3)] text-white transition-transform duration-500 ease-[var(--ease)] ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 ltr:group-focus-visible:translate-x-2 rtl:group-focus-visible:-translate-x-2 md:col-span-5">
                  {c.name}
                </h3>
                <p className="text-[length:var(--step--1)] leading-relaxed text-white/65 md:col-span-5">
                  {c.proposition}
                </p>
                <span
                  aria-hidden
                  className="hidden ltr:-translate-x-2 rtl:translate-x-2 rtl:-scale-x-100 justify-self-end text-gold opacity-0 transition duration-500 ease-[var(--ease)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:col-span-1 md:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <ArrowLink href={localizedHref(lang, "/capabilities")} onNavy>
            {lang === "ar" ? "استكشاف القدرات" : "Explore capabilities"}
          </ArrowLink>
        </div>
      </Section>

      {/* -------------------------------------------------- delivery model
          SplitHeading (use 2 of 2): the rule between the two halves is the
          process. Stages hang off a schematic spine — horizontal on desktop,
          vertical on mobile — with column nodes that fill in sequence as the
          line draws. */}
      <Section tone="cream" size="lg">
        <div className="flex items-baseline justify-between gap-8">
          <Eyebrow>{lang === "ar" ? "نموذج التنفيذ" : "Delivery model"}</Eyebrow>
          <SectionTag className="hidden md:block">
            {lang === "ar" ? "02 / نموذج التنفيذ" : "02 / Delivery model"}
          </SectionTag>
        </div>
        <div data-reveal className="mt-6">
          <SplitHeading
            as="h2"
            left={lang === "ar" ? "من الفكرة" : "From concept"}
            right={lang === "ar" ? "إلى التنفيذ" : "to delivery"}
          />
        </div>
        <div data-reveal className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Body className="r-rise lg:col-span-5 lg:col-start-8">
            {lang === "ar"
              ? "تسلسل منضبط يربط قرارات التصميم بالمعلومات المنسّقة والاستجابة الميدانية."
              : "A disciplined sequence connecting design decisions, coordinated information and site response."}
          </Body>
        </div>

        <ol data-reveal className="relative mt-16 grid gap-y-10 lg:mt-24 lg:grid-cols-5 lg:gap-x-8">
          <span aria-hidden className="absolute inset-x-0 top-[4px] hidden text-navy/25 lg:block">
            <span className="r-draw-x absolute inset-x-0 top-0 h-px bg-current" />
            <span className="absolute -top-[4px] end-0 h-[9px] w-px bg-current" />
          </span>
          <span aria-hidden className="r-draw-y absolute bottom-0 start-[4px] top-[9px] w-px bg-navy/25 lg:hidden" />
          {deliveryModel.map((stage, i) => (
            <li key={stage.index} className="relative ps-9 lg:ps-0 lg:pt-10" style={stagger(i)}>
              <ColumnNode className="start-0 top-[5px] lg:top-0" />
              <span className="r-rise label-xs block text-gold">{stage.index}</span>
              <h3 className="r-rise mt-3 text-[length:var(--step-1)] font-medium text-navy-soft">
                {stage.name}
              </h3>
              <p className="r-rise mt-2 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* --------------------------------------------------------- sectors
          Sticky 4-col heading against an 8-col grid; project counts become
          display numerals that count up on reveal. */}
      <Section tone="cream-deep" size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{dict.nav.sectors}</Eyebrow>
              <DisplayTitle as="h2" size="lg" className="mt-4">
                {lang === "ar" ? "القطاعات ذات الأولوية" : "Priority sectors"}
              </DisplayTitle>
              <div className="mt-8">
                <ArrowLink href={localizedHref(lang, "/sectors")}>{dict.common.allSectors}</ArrowLink>
              </div>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-8">
            {prioritySectors.map((s, i) => {
              const count = s.projectSlugs.length;
              return (
                <article
                  key={s.slug}
                  data-reveal
                  className="r-rise relative pt-5"
                  style={stagger(i % 2)}
                >
                  <span aria-hidden className="r-draw-x absolute inset-x-0 top-0 h-px bg-rule" />
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <p className="flex items-baseline gap-2">
                      <span
                        aria-hidden
                        data-countup={count}
                        className="display text-[length:var(--step-4)] tabular-nums text-navy-soft"
                      >
                        {count}
                      </span>
                      <span className="sr-only">{count}</span>
                      <span className="label-xs text-ink-muted">
                        {dict.projectBrowser.projectWord(count)}
                      </span>
                    </p>
                  </div>
                  <h3 className="mt-6 text-[length:var(--step-1)] font-medium text-navy-soft">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------- engineering network
          Title 7 / lead 4 offset right; nodes as structural bays hanging
          from a datum, one column each, node squares at each junction. */}
      <Section tone="cream" size="lg">
        <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="r-rise lg:col-span-7">
            <Eyebrow>{dict.nav.engineeringNetwork}</Eyebrow>
            <DisplayTitle as="h2" size="lg" className="mt-4 text-balance">
              {network.title}
            </DisplayTitle>
          </div>
          <div className="r-rise lg:col-span-4 lg:col-start-9 lg:pt-10" style={stagger(1)}>
            <Body>{network.lead}</Body>
            <div className="mt-8">
              <ArrowLink href={localizedHref(lang, "/engineering-network")}>
                {dict.common.howZakDelivers}
              </ArrowLink>
            </div>
          </div>
        </div>

        <div data-reveal className="relative mt-16 lg:mt-24">
          <DatumRule className="hidden lg:block" />
          <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
            {network.nodes.map((n, i) => (
              <div key={n.index} className="relative pb-2 ps-7 pe-4 lg:pt-10" style={stagger(i)}>
                <span aria-hidden className="r-draw-y absolute bottom-0 start-0 top-0 w-px bg-rule" />
                <ColumnNode className="-start-[4px] -top-[4px]" />
                <div className="r-rise">
                  <NumberedItem index={n.index} title={n.title} rule={false} className="pt-0">
                    {n.body}
                  </NumberedItem>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------- credentials
          Documentary register: navy head rule, ruled rows, codes set as
          display figures. */}
      <Section tone="cream-deep">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div data-reveal className="r-rise lg:col-span-6">
            <Eyebrow>{dict.nav.credentials}</Eyebrow>
            <DisplayTitle as="h2" size="md" className="mt-4 text-balance">
              {lang === "ar" ? "السجلات المؤسسية والأدلة الموثقة" : "Corporate records and documentary evidence"}
            </DisplayTitle>
            <Body className="mt-4">
              {lang === "ar"
                ? "يُحتفظ بالسجل التجاري وتراخيص المكتب الهندسي والاستثمار المهني وعضوية الغرفة التجارية وشهادات أنظمة الإدارة كمستندات مصدرية. وتُذكر صلاحية الشهادات كاملة في صفحة الاعتمادات."
                : "Commercial registration, engineering-office and professional investment licences, chamber membership and management-system certificates are retained as source documents. Certificate validity is stated in full on the credentials page."}
            </Body>
          </div>
          <div data-reveal className="lg:col-span-5 lg:col-start-8">
            <span aria-hidden className="r-draw-x block h-px bg-navy-soft" />
            <ul>
              {managementSystemCertificates.map((c, i) => (
                <li
                  key={c.code}
                  className="r-rise relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4"
                  style={stagger(i + 1)}
                >
                  <span className="display text-[length:var(--step-2)] tabular-nums text-navy-soft" dir="ltr">
                    {c.code}
                  </span>
                  <span className="label-xs text-ink-muted">
                    {lang === "ar" ? `تاريخية · منتهية ${c.sourceExpiry}` : `Historical · expired ${c.sourceExpiry}`}
                  </span>
                  <span aria-hidden className="r-draw-x absolute inset-x-0 bottom-0 h-px bg-rule" />
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ArrowLink href={localizedHref(lang, "/credentials")}>{dict.common.viewCredentials}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- final CTA
          Bookend to the hero: the structural grid returns, closing on the
          same title-block strip. */}
      <Section tone="navy" size="lg" className="relative isolate overflow-hidden">
        <StructuralGrid onNavy />
        <div data-reveal className="max-w-4xl">
          <GoldRule className="r-draw-x" />
          <h2
            className="r-rise display-hero mt-8 text-balance text-[length:var(--step-5)] text-white"
            style={stagger(1)}
          >
            {finalCta.title}
          </h2>
          <div className="r-rise mt-6" style={stagger(2)}>
            <Lead onNavy>{finalCta.body}</Lead>
          </div>
          <div className="r-rise mt-10 flex flex-col gap-3 sm:flex-row" style={stagger(3)}>
            <Cta href={localizedHref(lang, "/contact")} variant="onNavy">
              {finalCta.primaryCta}
            </Cta>
            <Cta
              href={localizedHref(lang, "/capabilities")}
              variant="secondary"
              className="border-white/25 text-white hover:border-white"
            >
              {finalCta.secondaryCta}
            </Cta>
          </div>
        </div>

        <div data-reveal className="mt-[clamp(64px,8vw,112px)]">
          <DatumRule onNavy ticks />
          <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-0">
            <p className="label-xs text-white/40 lg:col-span-4">{site.market}</p>
            <p className="label-xs text-white/40 lg:col-span-8 lg:border-s lg:border-white/15 lg:ps-5">
              {site.profileEdition}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
