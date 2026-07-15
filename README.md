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
npm run build
npm run preview
```

Output lands in `dist/` (includes `404.html` SPA fallback for GitHub Pages).

## Deploy

Push to `main`. The GitHub Actions workflow builds and publishes `dist/` to Pages.

In repo **Settings → Pages**, set Source to **GitHub Actions**.

## AdSense

Edit `src/config/ads.js` and set `ADSENSE_CLIENT` (and optional slot ids). Until set, glass ad placeholders render so layout matches the design.

Also update `public/ads.txt` with your publisher line when approved.
