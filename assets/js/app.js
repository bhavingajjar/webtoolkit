/**
 * WebToolkit entry — mounts shared HTML templates from modules/.
 * Tool folders only ship SEO shells; all chrome lives here.
 */
import { loadAdsense } from './modules/ads.js';
import { bindConverter } from './modules/converter-ui.js';
import {
  assetBaseFromDom,
  bindNavLinks,
  pageBaseFromDom,
  resolveInitialMode,
} from './modules/router.js';
import { renderAppShell } from './modules/templates.js';
import { initTheme } from './modules/theme.js';

const pageBase = pageBaseFromDom();
const assetBase = assetBaseFromDom();
const initialMode = resolveInitialMode();

const mount = document.getElementById('app');
if (mount) {
  mount.innerHTML = renderAppShell({
    modeId: initialMode,
    pageBase,
    assetBase,
  });
}

document.documentElement.dataset.mode = initialMode;

initTheme();
loadAdsense();
bindNavLinks(pageBase);
bindConverter(initialMode);
