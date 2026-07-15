/** Shared tool metadata for UI + SEO pages */

export const SITE = {
  name: 'WebToolkit',
  url: 'https://bhavingajjar.github.io/webtoolkit',
  description:
    'Free, fast, browser-based tools for text case conversion, unicode styling, and generators. No accounts. No uploads.',
};

/** Set when ready, e.g. 'ca-pub-XXXXXXXXXXXXXXXX' */
export const ADSENSE_CLIENT = '';

export const CONVERT_MODES = [
  { id: 'sentence', label: 'Sentence case', preview: 'S_', icon: null, slug: 'sentence-case' },
  { id: 'lower', label: 'lower case', preview: 'abc', icon: null, slug: 'lower-case' },
  { id: 'upper', label: 'UPPER CASE', preview: 'ABC', icon: null, slug: 'upper-case' },
  { id: 'capitalized', label: 'Capitalized Case', preview: 'Abc', icon: null, slug: 'capitalized-case' },
  { id: 'alternating', label: 'aLtErNaTiNg cAsE', preview: 'aBc', icon: null, slug: 'alternating-case' },
  { id: 'title', label: 'Title Case', preview: 'Tc', icon: null, slug: 'title-case' },
  { id: 'inverse', label: 'InVeRsE CaSe', preview: 'iVs', icon: null, slug: 'inverse-case' },
  { id: 'strikethrough', label: 'Strikethrough', preview: null, icon: 'strikethrough_s', slug: 'strikethrough' },
  { id: 'reverse', label: 'Reverse Text', preview: null, icon: 'history', slug: 'reverse' },
  { id: 'upsideDown', label: 'Upside Down', preview: null, icon: 'vertical_align_bottom', slug: 'upside-down' },
  { id: 'morse', label: 'Morse Code', preview: '· · // -', icon: null, slug: 'morse' },
  { id: 'binary', label: 'Binary Code', preview: '0101', icon: null, slug: 'binary' },
  { id: 'wingdings', label: 'Wingdings', preview: null, icon: 'ink_pen', slug: 'wingdings' },
  { id: 'bold', label: 'Bold Text', preview: null, icon: 'format_bold', slug: 'bold' },
  { id: 'wide', label: 'Wide Text', preview: null, icon: 'format_align_justify', slug: 'wide' },
  { id: 'italic', label: 'Italic Text', preview: null, icon: 'format_italic', slug: 'italic' },
  { id: 'underline', label: 'Underline Text', preview: null, icon: 'format_underlined', slug: 'underline' },
  { id: 'mirror', label: 'Mirror Text', preview: null, icon: 'flip', slug: 'mirror' },
  { id: 'invisible', label: 'Invisible Text', preview: null, icon: 'visibility_off', slug: 'invisible-text' },
  { id: 'zalgo', label: 'Zalgo Text', preview: null, icon: 'text_increase', slug: 'zalgo' },
];

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
