# WebToolkit

Static, single-file landing page (`index.html`) deployed to GitHub Pages. Plain HTML5 + inline CSS, no JavaScript, no build step, no package manager, and no backend/database. The only runtime external dependency is Google Fonts loaded from a CDN (the page falls back to system fonts when offline).

## Cursor Cloud specific instructions

- There is nothing to install or build. The "app" is the static `index.html`.
- To run it in development, serve the repo root as static files, e.g. `python3 -m http.server 8000` from `/workspace`, then open `http://localhost:8000/`.
- There are no automated tests, linters, or build commands configured in this repo.
- Google Fonts are fetched from a CDN at runtime; the page still renders with fallback fonts (`Georgia`/`serif`, `sans-serif`) if there is no network access.
