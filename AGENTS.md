# WebToolkit

Client-side text utilities (case converters and text tools) built as a **Vite + React** single-page app (React 18, React Router, Tailwind CSS v4). No backend or database — all transformations run in the browser. Deployed to GitHub Pages at `https://bhavingajjar.github.io/webtoolkit/`.

## Cursor Cloud specific instructions

- Install deps with `npm install` (Node 22, npm). Scripts are in `package.json`: `npm run dev`, `npm run build`, `npm run preview`.
- `index.html` at the repo root is the **Vite entry point** (it loads `/src/main.jsx`). Do not delete it — the build depends on it.
- App source lives in `src/` (`main.jsx` bootstraps React Router with `basename="/webtoolkit"`).
- Dev server: `npm run dev` serves at `http://localhost:5173/webtoolkit/` (the app is mounted under the `/webtoolkit/` base).
- Production build: `npm run build` runs `vite build` then `scripts/copy-404.js`, which copies `index.html` to `404.html` and prerenders per-route shell folders for GitHub Pages SPA routing. Output goes to `dist/` (git-ignored).
- Preview the built output with `npm run preview` (defaults to `http://localhost:4173/webtoolkit/`).
- `vite.config.js` sets `base: '/webtoolkit/'`. This is required for the GitHub Pages project subpath. If deploying to a custom domain at the root, `base` (and the router `basename`) must change to `/`.
- Deployment is automated: `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. There is no need to commit `dist/`.
- No automated tests or linters are configured.
