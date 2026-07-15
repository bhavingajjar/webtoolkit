import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const index = join(dist, 'index.html');

if (!existsSync(index)) {
  console.error('dist/index.html missing — run vite build first');
  process.exit(1);
}

copyFileSync(index, join(dist, '404.html'));
console.log('Copied index.html → 404.html');

const routes = [
  'convert-case',
  'sentence-case',
  'lower-case',
  'upper-case',
  'capitalized-case',
  'alternating-case',
  'title-case',
  'inverse-case',
  'strikethrough',
  'reverse',
  'upside-down',
  'morse',
  'binary',
  'wingdings',
  'bold',
  'wide',
  'italic',
  'underline',
  'mirror',
  'invisible-text',
  'zalgo',
];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, 'index.html'));
}

console.log(`Prerendered ${routes.length} route shells for GitHub Pages`);

// Ensure adsense placeholder notice in ads.txt stays
const adsPath = join(dist, 'ads.txt');
if (!existsSync(adsPath)) {
  writeFileSync(adsPath, '# Set AdSense publisher line when approved\n');
}
