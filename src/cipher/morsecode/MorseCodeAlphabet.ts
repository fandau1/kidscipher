const INTERNATIONAL_MORSE: Record<string, string> = {
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
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
};

const CZECH_MORSE = {
  CH: '----',
};

const GERMAN_MORSE = {
  Ä: '.-.-',
  Ö: '---.',
  Ü: '..--',
  ß: '...--..',
};

const SPANISH_MORSE = {
  Ñ: '--.--',
};

export const MORSE_CODE_ALPHABETS = {
  intl: INTERNATIONAL_MORSE,
  cs: { ...INTERNATIONAL_MORSE, ...CZECH_MORSE },
  de: { ...INTERNATIONAL_MORSE, ...GERMAN_MORSE },
  es: { ...INTERNATIONAL_MORSE, ...SPANISH_MORSE },
};

export type MorseCodeAlphabetKey = keyof typeof MORSE_CODE_ALPHABETS;
