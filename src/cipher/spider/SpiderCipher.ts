import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { MobileCipherOptions } from '../mobile/MobileCipher';
import SubstitutionCyclicCipher from '../substitution/SubstitutionCyclicCipher';

class SpiderCipher extends SubstitutionCyclicCipher {
  static SPIDER_MAP: Record<string, string[]> = {
    A: ['BC', 'JX'],
    B: ['AC', 'EH'],
    C: ['AB', 'OZ'],
    D: ['EF', 'KT'],
    E: ['BH', 'DF'],
    F: ['DE', 'NV'],
    G: ['HI', 'LP'],
    H: ['BE', 'GI'],
    I: ['GH', 'MS'],
    J: ['AX', 'KL'],
    K: ['DT', 'JL'],
    L: ['GP', 'JK'],
    M: ['IS', 'NO'],
    N: ['FV', 'MO'],
    O: ['CZ', 'MN'],
    P: ['GL', 'RS'],
    // Q: ["Q"],    // cipher can't Q
    R: ['PS', 'UY'],
    S: ['IM', 'PR'],
    T: ['DK', 'UV'],
    U: ['TV', 'RY'],
    V: ['FN', 'TU'],
    // W: ["W"],    // cipher can't W
    X: ['AJ', 'YZ'],
    Y: ['RU', 'XZ'],
    Z: ['CO', 'XY'],
  };

  constructor() {
    super(SpiderCipher.SPIDER_MAP);
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
        casing: 'upper',
        letterSeparator: ' ',
        wordSeparator: ' | ',
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

export default SpiderCipher;
