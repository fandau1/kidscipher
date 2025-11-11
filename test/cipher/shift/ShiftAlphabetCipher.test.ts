import { describe, it, expect } from 'vitest';
import ShiftAlphabetCipher from '../../../src/cipher/shift/ShiftAlphabetCipher';

describe('ShiftAlphabetCipher', () => {
  describe('encode', () => {
    it('should encode a simple string with shift 3', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.encode('ABC');
      expect(result).toBe('DEF');
    });

    it('should wrap around the alphabet', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.encode('XYZ');
      expect(result).toBe('ABC');
    });

    it('should ignore non-alphabet characters', () => {
      const cipher = new ShiftAlphabetCipher(1);

      const result = cipher.encode('A B-C');
      expect(result).toBe('B CD'); // dash is ignored
    });

    it('should respect case sensitivity when enabled', () => {
      const cipher = new ShiftAlphabetCipher(1);

      const result = cipher.encode(
        'aBc',
        {},
        { input: { caseSensitive: true } },
      );
      expect(result).toBe('C'); // because 'a', 'B', 'c' are not in default alphabet in case-sensitive mode
    });
  });

  describe('decode', () => {
    it('should decode a simple string with shift 3', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.decode('DEF');
      expect(result).toBe('ABC');
    });

    it('should wrap around the alphabet when decoding', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.decode('ABC');
      expect(result).toBe('XYZ');
    });

    it('should respect output casing options', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.decode('DEF', {}, { output: { casing: 'lower' } });
      expect(result).toBe('abc');
    });

    it('should ignore non-alphabet characters', () => {
      const cipher = new ShiftAlphabetCipher(3);

      const result = cipher.decode('D E-F', { shift: 3 });
      expect(result).toBe('A BC'); // dash ignored
    });
  });
});
