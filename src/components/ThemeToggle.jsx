import { useEffect, useState } from 'react';

const MODES = ['dark', 'light', 'system'];

function applyTheme(mode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode === 'dark' || (mode === 'system' && prefersDark);
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem('wt-theme') || 'dark');

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('wt-theme', mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const icon = { dark: 'dark_mode', light: 'light_mode', system: 'settings_brightness' };

  return (
    <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full border border-outline-variant/20">
      {MODES.map((m) => (
        <button
          key={m}
          type="button"
          aria-label={`${m} theme`}
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            mode === m
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-bright/20'
          }`}
        >
          <span className="material-symbols-outlined text-sm">{icon[m]}</span>
        </button>
      ))}
    </div>
  );
}
