# WebToolkit

Free, browser-based text tools (case converters, unicode stylers, translators).  
Live: https://bhavingajjar.github.io/webtoolkit/

## Stack

- Vite + React
- Tailwind CSS v4
- Client-only (GitHub Pages) — no backend
- Stitch “Lumina Text System” design (see `design/stitch/`)

## Develop

```bash
npm install
npm run dev
```

Open the local Vite URL (default `http://localhost:5173/webtoolkit/`).

## Build

```bash
npm install
npm run build
```

Output is written to [`dist/`](dist/) (committed so you can point hosting or GitHub Pages at it).  
`npm run build` refreshes `dist/` after source changes.

## Deploy

**Option A — GitHub Actions (recommended):** merge to `main`, enable **Settings → Pages → Source: GitHub Actions**. The workflow publishes the *contents* of `dist/` to `https://bhavingajjar.github.io/webtoolkit/` (the URL has no `/dist` segment).

**Option B — browse committed `dist/` on the branch:** the folder is in the repo for inspection and manual use. Opening `/webtoolkit/dist/` on Pages only works if the whole branch is served from root; asset `base` is `/webtoolkit/` for the Actions deploy, so prefer Option A for production.
