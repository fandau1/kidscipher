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

    const symbols = token.split('').reverse();

    if (symbols.length != this.rotors.length) {
      throw new Error('Invalid symbol length');
    }

    let includesIn: number[][] = [];

    // Reverse through rotors for decoding
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      const rotor = this.rotors[i];
      const shift = shifts[i % shifts.length] ?? 0;
      const symbol = symbols[i];

      const ocurencies = rotor.getAllTokenIndexes(symbol, shift);
      includesIn.push(ocurencies);
    }

    // Find intersection of all arrays (items common to all rotors)
    const intersection = includesIn.reduce((acc, arr) =>
      acc.filter((x) => arr.includes(x)),
    );

    // If there is exactly one common index, decode it
    if (intersection.length !== 1) {
      throw new Error(
        `Invalid decoding — intersection size is ${intersection.length}`,
      );
    }

    const finalIndex = intersection[0];

    const result = this.baseAlphabet.decodeToken(finalIndex.toString(), {
      shift: 0,
      inputAsIndex: true,
      outputAsIndex: outputAsIndex,
    });

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
