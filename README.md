# JP Enterprises — Interior Design & Civil Contracting Website

A premium, responsive marketing website for **JP Enterprises**, an interior design and civil contracting company based in Mumbai. Built as a Turborepo monorepo with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and Prisma.

---

## Architecture

```
jpenterprises_Web/
├── apps/
│   └── web/                      # Next.js 16 (App Router) — the website
│       ├── app/
│       │   ├── layout.tsx        # Root layout (Fraunces + Inter fonts, theme init)
│       │   ├── page.tsx          # Single-page site — Server Component
│       │   ├── actions.ts        # Server Action for appointment booking
│       │   └── globals.css       # Full design system (palette, animations)
│       ├── components/           # All UI components
│       ├── lib/config.ts         # Contact info, WhatsApp URLs, Google Maps
│       └── public/assets/        # Logo SVGs
├── packages/
│   ├── database/                 # Prisma schema, client, seed script
│   │   ├── prisma/
│   │   │   ├── schema.prisma     # Appointment + Testimonial models
│   │   │   └── seed.ts           # Sample testimonial data
│   │   └── src/index.ts          # Shared Prisma client export
│   ├── typescript-config/        # Shared tsconfig
│   └── eslint-config/            # Shared ESLint rules
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, Server Components)
- **Styling**: Tailwind CSS v4, custom CSS design system
- **Animation**: Framer Motion + CSS animations (SVG stroke-dashoffset draw-in)
- **Database**: PostgreSQL via Prisma 7 with pg adapter
- **Icons**: Lucide React, React Icons (WhatsApp)
- **Validation**: Zod

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#1C1B19` | Dark mode bg / light mode text |
| `--paper` | `#EDE7DD` | Light mode bg / dark mode text |
| `--brass` | `#B08D57` | Primary accent (light mode) |
| `--brass-light` | `#C7A369` | Primary accent (dark mode) |
| `--forest` | `#2F3B2C` | Section backgrounds (Process) |
| `--stone` | `#6B6459` | Secondary/muted text |

**Typography**: Fraunces (serif, headlines) + Inter (everything else)

---

## Database Schema

Two models in `packages/database/prisma/schema.prisma`:

- **Appointment** — `name`, `phone`, `serviceType`, `preferredDate`, `message`, `status` (default `NEW`), `createdAt`
- **Testimonial** — `clientName`, `area`, `quote`, `isPublished` (default `true`), `createdAt`

Testimonials are rendered from the database, making it easy to add real client quotes later without code changes.

---

## Development

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma client
pnpm --filter @repo/database db:generate

# 3. Start dev server
pnpm dev
```

The website runs at `http://localhost:3000`.

### Database Setup (optional — site works without it)

The site renders with fallback testimonials if no database is available.
To connect a real PostgreSQL database:

```bash
# Set the connection URL in packages/database/.env
DATABASE_URL="postgresql://user:password@host:5432/jpenterprises?schema=public"

# Push schema to database
pnpm --filter @repo/database db:push

# Seed sample testimonials
pnpm --filter @repo/database db:seed
```

---

## TODOs for Production

Search the codebase for `TODO` comments. Key items:

1. **WhatsApp number**: Replace `91XXXXXXXXXX` in `apps/web/lib/config.ts` with the real WhatsApp Business number
2. **Phone number**: Replace `+91 XXXXX XXXXX` in the same config file
3. **Google Maps**: Replace the embed URL with the actual Google Business listing embed
4. **Testimonials**: Replace sample testimonials in the database with real client quotes
5. **Logo files**: Located at `apps/web/public/assets/logo-light.svg` and `logo-dark.svg`

---

## Site Sections

1. **Hero** — Brass compass SVG draw-in animation, headline about precision, two CTAs
2. **Trust Strip** — Honest qualitative facts (no fake stats)
3. **Services** — Interior Design + Civil Contracting with line-art illustrations
4. **Process** — 4-step sequence: Site Visit → Design & Quote → Execution → Handover
5. **Portfolio** — Honest empty state with line-art + WhatsApp album request
6. **Testimonials** — Auto-advancing carousel, DB-driven, keyboard accessible
7. **Why JP** — Specific differentiators (no generic icon grid)
8. **Service Area Map** — Google Maps embed + directions link
9. **Appointment Form** — Books to DB + WhatsApp redirect
10. **Floating WhatsApp** — Fixed bottom-right, brass-ringed

---

## License

Private. © JP Enterprises.
