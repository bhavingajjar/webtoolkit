import { CONVERT_MODES, getModeBySlug } from './config.js';

/** Resolve the active convert mode from the HTML data attribute or the URL path. */
export function resolveInitialMode() {
  const fromAttr = document.documentElement.dataset.mode;
  if (fromAttr && CONVERT_MODES.some((m) => m.id === fromAttr)) return fromAttr;

  const parts = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  if (slug === 'convert-case') return 'sentence';
  const mode = getModeBySlug(slug);
  return mode?.id || 'sentence';
}

export function pageBaseFromDom() {
  return document.documentElement.dataset.pageBase || './';
}

export function assetBaseFromDom() {
  return document.documentElement.dataset.assetBase || './assets/';
}

/** Sync tool/home links to the current page base (works from nested tool folders). */
export function bindNavLinks(pageBase) {
  document.querySelectorAll('[data-tool-link]').forEach((a) => {
    const slug = a.getAttribute('data-tool-link');
    a.setAttribute('href', `${pageBase}${slug}/`);
  });
  document.querySelectorAll('[data-home]').forEach((a) => {
    a.setAttribute('href', pageBase);
  });
}
