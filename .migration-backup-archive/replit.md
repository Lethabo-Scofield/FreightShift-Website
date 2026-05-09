# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Hosts the FreightShift International Logistics website — a China-to-South-Africa freight forwarding company site.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- **`artifacts/freightshift`** (`@workspace/freightshift`) — React + Vite frontend, served at `/`. FreightShift International Logistics marketing site with pages: Home, About, Services, Contact.
- **`artifacts/api-server`** (`@workspace/api-server`) — Express API server, served at `/api`. Handles quote form submissions via Resend email service.
- **`artifacts/mockup-sandbox`** — UI mockup/design sandbox (internal tool).

## Key Routes (frontend)

- `/` — Home page (hero, services overview, quote form, testimonials)
- `/about` — About page
- `/services` — Services page
- `/contact` — Contact page
- `/china-sa` — China-SA corridor page (aliases to Services)

## Key API Routes

- `GET /api/healthz` — Health check
- `POST /api/quote` — Submit quote request (emails via Resend, rate-limited)

## Required Environment Variables

- `RESEND_API_KEY` — Resend API key for email delivery (quote submissions)
- `QUOTE_TO_EMAIL` — Recipient email address for quote requests
- `QUOTE_FROM_EMAIL` — Sender email (optional, defaults to onboarding@resend.dev)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Assets

- `attached_assets/` — Images used by the frontend (hero backgrounds, team photos, etc.)
- `artifacts/freightshift/public/` — Public static assets (favicon, robots.txt, sitemap, opengraph image)
- `artifacts/freightshift/src/assets/` — Logo image

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
