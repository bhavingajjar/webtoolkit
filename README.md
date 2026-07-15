# WebToolkit

Free browser-based text tools (case converters, unicode stylers, translators).  
Live: https://bhavingajjar.github.io/webtoolkit/

## Stack

Plain **HTML + CSS + JavaScript** (ES modules). No npm build. No React. No Vite.

Design reference: Stitch **Lumina Text System** in [`design/stitch/`](design/stitch/).

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/

## Regenerate SEO pages (optional)

```bash
python3 scripts/generate-pages.py
```

## Deploy

Push to `main`. GitHub Pages should serve from the **branch root** (Settings → Pages → Deploy from branch → `/` root).

## AdSense

Edit `assets/js/config.js` and set `ADSENSE_CLIENT` when ready. Also update `ads.txt`.
