import { describe, beforeEach, it, expect } from 'vitest';
import { PolandCrossCipher } from '../../../../src/index';
import { KidscipherGlyphs } from '../../../../src/font';

describe('PolandCrossCipher', () => {
  let cipher: PolandCrossCipher;

  beforeEach(() => {
    cipher = new PolandCrossCipher();
  });

  it('should encode single letters correctly', () => {
    const input = 'ABCD';
    const expected =
      KidscipherGlyphs.POLAND_CROSS_A +
      KidscipherGlyphs.POLAND_CROSS_B +
      KidscipherGlyphs.POLAND_CROSS_C +
      KidscipherGlyphs.POLAND_CROSS_D;

    const encoded = cipher.encode(input);
    expect(encoded).toBe(expected);
  });

  it('should encode multi-character letter CH correctly', () => {
    const input = 'CH';
    const expected = KidscipherGlyphs.POLAND_CROSS_CH;

    const encoded = cipher.encode(input);
    expect(encoded).toBe(expected);
  });

  it('should decode encoded text correctly', () => {
    const input = 'ABC';
    const encoded = cipher.encode(input, {
      input: { caseSensitive: true, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'original', letterSeparator: '', wordSeparator: ' ' },
    });
    expect(encoded).toBe(
      KidscipherGlyphs.POLAND_CROSS_A +
        KidscipherGlyphs.POLAND_CROSS_B +
        KidscipherGlyphs.POLAND_CROSS_C,
    );

    const decoded = cipher.decode(encoded, {
      input: { caseSensitive: true, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'upper', letterSeparator: '', wordSeparator: ' ' },
    });

    expect(decoded).toBe(input);
  });

  it('should handle spaces correctly', () => {
    const input = 'A B K';

    const encoded = cipher.encode(input, {
      input: { caseSensitive: true, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'original', letterSeparator: '', wordSeparator: ' ' },
    });
    expect(encoded).toBe(
      KidscipherGlyphs.POLAND_CROSS_A +
        ' ' +
        KidscipherGlyphs.POLAND_CROSS_B +
        ' ' +
        KidscipherGlyphs.POLAND_CROSS_K,
    );

    const decoded = cipher.decode(encoded, {
      input: { caseSensitive: true, letterSeparator: '', wordSeparator: ' ' },
      output: { casing: 'upper', letterSeparator: '', wordSeparator: ' ' },
    });
    expect(decoded).toBe('A B K');
  });
});
