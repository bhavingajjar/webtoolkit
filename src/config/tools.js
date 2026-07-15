/** Tool registry for convert modes, SEO routes, and mega-menu */

export const CONVERT_MODES = [
  { id: 'sentence', label: 'Sentence case', preview: 'S_', icon: null },
  { id: 'lower', label: 'lower case', preview: 'abc', icon: null },
  { id: 'upper', label: 'UPPER CASE', preview: 'ABC', icon: null },
  { id: 'capitalized', label: 'Capitalized Case', preview: 'Abc', icon: null },
  { id: 'alternating', label: 'aLtErNaTiNg cAsE', preview: 'aBc', icon: null },
  { id: 'title', label: 'Title Case', preview: 'Tc', icon: null },
  { id: 'inverse', label: 'InVeRsE CaSe', preview: 'iVs', icon: null },
  { id: 'strikethrough', label: 'Strikethrough', preview: null, icon: 'strikethrough_s' },
  { id: 'reverse', label: 'Reverse Text', preview: null, icon: 'history' },
  { id: 'upsideDown', label: 'Upside Down', preview: null, icon: 'vertical_align_bottom' },
  { id: 'morse', label: 'Morse Code', preview: '· · // -', icon: null },
  { id: 'binary', label: 'Binary Code', preview: '0101', icon: null },
  { id: 'wingdings', label: 'Wingdings', preview: null, icon: 'ink_pen' },
  { id: 'bold', label: 'Bold Text', preview: null, icon: 'format_bold' },
  { id: 'wide', label: 'Wide Text', preview: null, icon: 'format_align_justify' },
  { id: 'italic', label: 'Italic Text', preview: null, icon: 'format_italic' },
  { id: 'underline', label: 'Underline Text', preview: null, icon: 'format_underlined' },
  { id: 'mirror', label: 'Mirror Text', preview: null, icon: 'flip' },
  { id: 'invisible', label: 'Invisible Text', preview: null, icon: 'visibility_off' },
  { id: 'zalgo', label: 'Zalgo Text', preview: null, icon: 'text_increase' },
];

/** SEO path slug → mode id */
export const MODE_ROUTES = {
  'sentence-case': 'sentence',
  'lower-case': 'lower',
  'upper-case': 'upper',
  'capitalized-case': 'capitalized',
  'alternating-case': 'alternating',
  'title-case': 'title',
  'inverse-case': 'inverse',
  strikethrough: 'strikethrough',
  reverse: 'reverse',
  'upside-down': 'upsideDown',
  morse: 'morse',
  binary: 'binary',
  wingdings: 'wingdings',
  bold: 'bold',
  wide: 'wide',
  italic: 'italic',
  underline: 'underline',
  mirror: 'mirror',
  'invisible-text': 'invisible',
  zalgo: 'zalgo',
  'convert-case': 'sentence',
};

export const MODE_SEO = {
  sentence: {
    title: 'Sentence Case Converter — WebToolkit',
    description:
      'Convert any text to sentence case online. Capitalize the first letter of each sentence instantly in your browser.',
  },
  lower: {
    title: 'Lower Case Converter — WebToolkit',
    description: 'Convert text to lowercase online. Uncapitalize letters instantly with WebToolkit.',
  },
  upper: {
    title: 'UPPER CASE Converter — WebToolkit',
    description: 'Convert text to UPPERCASE / ALL CAPS online instantly in your browser.',
  },
  capitalized: {
    title: 'Capitalized Case Converter — WebToolkit',
    description: 'Capitalize the first letter of every word online with WebToolkit.',
  },
  alternating: {
    title: 'Alternating Case Converter — WebToolkit',
    description: 'Generate aLtErNaTiNg cAsE text online for social media and fun.',
  },
  title: {
    title: 'Title Case Converter — WebToolkit',
    description: 'Convert text to proper title case online. Ideal for headlines and essay titles.',
  },
  inverse: {
    title: 'Inverse Case Converter — WebToolkit',
    description: 'Flip upper and lower case letters online with WebToolkit inverse case tool.',
  },
  strikethrough: {
    title: 'Strikethrough Text Generator — WebToolkit',
    description: 'Generate strikethrough Unicode text you can copy and paste anywhere.',
  },
  reverse: {
    title: 'Reverse Text Generator — WebToolkit',
    description: 'Reverse text online instantly. Flip sentences back to front in your browser.',
  },
  upsideDown: {
    title: 'Upside Down Text Generator — WebToolkit',
    description: 'Flip text upside down with Unicode characters. Copy and paste freestyle text.',
  },
  morse: {
    title: 'Morse Code Translator — WebToolkit',
    description: 'Translate English to Morse code and Morse code to English online.',
  },
  binary: {
    title: 'Binary Code Translator — WebToolkit',
    description: 'Convert text to binary and binary to text online in your browser.',
  },
  wingdings: {
    title: 'Wingdings Translator — WebToolkit',
    description: 'Encode and decode Wingdings-style symbol text online with WebToolkit.',
  },
  bold: {
    title: 'Bold Text Generator — WebToolkit',
    description: 'Generate bold Unicode text for social media bios, comments, and posts.',
  },
  wide: {
    title: 'Wide Aesthetic Text Generator — WebToolkit',
    description: 'Generate vaporwave / wide aesthetic text online and copy it instantly.',
  },
  italic: {
    title: 'Italic Text Generator — WebToolkit',
    description: 'Generate italic Unicode text you can copy and paste online.',
  },
  underline: {
    title: 'Underline Text Generator — WebToolkit',
    description: 'Underline text online using Unicode combining characters.',
  },
  mirror: {
    title: 'Mirror Text Generator — WebToolkit',
    description: 'Create mirrored Unicode text online and copy it with one click.',
  },
  invisible: {
    title: 'Invisible Text Generator — WebToolkit',
    description: 'Generate invisible Unicode characters for Discord, Valorant, and more.',
  },
  zalgo: {
    title: 'Zalgo Glitch Text Generator — WebToolkit',
    description: 'Create glitchy Zalgo text online. Copy creepy combining-mark text instantly.',
  },
};

export const SIDEBAR_CATEGORIES = [
  { id: 'converters', label: 'Converters', icon: 'text_fields', active: true, to: '/' },
  { id: 'code', label: 'Code Tools', icon: 'code', active: false, to: null },
  { id: 'data', label: 'Data Analysis', icon: 'analytics', active: false, to: null },
  { id: 'image', label: 'Image Conversion', icon: 'image', active: false, to: null },
  { id: 'fonts', label: 'Font Styles', icon: 'font_download', active: false, to: null },
];

export const MEGA_MENU_TEXT_TOOLS = [
  { label: 'Sentence Case Converter', to: '/sentence-case' },
  { label: 'lower case', to: '/lower-case' },
  { label: 'UPPER CASE', to: '/upper-case' },
  { label: 'Title Case Converter', to: '/title-case' },
  { label: 'Capitalized Case', to: '/capitalized-case' },
  { label: 'Alternating Case', to: '/alternating-case' },
  { label: 'Inverse Case', to: '/inverse-case' },
  { label: 'Invisible Text Generator', to: '/invisible-text' },
  { label: 'Reverse Text Generator', to: '/reverse' },
  { label: 'Strikethrough Text', to: '/strikethrough' },
  { label: 'Upside Down Text', to: '/upside-down' },
  { label: 'Mirror Text', to: '/mirror' },
  { label: 'Bold Text Generator', to: '/bold' },
  { label: 'Italic Text Converter', to: '/italic' },
  { label: 'Underline Text', to: '/underline' },
  { label: 'Wide Text Generator', to: '/wide' },
  { label: 'Zalgo Glitch Text', to: '/zalgo' },
  { label: 'Morse Code Translator', to: '/morse' },
  { label: 'Binary Code Translator', to: '/binary' },
  { label: 'Wingdings Translator', to: '/wingdings' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Text Tools',
    icon: 'text_fields',
    links: [
      { label: 'Sentence Case', to: '/sentence-case' },
      { label: 'UPPER CASE', to: '/upper-case' },
      { label: 'lower case', to: '/lower-case' },
      { label: 'Title Case', to: '/title-case' },
    ],
  },
  {
    title: 'Code & Data',
    icon: 'code',
    links: [
      { label: 'Binary to Text', to: '/binary' },
      { label: 'Morse Code', to: '/morse' },
      { label: 'Wingdings', to: '/wingdings' },
      { label: 'JSON Formatter', to: null },
    ],
  },
  {
    title: 'Style Generators',
    icon: 'font_download',
    links: [
      { label: 'Bold Text', to: '/bold' },
      { label: 'Wide Text', to: '/wide' },
      { label: 'Italic Text', to: '/italic' },
      { label: 'Zalgo Text', to: '/zalgo' },
    ],
  },
  {
    title: 'More',
    icon: 'apps',
    links: [
      { label: 'Convert Case', to: '/' },
      { label: 'Reverse Text', to: '/reverse' },
      { label: 'Invisible Text', to: '/invisible-text' },
      { label: 'About', to: null },
    ],
  },
];
