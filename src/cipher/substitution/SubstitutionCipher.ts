import {
  CasingOptions,
  CipherOptions,
} from '../../core/cipher-options/CipherOptions';

class SubstitutionCipher {
  protected encodeMap: Record<string, string>;
  protected decodeMap: Record<string, string>;

  constructor(encodeMap: Record<string, string>) {
    this.encodeMap = encodeMap;
    this.decodeMap = Object.entries(encodeMap).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {} as Record<string, string>,
    );
  }

  encode(input: string, opts?: CipherOptions): string {
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

    // normalize input into words and letters
    const words = input.split(inputWordSeparator);

    const encodedWords = words.map((word) => {
      const letters = inputLetterSeparator
        ? word.split(inputLetterSeparator)
        : word.split('');

      return letters
        .map((char) => {
          let c = caseSensitive ? char : char.toUpperCase();
          let encoded = this.encodeMap[c] ?? '';
          if (casing === 'upper') encoded = encoded.toUpperCase();
          if (casing === 'lower') encoded = encoded.toLowerCase();
          return encoded;
        })
        .join(outputLetterSeparator);
    });

    return encodedWords.join(outputWordSeparator);
  }

  decode(input: string, opts?: CipherOptions): string {
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

    // split encoded text into words
    const words = input.split(inputWordSeparator);

    const decodedWords = words.map((word) => {
      const symbols = inputLetterSeparator
        ? word.split(inputLetterSeparator)
        : [word]; // if no separator, the whole word is one symbol

      return symbols
        .map((symbol) => {
          let decoded = this.decodeMap[symbol] ?? '';
          if (!caseSensitive) decoded = decoded.toUpperCase();
          if (casing === 'upper') decoded = decoded.toUpperCase();
          if (casing === 'lower') decoded = decoded.toLowerCase();
          return decoded;
        })
        .join(outputLetterSeparator);
    });

    return decodedWords.join(outputWordSeparator);
  }
}

export default SubstitutionCipher;
