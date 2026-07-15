import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { adsEnabled, ADSENSE_CLIENT } from './config/ads.js';
import './styles/index.css';

function AdSenseLoader() {
  useEffect(() => {
    if (!adsEnabled) return undefined;
    if (document.querySelector('script[data-adsense]')) return undefined;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = 'anonymous';
    script.dataset.adsense = 'true';
    document.head.appendChild(script);
    return undefined;
  }, []);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/webtoolkit">
        <AdSenseLoader />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
