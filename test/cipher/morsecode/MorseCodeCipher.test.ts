import { beforeEach, describe, expect, test } from 'vitest';
import MorseCodeCipher from '../../../src/cipher/morsecode/MorseCodeCipher';

describe('MorseCodeCipher', () => {
  let morse: MorseCodeCipher;

  beforeEach(() => {
    morse = new MorseCodeCipher();
  });

  test('encodes HELLO WORLD with default options', () => {
    const result = morse.encode('HELLO WORLD');
    expect(result).toBe('...././.-../.-../---///.--/---/.-./.-../-..');
  });

  test('decodes Morse back to text with default options', () => {
    const result = morse.decode('...././.-../.-../---///.--/---/.-./.-../-..');
    expect(result).toBe('hello world');
  });

  test('roundtrip encode → decode restores text', () => {
    const text = 'SOS HELP';
    const encoded = morse.encode(text);
    const decoded = morse.decode(encoded);
    expect(decoded).toBe('sos help');
  });

  test('encodes HELLO WORLD with custom dot dash symbol', () => {
    const result = morse.encode('HELLO WORLD', {
      dotDashMapping: { dot: '*', dash: '_' },
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
    const result = morse.decode('****/*/*_**/*_**/___///*__/___/*_*/*_**/_**', {
      dotDashMapping: { dot: '*', dash: '_' },
      input: {
        caseSensitive: false,
        letterSeparator: '/',
        wordSeparator: '///',
      },
      output: { casing: 'lower', letterSeparator: '', wordSeparator: ' ' },
    });
    expect(result).toBe('hello world');
  });
});
