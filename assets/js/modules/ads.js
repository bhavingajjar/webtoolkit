import { ADSENSE_CLIENT } from './config.js';

/** Load AdSense only when a publisher client id is configured. */
export function loadAdsense() {
  if (!ADSENSE_CLIENT) return;
  if (document.querySelector('script[data-adsense]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.dataset.adsense = 'true';
  document.head.appendChild(script);
}
