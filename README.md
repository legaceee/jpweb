# JP Enterprises — Website

Marketing website for JP Enterprises, an interior design and civil contracting company serving Mumbai.

## What this is

A fully responsive, multi-page site with:
- Light/dark theme toggle (persisted, respects system preference on first load)
- English / Hindi / Marathi language toggle
- Direct WhatsApp booking (floating button + appointment form that opens a pre-filled WhatsApp chat)
- **Site visit scheduler** — real calendar + time-slot picker, prevents double-booking
- **Cost estimator** (`/estimate`) — guided calculator giving an indicative price range
- **Style quiz** (`/style-quiz`) — 5–6 questions → a personalized style profile
- **Renovation checklist** (`/checklist`) — interactive room-by-room checklist, downloadable as PDF or sent via WhatsApp
- **Refer & Earn** (`/refer`) — referral capture with shareable WhatsApp link
- **Client project status** (`/status/[token]`) — private link showing a client's project stage
- A minimal password-protected `/admin` for updating project stages and viewing enquiries/referrals
- Testimonials carousel
- Embedded Google Map to the shop location
- Scroll and hover animations, built around a brass architectural-drafting visual identity (no stock photos — original line-art illustrations instead)

## Tech stack
- **Turborepo** monorepo (`pnpm` workspaces)
  - `apps/web` — Next.js (App Router, TypeScript)
  - `packages/db` — Prisma schema, client, and seed script
- **Next.js**, latest stable, Server Components + Server Actions
- **Prisma** (latest), PostgreSQL (Neon or Vercel Postgres recommended)
- Tailwind CSS + Framer Motion (animations)
- The appointment form both **saves to the database** (via Prisma) and **hands off to WhatsApp** via a `wa.me` link — so every enquiry is recorded even if the visitor doesn't have WhatsApp open on that device

## Getting started

```bash
pnpm install

# copy the env template and set your database connection string
cp apps/web/.env.example apps/web/.env
# DATABASE_URL="postgresql://..."   (Neon or Vercel Postgres both work)

# set up the database
pnpm --filter db exec prisma migrate dev
pnpm --filter db exec prisma db seed   # loads the sample testimonials

pnpm dev       # runs the whole monorepo via Turborepo (Next.js dev server)
pnpm build     # production build, all packages, in dependency order
```

Prisma Studio (`pnpm --filter db exec prisma studio`) is the easiest way to view or edit appointments and testimonials directly in the database without writing code.

## Before you launch — required edits

These are placeholders that must be replaced with real information:

| What | Where | Notes |
|---|---|---|
| WhatsApp number | `src/config/business.ts` (or equivalent) | Currently a placeholder `91XXXXXXXXXX` — replace with the real WhatsApp Business number |
| Phone number | Footer, Contact section | |
| Email | Footer, Contact section | |
| Map location | Map embed component | Confirm the pin lands exactly on Rashmi Avenue, Shop No. 6, Thakur Complex |
| Testimonials | `Testimonial` table (edit via Prisma Studio, or update the seed script) | Sample testimonials are seeded data, not hardcoded — swap in real client quotes any time without a code deploy |
| Database connection | `apps/web/.env` → `DATABASE_URL` | Needs a real Postgres connection string (Neon/Vercel Postgres free tier is enough for this site) |
| Trust-strip numbers | Hero/Trust section | Only real, confirmable figures (years in business, etc.) — don't publish invented stats |
| Portfolio | Portfolio section | Currently an honest "coming soon, ask on WhatsApp" state. Replace with real project photos and captions once available — this is the highest-impact update once photography exists |
| Logo files | `/public/assets/logo-light.svg`, `/public/assets/logo-dark.svg` | Starter logo included (see below) — swap in a refined version if you have one made |
| Admin password | `apps/web/.env` → `ADMIN_PASSWORD` | Set this to something real before deploying — the `/admin` route uses it to gate access, no other login exists |
| Cost estimator rates | `apps/web/config/pricing.ts` | Placeholder per-sq-ft rates by finish tier — replace with real numbers before launch, or the estimator will mislead people |
| Referral incentive terms | `/refer` page copy | Left as a marked `TODO` — the actual discount/reward needs to be decided and confirmed before this page goes live |
| Hindi/Marathi copy | `apps/web/messages/hi.json`, `mr.json` (or equivalent i18n files) | Drafted by the AI build — get a native speaker to review before launch, since machine-drafted translations can carry subtle errors |

## Logo

Two starter logo files are included: `logo-light.svg` (for light backgrounds) and `logo-dark.svg` (for dark backgrounds). Both use the brand's brass/charcoal/ivory palette and a compass-mark motif fitting the design + construction business. These are a solid starting point but were generated as vector text, not hand-set type — if you want a fully polished, trademark-ready logo, take these into a design tool (Illustrator, Figma, or a logo designer) and convert the text to outlined paths.

## Getting real project photography

The single biggest upgrade to this site's credibility is real photos. When photos become available:
1. Shoot (or have someone shoot) finished projects — good phone photos in daylight are enough to start
2. Replace the Portfolio section's illustrations with a real photo grid
3. Add a few before/after pairs if renovation "before" shots exist — these are highly persuasive for a contracting business

## Deployment

- **Vercel** is the natural fit — it auto-detects Turborepo + Next.js, and Vercel Postgres integrates in a couple of clicks if you don't already have a Neon database.
- Set `DATABASE_URL` in the Vercel project's environment variables (same value as your local `.env`).
- Run `prisma migrate deploy` (not `migrate dev`) as part of the build/release step in production.

## Project structure (expected — actual output depends on what Antigravity generates)

```
/apps
  /web
    /app
      /                   # home (single-page marketing sections)
      /estimate           # cost estimator
      /style-quiz          # style quiz
      /checklist            # renovation planning checklist
      /refer                 # refer & earn
      /status/[token]         # client project status (private link)
      /admin                   # password-gated internal dashboard
    /components   # Nav, Hero, Services, Process, Portfolio, Testimonials, Map, BookingForm, Footer, WhatsAppButton, ThemeToggle, LanguageToggle
    /config       # business.ts, pricing.ts
    /messages     # en.json, hi.json, mr.json (i18n copy)
    /public/assets # logo-light.svg, logo-dark.svg, line-art illustrations
    .env.example
/packages
  /db
    /prisma       # schema.prisma, migrations, seed.ts
turbo.json
pnpm-workspace.yaml
```

## A note on build order

This is now a genuinely full-featured build — worth asking Antigravity to build it in stages rather than all at once, so each piece can be checked before the next is layered on:
1. Design system, nav, hero, and core marketing sections (Services, Process, Testimonials, Map, Footer)
2. Appointment booking + scheduler + WhatsApp handoff + database
3. Cost estimator, style quiz, checklist
4. Client status portal + admin
5. Refer & earn
6. Language toggle (do this last, once English copy is finalized, so translations don't need to be redone)

## Design notes

Full design brief and rationale is in `ANTIGRAVITY_PROMPT.md` in this same project — keep it alongside the code as a reference for anyone (including a future AI agent) making further changes, so edits stay consistent with the original direction instead of drifting toward generic template defaults.
