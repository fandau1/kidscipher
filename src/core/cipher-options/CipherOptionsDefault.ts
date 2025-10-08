import { CipherOptions } from './CipherOptions';

export function withDefaultCipherOptions(
  opts?: CipherOptions,
  defaults?: {
    input?: Partial<CipherOptions['input']>;
    output?: Partial<CipherOptions['output']>;
  },
): CipherOptions {
  return {
    input: {
      caseSensitive: false,
      normalizeDiacritics: false,
      letterSeparator: '',
      wordSeparator: ' ',
      ...defaults?.input,
      ...opts?.input,
    },
    output: {
      casing: 'original',
      letterSeparator: '',
      wordSeparator: ' ',
      ...defaults?.output,
      ...opts?.output,
    },
  };
}
