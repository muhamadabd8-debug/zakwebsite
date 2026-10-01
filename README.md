# ZAK Engineering Consultants — Website

Bilingual (English / Arabic, RTL) corporate website for ZAK Engineering Consultants.
Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.

- English is served at `/`, Arabic at `/ar` (e.g. `/projects/jeddah-tower` ↔ `/ar/projects/jeddah-tower`).
- Locale is remembered with a `NEXT_LOCALE` cookie (see `src/proxy.ts`).

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (English) or http://localhost:3000/ar (Arabic).

## Production build

```bash
npm run build
npm start
```

The scripts use `--webpack` on purpose (Turbopack failed to build this project in the original Windows setup).

## Environment variables

Copy `.env.example` to `.env.local` for local use; on a host, set the same variable in its dashboard.

| Variable | Purpose |
| --- | --- |
| `CONTACT_FORM_WEBHOOK_URL` | Endpoint that receives contact-form submissions as JSON (`src/lib/contact.ts`). **If unset, enquiries are only logged on the server and are not delivered anywhere.** |

## Project structure

```
src/
  app/[lang]/        All pages (home, about, capabilities, projects, sectors,
                     engineering-network, credentials, contact) + root layout
  app/sitemap.ts     Sitemap with en/ar alternates
  app/robots.ts
  components/        Layout, UI primitives, project and contact components
  content/en, ar/    Locale-specific content (site, projects, capabilities, sectors, credentials)
  i18n/              Locale config, UI dictionaries (en.ts / ar.ts)
  lib/contact.ts     Contact-form delivery adapter
  proxy.ts           Locale detection / rewrite (Next.js 16 "proxy", formerly middleware)
public/              Logos, hero texture, project images
```

Adding or editing copy: update both `src/content/en/*` and `src/content/ar/*`, and UI strings in `src/i18n/dictionaries/`.

## Deploy

See `DEPLOY.md`.
