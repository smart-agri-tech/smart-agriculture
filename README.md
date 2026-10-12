# Smart Agriculture / SA.TECH

Vue 3 + Vite single-page app, styled with Tailwind CSS v4, using Supabase for auth and data.

## Getting started

```bash
bun install
bun run dev        # http://localhost:3000
```

Create `.env.local` in the project root:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
# Turns /check on in production builds (it is always on in dev).
VITE_COMPLIANCE_CHECK_ENABLED=false
```

`VITE_*` values are compiled into the browser bundle, so only use public keys here (never the Supabase secret key).

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Dev server on port 3000 |
| `bun run build` | Type-check (`vue-tsc`) and build to `dist/` |
| `bun run preview` | Serve the production build |
| `bun run test` | Unit tests for the compliance rules (`src/lib/compliance`) |
| `bun run lint` | ESLint |

`vue-tsc` needs Node.js on the `PATH`; it does not run under Bun alone.

## Layout

- `src/router.ts` — all routes, page titles, and the `/check` feature flag
- `src/pages/` — one component per route
- `src/components/` — shared pieces (`check/` for the compliance check, `dashboard/` for the dashboard and charts)
- `src/lib/compliance/` — pure rules engine and `.ics` builder for the Farm Compliance Check
- `src/data/farm.ts` — demo data shown on the dashboard

## Deploy

Vercel builds with `vercel.json` (Vite, with a rewrite to `index.html` so deep links like `/check` work).
Set the same `VITE_*` variables in the Vercel project and redeploy after changing them.

The contact form posts to Formspree (`https://formspree.io/f/mgaolqwq`).
