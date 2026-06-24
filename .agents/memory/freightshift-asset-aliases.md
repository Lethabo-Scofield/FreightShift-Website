---
name: FreightShift asset import aliases
description: Two different Vite aliases for images, easy to confuse and causes dev 500s.
---

The freightshift artifact has TWO image aliases that resolve to different folders:
- `@assets/...` → repo-root `attached_assets/` (the raw uploaded files)
- `@/assets/...` → `artifacts/freightshift/src/assets/` (curated/copied project assets)

**Why:** When briefing the DESIGN subagent, images copied into `src/assets/` must be imported as `@/assets/<file>`. The subagent tends to default to `@assets/<file>`, which then fails to resolve and throws a Vite `import-analysis` 500 overlay even though the file exists.

**How to apply:** If a freightshift image import 500s with "Failed to resolve import @assets/...", check whether the file actually lives in `src/assets/` and switch the import to `@/assets/`. Either place the file in the folder matching the alias the subagent used, or fix the alias to match the folder.
