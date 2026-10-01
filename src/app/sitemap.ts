import type { MetadataRoute } from "next";
import { getProjects, getCapabilities } from "@/content";
import { locales, localizedHref, defaultLocale } from "@/i18n/config";

const siteUrl = "https://www.zakengineering.com";

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}${localizedHref(l, path)}`])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/capabilities", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/sectors", priority: 0.7 },
    { path: "/engineering-network", priority: 0.7 },
    { path: "/credentials", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  const projectSlugs = getProjects(defaultLocale).map((p) => ({
    path: `/projects/${p.slug}`,
    priority: p.tier === "flagship" ? 0.8 : 0.6,
  }));
  const capabilitySlugs = getCapabilities(defaultLocale).map((c) => ({
    path: `/capabilities/${c.slug}`,
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...capabilitySlugs, ...projectSlugs];

  return locales.flatMap((lang) =>
    allRoutes.map((r) => ({
      url: `${siteUrl}${localizedHref(lang, r.path)}`,
      lastModified,
      priority: r.priority,
      alternates: alternates(r.path),
    }))
  );
}
