import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class ShiftCipher extends SubstitutionCipher {
  private alphabet: string[];
  private inputMode: 'letter' | 'index';
  private outputMode: 'letter' | 'index';

  constructor(
    alphabet: string[],
    shift: number,
    inputMode: 'letter' | 'index' = 'letter',
    outputMode: 'letter' | 'index' = 'letter',
  ) {
    let encodeMap: Record<string, string> = {};

    for (let i = 0; i < alphabet.length; i++) {
      let fromChar: string;
      let toChar: string;

      switch (inputMode) {
        case 'index':
          fromChar = i.toString();
          break;
        case 'letter':
          fromChar = alphabet[i];
          break;
      }

      const normalizedShiftedIndex =
        (((i + shift) % alphabet.length) + alphabet.length) % alphabet.length;

      switch (outputMode) {
        case 'index':
          toChar = normalizedShiftedIndex.toString();
          break;
        case 'letter':
          toChar = alphabet[normalizedShiftedIndex];
          break;
      }

      encodeMap[fromChar] = toChar;
    }

    super(encodeMap);
    this.alphabet = alphabet;
    this.inputMode = inputMode;
    this.outputMode = outputMode;
  }

  encode(
    input: string,
    configuration?: CipherConfigurationsRecord,
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
    configuration?: CipherConfigurationsRecord,
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
