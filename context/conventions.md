# Conventions

- Code and comments in English; everything visitors read in the site's languages
  (`site.lang` at `/`, each of `site.locales` under `/en/`, `/fr/`, …).
- `src/core/` holds no site text, names or colours (enforced by tests/unit/core.test.ts).
  It reads the site from `site.config.ts` and styles itself with the site's CSS
  variables and classes.
- Never edit `src/core/` in a site repository: change it here and run `core:update` there.

## What the site's CSS must provide for the core components

Variables: `--accent`, `--accent-border`, `--bg-deep`, `--surface`, `--surface-2`,
`--ink`, `--ink-faint`, `--muted`, `--border`, `--border-strong`, `--error`,
`--r-sm`, `--r-lg`, `--r-full`, `--sh-lg`, `--s-1` to `--s-5`.

Classes used by LeadForm: `form`, `form-group`, `form-row`, `form-checkbox`, `req`,
`btn`, `btn-accent`, `btn-lg`, `lead-form-error`, `lead-form-fallback`,
and `lead-form-trap` (hidden by the core). The cookie banner styles its own
`cb-*` and `cm-*` classes from the variables above.

## New sites: Tailwind 4 and the core blocks

New sites style themselves with Tailwind 4 (`@import "tailwindcss"` and a `@theme`
written from the site's DESIGN.md). `src/pages/blocos.astro` with
`src/styles/blocos.css` is the worked example.

- The core components still read the variables above. Point them at the theme
  once, in the site's CSS:

  ```css
  :root {
  	--accent: var(--color-accent);
  	--ink: var(--color-ink);
  	--bg-deep: var(--color-bg);
  	--surface: var(--color-surface);
  	/* … one line for each variable in the list above */
  }
  ```

- The blocks in `src/core/blocks/` (Tabs, Accordion, Modal, Slider, Menu, Figure,
  LangSwitch) have behaviour and ARIA but no look. Style them by their roles and
  attributes (`[role="tab"][aria-selected="true"]`, `details[open]`, `dialog`,
  `[aria-current="page"]`), never by changing the block.
- Each page sets `<html lang>` to its own language:
  `localeOf(langOf(Astro.url.pathname, site), site)`, and passes the same page's
  addresses in the other languages to `Seo` (`alternates`) and `LangSwitch`.
- Words the core shows (form, cookie banner, close buttons) come from
  `src/core/i18n.ts`. A site never repeats them.

## Article page

`src/components/Article.astro` is used by the blog page and by the preview. Keep its
`data-article` attributes (title, description, pubDate, author, updated,
updatedDate, body): the preview script fills them.
