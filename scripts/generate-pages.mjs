#!/usr/bin/env node
/**
 * Emit slim SEO HTML shells. Layout chrome is rendered at runtime by
 * assets/js/modules/templates.js — edit that module, not these pages.
 *
 * Usage: node scripts/generate-pages.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONVERT_MODES, MODE_SEO, SITE, seoForMode } from '../assets/js/modules/config.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_ORIGIN = SITE.url.replace(/\/$/, '');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function shellPage({ mode, slug, title, description, nested, ghPages = false }) {
  const asset = nested ? '../assets/' : './assets/';
  const pageBase = nested ? '../' : './';
  const canonical = `${SITE_ORIGIN}/${slug ? `${slug}/` : ''}`;
  const logo = `${asset}logo.png`;
  const css = `${asset}css/site.css`;
  const app = `${asset}js/app.js`;
  const heading = title.replace(' — WebToolkit', '');
  const descJson = description.replaceAll('\\', '\\\\').replaceAll('"', '\\"');

  let html = `<!DOCTYPE html>
<html lang="en" class="dark" data-mode="${mode}" data-asset-base="${asset}" data-page-base="${pageBase}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(SITE.name)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE_ORIGIN}/assets/logo.png" />
  <meta name="twitter:card" content="summary" />
  <link rel="icon" type="image/png" href="${logo}" />
  <link rel="stylesheet" href="${css}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${SITE.name}",
    "url": "${SITE_ORIGIN}/",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "${descJson}"
  }
  </script>
</head>
<body>
  <!-- Layout chrome is injected by assets/js/modules/templates.js -->
  <div id="app">
    <noscript>
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(description)}</p>
      <p>Enable JavaScript to use the WebToolkit converter.</p>
    </noscript>
  </div>
  <script type="module" src="${app}"></script>
</body>
</html>
`;

  if (ghPages) {
    html = html
      .replace('data-page-base="./"', 'data-page-base="/webtoolkit/"')
      .replace('data-asset-base="./assets/"', 'data-asset-base="/webtoolkit/assets/"')
      .replaceAll('href="./assets/', 'href="/webtoolkit/assets/')
      .replaceAll('src="./assets/', 'src="/webtoolkit/assets/');
  }

  return html;
}

function main() {
  const homeTitle = `${SITE.name} — Free Online Text Case Converter`;
  const homeDesc =
    'Free browser-based text case converter and utilities. Convert uppercase, lowercase, title case, and more. No uploads.';

  writeFileSync(
    join(ROOT, 'index.html'),
    shellPage({ mode: 'sentence', slug: null, title: homeTitle, description: homeDesc, nested: false }),
    'utf8',
  );

  for (const mode of CONVERT_MODES) {
    const seo = seoForMode(mode.id);
    const folder = join(ROOT, mode.slug);
    mkdirSync(folder, { recursive: true });
    writeFileSync(
      join(folder, 'index.html'),
      shellPage({
        mode: mode.id,
        slug: mode.slug,
        title: seo.title,
        description: seo.description,
        nested: true,
      }),
      'utf8',
    );
  }

  const alias = join(ROOT, 'convert-case');
  mkdirSync(alias, { recursive: true });
  writeFileSync(
    join(alias, 'index.html'),
    shellPage({
      mode: 'sentence',
      slug: 'convert-case',
      title: 'Convert Case — WebToolkit',
      description: homeDesc,
      nested: true,
    }),
    'utf8',
  );

  writeFileSync(
    join(ROOT, '404.html'),
    shellPage({
      mode: 'sentence',
      slug: null,
      title: homeTitle,
      description: homeDesc,
      nested: false,
      ghPages: true,
    }),
    'utf8',
  );

  const urls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/convert-case/`];
  for (const mode of CONVERT_MODES) urls.push(`${SITE_ORIGIN}/${mode.slug}/`);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url, i) => {
      const pri = i === 0 ? '1.0' : '0.8';
      return `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>${pri}</priority></url>`;
    }),
    '</urlset>',
    '',
  ];
  writeFileSync(join(ROOT, 'sitemap.xml'), sitemap.join('\n'), 'utf8');

  writeFileSync(
    join(ROOT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    'utf8',
  );

  writeFileSync(
    join(ROOT, 'ads.txt'),
    '# Replace with your AdSense publisher line when approved, e.g.:\n'
      + '# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n',
    'utf8',
  );

  // Keep MODE_SEO referenced so the generator fails visibly if config drifts.
  if (Object.keys(MODE_SEO).length !== CONVERT_MODES.length) {
    console.warn('Warning: MODE_SEO keys and CONVERT_MODES length differ');
  }

  console.log(`Generated home + ${CONVERT_MODES.length} tool shells + convert-case + sitemap`);
}

main();
