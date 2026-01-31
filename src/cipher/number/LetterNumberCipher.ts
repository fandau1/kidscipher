import SubstitutionCipher from '../substitution/SubstitutionCipher';
import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';

export type LetterNumberCipherOptions = CipherConfigurationsRecord;

class LetterNumberCipher extends SubstitutionCipher {
  static readonly ALPHABET: Record<string, string> = {
    A: '1',
    B: '2',
    C: '3',
    D: '4',
    E: '5',
    F: '6',
    G: '7',
    H: '8',
    I: '9',
    J: '10',
    K: '11',
    L: '12',
    M: '13',
    N: '14',
    O: '15',
    P: '16',
    Q: '17',
    R: '18',
    S: '19',
    T: '20',
    U: '21',
    V: '22',
    W: '23',
    X: '24',
    Y: '25',
    Z: '26',
  };

  constructor() {
    super(LetterNumberCipher.ALPHABET);
  }

  encode(
    input: string,
    configuration?: LetterNumberCipherOptions,
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
        letterSeparator: '-',
        wordSeparator: '---',
      },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decode(
    input: string,
    configuration?: LetterNumberCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: '-',
        wordSeparator: '---',
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

export default LetterNumberCipher;
