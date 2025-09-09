import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';
import ShiftCipher from './ShiftCipher';

type ShiftAlphabetCipherOptions =
  | CipherConfigurationsRecord
  | {
      shift: number;
    };

class ShiftAlphabetCipher extends ShiftCipher {
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

  constructor(alphabet?: string[]) {
    if (!alphabet) {
      alphabet = ShiftAlphabetCipher.DEFAULT_ALPHABET;
    }
    super(alphabet, [alphabet]);
  }

  encode(
    input: string,
    { shift }: ShiftAlphabetCipherOptions,
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

    return super.encode(input, { shifts: [shift] }, mergedOpts);
  }

  decode(
    input: string,
    { shift }: ShiftAlphabetCipherOptions,
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

    return super.decode(input, { shifts: [shift] }, mergedOpts);
  }
}

export default ShiftAlphabetCipher;
