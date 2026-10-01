import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { localizedHref, type Locale } from "@/i18n/config";

/**
 * Project card. Where the profile supplies a rights-cleared image it leads;
 * where it does not, the card falls back to a typographic treatment rather
 * than a placeholder graphic.
 */
export function ProjectCard({
  project,
  lang,
  priority = false,
  size = "default",
}: {
  project: Project;
  lang: Locale;
  priority?: boolean;
  size?: "default" | "feature";
}) {
  const isFeature = size === "feature";

  return (
    <Link
      href={localizedHref(lang, `/projects/${project.slug}`)}
      className="group flex flex-col focus-visible:outline-offset-4"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-cream-deep",
          isFeature ? "aspect-[4/3]" : "aspect-[3/2]"
        )}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority={priority}
            sizes={
              isFeature
                ? "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            }
            className="object-cover transition-transform duration-500 ease-[var(--ease)] group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-end border border-rule bg-cream-deep p-6">
            <span className="label-xs text-ink-muted">{project.sector}</span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="label-xs text-gold">{project.sector}</span>
          <span aria-hidden className="text-rule">
            /
          </span>
          <span className="label-xs text-ink-muted">{project.location}</span>
        </div>

        <h3
          className={cn(
            "display mt-3 text-navy-soft transition-colors group-hover:text-gold",
            isFeature ? "text-[length:var(--step-3)]" : "text-[length:var(--step-2)]"
          )}
        >
          {project.shortTitle}
        </h3>

        <p className="measure mt-3 text-[length:var(--step--1)] leading-relaxed text-ink-muted">
          {project.verifiedRole.length > 165
            ? `${project.verifiedRole.slice(0, 162).trimEnd()}…`
            : project.verifiedRole}
        </p>

        {project.data[0] && (
          <p className="mt-4 flex items-baseline gap-2">
            <span className="display text-[length:var(--step-2)] text-navy-soft">
              {project.data[0].value}
            </span>
            <span className="label-xs text-ink-muted">{project.data[0].label}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
