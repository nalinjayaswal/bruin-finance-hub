# NativePOC Workspace Structure

NativePOC is now the canonical repo (npm + Next only). The goal is to migrate anything needed from NativeIQ and then decommission that workspace. The structure going forward:

```
NativePOC/
├── app/                 # Next App Router routes, server actions, API handlers
├── components/          # React components and hooks
├── lib/                 # Client/server utilities (fetchers, animations, mock data)
├── packages/            # npm workspaces for shared code
│   ├── types/           # shared interfaces/models (from NativeIQ/packages/types)
│   ├── ui/              # design system React components + tokens
│   └── utils/           # reusable helpers (formatters, math, memoized hooks)
├── docs/                # migration notes, architecture decisions
├── public/              # static assets
├── next.config.ts
├── package.json         # npm scripts + workspace config
└── tsconfig.json
```

## Workspace Conventions

- Use **npm workspaces** (see root `package.json`) to develop/test packages locally without pnpm/turborepo.
- Each package will be TypeScript-first, built with `tsup` (or `tsc --emitDeclarationOnly`, to be defined later) and referenced via path aliases in `tsconfig.json`.
- Package names will follow `@native/<scope>` (e.g., `@native/types`), enabling future publishing if needed.
- Shared lint/test configs can live at the repo root and be extended by packages via `eslint.config.mjs` and per-package `tsconfig.json`.

