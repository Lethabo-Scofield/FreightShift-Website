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
   (`configureServer` + `configurePreviewServer`) calling `handleQuote` from
   `artifacts/freightshift/src/server/quote.ts`.
2. **Vercel production**: a **self-contained** serverless function at repo-root
   `api/quote.ts` — it inlines the full handler logic and imports NOTHING from the
   freightshift package.

**Why:** Vercel serves the Vite output as static files — it does NOT run the Vite
plugin. Without the `api/` function, POST /api/quote returns **405** on the live
domain (the original symptom). Vercel matches `api/` functions from the filesystem
before applying the `/(.*) -> /index.html` rewrite, so the catch-all does not shadow
it.

**Why self-contained (do NOT re-add a cross-package import):** an `api/quote.ts`
that did `import { handleQuote } from "../artifacts/freightshift/src/server/quote"`
type-checked fine but crashed at runtime with `FUNCTION_INVOCATION_FAILED` (Vercel's
runtime bundler did not include the cross-package file → module-load failure before
the handler runs). Key tell: a module-load crash bypasses the handler's try/catch and
returns Vercel's text/plain `FUNCTION_INVOCATION_FAILED`, whereas any error our code
catches returns clean JSON. Inlining the logic removed the failure.

**Type-checking quirk:** Vercel type-checks the function with the repo-root tsconfig,
which has `types: []` and no `@types/node` resolvable at the root, so `process` and
`fetch` are undefined and `Response` lacks `.ok`/`.text()`. Fixes that work without
touching deps/lockfile: declare `process` and `fetch` as local ambient globals at the
top of `api/quote.ts`, and cast the fetch result `as unknown as { ok; text }`. Verify
locally by compiling `api/quote.ts` under a tsconfig with `types: []` + `lib:["es2022"]`.

**How to apply:** quote logic now lives in TWO files (`src/server/quote.ts` for dev,
`api/quote.ts` for prod) — keep them in sync by hand when changing validation/email.
Both use raw `fetch` to the Resend API (no `resend` npm package).

## Secrets

`RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` must be set **in Vercel** for
production email to send (the form returns 500 otherwise). Setting them in Replit
secrets only affects the Replit dev environment, not the Vercel deployment.
