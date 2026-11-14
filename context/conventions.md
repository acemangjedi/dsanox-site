# Conventions

- Code and comments in English; everything visitors read in pt-PT.
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

## Article page

`src/components/Article.astro` is used by the blog page and by the preview. Keep its
`data-article` attributes (title, description, pubDate, author, updated,
updatedDate, body): the preview script fills them.
