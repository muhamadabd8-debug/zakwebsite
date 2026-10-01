import { Eyebrow, GoldRule } from "@/components/ui/primitives";

/**
 * "ZAK scope / verified role" — the profile's signature device (gold eyebrow,
 * short gold rule, then the scope statement). Used on every project page so
 * ZAK's own contribution is never confused with the wider project record.
 */
export function VerifiedRole({ role, eyebrow }: { role: string; eyebrow: string }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <GoldRule className="mt-4" />
      <p className="measure mt-5 text-[length:var(--step-1)] leading-relaxed font-light text-navy-soft">
        {role}
      </p>
    </div>
  );
}
