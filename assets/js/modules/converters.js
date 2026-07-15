const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'in',
  'nor',
  'of',
  'on',
  'or',
  'per',
  'the',
  'to',
  'via',
  'vs',
  'with',
]);

const UPSIDE_DOWN_MAP = {
  a: 'ɐ',
  b: 'q',
  c: 'ɔ',
  d: 'p',
  e: 'ǝ',
  f: 'ɟ',
  g: 'ƃ',
  h: 'ɥ',
  i: 'ᴉ',
  j: 'ɾ',
  k: 'ʞ',
  l: 'l',
  m: 'ɯ',
  n: 'u',
  o: 'o',
  p: 'd',
  q: 'b',
  r: 'ɹ',
  s: 's',
  t: 'ʇ',
  u: 'n',
  v: 'ʌ',
  w: 'ʍ',
  x: 'x',
  y: 'ʎ',
  z: 'z',
  A: '∀',
  B: '𐐒',
  C: 'Ɔ',
  D: '◖',
  E: 'Ǝ',
  F: 'Ⅎ',
  G: 'ƃ',
  H: 'H',
  I: 'I',
  J: 'ſ',
  K: 'ʞ',
  L: '˥',
  M: 'W',
  N: 'N',
  O: 'O',
  P: 'Ԁ',
  Q: 'Ὸ',
  R: 'ᴚ',
  S: 'S',
  T: '⊥',
  U: '∩',
  V: 'Λ',
  W: 'M',
  X: 'X',
  Y: '⅄',
  Z: 'Z',
  1: 'Ɩ',
  2: 'ᄅ',
  3: 'Ɛ',
  4: 'ㄣ',
  5: 'ϛ',
  6: '9',
  7: 'ㄥ',
  8: '8',
  9: '6',
  0: '0',
  '.': '˙',
  ',': "'",
  "'": ',',
  '"': '„',
  '!': '¡',
  '?': '¿',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  '&': '⅋',
  _: '‾',
};

const MIRROR_MAP = {
  a: 'ɒ',
  b: 'd',
  c: 'ɔ',
  d: 'b',
  e: 'ɘ',
  f: 'ʇ',
  g: 'ǫ',
  h: 'ʜ',
  i: 'i',
  j: 'ꞁ',
  k: 'ʞ',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'q',
  q: 'p',
  r: 'ɿ',
  s: 'ƨ',
  t: 'ƚ',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'γ',
  z: 'z',
  A: 'A',
  B: '𐐒',
  C: 'Ɔ',
  D: '◖',
  E: 'Ǝ',
  F: 'ꟻ',
  G: 'Ә',
  H: 'H',
  I: 'I',
  J: 'Ⴑ',
  K: '⋊',
  L: '⅃',
  M: 'M',
  N: 'И',
  O: 'O',
  P: 'ꟼ',
  Q: 'Ԛ',
  R: 'Я',
  S: 'Ƨ',
  T: 'T',
  U: 'U',
  V: 'V',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'Z',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
};

const MORSE_ENCODE = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  0: '-----',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  _: '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.',
  ' ': '/',
};

const MORSE_DECODE = Object.fromEntries(
  Object.entries(MORSE_ENCODE).map(([k, v]) => [v, k === ' ' ? ' ' : k]),
);

const WINGDINGS_MAP =
  '☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

function mapChars(text, map) {
  return [...text].map((ch) => map[ch] ?? ch).join('');
}

function toMathBold(ch) {
  const code = ch.codePointAt(0);
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
  if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + (code - 48));
  return ch;
}

function toMathItalic(ch) {
  const code = ch.codePointAt(0);
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + (code - 65));
  if (code >= 97 && code <= 122) {
    if (ch === 'h') return 'ℎ';
    return String.fromCodePoint(0x1d44e + (code - 97));
  }
  return ch;
}

function toFullWidth(ch) {
  const code = ch.codePointAt(0);
  if (ch === ' ') return '　';
  if (code >= 33 && code <= 126) return String.fromCodePoint(0xff01 + (code - 33));
  return ch;
}

const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
  '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
  '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
  '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d',
  '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
];

const ZALGO_MID = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
  '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e',
  '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489',
];

const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
  '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
  '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
  '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d',
  '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323',
];

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function zalgoChar(ch, intensity = 1) {
  if (/\s/.test(ch)) return ch;
  let out = ch;
  const up = 1 + Math.floor(Math.random() * (2 + intensity));
  const mid = Math.floor(Math.random() * (1 + intensity));
  const down = 1 + Math.floor(Math.random() * (2 + intensity));
  for (let i = 0; i < up; i++) out += randFrom(ZALGO_UP);
  for (let i = 0; i < mid; i++) out += randFrom(ZALGO_MID);
  for (let i = 0; i < down; i++) out += randFrom(ZALGO_DOWN);
  return out;
}

export function sentenceCase(text) {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m) => m.toUpperCase()).replace(/\bi\b/g, 'I');
}

export function lowerCase(text) {
  return text.toLowerCase();
}

export function upperCase(text) {
  return text.toUpperCase();
}

export function capitalizedCase(text) {
  return text.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

export function alternatingCase(text) {
  let i = 0;
  return [...text]
    .map((ch) => {
      if (!/[a-z]/i.test(ch)) return ch;
      const next = i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
      i += 1;
      return next;
    })
    .join('');
}

export function titleCase(text) {
  const words = text.toLowerCase().split(/(\s+)/);
  let wordIndex = 0;
  return words
    .map((part) => {
      if (/^\s+$/.test(part) || part === '') return part;
      const clean = part.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
      const isSmall = SMALL_WORDS.has(clean.toLowerCase());
      const shouldCap = wordIndex === 0 || !isSmall;
      wordIndex += 1;
      if (!shouldCap) return part.toLowerCase();
      return part.replace(/[a-z]/i, (c) => c.toUpperCase());
    })
    .join('');
}

export function inverseCase(text) {
  return [...text]
    .map((ch) => {
      if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return ch.toLowerCase();
      if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) return ch.toUpperCase();
      return ch;
    })
    .join('');
}

export function strikethrough(text) {
  return [...text].map((ch) => (ch === '\n' ? ch : `${ch}\u0336`)).join('');
}

export function reverseText(text) {
  return [...text].reverse().join('');
}

export function upsideDown(text) {
  return mapChars([...text].reverse().join(''), UPSIDE_DOWN_MAP);
}

export function mirrorText(text) {
  return mapChars([...text].reverse().join(''), MIRROR_MAP);
}

export function underlineText(text) {
  return [...text].map((ch) => (ch === '\n' || ch === ' ' ? ch : `${ch}\u0332`)).join('');
}

export function boldText(text) {
  return [...text].map(toMathBold).join('');
}

export function italicText(text) {
  return [...text].map(toMathItalic).join('');
}

export function wideText(text) {
  return [...text].map(toFullWidth).join('');
}

export function invisibleText(text) {
  if (!text.trim()) return '\u200B\u200C\u200D\u2060';
  return [...text].map((ch) => (ch === '\n' ? ch : '\u200B')).join('');
}

export function zalgoText(text) {
  return [...text].map((ch) => zalgoChar(ch, 2)).join('');
}

export function toMorse(text) {
  return [...text.toUpperCase()]
    .map((ch) => MORSE_ENCODE[ch] ?? ch)
    .join(' ')
    .replace(/\s+\/\s+/g, ' / ');
}

export function fromMorse(text) {
  return text
    .trim()
    .split(/\s*\/\s*/)
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => MORSE_DECODE[code] ?? code)
        .join(''),
    )
    .join(' ');
}

export function morseTransform(text) {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const looksLikeMorse = /^[.\-\/\s]+$/.test(trimmed);
  return looksLikeMorse ? fromMorse(trimmed) : toMorse(trimmed);
}

export function toBinary(text) {
  return [...text]
    .map((ch) => ch.codePointAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function fromBinary(text) {
  const bits = text.trim().split(/\s+/).filter(Boolean);
  try {
    return bits
      .map((b) => {
        if (!/^[01]+$/.test(b)) return b;
        return String.fromCodePoint(parseInt(b, 2));
      })
      .join('');
  } catch {
    return text;
  }
}

export function binaryTransform(text) {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const looksBinary = /^[01\s]+$/.test(trimmed) && trimmed.replace(/\s+/g, '').length % 8 === 0;
  return looksBinary ? fromBinary(trimmed) : toBinary(trimmed);
}

export function wingdings(text) {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0);
      if (code >= 32 && code <= 126) return WINGDINGS_MAP[code - 32] ?? ch;
      return ch;
    })
    .join('');
}

const TRANSFORMS = {
  sentence: sentenceCase,
  lower: lowerCase,
  upper: upperCase,
  capitalized: capitalizedCase,
  alternating: alternatingCase,
  title: titleCase,
  inverse: inverseCase,
  strikethrough,
  reverse: reverseText,
  upsideDown,
  morse: morseTransform,
  binary: binaryTransform,
  wingdings,
  bold: boldText,
  wide: wideText,
  italic: italicText,
  underline: underlineText,
  mirror: mirrorText,
  invisible: invisibleText,
  zalgo: zalgoText,
};

export function applyTransform(mode, text) {
  const fn = TRANSFORMS[mode];
  if (!fn) return text;
  return fn(text ?? '');
}

export function countStats(text) {
  const value = text ?? '';
  const characters = value.length;
  const words = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
  const lines = value === '' ? 0 : value.split(/\r\n|\r|\n/).length;
  return { characters, words, lines };
}

export { TRANSFORMS };
