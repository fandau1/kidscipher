import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class ShiftRotorCipher extends SubstitutionCipher {
  constructor(baseAlphabet: string[], rotors: string[][], shifts: number[]) {
    let encodeMap: Record<string, string> = {};

    if (rotors.length !== shifts.length) {
      throw new Error(
        `Invalid number of shifts: expected ${rotors.length}, got ${shifts.length}`,
      );
    }

    if (rotors.length === 0) throw new Error('At least one rotor is required');

    if (rotors.some((rotor) => rotor.length !== baseAlphabet.length)) {
      throw new Error(
        'All rotors must have the same length as the base alphabet',
      );
    }

    for (let i = 0; i < baseAlphabet.length; i++) {
      let fromChar = baseAlphabet[i];
      let toChar = '';
      for (let j = 0; j < rotors.length; j++) {
        const rotor = rotors[j];

        const normalizedShiftedIndex =
          (((i + shifts[j]) % rotor.length) + rotor.length) % rotor.length;
        toChar += rotor[normalizedShiftedIndex];
      }
      encodeMap[fromChar] = toChar;
    }

    super(encodeMap);
  }

  encode(
    input: string,
    configuration?: CipherConfigurationsRecord,
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
    configuration?: CipherConfigurationsRecord,
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
