# Overview

Template for the static sites of the panel's clients (painel-sites). Each site is a
copy of this repository: `src/core/` is shared and updated from here with
`pnpm core:update`; everything else is the site's own design and text.

- `site.config.ts`: the site's facts, checked by `src/core/config.ts` (Zod).
- Articles, images and `build.json` come from the panel at build time
  (`src/core/build/sync.ts`, needs `PANEL_BUILD_TOKEN`).
- `LeadForm` posts to the panel's form API; the panel stores and emails leads.
- `/_preview/` (`src/preview.astro`, injected by the core integration) is framed
  by the panel's article editor, which posts the article to it.
- The build writes robots.txt, the sitemap, `.htaccess` (Hostinger) and
  `_headers`/`_redirects` (Cloudflare Pages).
- Guide for a new site: `NOVO-SITE.md`.
