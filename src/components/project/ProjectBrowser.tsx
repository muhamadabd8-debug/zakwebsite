"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Project, Sector } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/**
 * Sector filter over the full project record. Client-side so filtering never
 * reloads the page; the unfiltered list renders on the server first, so every
 * project remains reachable without JavaScript.
 */
export function ProjectBrowser({
  projects,
  sectors,
  lang,
}: {
  projects: Project[];
  sectors: Sector[];
  lang: Locale;
}) {
  const [active, setActive] = useState<string>("all");
  const dict = getDictionary(lang);

  const TIER_LABELS: Record<Project["tier"], string> = {
    flagship: dict.projectBrowser.tierFlagship,
    selected: dict.projectBrowser.tierSelected,
    extended: dict.projectBrowser.tierExtended,
  };

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.sectorSlug === active)),
    [projects, active]
  );

  const grouped = useMemo(() => {
    const order: Project["tier"][] = ["flagship", "selected", "extended"];
    return order
      .map((tier) => ({ tier, items: visible.filter((p) => p.tier === tier) }))
      .filter((g) => g.items.length > 0);
  }, [visible]);

  const usedSectors = sectors.filter((s) =>
    projects.some((p) => p.sectorSlug === s.slug)
  );

  return (
    <div>
      <div className="border-y border-rule py-5">
        <div
          role="group"
          aria-label={dict.projectBrowser.filterAriaLabel}
          className="flex flex-wrap gap-x-6 gap-y-3"
        >
          <FilterButton
            active={active === "all"}
            onClick={() => setActive("all")}
            count={projects.length}
          >
            {dict.projectBrowser.allProjects}
          </FilterButton>
          {usedSectors.map((s) => (
            <FilterButton
              key={s.slug}
              active={active === s.slug}
              onClick={() => setActive(s.slug)}
              count={projects.filter((p) => p.sectorSlug === s.slug).length}
            >
              {s.name}
            </FilterButton>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="label-xs mt-6 text-ink-muted">
        {dict.projectBrowser.showingCount(visible.length, projects.length)}
      </p>

      {grouped.map((group) => (
        <section key={group.tier} className="mt-14">
          <h2 className="label-xs text-gold">{TIER_LABELS[group.tier]}</h2>
          <div className="mt-8 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "label-xs min-h-[44px] transition-colors",
        active ? "text-gold" : "text-ink-muted hover:text-navy-soft"
      )}
    >
      {children}
      <span className="ms-1.5 opacity-60">{count}</span>
    </button>
  );
}
