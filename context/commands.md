# Commands

- `pnpm run ci`: biome, astro check and unit tests (vitest).
- `pnpm build`: sync from the panel, then build. Needs `PANEL_BUILD_TOKEN`.
- `pnpm build:local`: build without syncing (uses whatever is in src/content).
- `pnpm test:e2e`: builds locally and runs Playwright against `tests/e2e/serve.mjs`.
  Here: `PW_CHROMIUM=/opt/pw-browsers/chromium pnpm test:e2e`.
  `astro preview` is not used: in Astro 7 it goes to the background.
- `pnpm core:update`: replace `src/core/` with the template's (remote `modelo`).
- `pnpm portao`: the measured quality gates (build and tests, AI tics and phrases,
  DESIGN.md, Lighthouse, accessibility) on every page; writes `docs/portao.md` and
  fails when a gate fails. `pnpm portao tiques lighthouse` runs only those. Takes a
  few minutes; needs the dev dependencies `lighthouse`, `impeccable`,
  `@google/design.md` and `@axe-core/playwright`, and `PW_CHROMIUM` as above.
