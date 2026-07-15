# WebToolkit

Free browser-based text tools (case converters, unicode stylers, translators).  
Live: https://bhavingajjar.github.io/webtoolkit/

## Stack

Plain **HTML + CSS + JavaScript** (ES modules). No npm build. No React. No Vite.

Layout chrome is assembled at runtime from shared JS templates under [`assets/js/modules/`](assets/js/modules/). Tool folders only contain slim SEO shells (`#app` mount + meta tags).

Design tokens: [`design/stitch/lumina_text_system/DESIGN.md`](design/stitch/lumina_text_system/DESIGN.md)

## Layout

```
assets/js/
  app.js                 # entry — mounts templates + wires UI
  transform.worker.js
  modules/
    config.js            # tools + SEO (single source of truth)
    converters.js        # transform functions
    templates.js         # header / workspace / footer HTML
    converter-ui.js      # converter controls
    theme.js / ads.js / router.js / transform.js
scripts/
  generate-pages.mjs     # emits slim SEO index.html shells + sitemap
```

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/

## Regenerate SEO shells

After changing tools or SEO copy in `assets/js/modules/config.js`:

```bash
node scripts/generate-pages.mjs
```

(`python3 scripts/generate-pages.py` still works — it just calls the Node script.)

## Deploy

Push to `main`. GitHub Pages: **Settings → Pages → Deploy from a branch → `/` (root)**.

## AdSense

Edit `assets/js/modules/config.js` → `ADSENSE_CLIENT`, and update `ads.txt`.
