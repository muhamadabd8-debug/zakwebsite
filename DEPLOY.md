# Publishing the site

## 1. Put the code on GitHub

Run inside this folder (the one containing `package.json`):

```bash
git init
git add .
git commit -m "Initial commit: ZAK bilingual website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Create the empty repository on github.com first (no README/.gitignore). `node_modules`, `.next` and `.env*` files are excluded by `.gitignore`.

## 2. Make it public with Vercel (recommended, free tier)

1. Sign in at https://vercel.com with your GitHub account.
2. **Add New → Project** → import the repository.
3. Framework preset: **Next.js** (auto-detected). Leave build command and output directory as default (`npm run build`).
4. Under **Environment Variables**, add `CONTACT_FORM_WEBHOOK_URL` (see below).
5. Click **Deploy**. You get a public `https://<project>.vercel.app` URL in about two minutes. Every push to `main` redeploys automatically.

## 3. Before you announce it

- **Contact form:** without `CONTACT_FORM_WEBHOOK_URL`, the form shows "success" but the enquiry is not delivered. Point it at a webhook (Zapier/Make/Formspree-style endpoint, CRM intake, etc.) or replace `src/lib/contact.ts` with an email provider.
- **Domain / SEO:** canonical URLs, hreflang, sitemap and structured data use `https://www.zakengineering.com` (hard-coded in `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/[lang]/layout.tsx`, `src/components/seo/Breadcrumb.tsx`). Either attach that domain in Vercel (Project → Settings → Domains) or change those four constants to your real domain. On a `*.vercel.app` URL the canonical tags would point at a domain you may not control.
