import { beforeEach, describe, expect, test } from 'vitest';
import { MorseCodeCipher } from '../../../src';

describe('MorseCodeCipher', () => {
  test('encodes HELLO WORLD with default options', () => {
    const cipher = new MorseCodeCipher();

    const result = cipher.encode('HELLO WORLD');
    expect(result).toBe('...././.-../.-../---///.--/---/.-./.-../-..');
  });

  test('decodes Morse back to text with default options', () => {
    const cipher = new MorseCodeCipher();

    const result = cipher.decode(
      '...././.-../.-../---///.--/---/.-./.-../-..',
      {},
    );
    expect(result).toBe('hello world');
  });

  test('roundtrip encode → decode restores text', () => {
    const cipher = new MorseCodeCipher();

    const text = 'SOS HELP';
    const encoded = cipher.encode(text);
    const decoded = cipher.decode(encoded);
    expect(decoded).toBe('sos help');
  });

  test('encodes HELLO WORLD with custom dot dash symbol', () => {
    const cipher = new MorseCodeCipher({
      dotDashMapping: { dot: '*', dash: '_' },
    });

    const result = cipher.encode('HELLO WORLD', {
      input: { caseSensitive: false, letterSeparator: '', wordSeparator: ' ' },
      output: {
        casing: 'original',
        letterSeparator: '/',
        wordSeparator: '///',
      },
    });
    expect(result).toBe('****/*/*_**/*_**/___///*__/___/*_*/*_**/_**');
  });

  test('decodes Morse back to text with default options', () => {
    const cipher = new MorseCodeCipher({
      dotDashMapping: { dot: '*', dash: '_' },
    });

    const result = cipher.decode(
      '****/*/*_**/*_**/___///*__/___/*_*/*_**/_**',
      {
        input: {
          caseSensitive: false,
          letterSeparator: '/',
          wordSeparator: '///',
        },
        output: { casing: 'lower', letterSeparator: '', wordSeparator: ' ' },
      },
    );
    expect(result).toBe('hello world');
  });
});
