import { applyTransform, countStats } from './converters.js';
import { ADSENSE_CLIENT, CONVERT_MODES, MODE_SEO, SITE } from './config.js';

const root = document.documentElement;
const pageBase = root.dataset.pageBase || './';
const initialMode = root.dataset.mode || 'sentence';

/** Offload transforms (upper/lower/etc.) to a Web Worker so large pastes stay responsive. */
let worker;
let reqId = 0;
const pending = new Map();
let activeMode = initialMode;

function getWorker() {
  if (typeof Worker === 'undefined') return null;
  if (!worker) {
    worker = new Worker(new URL('transform.worker.js', import.meta.url), { type: 'module' });
    worker.addEventListener('message', (event) => {
      const { id, ok, result, error } = event.data || {};
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      if (ok) entry.resolve(result);
      else entry.reject(new Error(error || 'Worker failed'));
    });
  }
  return worker;
}

async function transform(mode, text) {
  const w = getWorker();
  if (!w) return applyTransform(mode, text);
  const id = ++reqId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ id, mode, text });
  });
}

function $(sel) {
  return document.querySelector(sel);
}

function applyTheme(mode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode === 'dark' || (mode === 'system' && prefersDark);
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

function initTheme() {
  const saved = localStorage.getItem('wt-theme') || 'dark';
  applyTheme(saved);
  document.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === saved);
    btn.addEventListener('click', () => {
      localStorage.setItem('wt-theme', btn.dataset.theme);
      applyTheme(btn.dataset.theme);
      document.querySelectorAll('[data-theme]').forEach((b) => {
        b.classList.toggle('active', b.dataset.theme === btn.dataset.theme);
      });
    });
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ((localStorage.getItem('wt-theme') || 'dark') === 'system') applyTheme('system');
  });
}

function loadAdsense() {
  if (!ADSENSE_CLIENT) return;
  if (document.querySelector('script[data-adsense]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.dataset.adsense = 'true';
  document.head.appendChild(script);
}

function renderTiles() {
  const grid = $('#toolGrid');
  if (!grid) return;
  const mid = 10;
  const parts = [];

  const tileHtml = (mode) => `
    <button type="button" class="tool-tile${mode.id === activeMode ? ' active' : ''}" data-mode="${mode.id}" aria-pressed="${mode.id === activeMode}">
      ${
        mode.icon
          ? `<span class="material-symbols-outlined">${mode.icon}</span>`
          : `<span class="preview">${mode.preview}</span>`
      }
      <span class="label">${mode.label}</span>
    </button>`;

  CONVERT_MODES.slice(0, mid).forEach((m) => parts.push(tileHtml(m)));
  parts.push(`
    <div class="ad-slot glass-panel ad-inline no-print">
      <span class="tag font-label">Google AdSense</span>
      <div class="ad-inline-inner">
        <div class="icon-box"><span class="material-symbols-outlined" style="color:var(--secondary);font-size:2rem">bolt</span></div>
        <div>
          <h4>Next-Gen Workspace</h4>
          <p>In-content ad placeholder — set ADSENSE_CLIENT in assets/js/config.js when ready.</p>
        </div>
        <button type="button" class="ad-pill" disabled>Try It Free</button>
      </div>
    </div>`);
  CONVERT_MODES.slice(mid).forEach((m) => parts.push(tileHtml(m)));
  grid.innerHTML = parts.join('');
}

function updateStats(text) {
  const { characters, words, lines } = countStats(text);
  $('#charCount').textContent = characters;
  $('#wordCount').textContent = words;
  $('#lineCount').textContent = lines;
}

function setActiveTile(mode) {
  document.querySelectorAll('.tool-tile').forEach((el) => {
    const on = el.dataset.mode === mode;
    el.classList.toggle('active', on);
    el.setAttribute('aria-pressed', String(on));
  });
}

function syncSeo(mode) {
  const seo = MODE_SEO[mode] || {
    title: `${SITE.name} — Free Online Text Case Converter`,
    description: SITE.description,
  };
  document.title = seo.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', seo.description);
  const h1 = $('#seoTitle');
  const p = $('#seoDesc');
  if (h1) h1.textContent = seo.title.replace(' — WebToolkit', '');
  if (p) p.textContent = seo.description;
}

async function applyMode(mode) {
  const input = $('#mainInput');
  const btn = $('#convertBtn');
  activeMode = mode;
  setActiveTile(mode);
  root.dataset.mode = mode;
  syncSeo(mode);
  if (!input.value) return;
  btn.disabled = true;
  try {
    input.value = await transform(mode, input.value);
    updateStats(input.value);
  } finally {
    btn.disabled = false;
  }
}

function bindConverter() {
  const input = $('#mainInput');
  renderTiles();
  setActiveTile(activeMode);
  syncSeo(activeMode);
  updateStats(input.value || '');

  input.addEventListener('input', () => updateStats(input.value));

  $('#toolGrid').addEventListener('click', async (event) => {
    const tile = event.target.closest('.tool-tile');
    if (!tile) return;
    await applyMode(tile.dataset.mode);
  });

  $('#convertBtn').addEventListener('click', async () => {
    await applyMode(activeMode);
  });

  $('#btnCopy').addEventListener('click', async () => {
    const btn = $('#btnCopy');
    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      input.select();
      document.execCommand('copy');
    }
    btn.innerHTML = '<span class="material-symbols-outlined">done</span> Copied';
    setTimeout(() => {
      btn.innerHTML = '<span class="material-symbols-outlined">content_copy</span> Copy';
    }, 1500);
  });

  $('#btnClear').addEventListener('click', () => {
    input.value = '';
    updateStats('');
    input.focus();
  });

  $('#btnDownload').addEventListener('click', () => {
    const blob = new Blob([input.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webtoolkit-${activeMode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  $('#btnPrint').addEventListener('click', () => window.print());
}

function bindLinks() {
  document.querySelectorAll('[data-tool-link]').forEach((a) => {
    const slug = a.getAttribute('data-tool-link');
    a.setAttribute('href', `${pageBase}${slug}/`);
  });
  document.querySelectorAll('[data-home]').forEach((a) => {
    a.setAttribute('href', pageBase);
  });
}

/** Drop any previously registered caching service workers (not used for conversion). */
function unregisterLegacyServiceWorkers() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister());
  });
  if (typeof caches !== 'undefined') {
    caches.keys().then((keys) => {
      keys.filter((k) => k.startsWith('webtoolkit-')).forEach((k) => caches.delete(k));
    });
  }
}

initTheme();
loadAdsense();
bindLinks();
bindConverter();
unregisterLegacyServiceWorkers();
