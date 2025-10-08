import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import Cipher, { CipherConfigurationsRecord } from '../Cipher';
import ShiftCipher, { ShiftCipherOptions } from './ShiftCipher';

export type ShiftRotorCipherOptions =
  | CipherConfigurationsRecord
  | {
      shifts: number[];
      outputAsIndex?: boolean;
      inputAsIndex?: boolean;
    };

class ShiftRotorCipher extends Cipher {
  baseAlphabet: ShiftCipher;
  rotors: ShiftCipher[];

  constructor(baseAlphabet: ShiftCipher, rotors: ShiftCipher[]) {
    super();
    if (rotors.length === 0) throw new Error('At least one rotor is required');
    this.baseAlphabet = baseAlphabet;
    this.rotors = rotors;
  }

  encodeToken(token: string, configuration: ShiftRotorCipherOptions): string {
    const { shifts = [], outputAsIndex, inputAsIndex } = configuration;

    let results: string[] = [];
    let lastSymbol = token;
    const baseSymbolIndex = this.baseAlphabet.encodeToken(lastSymbol, {
      shift: 0,
      inputAsIndex: false,
      outputAsIndex: true,
    });
    for (let i = 0; i < this.rotors.length; i++) {
      const rotor = this.rotors[i];
      const shift = shifts[i % shifts.length] ?? 0;

      lastSymbol = rotor.encodeToken(baseSymbolIndex, {
        shift,
        inputAsIndex: true,
        outputAsIndex: false,
      });
      results.push(lastSymbol);
    }

    // we need to reverse it
    return results.reverse().join('');
  }

  decodeToken(token: string, configuration: ShiftRotorCipherOptions): string {
    const { shifts = [], outputAsIndex, inputAsIndex } = configuration;

    let result = '';

    // Reverse through rotors for decoding
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      const rotor = this.rotors[i];
      const shift = shifts[i % shifts.length] ?? 0;

      result += rotor.decodeToken(result, {
        shift,
        outputAsIndex: outputAsIndex,
        inputAsIndex: inputAsIndex,
      } as ShiftCipherOptions);
    }

    return result;
  }

  encode(
    input: string,
    configuration?: ShiftRotorCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: { caseSensitive: false, letterSeparator: '', wordSeparator: ' ' },
      output: {
        casing: 'original',
        letterSeparator: ' ',
        wordSeparator: ' | ',
      },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decode(
    input: string,
    configuration?: ShiftRotorCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: ' ',
        wordSeparator: ' | ',
      },
      output: { casing: 'original', letterSeparator: '', wordSeparator: ' ' },
    });

    return super.decode(input, configuration, mergedOpts);
  }
}

export default ShiftRotorCipher;
