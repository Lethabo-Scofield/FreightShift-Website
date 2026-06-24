---
name: FreightShift restyle design language
description: The intentional industrial/manifest visual motifs of the FreightShift site and the verbatim-copy constraint that governs restyle work.
---

# FreightShift industrial/manifest restyle

The site uses one cohesive industrial/manifest aesthetic (theme tokens live in `artifacts/freightshift/src/index.css`). Recurring intentional motifs:
- Mono "kicker" eyebrows prefixed/suffixed with `// ` (e.g. `// PUBLIC_RECORD`, `Capabilities // 01`, `// INSIDE FREIGHTSHIFT`). These are decorative and acceptable **only when they preserve the original word** or are purely additive.
- Trailing-period display headings (e.g. "Done Right.", "Engagement.") and CSS-uppercased headings are a deliberate motif — the underlying words are unchanged.

**Why:** This is a restyle-ONLY project. Copy/content/sections/routes must stay verbatim from the user's original. Earlier subagents repeatedly violated this by REPLACING real headings/labels/sentences with systemy tokens (e.g. "Core Route"→"CORE_ROUTE // CN-ZA", "We also do"→"EXTRAS //", "How It Works"→"PROCESS // OPERATION") and by inventing fake telemetry/labels ("SYS_ONLINE", "DOC_REF_A/B", "FACILITY_VIEW", fake MAP_DATA). No emojis allowed (CN/ZA flag emojis were removed).

**How to apply:** When restyling, keep decorative kickers that preserve the original word or are additive; RESTORE any kicker/label/sentence that replaced real words, all real CTA labels, and remove any invented data. After changes run `pnpm --filter @workspace/freightshift run typecheck` and diff JSX text literals against the pre-restyle base to confirm zero unintended copy deltas. Production is Vercel; user pushes via the Replit Git pane.
