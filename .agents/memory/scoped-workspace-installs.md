---
name: Scoped workspace installs
description: Dependency restoration strategy when the registry blocks an unrelated package in this monorepo
---

Restore dependencies with a frozen, filtered pnpm install for the artifact being worked on if a full-workspace install hits a package-firewall 403 in an unrelated workspace package.

**Why:** A full install was blocked by an unrelated API code-generation dependency while the FreightShift web app's dependency graph installed cleanly. Do not bypass the package firewall or change an unrelated dependency just to run the web artifact.

**How to apply:** Filter the install to the target workspace package and its dependencies. If work later requires the blocked package, update it through the normal dependency-management process instead of bypassing the registry.