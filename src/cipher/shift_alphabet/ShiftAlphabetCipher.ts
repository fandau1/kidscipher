import {
  CasingOptions,
  CipherOptions,
} from '../../core/cipher-options/CipherOptions';

type ShiftOptions = {
  shift: number;
};

class ShiftAlphabetCipher {
  static DEFAULT_ALPHABET = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  protected mapAlphabet: Array<string>;

  constructor(alphabet?: Array<string>) {
    this.mapAlphabet = alphabet || ShiftAlphabetCipher.DEFAULT_ALPHABET;
  }

  encode(input: string, { shift }: ShiftOptions, opts?: CipherOptions): string {
    const {
      caseSensitive = false,
      letterSeparator: inputLetterSeparator = '',
      wordSeparator: inputWordSeparator = ' ',
    } = opts?.input || {};

    const {
      casing = 'original',
      letterSeparator: outputLetterSeparator = '',
      wordSeparator: outputWordSeparator = ' ',
    } = opts?.output || {};

    // split using a regex to handle word separators
    const tokens = input.split(
      new RegExp(`(${inputWordSeparator}|${inputLetterSeparator})`),
    );

    return tokens
      .map((symbol) => {
        if (!caseSensitive) symbol = symbol.toUpperCase();
        if (this.mapAlphabet.includes(symbol)) {
          const index = this.mapAlphabet.indexOf(symbol);
          const shiftedIndex = (index + shift) % this.mapAlphabet.length;
          return this.mapAlphabet[shiftedIndex];
        } else if (/\s/.test(symbol)) {
          return outputWordSeparator;
        }
        return '';
      })
      .join(outputLetterSeparator);
  }

  decode(input: string, { shift }: ShiftOptions, opts?: CipherOptions): string {
    const {
      caseSensitive = false,
      letterSeparator: inputLetterSeparator = '',
      wordSeparator: inputWordSeparator = ' ',
    } = opts?.input || {};

    const {
      casing = 'original',
      letterSeparator: outputLetterSeparator = '',
      wordSeparator: outputWordSeparator = ' ',
    } = opts?.output || {};

    // split using a regex to handle word separators
    const tokens = input.split(
      new RegExp(`(${inputWordSeparator}|${inputLetterSeparator})`),
    );

    return tokens
      .map((symbol) => {
        if (symbol === outputWordSeparator) return outputWordSeparator;
        if (symbol === outputLetterSeparator) return outputLetterSeparator;
        const index = this.mapAlphabet.indexOf(symbol);
        if (index === -1) return '';
        const shiftedIndex =
          (index - shift + this.mapAlphabet.length) % this.mapAlphabet.length;
        const decoded = this.mapAlphabet[shiftedIndex];
        if (casing === 'upper') return decoded.toUpperCase();
        if (casing === 'lower') return decoded.toLowerCase();
        return decoded; // original
      })
      .join(outputLetterSeparator);
  }
}

export default ShiftAlphabetCipher;
