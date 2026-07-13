# JP Enterprises - Premium Interior Design & Civil Contractor Website

A premium, production-ready, highly optimized Next.js 16 (App Router) monorepo web application developed for **JP Enterprises**, featuring modern branding, dynamic service catalogs, filterable project galleries, appointment scheduling, and automated email/WhatsApp integration systems.

---

## 1. Project Architecture

This project is configured as a Monorepo using `pnpm workspaces` and `Turborepo`:

```
jpenterprises_Web/
├── apps/
│   └── web/                   # Next.js 16 (App Router) Frontend App
│       ├── app/               # Page routes (Static & Dynamic)
│       ├── components/        # Premium UI layout elements (Header, Footer, Floating WhatsApp)
│       ├── public/            # Logo SVGs and premium generated PNG images
│       └── postcss.config.js  # PostCSS Tailwind CSS v4 processor configuration
├── packages/
│   ├── database/              # PostgreSQL client wrapper package
│   │   ├── prisma/            # Schema definition and config models
│   │   └── src/index.ts       # Shared Prisma client export
│   ├── typescript-config/     # Base compiler configurations
│   ├── eslint-config/         # Shared linter rules
│   └── ui/                    # Reusable common react components
├── package.json               # Root monorepo configuration
└── pnpm-workspace.yaml        # Workspaces registration
```

---

## 2. Technology Stack

* **Frontend Framework**: Next.js 16 (App Router) & React 19
* **Styling compiler**: Tailwind CSS v4 & PostCSS
* **Transitions**: Framer Motion
* **Form bindings**: React Hook Form & Zod Validations
* **Database engine**: PostgreSQL
* **ORM client**: Prisma (v7.8.0)
* **Mail Dispatcher**: Nodemailer (via SMTP)
* **Visual Icons**: Lucide React & React Icons

---

## 3. Database Schema

The PostgreSQL schema contains four active tracking models defined in `packages/database/prisma/schema.prisma`:

* **Appointment**: Stores fullName, phone, email, address, preferredDate, preferredTime, service, and current status (`LeadStatus`).
* **QuotationRequest**: Tracks estimates requested by customers, storing budgeting tiers, site location, and project descriptions.
* **ContactForm**: Stores general user feedback messages.
* **Newsletter**: Stores unique user email addresses for campaign subscription.

All leads default to a status of `PENDING` and support progressive updates to `CONTACTED`, `QUOTED`, `WON`, or `LOST`.

---

## 4. Environment Variables (`.env` Configuration)

Create a `.env` file at the root of the workspace or in `apps/web/.env` with the following variables:

```bash
# Database URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jpenterprises?schema=public"

# SMTP Nodemailer Settings
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT=2525
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"

# WhatsApp Business Dispatch Credentials (or Twilio endpoint settings)
WHATSAPP_API_KEY="your-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-id"
BUSINESS_WHATSAPP="+919876543210" # Number that receives new lead alerts
```

*Note: In development, in the absence of SMTP or WhatsApp credentials, the application gracefully prints confirmation emails and WhatsApp payload layouts to the terminal console.*

---

## 5. Development Guide

To start the local workspace development server:

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma Client
pnpm --filter @repo/database db:generate

# 3. Start developer servers
pnpm dev
```

The web application runs on `http://localhost:3000`.

---

## 6. Build and Verification Checks

Compile and bundle the project packages for production output:

```bash
# Runs TypeScript compiler checks and compiles static pages
pnpm run build
```

---

## 7. Integrations

### Nodemailer Email Templates
All lead form actions automatically dispatch HTML-formatted email alerts to the user. The templates utilize a warm minimalism aesthetic with responsive styling, detailed project parameters, support contacts, and official branding colors.

### WhatsApp Business API integration
Client entries trigger a mock API post-handler. The server formats standard payloads:
1. **Business Alert**: Instantly sends the client's phone, email, service details, and address to the company head for review.
2. **Client Confirmation**: Sends a personalized acknowledgment, scheduling details, and contact coordinates to the customer's phone.
