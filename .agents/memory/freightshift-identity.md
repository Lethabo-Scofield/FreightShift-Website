---
name: FreightShift canonical identity & "expired key"
description: Which brand identity is canonical for the FreightShift site, and where third-party keys actually live.
---

# Canonical identity: China → South Africa corridor

The FreightShift site's correct identity is the **"Ship from China → Land in South Africa"**
import/freight-forwarding corridor positioning. A previous SA-domestic rebrand
("We move it / We store it") was **unwanted** and was reverted.

**Why:** The user explicitly wants the original China-corridor identity kept and only
*improved* (targeted additions), never re-rebranded.

**How to apply:** When asked to "improve" the site, ADD sections on top of the original
flow (Hero + ChinaSACorridor/Lanes stay intact). Do NOT replace the core positioning.
Moving/Storage/Courier are *additional* services surfaced alongside freight — not a
replacement of the freight identity.

# "Expired key" is NOT in the frontend code

There is no Google Maps embed or hardcoded API key anywhere in `artifacts/freightshift/src`.
The only third-party integration is the **Olyxee tracking API** (`src/lib/tracking.ts`),
read from env var `VITE_OLYXEE_API_BASE` (default `/api/olyxee`).

**Why:** Briefs sometimes report an "expired key" on the live site; do not fabricate a
code fix. Any expired credential is server-side / Vercel env (e.g. Olyxee token), not in
this repo.

# Honesty constraints (per user brief)

- Companies served: ONLY Mizu Innovations (Pty) Ltd + CORE X (Pty) Ltd. Do not invent others.
- Partners: Courier Guy, Just In Time Logistics, Olyxee.
- Google Reviews link is a placeholder `GOOGLE_REVIEWS_LINK_HERE` until the user supplies the real URL.
- Do not fabricate reviews/testimonials or client relationships.
