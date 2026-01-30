import SubstitutionCipher from '../substitution/SubstitutionCipher';
import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import { CipherConfigurationsRecord } from '../Cipher';
import {
  MORSE_CODE_ALPHABETS,
  MorseCodeAlphabetKey,
} from './MorseCodeAlphabet';

type DotDashMapping = {
  dot: string;
  dash: string;
};

type MorseCodeCipherProps = {
  alphabetVariant?: MorseCodeAlphabetKey;
  dotDashMapping?: Partial<DotDashMapping>;
};

class MorseCodeCipher extends SubstitutionCipher {
  private readonly dotDashMapping: DotDashMapping;

  public static readonly ALPHABETS = MORSE_CODE_ALPHABETS;

  constructor({
    alphabetVariant = 'intl',
    dotDashMapping = { dot: '.', dash: '-' },
  }: MorseCodeCipherProps = {}) {
    super(MorseCodeCipher.ALPHABETS[alphabetVariant ?? 'intl']);

    this.dotDashMapping = {
      dot: dotDashMapping.dot ?? '.',
      dash: dotDashMapping.dash ?? '-',
    };
  }

  encode(
    input: string,
    configuration?: CipherConfigurationsRecord,
    opts?: CipherOptions,
  ): string {
    const { dotDashMapping = { dot: '.', dash: '-' } } = configuration || {};

    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: '',
        wordSeparator: ' ',
      },
      output: {
        casing: 'original',
        letterSeparator: '/',
        wordSeparator: '///',
      },
    });

    const encoded = super.encode(input, configuration, mergedOpts);

    if (dotDashMapping) {
      return encoded
        .split('')
        .map((char) => {
          if (char === '.') return this.dotDashMapping.dot;
          if (char === '-') return this.dotDashMapping.dash;
          return char;
        })
        .join('');
    }

    return encoded;
  }

  decode(
    input: string,
    configuration?: CipherConfigurationsRecord,
    opts?: CipherOptions,
  ): string {
    const { dotDashMapping = { dot: '.', dash: '-' } } = configuration || {};

    const mergedOpts = withDefaultCipherOptions(opts, {
      input: {
        caseSensitive: false,
        letterSeparator: '/',
        wordSeparator: '///',
      },
      output: { casing: 'lower', letterSeparator: '', wordSeparator: ' ' },
    });

    let normalized = input;

    if (dotDashMapping) {
      // Map custom symbols back to "." and "-"
      normalized = input
        .split('')
        .map((char) => {
          if (char === this.dotDashMapping.dot) return '.';
          if (char === this.dotDashMapping.dash) return '-';
          return char;
        })
        .join('');
    }

    return super.decode(normalized, configuration, mergedOpts);
  }
}

export default MorseCodeCipher;
