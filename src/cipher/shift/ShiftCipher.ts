import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import Cipher, { CipherConfigurationsRecord } from '../Cipher';

type ShiftCipherOptions =
  | CipherConfigurationsRecord
  | {
      shifts: number[];
    };

abstract class ShiftCipher extends Cipher {
  private baseAlphabet: string[];
  private rotors: string[][];

  constructor(baseAlphabet: string[], rotors: string[][]) {
    super();

    // Check all alphabets have the same length
    for (const alpha of rotors) {
      if (alpha.length !== baseAlphabet.length) {
        throw new Error('All alphabets must have the same length');
      }
    }

    this.baseAlphabet = baseAlphabet;
    this.rotors = rotors;
  }

  encodeToken(token: string, configuration: ShiftCipherOptions): string {
    const { shifts } = configuration;

    let encoded = '';
    if (this.baseAlphabet.includes(token)) {
      const index = this.baseAlphabet.indexOf(token);

      for (let i = 0; i < this.rotors.length; i++) {
        const wheel = this.rotors[i];
        const shiftedIndex = (index + shifts[i]) % wheel.length;
        encoded += wheel[shiftedIndex];
      }
    }
    return encoded;
  }

  encode(
    input: string,
    configuration?: ShiftCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: '',
        wordSeparator: ' ',
      },
      output: {
        casing: 'original',
        letterSeparator: '',
        wordSeparator: ' ',
      },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decodeToken(token: string, configuration: ShiftCipherOptions): string {
    const { shifts } = configuration;
    let encoded = '';

    if (token.length === this.rotors.length) {
      let currentIndex = -1;
      for (let i = this.rotors.length - 1; 0 <= i; i--) {
        if (this.rotors[i].includes(token[i])) {
          currentIndex = this.rotors[i].indexOf(token[i]);
          currentIndex =
            (currentIndex - shifts[i] + this.baseAlphabet.length) %
            this.baseAlphabet.length;
        } else {
          // invalid token
          return '';
        }
      }

      encoded = this.baseAlphabet[currentIndex];
    }

    return encoded;
  }

  decode(
    input: string,
    configuration?: ShiftCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: '',
        wordSeparator: ' ',
      },
      output: {
        casing: 'original',
        letterSeparator: '',
        wordSeparator: ' ',
      },
    });

    return super.decode(input, configuration, mergedOpts);
  }
}

export default ShiftCipher;
