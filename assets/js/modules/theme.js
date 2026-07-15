/** Theme toggle (dark / light / system). */

export function applyTheme(mode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode === 'dark' || (mode === 'system' && prefersDark);
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

export function initTheme() {
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
