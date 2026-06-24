---
name: FreightShift deploy target & quote API
description: Where the live FreightShift site is hosted and why /api/quote needs two implementations
---

# FreightShift deployment target

The live site `www.freightshiftlogistics.co.za` is hosted on **Vercel**, not Replit.
Replit is the dev/editing environment; production publishing goes to Vercel via the
root `vercel.json` (builds the freightshift Vite app, outputs to
`artifacts/freightshift/dist/public`, SPA catch-all rewrite).

## /api/quote must exist in TWO places

The quote endpoint is server code, so it needs a runtime in each environment:

1. **Dev / Replit**: a Vite plugin in `artifacts/freightshift/vite.config.ts`
   (`configureServer` + `configurePreviewServer`) calling `handleQuote`.
2. **Vercel production**: a serverless function at repo-root `api/quote.ts` that
   imports the same `handleQuote` from `artifacts/freightshift/src/server/quote.ts`.

**Why:** Vercel serves the Vite output as static files — it does NOT run the Vite
plugin. Without the `api/` function, POST /api/quote returns **405** on the live
domain (the symptom that kicked this off). Vercel matches `api/` functions from the
filesystem before applying the `/(.*) -> /index.html` rewrite, so the catch-all does
not shadow it.

**How to apply:** Any change to quote validation/email logic goes in
`src/server/quote.ts` (single source of truth) — both runtimes import it, so don't
fork the logic. `handleQuote` uses raw `fetch` to the Resend API (no `resend` npm
package), so the Vercel function bundles with zero extra deps.

## Secrets

`RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` must be set **in Vercel** for
production email to send (the form returns 500 otherwise). Setting them in Replit
secrets only affects the Replit dev environment, not the Vercel deployment.
