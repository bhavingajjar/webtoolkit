import { CONVERT_MODES, seoForMode } from './config.js';
import { countStats } from './converters.js';
import { renderInlineAd, renderToolTile } from './templates.js';
import { transform } from './transform.js';

function $(sel) {
  return document.querySelector(sel);
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
  const seo = seoForMode(mode);
  document.title = seo.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', seo.description);
  const h1 = $('#seoTitle');
  const p = $('#seoDesc');
  if (h1) h1.textContent = seo.title.replace(' — WebToolkit', '');
  if (p) p.textContent = seo.description;
}

function renderTiles(activeMode) {
  const grid = $('#toolGrid');
  if (!grid) return;
  const mid = 10;
  const parts = [];
  CONVERT_MODES.slice(0, mid).forEach((m) => parts.push(renderToolTile(m, activeMode)));
  parts.push(renderInlineAd());
  CONVERT_MODES.slice(mid).forEach((m) => parts.push(renderToolTile(m, activeMode)));
  grid.innerHTML = parts.join('');
}

/** Wire converter workspace controls after the shell is mounted. */
export function bindConverter(initialMode) {
  const root = document.documentElement;
  const input = $('#mainInput');
  let activeMode = initialMode;

  async function applyMode(mode) {
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

  renderTiles(activeMode);
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
  $('#footerPrint')?.addEventListener('click', () => window.print());
}
