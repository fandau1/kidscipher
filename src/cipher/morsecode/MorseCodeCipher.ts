import SubstitutionCipher from '../substitution/SubstitutionCipher';
import { CipherOptions } from '../../core/cipher-options/CipherOptions';

export type MorseCodeCipherOptions = CipherOptions & {
  dotDashMapping?: { dot: string; dash: string };
};

class MorseCodeCipher extends SubstitutionCipher {
  static MORSE_CODE_MAP: Record<string, string> = {
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

  constructor() {
    super(MorseCodeCipher.MORSE_CODE_MAP);
  }

  encode(
    input: string,
    opts: MorseCodeCipherOptions = {
      dotDashMapping: { dot: '.', dash: '-' },
      input: { caseSensitive: false, letterSeparator: '', wordSeparator: ' ' },
      output: {
        casing: 'original',
        letterSeparator: '/',
        wordSeparator: '///',
      },
    },
  ): string {
    const { dotDashMapping } = opts;
    const encoded = super.encode(input, opts);

    if (dotDashMapping) {
      return encoded
        .split('')
        .map((char) => {
          if (char === '.') return dotDashMapping.dot;
          if (char === '-') return dotDashMapping.dash;
          return char;
        })
        .join('');
    }

    return encoded;
  }

  decode(
    input: string,
    opts: MorseCodeCipherOptions = {
      dotDashMapping: { dot: '.', dash: '-' },
      input: {
        caseSensitive: false,
        letterSeparator: '/',
        wordSeparator: '///',
      },
      output: { casing: 'lower', letterSeparator: '', wordSeparator: ' ' },
    },
  ): string {
    const { dotDashMapping } = opts;

    let normalized = input;

    if (dotDashMapping) {
      // Map custom symbols back to "." and "-"
      normalized = input
        .split('')
        .map((char) => {
          if (char === dotDashMapping.dot) return '.';
          if (char === dotDashMapping.dash) return '-';
          return char;
        })
        .join('');
    }

    return super.decode(normalized, opts);
  }
}

export default MorseCodeCipher;
