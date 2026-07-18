# JP Enterprises — Interior Design & Civil Contracting (Mumbai)

A high-performance, responsive marketing platform and client management portal for **JP Enterprises**, an established interior design and civil contracting firm based in Thakur Complex, Kandivali (Mumbai).

---

## ✦ Key Features

### 🏢 Immersive 3D Experience & Design Concepts
- **Scroll-Driven 3D Home Tour**: WebGL camera dolly walkthrough powered by React Three Fiber (`@react-three/fiber`) and Three.js (`three`). Visitors move through 4 rooms along a Z-axis path through 3D architectural doorframes with high-DPI texture filtering (`dpr={[1, 2]}`) and on-demand rendering (`frameloop="demand"`).
- **Design Concepts Gallery**: High-resolution WebP visualizations with honest "Concept visualization" labeling.
- **Brand Aesthetic**: Warm brass and charcoal linework design system inspired by architectural drafting (`Fraunces` serif display headings + `Inter` body typography).

### 🛠️ Interactive Tool Suite
- **Slot-Picker Site Visit Booking** (`/#contact`): Calendar slot selector with double-booking prevention and automatic WhatsApp pre-filled messaging.
- **Cost Estimator** ([`/estimate`](file:///c:/jpenterprises_Web/apps/web/app/estimate/page.tsx)): 4-step interactive calculator producing indicative budget estimates by finish tier.
- **Style Quiz** ([`/style-quiz`](file:///c:/jpenterprises_Web/apps/web/app/style-quiz/page.tsx)): 4-question visual quiz matching client preferences to curated design profiles.
- **Renovation Checklist** ([`/checklist`](file:///c:/jpenterprises_Web/apps/web/app/checklist/page.tsx)): Interactive room-by-room preparation checklist with PDF print/export support.
- **Refer & Earn Program** ([`/refer`](file:///c:/jpenterprises_Web/apps/web/app/refer/page.tsx)): Referral registration system generating unique tracking codes (`JP-REF-XXXXX`).

### 🔒 Client Portal & Admin Dashboard
- **Client Project Tracker** ([`/status/[token]`](file:///c:/jpenterprises_Web/apps/web/app/status/[token]/page.tsx)): Unauthenticated private link for clients to view real-time project progress (`ENQUIRY` → `DESIGN` → `APPROVAL` → `EXECUTION` → `HANDOVER`).
- **Internal Owner Dashboard** ([`/admin`](file:///c:/jpenterprises_Web/apps/web/app/admin/page.tsx)): Password-gated admin portal to generate tracking links, post timeline updates, and manage lead enquiries.

---

## ⚙️ Tech Stack

- **Monorepo**: Turbopack + `pnpm` workspaces
- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **3D Graphics & Animation**: React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Three.js (`three`), GSAP (ScrollTrigger), Framer Motion
- **Database & ORM**: Prisma 7 (`provider = "prisma-client"`), PostgreSQL (Neon / Vercel Postgres)
- **Styling**: Tailwind CSS v4, Vanilla CSS design tokens, Lucide Icons, React Icons

---

## 📁 Repository Structure

```
jpenterprises_Web/
├── apps/
│   └── web/                   # Next.js 16 App Router application
│       ├── app/               # Routes: /, /estimate, /style-quiz, /checklist, /refer, /status/[token], /admin
│       ├── components/        # React components & RoomTour WebGL scene
│       ├── config/            # Pricing rules & business metadata
│       ├── lib/               # Contact config with dynamic env fallbacks
│       └── public/            # Static assets & optimized WebP concept renders
└── packages/
    └── database/              # Prisma 7 schema, client, and seed script
        ├── generated/         # Compiled JS-native client output
        ├── prisma/            # schema.prisma, migrations, seed.ts
        └── src/               # Re-exported database client
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `20.x` or higher
- `pnpm` (`v9.0.0` or higher)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/legaceee/jpweb.git
cd jpenterprises_Web

# Install dependencies
pnpm install
```

### 3. Environment Setup
Create `apps/web/.env` (and optionally `packages/database/.env`):

```env
# Database connection (Neon or Vercel Postgres)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jpenterprises?schema=public"

# Admin Dashboard Access
ADMIN_PASSWORD="your-secure-admin-password"

# Optional Business Contact Overrides
NEXT_PUBLIC_PHONE="+91 99203 33484"
NEXT_PUBLIC_WHATSAPP="919920333484"
NEXT_PUBLIC_EMAIL="info@jpenterprises.com"
```

### 4. Database Setup & Seeding
```bash
# Push schema to PostgreSQL database
pnpm --filter db exec prisma db push

# Seed sample data (Testimonials & Demo Tracking Project)
pnpm --filter db exec prisma db seed
```

### 5. Running Locally
```bash
# Start Next.js development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔨 Verification & Build

```bash
# Check TypeScript types across all workspace packages
pnpm check-types

# Build production bundle
pnpm build

# Start production server
pnpm --filter web start
```

---

## 🌐 Deployment (Vercel + Neon)

1. Connect repository to **Vercel**.
2. Configure Environment Variables in Vercel settings:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `ADMIN_PASSWORD` (Password for `/admin` access)
   - `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL` (Optional overrides)
3. Set build command: `pnpm build`
4. Set output directory: default Next.js output.

---

## 📄 License

Copyright © 2026 JP Enterprises. All rights reserved.
