# WebToolkit

Static GitHub Pages site: plain HTML + CSS + vanilla JavaScript (ES modules). No npm, no React/Vite build, no backend.

## Cursor Cloud specific instructions

- Nothing to install or build. Serve the repo root as static files.
- Local preview: `python3 -m http.server 8000` from `/workspace`, then open `http://localhost:8000/`.
- Optional page regen: `python3 scripts/generate-pages.py`
- No automated tests or linters are configured.
- Fonts and Material Symbols load from Google Fonts CDN at runtime (system fallbacks apply offline).
- AdSense client id (optional) lives in `assets/js/config.js` as `ADSENSE_CLIENT`.
