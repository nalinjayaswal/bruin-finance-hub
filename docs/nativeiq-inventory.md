# NativeIQ → NativePOC Inventory

Snapshot of the existing NativeIQ pnpm/nuxt stack and the NativePOC Next.js baseline to drive the migration off pnpm/Vue and onto npm + Next only.

## NativeIQ Overview

- **Workspace layout:** `nativeiq/apps/dashboard` (Nuxt 3 client + `server/api`), `nativeiq/packages/{types,ui,utils}`, repo-level pnpm/turbo tooling.
- **Docs to preserve:** architecture (`docs/01-architecture-overview.md`), backend spec (`docs/02-backend-spec.md`), API contracts (`docs/04-api-contracts.md`), storage models (`docs/05-data-models-and-storage.md`), config (`docs/10-config-and-secrets.md`).
- **Backend surface (Nuxt server routes):**
  - `nativeiq/apps/dashboard/server/api/chat.post.ts` — POST handler that validates `message`, loads `useRuntimeConfig().openaiApiKey`, builds system prompt + conversation history, calls `openai.chat.completions.create` with `gpt-4o`, and returns `{ message, usage }` or canonical Nuxt errors.
  - Remaining backend services (Slack gateway, insights, tasks, policy, MCP hub) are referenced in docs and live outside this repo; contracts must be re-exposed from Next API routes under `/app/api/*`.
- **Shared packages:** 
  - `packages/types` — exported TypeScript interfaces for insights, tasks, KPI rows.
  - `packages/ui` — React components (already TSX) + tokenized CSS, can be lifted directly into a Next-compatible package.
  - `packages/utils` — formatters (`formatRelativeTime`, `formatAsPercent`, `clamp`).
- **Frontend specifics:** Vue components under `apps/dashboard/components`, `sections`, `composables` (`useAI`, `useAuth`, `useChat`, `useTheme`) and middleware for auth gating.

## NativePOC Baseline

- **Stack:** Next 14 App Router, npm (lockfile present), shadcn-style UI inside `components/ui`, Framer Motion animations, mock data in `lib/mock-data.ts`.
- **Key files:** `app/page.tsx` renders dashboard shell (chat + KPI cards) using local mocks; `components/chat-stream.tsx` handles chat UI, `components/dashboard-header.tsx` for top nav, `components/theme-provider.tsx` handles CSS variables, `lib/utils.ts` wraps class merging.
- **APIs:** no real backend yet. No `/app/api` routes; chat responses are generated client-side via `generateNativeResponse`.

## Migration Targets

1. **Backends/APIs:** Rebuild all Nuxt server endpoints (currently only `chat.post.ts` in-repo, plus documented `/v1/*` services) as Next route handlers, preserving error envelope `{ error: { code, message, details } }`.
2. **Shared code:** Move `packages/{types,ui,utils}` (already TS/React-friendly) under a new npm workspace inside NativePOC (`/packages` or `/src/shared`) and update import paths.
3. **Frontend:** Recreate Vue components/pages as React counterparts under `NativePOC/app` + `components`, reusing logic from composables as React hooks and aligning them with `ThemeProvider`.
4. **Tooling:** Remove pnpm/turbo references once migration is complete, keep npm scripts + Next build/test commands, and replicate lint/test setup for the new repo only.

