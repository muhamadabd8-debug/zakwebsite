import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { DataPoint, ProjectParties } from "@/content/types";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ motion */

/** Sets --i on an element; reveal/entrance delays are multiples of it. */
export const stagger = (i: number): CSSProperties => ({ "--i": i }) as CSSProperties;

/* ------------------------------------------------------------------ layout */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-zak", className)}>{children}</div>;
}

/** Page-band wrapper. `tone` switches the ivory/navy rhythm from the profile. */
export function Section({
  children,
  tone = "cream",
  size = "default",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "cream" | "cream-deep" | "navy";
  size?: "default" | "lg" | "sm";
  className?: string;
  id?: string;
}) {
  const tones = {
    cream: "bg-cream text-ink",
    "cream-deep": "bg-cream-deep text-ink",
    navy: "bg-navy text-on-navy",
  };
  const sizes = {
    sm: "py-[clamp(48px,5vw,72px)]",
    default: "py-[var(--section-y)]",
    lg: "py-[var(--section-y-lg)]",
  };
  return (
    <section id={id} className={cn(tones[tone], sizes[size], className)}>
      <Container>{children}</Container>
    </section>
  );
}

/* -------------------------------------------------------------- typography */

/** Right-aligned (text-end) section tag, as used in the profile's page headers. */
export function SectionTag({
  children,
  onNavy,
  className,
}: {
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("label-xs", onNavy ? "text-white/60" : "text-navy-soft", className)}>
      {children}
    </p>
  );
}

/** Gold eyebrow — the profile's primary orienting device. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("label-xs text-gold", className)}>{children}</p>;
}

/** Short gold rule that sits under "ZAK scope / verified role" in the profile. */
export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-10 bg-gold", className)} />;
}

export function Hairline({ onNavy, className }: { onNavy?: boolean; className?: string }) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        onNavy ? "border-white/15" : "border-rule",
        className
      )}
    />
  );
}

export function DisplayTitle({
  children,
  as: Tag = "h2",
  size = "lg",
  onNavy,
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  onNavy?: boolean;
  className?: string;
}) {
  const sizes = {
    xl: "display-hero text-[length:var(--step-6)]",
    lg: "display text-[length:var(--step-4)]",
    md: "display text-[length:var(--step-3)]",
  };
  return (
    <Tag
      className={cn(
        sizes[size],
        onNavy ? "text-white" : "text-navy-soft",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Two-part heading bisected by a hairline — one phrase flush to the reading
 * start, one flush to the reading end (mirrors correctly under RTL because
 * the grid's inline axis follows `dir`, and both halves are text-aligned
 * logically rather than physically). Use at most twice per page, in
 * non-adjacent sections, and only where the title genuinely has two halves.
 * Both halves must come from existing page copy. Inside a [data-reveal]
 * block the halves rise and the rule draws (horizontal on mobile, vertical
 * from 640px).
 */
export function SplitHeading({
  left,
  right,
  onNavy,
  as: Tag = "h2",
  className,
}: {
  left: ReactNode;
  right: ReactNode;
  onNavy?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={cn("split-heading", className)} data-on-navy={onNavy ? "" : undefined}>
      <span
        className={cn(
          "r-rise display-hero text-start text-[length:var(--step-5)]",
          onNavy ? "text-white" : "text-navy-soft"
        )}
      >
        {left}
      </span>{" "}
      <span aria-hidden className="split-heading-rule r-draw-split" style={stagger(1)} />{" "}
      <span
        className={cn(
          "r-rise display-hero text-end text-[length:var(--step-5)]",
          onNavy ? "text-white" : "text-navy-soft"
        )}
        style={stagger(2)}
      >
        {right}
      </span>
    </Tag>
  );
}

export function Lead({
  children,
  onNavy,
  className,
}: {
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "measure text-[length:var(--step-1)] leading-relaxed font-light",
        onNavy ? "text-white/75" : "text-ink-muted",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  onNavy,
  className,
}: {
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("measure leading-relaxed", onNavy ? "text-white/70" : "text-ink-muted", className)}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ action */

export function Cta({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onNavy";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 px-6 py-3.5 label-xs transition-colors duration-200 min-h-[44px]";
  const variants = {
    primary: "bg-navy text-white hover:bg-navy-soft",
    secondary: "border border-navy/25 text-navy-soft hover:border-navy",
    ghost: "text-navy-soft hover:text-gold",
    onNavy: "bg-gold text-navy hover:bg-gold-soft",
  };
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <span
        aria-hidden
        className="rtl:-scale-x-100 transition-transform duration-200 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/** Quiet inline link with the arrow shift used throughout the site. */
export function ArrowLink({
  href,
  children,
  onNavy,
  className,
}: {
  href: string;
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[length:var(--step--1)] font-medium transition-colors",
        onNavy ? "text-white hover:text-gold" : "text-navy-soft hover:text-gold",
        className
      )}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <span
        aria-hidden
        className="rtl:-scale-x-100 transition-transform duration-200 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------- data */

/** Hairline-ruled statistic grid, mirroring the profile's PROJECT DATA block. */
export function DataGrid({
  items,
  onNavy,
  columns = 2,
}: {
  items: DataPoint[];
  onNavy?: boolean;
  columns?: 2 | 3 | 4;
}) {
  if (items.length === 0) return null;
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };
  return (
    <dl className={cn("grid grid-cols-1 gap-x-10 gap-y-8", cols[columns])}>
      {items.map((item) => (
        <div key={item.label} className={cn("border-t pt-4", onNavy ? "border-white/15" : "border-rule")}>
          <dd
            className={cn(
              "display text-[length:var(--step-2)]",
              onNavy ? "text-white" : "text-navy-soft"
            )}
          >
            {item.value}
          </dd>
          <dt className={cn("label-xs mt-2", onNavy ? "text-white/55" : "text-ink-muted")}>
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/** Project parties row — keeps ZAK's role distinct from other stakeholders. */
export function PartyList({
  parties,
  labels,
}: {
  parties: ProjectParties;
  labels: Record<keyof ProjectParties, string>;
}) {
  const entries = (Object.keys(labels) as (keyof ProjectParties)[])
    .filter((key) => parties[key])
    .map((key) => ({ label: labels[key], value: parties[key] as string }));

  if (entries.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <div key={entry.label} className="border-t border-rule pt-4">
          <dt className="label-xs text-ink-muted">{entry.label}</dt>
          <dd className="mt-2 text-[length:var(--step-0)] text-navy-soft" dir="auto">
            {entry.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Numbered editorial item — the profile's 01/02/03 block pattern.
 * layout="row" turns it into a ledger row (index · title · body across 12 cols).
 * The top rule is an element, not a border, so it can draw in on reveal.
 */
export function NumberedItem({
  index,
  title,
  children,
  onNavy,
  layout = "stack",
  rule = true,
  className,
}: {
  index: string;
  title: string;
  children: ReactNode;
  onNavy?: boolean;
  layout?: "stack" | "row";
  rule?: boolean;
  className?: string;
}) {
  const row = layout === "row";
  return (
    <div
      className={cn(
        "relative pt-5",
        row && "grid gap-2 pb-8 md:grid-cols-12 md:items-baseline md:gap-x-10 md:pt-7",
        className
      )}
    >
      {rule && (
        <span
          aria-hidden
          className={cn("r-draw-x absolute inset-x-0 top-0 h-px", onNavy ? "bg-white/15" : "bg-rule")}
        />
      )}
      <span className={cn("label-xs text-gold", row && "md:col-span-2")}>{index}</span>
      <h3
        className={cn(
          "text-[length:var(--step-1)] font-medium",
          row ? "mt-1 md:col-span-4 md:mt-0" : "mt-3",
          onNavy ? "text-white" : "text-navy-soft"
        )}
      >
        {title}
      </h3>
      <div
        className={cn(
          "leading-relaxed",
          row ? "text-[length:var(--step-0)] md:col-span-6" : "mt-2 text-[length:var(--step--1)]",
          onNavy ? "text-white/65" : "text-ink-muted"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- signature device */

/**
 * 12-bay structural grid texture. Place as the first child of a
 * `relative isolate overflow-hidden` band; the lines align with the
 * container's content box, so datum ticks and title-block cells land on them.
 * The repeating tick pattern is symmetric, so it needs no RTL adjustment.
 */
export function StructuralGrid({ onNavy, className }: { onNavy?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div className="container-zak h-full">
        <div className="structural-grid" data-on-navy={onNavy ? "" : undefined} />
      </div>
    </div>
  );
}

/**
 * Ambient texture backdrop for navy hero bands with no real project photo to
 * lead with (About, Capabilities, Sectors, Engineering network, Credentials,
 * Contact). Place as the first child of a `relative isolate overflow-hidden`
 * Section; positions full-bleed regardless of the container's max-width.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("texture-field pointer-events-none absolute inset-0 -z-10", className)} />
  );
}

/**
 * Datum rule — a hairline with dimension-line end ticks and, optionally,
 * 12 column ticks hanging below it. `animate`: "reveal" draws on scroll
 * (inside [data-reveal]), "enter" draws on load (hero), "none" is static.
 * End ticks sit at both edges (symmetric), so no RTL adjustment is needed.
 */
export function DatumRule({
  onNavy,
  ticks,
  animate = "reveal",
  className,
}: {
  onNavy?: boolean;
  ticks?: boolean;
  animate?: "reveal" | "enter" | "none";
  className?: string;
}) {
  const draw = animate === "reveal" ? "r-draw-x" : animate === "enter" ? "enter-draw" : "";
  return (
    <div
      aria-hidden
      className={cn("relative h-px", onNavy ? "text-white/20" : "text-navy/25", className)}
    >
      <span className={cn("absolute inset-0 bg-current", draw)} />
      <span className="absolute -top-[4px] start-0 h-[9px] w-px bg-current" />
      <span className="absolute -top-[4px] end-0 h-[9px] w-px bg-current" />
      {ticks && (
        <span
          className={cn(
            "datum-ticks absolute inset-x-0 top-0 h-[6px]",
            animate === "reveal" ? "r-fade" : animate === "enter" ? "enter-fade" : ""
          )}
        />
      )}
    </div>
  );
}

/** Square column node — the plan-view mark used on schematic spines. */
export function ColumnNode({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("r-node absolute block h-[9px] w-[9px] border border-gold bg-gold", className)}
    />
  );
}

/**
 * Photographic plate: navy/cream duotone (see .duotone in globals.css) with
 * four registration marks set just outside the corners. Children should be a
 * next/image with `fill`.
 */
export function DuotoneFrame({
  children,
  onNavy,
  className,
}: {
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  const mark = cn("absolute h-3.5 w-3.5", onNavy ? "border-white/35" : "border-navy/30");
  return (
    <div className={cn("relative", className)}>
      <div className="duotone h-full w-full overflow-hidden">{children}</div>
      <span aria-hidden className={cn(mark, "-start-2.5 -top-2.5 border-t rtl:border-e ltr:border-s")} />
      <span aria-hidden className={cn(mark, "-end-2.5 -top-2.5 border-t rtl:border-s ltr:border-e")} />
      <span aria-hidden className={cn(mark, "-bottom-2.5 -start-2.5 border-b rtl:border-e ltr:border-s")} />
      <span aria-hidden className={cn(mark, "-bottom-2.5 -end-2.5 border-b rtl:border-s ltr:border-e")} />
    </div>
  );
}
