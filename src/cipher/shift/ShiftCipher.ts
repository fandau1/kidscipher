import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import Cipher, { CipherConfigurationsRecord } from '../Cipher';

export type ShiftCipherOptions =
  | CipherConfigurationsRecord
  | {
      shift: number;
      outputAsIndex?: boolean; // output index instead of letter
      inputAsIndex?: boolean; // interpret input as index instead of letter
    };

class ShiftCipher extends Cipher {
  private alphabet: string[];

  constructor(alphabet: string[]) {
    super();
    this.alphabet = alphabet;
  }

  encodeToken(token: string, configuration: ShiftCipherOptions): string {
    const { shift, outputAsIndex, inputAsIndex } = configuration;

    let index: number;

    if (inputAsIndex) {
      index = parseInt(token, 10);
      if (isNaN(index) || index < 0 || index >= this.alphabet.length) {
        return token; // invalid index
      }
    } else {
      if (!this.alphabet.includes(token)) return ''; // invalid token
      index = this.alphabet.indexOf(token);
    }

    const shiftedIndex = (index + shift) % this.alphabet.length;
    return outputAsIndex
      ? shiftedIndex.toString()
      : this.alphabet[shiftedIndex];
  }

  decodeToken(token: string, configuration: ShiftCipherOptions): string {
    const { shift, inputAsIndex, outputAsIndex } = configuration;

    let index: number;

    if (inputAsIndex) {
      index = parseInt(token, 10);
      if (isNaN(index) || index < 0 || index >= this.alphabet.length) {
        return ''; // invalid index
      }
    } else {
      if (!this.alphabet.includes(token)) return ''; // invalid token
      index = this.alphabet.indexOf(token);
    }

    const shiftedIndex =
      (index - shift + this.alphabet.length) % this.alphabet.length;
    return outputAsIndex
      ? shiftedIndex.toString()
      : this.alphabet[shiftedIndex];
  }

  getAllTokenIndexes(token: string, shift: number): number[] {
    if (!this.alphabet.includes(token)) return []; // invalid token
    const indexes = this.alphabet.flatMap((ch, i) =>
      ch === token
        ? [(i - shift + this.alphabet.length) % this.alphabet.length]
        : [],
    );

    return indexes;
  }
  encode(
    input: string,
    configuration?: ShiftCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: { caseSensitive: false, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'original', letterSeparator: '', wordSeparator: ' ' },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decode(
    input: string,
    configuration?: ShiftCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: { caseSensitive: false, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'original', letterSeparator: '', wordSeparator: ' ' },
    });

    return super.decode(input, configuration, mergedOpts);
  }
}

export default ShiftCipher;
