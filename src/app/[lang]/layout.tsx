import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent } from "@/content";
import { locales, isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.zakengineering.com";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const { site } = getSiteContent(lang);
  const dict = getDictionary(lang);
  const canonicalPath = localizedHref(lang, "/");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.metadata.homeTitle(site.name, site.positioning),
      template: `%s — ${site.name}`,
    },
    description: site.descriptor,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/",
        ar: "/ar",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "ar" ? "ar_SA" : "en",
      title: dict.metadata.homeTitle(site.name, site.positioning),
      description: site.descriptor,
      url: canonicalPath,
      images: [{ url: "/brand/og-cover.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.homeTitle(site.name, site.positioning),
      description: site.descriptor,
      images: ["/brand/og-cover.jpg"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#131a33",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { site, contact } = getSiteContent(lang);
  const dict = getDictionary(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  /**
   * Organization schema. Only fields the corporate profile substantiates —
   * no employee count, no aggregate value, no certification claims.
   */
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    description: site.descriptor,
    url: `${siteUrl}${localizedHref(lang, "/")}`,
    logo: `${siteUrl}/brand/zak-logo.png`,
    telephone: contact.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[0],
      postOfficeBoxNumber: "50570",
      addressLocality: contact.city,
      addressCountry: "SA",
    },
    areaServed: "SA",
    inLanguage: lang,
  };

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${ibmPlexSansArabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main" className="skip-link label-xs">
          {dict.a11y.skipToContent}
        </a>
        <Header lang={lang as Locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang as Locale} />
      </body>
    </html>
  );
}
