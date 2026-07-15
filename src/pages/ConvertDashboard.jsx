import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import ToolTile from '../components/ToolTile.jsx';
import { SITE } from '../config/site.js';
import { CONVERT_MODES, MODE_ROUTES, MODE_SEO } from '../config/tools.js';
import { useTransform } from '../hooks/useTransform.js';

function modeFromPath(pathname) {
  const slug = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!slug) return 'sentence';
  return MODE_ROUTES[slug] || 'sentence';
}

export default function ConvertDashboard({ initialMode = 'sentence' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const routeMode = modeFromPath(location.pathname) || initialMode;
  const [text, setText] = useState('');
  const [activeMode, setActiveMode] = useState(routeMode || 'sentence');
  const [copyLabel, setCopyLabel] = useState('Copy');
  const { transform, pending, countStats } = useTransform();

  useEffect(() => {
    if (routeMode) setActiveMode(routeMode);
  }, [routeMode]);

  const stats = useMemo(() => countStats(text), [text, countStats]);

  const seo = MODE_SEO[activeMode] || {
    title: SITE.defaultTitle,
    description: SITE.description,
  };

  const path = location.pathname === '/' ? '/' : location.pathname;

  const applyMode = useCallback(
    async (mode) => {
      setActiveMode(mode);
      if (!text) return;
      try {
        const next = await transform(mode, text);
        setText(next);
      } catch (err) {
        console.error(err);
      }
    },
    [text, transform],
  );

  const onTileClick = async (mode) => {
    await applyMode(mode);
    const slug = Object.entries(MODE_ROUTES).find(([, id]) => id === mode)?.[0];
    if (slug && slug !== 'convert-case') {
      navigate(`/${slug}`, { replace: true });
    }
  };

  const onConvertNow = async () => {
    await applyMode(activeMode);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel('Copied');
      setTimeout(() => setCopyLabel('Copy'), 1500);
    } catch {
      const el = document.getElementById('mainInput');
      el?.select();
      document.execCommand('copy');
      setCopyLabel('Copied');
      setTimeout(() => setCopyLabel('Copy'), 1500);
    }
  };

  const onClear = () => {
    setText('');
    document.getElementById('mainInput')?.focus();
  };

  const onDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webtoolkit-${activeMode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const mid = 10;
  const firstTiles = CONVERT_MODES.slice(0, mid);
  const secondTiles = CONVERT_MODES.slice(mid);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE.name,
    url: SITE.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: SITE.description,
  };

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={path} jsonLd={jsonLd} />

      <div className="glass-panel p-4 sm:p-8 rounded-xl relative overflow-hidden">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 border-b border-outline-variant/20 pb-4">
          <div className="flex gap-6 font-label text-secondary">
            <div className="flex flex-col">
              <span className="text-xs uppercase text-primary font-bold tracking-wider">
                Characters
              </span>
              <span className="text-2xl font-bold text-on-surface font-display">
                {stats.characters}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-primary font-bold tracking-wider">Words</span>
              <span className="text-2xl font-bold text-on-surface font-display">{stats.words}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-primary font-bold tracking-wider">Lines</span>
              <span className="text-2xl font-bold text-on-surface font-display">{stats.lines}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 no-print">
            <button
              type="button"
              onClick={onCopy}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright rounded-lg text-sm font-medium text-on-surface transition-all active:scale-95 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">
                {copyLabel === 'Copied' ? 'done' : 'content_copy'}
              </span>
              {copyLabel}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright rounded-lg text-sm font-medium text-error transition-all active:scale-95 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Clear
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright rounded-lg text-sm font-medium text-on-surface transition-all active:scale-95 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Download
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright rounded-lg text-sm font-medium text-on-surface transition-all active:scale-95 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print
            </button>
          </div>
        </div>

        <textarea
          id="mainInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-72 sm:h-96 bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl p-4 sm:p-6 font-body text-lg text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y transition-all placeholder:text-on-surface-variant/40"
          spellCheck={false}
        />
      </div>

      <button
        type="button"
        onClick={onConvertNow}
        disabled={pending}
        className="no-print w-full py-4 bg-primary text-white font-display font-bold text-xl rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-60"
      >
        <span>{pending ? 'Converting…' : 'CONVERT NOW'}</span>
        <span className="material-symbols-outlined">bolt</span>
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 no-print">
        {firstTiles.map((mode) => (
          <ToolTile
            key={mode.id}
            mode={mode}
            active={activeMode === mode.id}
            onSelect={onTileClick}
          />
        ))}
        <AdSlot variant="inline" />
        {secondTiles.map((mode) => (
          <ToolTile
            key={mode.id}
            mode={mode}
            active={activeMode === mode.id}
            onSelect={onTileClick}
          />
        ))}
      </div>

      <article className="glass-panel p-6 rounded-xl space-y-3 text-on-surface-variant leading-relaxed">
        <h1 className="font-display text-on-surface text-2xl font-semibold">
          {seo.title.replace(' — WebToolkit', '')}
        </h1>
        <p>{seo.description}</p>
        <p>
          Paste or type your text above, choose a conversion mode, or press{' '}
          <strong className="text-on-surface">CONVERT NOW</strong>. Everything runs locally in your
          browser — nothing is uploaded to a server.
        </p>
      </article>
    </>
  );
}
