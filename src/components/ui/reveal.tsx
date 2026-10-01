"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page. Content ships visible (no JS, crawlers,
 * reduced motion); hidden states only apply once <html> carries
 * .reveal-ready. Blocks already on screen at mount are marked revealed in the
 * same frame, so nothing above the fold flickers.
 *
 * Count-up: any [data-countup="N"] inside a revealed block counts 0 → N over
 * 900ms (ease-out cubic), keeping the rendered digit width (so "06" stays
 * two digits). Pair it with an sr-only copy of the final value and
 * aria-hidden on the animated node.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const vh = window.innerHeight;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => {
        const r = el.getBoundingClientRect();
        const onScreen = r.top < vh && r.bottom > 0;
        if (onScreen) el.dataset.revealed = "";
        return !onScreen;
      }
    );
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealed = "";
          el.querySelectorAll<HTMLElement>("[data-countup]").forEach(countUp);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    pending.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.countup);
  if (!Number.isFinite(target) || target <= 0) return;
  const width = (el.textContent ?? "").trim().length;
  const fmt = (n: number) => String(n).padStart(width, "0");
  const duration = 900;
  let start: number | null = null;
  el.textContent = fmt(0);
  const tick = (now: number) => {
    start ??= now;
    const t = Math.min(1, (now - start) / duration);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
