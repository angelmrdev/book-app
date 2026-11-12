# I002-A — Design system and public shell

## Scope
- Warm editorial palette, typography, responsive layout, header/footer and public homepage.
- Product positioning: **Your Reading Partner**; account required for future personal library, tracker and wishlists.
- Dashboard illustration is explicitly marked as a concept preview; no user data, IndexedDB or Supabase is used.
- All navigation currently uses the real `/` route or same-page anchors; no broken placeholder application routes.
- English-only root is intentional at this stage. Localized `/en` and `/es` routes, translated slugs, SEO and publishing policy belong to I002-B.
- Public brand remains provisional; central design tokens live in `apps/web/src/app/globals.css`.
- Temporary `robots: noindex, nofollow` in root metadata prevents accidental indexing of this English-only preview; revisit in I002-B.

## Changed files
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/globals.css`

## New files
- `apps/web/src/components/site-header.tsx`
- `apps/web/src/components/site-footer.tsx`
- `apps/web/src/components/book-visual.tsx`
- `docs/I002-A-DESIGN-SYSTEM.md`

## Validation
Run `pnpm install` only if required, then `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm dev` and inspect desktop/mobile.

## Deliberately deferred
- Auth, registration, dashboard state, user data, wishlist, IndexedDB, Supabase, search, catalog, real MDX articles.
- Localized routes and real editorial links.
- Legal pages and actual brand assets.
