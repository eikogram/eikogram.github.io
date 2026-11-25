# eikogram.github.io

Public site for **eikogram** — the internal vector image model: one model per
format, transformers strictly between models. SVG is one serialization among
several.

Built with [Astro](https://astro.build), Vue islands, and Tailwind CSS v4.
Served from `eikogram.org` via GitHub Pages (see `public/CNAME`).

## Develop

```sh
npm install
npm run dev
```

## Verify

```sh
npm run lint     # eslint
npm run check    # astro check (types)
npm test         # vitest — register sanity (links, roles, MECE)
npm run build    # production build into dist/
```

## Structure

- `src/data/projects.ts` — the project register (single source of truth for
  the grid and the filter island). Every entry is a real repo; RubyGems links
  exist only for published gems.
- `src/components/ModelFlow.astro` — the signature element: VIM at the hub,
  format models as peers, transformers between models, rasterization to the
  pixel surface.
- `src/components/Quickstart.astro` — verified snippets; do not add one that
  does not appear in the gem's own README.
