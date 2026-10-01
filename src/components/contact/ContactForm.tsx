"use client";

import { useActionState, useId } from "react";
import type { ReactNode } from "react";
import { submitContactForm, type ContactFormState } from "@/app/[lang]/contact/actions";
import { getCapabilities } from "@/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "w-full border border-rule bg-white px-4 py-3 text-[length:var(--step-0)] text-ink outline-none transition-colors focus:border-navy";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-xs text-ink-muted">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm({ lang }: { lang: Locale }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const statusId = useId();
  const dict = getDictionary(lang);
  const capabilities = getCapabilities(lang);
  const f = dict.form;

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <input type="hidden" name="lang" value={lang} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={f.name} required>
          <input name="name" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label={f.company} required>
          <input
            name="company"
            required
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label={f.workEmail} required>
          <input
            type="email"
            name="workEmail"
            required
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            className={fieldClass}
          />
        </Field>
        <Field label={f.phone}>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className={fieldClass}
          />
        </Field>
        <Field label={f.opportunity}>
          <input name="opportunity" className={fieldClass} />
        </Field>
        <Field label={f.projectLocation}>
          <input name="projectLocation" className={fieldClass} />
        </Field>
        <Field label={f.requiredCapability}>
          <select name="requiredCapability" defaultValue="" className={fieldClass}>
            <option value="">{f.selectCapability}</option>
            {capabilities.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value={f.notSureYet}>{f.notSureYet}</option>
          </select>
        </Field>
        <Field label={f.projectStage}>
          <select name="projectStage" defaultValue="" className={fieldClass}>
            <option value="">{f.selectStage}</option>
            {f.stageOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={f.message} required>
        <textarea name="message" required rows={6} className={fieldClass} />
      </Field>

      {/* Honeypot — hidden from users and assistive tech, catches naive bots. */}
      <div aria-hidden className="absolute start-[-9999px]">
        <label>
          Company website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset id="prequalification" className="scroll-mt-28 border-t border-rule pt-6">
        <legend className="label-xs text-ink-muted">{f.documentRequests}</legend>
        <div className="mt-4 flex flex-col gap-3">
          <label className="flex items-center gap-3 text-[length:var(--step--1)] text-ink">
            <input
              type="checkbox"
              name="requestCorporateProfile"
              className="h-4 w-4 accent-[var(--navy)]"
            />
            {f.requestCorporateProfile}
          </label>
          <label className="flex items-center gap-3 text-[length:var(--step--1)] text-ink">
            <input
              type="checkbox"
              name="requestPrequalification"
              className="h-4 w-4 accent-[var(--navy)]"
            />
            {f.requestPrequalification}
          </label>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={isPending}
          aria-describedby={state.status !== "idle" ? statusId : undefined}
          className="inline-flex min-h-[44px] items-center bg-navy px-7 py-3.5 label-xs text-white transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {isPending ? f.sending : f.submit}
        </button>

        {state.status !== "idle" && (
          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className={
              state.status === "success"
                ? "text-[length:var(--step--1)] text-navy-soft"
                : "text-[length:var(--step--1)] text-[#a4262c]"
            }
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
