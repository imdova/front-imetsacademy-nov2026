# IMETS Academy — Frontend

Course marketplace / LMS for IMETS Academy: a public marketing site built with
Next.js 16 (App Router), React 19, TypeScript and Tailwind v4, styled entirely
from the IMETS design system.

## Requirements

- Node.js 22+
- pnpm 10+

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — sensible defaults are built in
pnpm dev                     # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start the dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (flat config) |
| `pnpm format` | Prettier write |
| `pnpm test` | Unit tests (Vitest) |

## Project structure

```
src/
├── app/                      # Routing only (App Router)
│   ├── (marketing)/          # Public site: layout (header/footer) + pages
│   │   ├── page.tsx          # /            Home
│   │   ├── courses/          # /courses     Explore (+ [slug] detail)
│   │   └── contact/          # /contact     Contact form
│   ├── globals.css           # Design tokens (@theme) + shadcn vars + type utils
│   ├── sitemap.ts · robots.ts · not-found.tsx
├── components/
│   ├── ui/                   # Owned primitives (Button, Badge, Tabs, … — Radix + CVA)
│   ├── shared/               # Composed pieces (PageHero, FilterChips, EmptyState, forms …)
│   └── layout/               # SiteHeader, Footer, Container, Logo, nav
├── features/
│   ├── courses/              # Course domain: schemas, components, URL helpers
│   └── contact/              # Contact domain: schema, Server Action, form
├── lib/
│   ├── dal/                  # Data Access Layer — the only data entry point for the UI
│   ├── db/                   # Mock database (dev seed data)
│   ├── api/                  # HTTP client + adapter for the real backend
│   ├── env.ts · env.server.ts  # Zod-validated environment
│   └── utils.ts              # cn()
└── config/                   # site.ts (nav, contact), routes.ts
```

## Design system

- `tokens.json` is mapped 1:1 into `src/app/globals.css` (`@theme` + CSS variables).
  Components use **semantic tokens only** — no hex values or arbitrary sizes.
- Type scale is exposed as utilities: `text-display-xl`, `text-h2`, `text-body-sm`,
  `text-label`, `text-caption`, `text-overline`, …
- Fonts: Outfit (display) + Plus Jakarta Sans (body) via `next/font`.
- RTL-ready: logical utilities (`ms/me/ps/pe/start/end`) and `dir` on `<html>`.

## Data layer (mock → API)

The UI never talks to a data source directly — it imports from `lib/dal`. The DAL
chooses its adapter from `DATA_SOURCE`:

- `DATA_SOURCE=mock` (default): in-memory seed data in `lib/db` with simulated latency.
- `DATA_SOURCE=api`: the HTTP adapter (`lib/api`) calls the NestJS REST API at
  `NEXT_PUBLIC_API_BASE_URL`.

Every DAL response is validated with Zod (`features/<domain>/schemas.ts`), so backend
contract drift is caught in one place. **Switching to the real backend only touches
`lib/dal` / `lib/api`** — schemas, components and pages stay unchanged.

### Environment variables

| Variable | Default | Notes |
|---|---|---|
| `DATA_SOURCE` | `mock` | `mock` \| `api` (server-only) |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:4000/api/v1` | Backend base URL |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Metadata / sitemap |

## Rendering notes

Cache Components (`cacheComponents: true`) is enabled: pages ship a static shell and
stream data-dependent sections via `<Suspense>` with skeleton fallbacks. Every data
route has `loading`, `error` and (where relevant) `not-found` states.
