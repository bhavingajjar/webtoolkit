#!/usr/bin/env python3
"""Generate index.html and SEO tool pages for WebToolkit static site."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

MODES = [
    ("sentence", "sentence-case", "Sentence Case Converter — WebToolkit",
     "Convert any text to sentence case online. Capitalize the first letter of each sentence instantly in your browser."),
    ("lower", "lower-case", "Lower Case Converter — WebToolkit",
     "Convert text to lowercase online. Uncapitalize letters instantly with WebToolkit."),
    ("upper", "upper-case", "UPPER CASE Converter — WebToolkit",
     "Convert text to UPPERCASE / ALL CAPS online instantly in your browser."),
    ("capitalized", "capitalized-case", "Capitalized Case Converter — WebToolkit",
     "Capitalize the first letter of every word online with WebToolkit."),
    ("alternating", "alternating-case", "Alternating Case Converter — WebToolkit",
     "Generate aLtErNaTiNg cAsE text online for social media and fun."),
    ("title", "title-case", "Title Case Converter — WebToolkit",
     "Convert text to proper title case online. Ideal for headlines and essay titles."),
    ("inverse", "inverse-case", "Inverse Case Converter — WebToolkit",
     "Flip upper and lower case letters online with WebToolkit inverse case tool."),
    ("strikethrough", "strikethrough", "Strikethrough Text Generator — WebToolkit",
     "Generate strikethrough Unicode text you can copy and paste anywhere."),
    ("reverse", "reverse", "Reverse Text Generator — WebToolkit",
     "Reverse text online instantly. Flip sentences back to front in your browser."),
    ("upsideDown", "upside-down", "Upside Down Text Generator — WebToolkit",
     "Flip text upside down with Unicode characters. Copy and paste freestyle text."),
    ("morse", "morse", "Morse Code Translator — WebToolkit",
     "Translate English to Morse code and Morse code to English online."),
    ("binary", "binary", "Binary Code Translator — WebToolkit",
     "Convert text to binary and binary to text online in your browser."),
    ("wingdings", "wingdings", "Wingdings Translator — WebToolkit",
     "Encode and decode Wingdings-style symbol text online with WebToolkit."),
    ("bold", "bold", "Bold Text Generator — WebToolkit",
     "Generate bold Unicode text for social media bios, comments, and posts."),
    ("wide", "wide", "Wide Aesthetic Text Generator — WebToolkit",
     "Generate vaporwave / wide aesthetic text online and copy it instantly."),
    ("italic", "italic", "Italic Text Generator — WebToolkit",
     "Generate italic Unicode text you can copy and paste online."),
    ("underline", "underline", "Underline Text Generator — WebToolkit",
     "Underline text online using Unicode combining characters."),
    ("mirror", "mirror", "Mirror Text Generator — WebToolkit",
     "Create mirrored Unicode text online and copy it with one click."),
    ("invisible", "invisible-text", "Invisible Text Generator — WebToolkit",
     "Generate invisible Unicode characters for Discord, Valorant, and more."),
    ("zalgo", "zalgo", "Zalgo Glitch Text Generator — WebToolkit",
     "Create glitchy Zalgo text online. Copy creepy combining-mark text instantly."),
]

MEGA_LINKS = "\n".join(
    f'              <a data-tool-link="{slug}" href="./{slug}/">{title.split(" — ")[0]}</a>'
    for _mode, slug, title, _desc in MODES
)

FOOTER_TEXT = "\n".join(
    f'            <li><a data-tool-link="{slug}" href="./{slug}/">{title.split(" — ")[0]}</a></li>'
    for _mode, slug, title, _desc in MODES[:4]
)


def page(mode: str, slug: str | None, title: str, description: str, nested: bool) -> str:
    asset = "../assets/" if nested else "./assets/"
    page_base = "../" if nested else "./"
    canonical = f"https://bhavingajjar.github.io/webtoolkit/{(slug + '/') if slug else ''}"
    logo = f"{asset}logo.png"
    css = f"{asset}css/site.css"
    app = f"{asset}js/app.js"
    mega = MEGA_LINKS.replace('href="./', f'href="{page_base}')
    footer_tools = FOOTER_TEXT.replace('href="./', f'href="{page_base}')
    h1 = title.replace(" — WebToolkit", "")

    return f"""<!DOCTYPE html>
<html lang="en" class="dark" data-mode="{mode}" data-asset-base="{asset}" data-page-base="{page_base}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <link rel="canonical" href="{canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="WebToolkit" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="https://bhavingajjar.github.io/webtoolkit/assets/logo.png" />
  <meta name="twitter:card" content="summary" />
  <link rel="icon" type="image/png" href="{logo}" />
  <link rel="stylesheet" href="{css}" />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WebToolkit",
    "url": "https://bhavingajjar.github.io/webtoolkit/",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }},
    "description": "{description}"
  }}
  </script>
</head>
<body>
  <header class="site-header">
    <a class="brand" data-home href="{page_base}">
      <img src="{logo}" alt="WebToolkit logo" width="32" height="32" />
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
{mega}
          </div>
        </div>
        <span class="nav-btn nav-muted">Code &amp; Data</span>
        <span class="nav-btn nav-muted">Image &amp; Media</span>
        <span class="nav-btn nav-muted">Font Styles</span>
        <span class="nav-btn nav-muted">Random Generators</span>
        <span class="nav-btn nav-muted">Resources</span>
      </nav>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <h2>Tool Categories</h2>
      <p class="eyebrow font-label">Precision Utilities</p>
      <nav class="side-nav" aria-label="Categories">
        <a class="active" data-home href="{page_base}"><span class="material-symbols-outlined">text_fields</span> Converters</a>
        <div class="side-link soon"><span class="material-symbols-outlined">code</span> Code Tools</div>
        <div class="side-link soon"><span class="material-symbols-outlined">analytics</span> Data Analysis</div>
        <div class="side-link soon"><span class="material-symbols-outlined">image</span> Image Conversion</div>
        <div class="side-link soon"><span class="material-symbols-outlined">font_download</span> Font Styles</div>
      </nav>
    </aside>

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
        <h1 id="seoTitle">{h1}</h1>
        <p id="seoDesc">{description}</p>
        <p>Paste or type your text above, choose a conversion mode, or press <strong>CONVERT NOW</strong>. Everything runs locally in your browser — nothing is uploaded.</p>
      </article>
    </section>

    <aside class="ad-rail no-print">
      <div class="ad-slot glass-panel ad-sky">
        <span class="tag font-label">Facebook Ads</span>
        <div class="mock"><span class="material-symbols-outlined" style="color:var(--primary);font-size:2.5rem">campaign</span></div>
        <h5>Sponsored</h5>
        <p>Ad slot reserved. Add your AdSense client id in <code>assets/js/config.js</code> when ready.</p>
        <button type="button" class="cta" disabled>Learn More</button>
        <p class="font-label" style="margin-top:1rem;opacity:.5">Sponsored Content</p>
      </div>
    </aside>
  </div>

  <div class="ad-leader no-print">
    <div class="ad-slot glass-panel box">
      <span class="tag font-label">Google AdSense</span>
      Leaderboard ad placeholder
    </div>
  </div>

  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h4><span class="material-symbols-outlined">text_fields</span> Text Tools</h4>
        <ul>
{footer_tools}
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">code</span> Code &amp; Data</h4>
        <ul>
          <li><a data-tool-link="binary" href="{page_base}binary/">Binary to Text</a></li>
          <li><a data-tool-link="morse" href="{page_base}morse/">Morse Code</a></li>
          <li><a data-tool-link="wingdings" href="{page_base}wingdings/">Wingdings</a></li>
          <li><span style="opacity:.6">JSON Formatter</span></li>
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">font_download</span> Style Generators</h4>
        <ul>
          <li><a data-tool-link="bold" href="{page_base}bold/">Bold Text</a></li>
          <li><a data-tool-link="wide" href="{page_base}wide/">Wide Text</a></li>
          <li><a data-tool-link="italic" href="{page_base}italic/">Italic Text</a></li>
          <li><a data-tool-link="zalgo" href="{page_base}zalgo/">Zalgo Text</a></li>
        </ul>
      </div>
      <div>
        <h4><span class="material-symbols-outlined">apps</span> More</h4>
        <ul>
          <li><a data-home href="{page_base}">Convert Case</a></li>
          <li><a data-tool-link="reverse" href="{page_base}reverse/">Reverse Text</a></li>
          <li><a data-tool-link="invisible-text" href="{page_base}invisible-text/">Invisible Text</a></li>
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
  </footer>

  <script type="module" src="{app}"></script>
  <script>
    document.getElementById('footerPrint')?.addEventListener('click', () => window.print());
  </script>
</body>
</html>
"""


def main() -> None:
    home_title = "WebToolkit — Free Online Text Case Converter"
    home_desc = "Free browser-based text case converter and utilities. Convert uppercase, lowercase, title case, and more. No uploads."
    (ROOT / "index.html").write_text(page("sentence", None, home_title, home_desc, nested=False), encoding="utf-8")

    for mode, slug, title, desc in MODES:
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(page(mode, slug, title, desc, nested=True), encoding="utf-8")

    # convert-case alias
    alias = ROOT / "convert-case"
    alias.mkdir(parents=True, exist_ok=True)
    (alias / "index.html").write_text(
        page("sentence", "convert-case", "Convert Case — WebToolkit", home_desc, nested=True),
        encoding="utf-8",
    )

    urls = ["https://bhavingajjar.github.io/webtoolkit/"]
    urls.append("https://bhavingajjar.github.io/webtoolkit/convert-case/")
    for _mode, slug, _t, _d in MODES:
        urls.append(f"https://bhavingajjar.github.io/webtoolkit/{slug}/")

    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for i, url in enumerate(urls):
        pri = "1.0" if i == 0 else "0.8"
        sitemap.append(f"  <url><loc>{url}</loc><changefreq>weekly</changefreq><priority>{pri}</priority></url>")
    sitemap.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sitemap) + "\n", encoding="utf-8")

    (ROOT / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\nSitemap: https://bhavingajjar.github.io/webtoolkit/sitemap.xml\n",
        encoding="utf-8",
    )
    (ROOT / "ads.txt").write_text(
        "# Replace with your AdSense publisher line when approved, e.g.:\n"
        "# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n",
        encoding="utf-8",
    )
    # SPA-ish fallback for unknown paths on GH Pages
    (ROOT / "404.html").write_text(
        page("sentence", None, home_title, home_desc, nested=False).replace(
            'data-page-base="./"', 'data-page-base="/webtoolkit/"'
        ).replace('data-asset-base="./assets/"', 'data-asset-base="/webtoolkit/assets/"')
        .replace('href="./assets/', 'href="/webtoolkit/assets/')
        .replace('src="./assets/', 'src="/webtoolkit/assets/')
        .replace('href="./"', 'href="/webtoolkit/"'),
        encoding="utf-8",
    )

    print(f"Generated home + {len(MODES)} tool pages + convert-case + sitemap")


if __name__ == "__main__":
    main()
