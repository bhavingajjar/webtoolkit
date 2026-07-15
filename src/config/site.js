export const SITE = {
  name: 'WebToolkit',
  url: 'https://bhavingajjar.github.io/webtoolkit',
  basePath: '/webtoolkit',
  description:
    'Free, fast, browser-based tools for text case conversion, unicode styling, and generators. No accounts. No uploads.',
  defaultTitle: 'WebToolkit — Free Online Text Case Converter',
};

export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean === '/' ? '/' : clean}`;
}
