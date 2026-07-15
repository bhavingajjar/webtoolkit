import { CONVERT_MODES, seoForMode, toolNavLabel } from './config.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function megaMenuLinks() {
  return CONVERT_MODES.map(
    (mode) =>
      `              <a data-tool-link="${mode.slug}" href="./${mode.slug}/">${escapeHtml(toolNavLabel(mode.id))}</a>`,
  ).join('\n');
}

function footerToolLinks() {
  return CONVERT_MODES.slice(0, 4)
    .map(
      (mode) =>
        `            <li><a data-tool-link="${mode.slug}" href="./${mode.slug}/">${escapeHtml(toolNavLabel(mode.id))}</a></li>`,
    )
    .join('\n');
}

export function renderHeader({ logoSrc, pageBase }) {
  return `
  <header class="site-header">
    <a class="brand" data-home href="${pageBase}">
      <img src="${logoSrc}" alt="WebToolkit logo" width="32" height="32" />
      <span>WebToolkit</span>
    </a>
    <div class="header-right">
      <div class="theme-toggle" role="group" aria-label="Theme">
        <button type="button" data-theme="dark" class="active" aria-label="Dark theme"><span class="material-symbols-outlined">dark_mode</span></button>
        <button type="button" data-theme="light" aria-label="Light theme"><span class="material-symbols-outlined">light_mode</span></button>
        <button type="button" data-theme="system" aria-label="System theme"><span class="material-symbols-outlined">settings_brightness</span></button>
      </div>
      <nav class="nav-desktop" aria-label="Primary">
        <div class="nav-item">
          <button type="button" class="nav-btn active">Text Tools <span class="material-symbols-outlined">expand_more</span></button>
          <div class="mega-menu">
${megaMenuLinks()}
          </div>
        </div>
        <span class="nav-btn nav-muted">Code &amp; Data</span>
        <span class="nav-btn nav-muted">Image &amp; Media</span>
        <span class="nav-btn nav-muted">Font Styles</span>
        <span class="nav-btn nav-muted">Random Generators</span>
        <span class="nav-btn nav-muted">Resources</span>
      </nav>
    </div>
  </header>`;
}

export function renderSidebar({ pageBase }) {
  return `
    <aside class="sidebar">
      <h2>Tool Categories</h2>
      <p class="eyebrow font-label">Precision Utilities</p>
      <nav class="side-nav" aria-label="Categories">
        <a class="active" data-home href="${pageBase}"><span class="material-symbols-outlined">text_fields</span> Converters</a>
        <div class="side-link soon"><span class="material-symbols-outlined">code</span> Code Tools</div>
        <div class="side-link soon"><span class="material-symbols-outlined">analytics</span> Data Analysis</div>
        <div class="side-link soon"><span class="material-symbols-outlined">image</span> Image Conversion</div>
        <div class="side-link soon"><span class="material-symbols-outlined">font_download</span> Font Styles</div>
      </nav>
    </aside>`;
}

export function renderWorkspace({ modeId }) {
  const seo = seoForMode(modeId);
  const heading = seo.title.replace(' — WebToolkit', '');
  return `
    <section class="workspace">
      <div class="glass-panel panel">
        <div class="toolbar">
          <div class="stats">
            <div><span class="label">Characters</span><span class="value" id="charCount">0</span></div>
            <div><span class="label">Words</span><span class="value" id="wordCount">0</span></div>
            <div><span class="label">Lines</span><span class="value" id="lineCount">0</span></div>
          </div>
          <div class="actions no-print">
            <button type="button" id="btnCopy"><span class="material-symbols-outlined">content_copy</span> Copy</button>
            <button type="button" id="btnClear" class="danger"><span class="material-symbols-outlined">delete</span> Clear</button>
            <button type="button" id="btnDownload"><span class="material-symbols-outlined">download</span> Download</button>
            <button type="button" id="btnPrint"><span class="material-symbols-outlined">print</span> Print</button>
          </div>
        </div>
        <textarea id="mainInput" placeholder="Enter your text here..." spellcheck="false"></textarea>
      </div>

      <button type="button" class="convert-btn no-print" id="convertBtn">
        <span>CONVERT NOW</span>
        <span class="material-symbols-outlined">bolt</span>
      </button>

      <div class="tool-grid no-print" id="toolGrid"></div>

      <article class="glass-panel seo-blurb">
        <h1 id="seoTitle">${escapeHtml(heading)}</h1>
        <p id="seoDesc">${escapeHtml(seo.description)}</p>
        <p>Paste or type your text above, choose a conversion mode, or press <strong>CONVERT NOW</strong>. Everything runs locally in your browser — nothing is uploaded.</p>
      </article>
    </section>`;
}

export function renderAdRail() {
  return `
    <aside class="ad-rail no-print">
      <div class="ad-slot glass-panel ad-sky">
        <span class="tag font-label">Facebook Ads</span>
        <div class="mock"><span class="material-symbols-outlined" style="color:var(--primary);font-size:2.5rem">campaign</span></div>
        <h5>Sponsored</h5>
        <p>Ad slot reserved. Add your AdSense client id in <code>assets/js/modules/config.js</code> when ready.</p>
        <button type="button" class="cta" disabled>Learn More</button>
        <p class="font-label" style="margin-top:1rem;opacity:.5">Sponsored Content</p>
      </div>
    </aside>`;
}

export function renderLeaderboard() {
  return `
  <div class="ad-leader no-print">
    <div class="ad-slot glass-panel box">
      <span class="tag font-label">Google AdSense</span>
      Leaderboard ad placeholder
    </div>
  </div>`;
}

export function renderFooter({ pageBase }) {
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h4><span class="material-symbols-outlined">text_fields</span> Text Tools</h4>
        <ul>
${footerToolLinks()}
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">code</span> Code &amp; Data</h4>
        <ul>
          <li><a data-tool-link="binary" href="${pageBase}binary/">Binary to Text</a></li>
          <li><a data-tool-link="morse" href="${pageBase}morse/">Morse Code</a></li>
          <li><a data-tool-link="wingdings" href="${pageBase}wingdings/">Wingdings</a></li>
          <li><span style="opacity:.6">JSON Formatter</span></li>
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">font_download</span> Style Generators</h4>
        <ul>
          <li><a data-tool-link="bold" href="${pageBase}bold/">Bold Text</a></li>
          <li><a data-tool-link="wide" href="${pageBase}wide/">Wide Text</a></li>
          <li><a data-tool-link="italic" href="${pageBase}italic/">Italic Text</a></li>
          <li><a data-tool-link="zalgo" href="${pageBase}zalgo/">Zalgo Text</a></li>
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">apps</span> More</h4>
        <ul>
          <li><a data-home href="${pageBase}">Convert Case</a></li>
          <li><a data-tool-link="reverse" href="${pageBase}reverse/">Reverse Text</a></li>
          <li><a data-tool-link="invisible-text" href="${pageBase}invisible-text/">Invisible Text</a></li>
          <li><span style="opacity:.6">About</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="font-label">© Copyright WebToolkit.</p>
      <div class="links font-label">
        <span>About</span>
        <span>Links</span>
        <span>Blog</span>
        <button type="button" id="footerPrint" style="background:none;border:0;color:inherit;cursor:pointer;padding:0;font:inherit">Print</button>
      </div>
    </div>
  </footer>`;
}

/** Full page chrome assembled from shared partials. */
export function renderAppShell({ modeId, pageBase, assetBase }) {
  const logoSrc = `${assetBase}logo.png`;
  return [
    renderHeader({ logoSrc, pageBase }),
    `<div class="layout">`,
    renderSidebar({ pageBase }),
    renderWorkspace({ modeId }),
    renderAdRail(),
    `</div>`,
    renderLeaderboard(),
    renderFooter({ pageBase }),
  ].join('\n');
}

export function renderToolTile(mode, activeMode) {
  const active = mode.id === activeMode;
  const icon = mode.icon
    ? `<span class="material-symbols-outlined">${mode.icon}</span>`
    : `<span class="preview">${escapeHtml(mode.preview || '')}</span>`;
  return `
    <button type="button" class="tool-tile${active ? ' active' : ''}" data-mode="${mode.id}" aria-pressed="${active}">
      ${icon}
      <span class="label">${escapeHtml(mode.label)}</span>
    </button>`;
}

export function renderInlineAd() {
  return `
    <div class="ad-slot glass-panel ad-inline no-print">
      <span class="tag font-label">Google AdSense</span>
      <div class="ad-inline-inner">
        <div class="icon-box"><span class="material-symbols-outlined" style="color:var(--secondary);font-size:2rem">bolt</span></div>
        <div>
          <h4>Next-Gen Workspace</h4>
          <p>In-content ad placeholder — set ADSENSE_CLIENT in assets/js/modules/config.js when ready.</p>
        </div>
        <button type="button" class="ad-pill" disabled>Try It Free</button>
      </div>
    </div>`;
}
