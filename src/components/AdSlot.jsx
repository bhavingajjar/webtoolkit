import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, ADSENSE_SLOTS, adsEnabled } from '../config/ads.js';

const LABELS = {
  inline: 'Google AdSense',
  skyscraper: 'Facebook Ads',
  leaderboard: 'Google AdSense',
};

export default function AdSlot({ variant = 'inline', className = '' }) {
  const slotRef = useRef(null);
  const slotId = ADSENSE_SLOTS[variant] || '';

  useEffect(() => {
    if (!adsEnabled || !slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore until approved */
    }
  }, [slotId]);

  if (variant === 'skyscraper') {
    return (
      <div
        className={`h-[600px] glass-panel flex flex-col items-center p-4 relative overflow-hidden rounded-xl ${className}`}
      >
        <span className="font-label text-outline absolute top-2 right-2 text-[10px]">
          {LABELS[variant]}
        </span>
        {adsEnabled && slotId ? (
          <ins
            ref={slotRef}
            className="adsbygoogle mt-8 block w-full flex-1"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="vertical"
            data-full-width-responsive="false"
          />
        ) : (
          <>
            <div className="w-full h-40 mb-4 rounded-lg overflow-hidden border border-outline-variant/30 mt-6 bg-surface-container-highest/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">campaign</span>
            </div>
            <h5 className="text-on-surface font-bold text-center mb-2 font-display">Sponsored</h5>
            <p className="text-on-surface-variant text-xs text-center mb-6 leading-relaxed px-2">
              Ad slot reserved. Add your AdSense client id in <code>src/config/ads.js</code> to
              enable.
            </p>
            <button
              type="button"
              className="mt-auto w-full py-3 bg-secondary text-on-secondary font-bold text-xs rounded-lg shadow-lg shadow-secondary/10"
              disabled
            >
              Learn More
            </button>
            <div className="mt-8 border-t border-outline-variant/30 pt-4 w-full">
              <p className="text-[10px] text-center text-on-surface-variant/50 uppercase tracking-widest">
                Sponsored Content
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === 'leaderboard') {
    return (
      <div className={`w-full flex justify-center py-6 bg-surface-container-lowest border-t border-outline-variant/20 ${className}`}>
        <div className="max-w-[728px] w-full h-[90px] glass-panel flex items-center justify-center relative overflow-hidden rounded-xl px-4">
          <span className="font-label text-outline absolute top-2 right-2 text-[10px]">
            {LABELS[variant]}
          </span>
          {adsEnabled && slotId ? (
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: 728, height: 90 }}
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={slotId}
            />
          ) : (
            <p className="text-on-surface-variant text-sm">Leaderboard ad placeholder</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`col-span-full h-32 glass-panel flex items-center justify-center relative overflow-hidden rounded-xl border border-outline-variant/20 ${className}`}
    >
      <span className="font-label text-outline absolute top-2 right-2 text-[10px]">
        {LABELS.inline}
      </span>
      {adsEnabled && slotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex items-center gap-6 w-full px-8">
          <div className="w-20 h-20 rounded-lg bg-surface-container-highest/50 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-3xl">bolt</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-on-surface font-bold text-lg font-display">Next-Gen Workspace</h4>
            <p className="text-on-surface-variant text-sm">
              In-content ad placeholder — enable when your AdSense key is ready.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="px-6 py-3 bg-secondary text-on-secondary font-bold rounded-lg shadow-lg shadow-secondary/20 shrink-0 hidden sm:inline-flex"
          >
            Try It Free
          </button>
        </div>
      )}
    </div>
  );
}
