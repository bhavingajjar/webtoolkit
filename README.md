# WebToolkit

Free browser-based text tools (case converters, unicode stylers, translators).  
Live: https://bhavingajjar.github.io/webtoolkit/

## Stack

Plain **HTML + CSS + JavaScript** (ES modules). No npm build. No React. No Vite.

Design tokens: [`design/stitch/lumina_text_system/DESIGN.md`](design/stitch/lumina_text_system/DESIGN.md)

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

Push to `main`. GitHub Pages: **Settings → Pages → Deploy from a branch → `/` (root)**.

## AdSense

Edit `assets/js/config.js` → `ADSENSE_CLIENT`, and update `ads.txt`.
