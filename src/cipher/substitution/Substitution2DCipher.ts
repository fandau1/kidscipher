import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';
import SubstitutionCyclicCipher from './SubstitutionCyclicCipher';

export type Substitution2DCipherOptions = CipherConfigurationsRecord;

class Substitution2DCipher extends SubstitutionCyclicCipher {
  constructor(
    alphabet: string[][],
    horizontalKey: string[],
    verticalKey: string[],
  ) {
    // Validation checks
    if (alphabet.length !== verticalKey.length) {
      throw new Error(
        `Alphabet row count (${alphabet.length}) must match verticalKey length (${verticalKey.length})`,
      );
    }

    for (const [rowIndex, row] of alphabet.entries()) {
      if (row.length !== horizontalKey.length) {
        throw new Error(
          `Alphabet column count in row ${rowIndex} (${row.length}) must match horizontalKey length (${horizontalKey.length})`,
        );
      }
    }

    const encodeMap: Record<string, string[]> = {};

    // Build the coordinate map
    for (const [rowIndex, rowKey] of verticalKey.entries()) {
      for (const [colIndex, colKey] of horizontalKey.entries()) {
        const value = alphabet[rowIndex][colIndex];
        const coord = `${rowKey}${colKey}`;

        if (!encodeMap[value]) encodeMap[value] = [];
        encodeMap[value].push(coord);
      }
    }

    super(encodeMap);
  }

  encode(
    input: string,
    configuration?: Substitution2DCipherOptions,
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
        letterSeparator: ' ',
        wordSeparator: ' | ',
      },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decode(
    input: string,
    configuration?: Substitution2DCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: true,
        letterSeparator: ' ',
        wordSeparator: ' | ',
      },
      output: {
        casing: 'lower',
        letterSeparator: '',
        wordSeparator: ' ',
      },
    });

    return super.decode(input, configuration, mergedOpts);
  }
}

export default Substitution2DCipher;
