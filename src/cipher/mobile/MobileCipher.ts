import SubstitutionCipher from '../substitution/SubstitutionCipher';
import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';

export type MobileCipherOptions = CipherConfigurationsRecord;

class MobileCipher extends SubstitutionCipher {
  static MOBILE_KEYPAD_MAP: Record<string, string> = {
    A: '2',
    B: '22',
    C: '222',
    D: '3',
    E: '33',
    F: '333',
    G: '4',
    H: '44',
    I: '444',
    J: '5',
    K: '55',
    L: '555',
    M: '6',
    N: '66',
    O: '666',
    P: '7',
    Q: '77',
    R: '777',
    S: '7777',
    T: '8',
    U: '88',
    V: '888',
    W: '9',
    X: '99',
    Y: '999',
    Z: '9999',
  };

  constructor() {
    super(MobileCipher.MOBILE_KEYPAD_MAP);
  }

  encode(
    input: string,
    configuration?: MobileCipherOptions,
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
        wordSeparator: ' 1 ',
      },
    });

    return super.encode(input, configuration, mergedOpts);
  }

  decode(
    input: string,
    configuration?: MobileCipherOptions,
    opts?: CipherOptions,
  ): string {
    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: ' ',
        wordSeparator: ' 1 ',
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

export default MobileCipher;
