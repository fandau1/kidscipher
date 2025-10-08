import { describe, it, expect } from 'vitest';
import ShiftAlphabetCipher from '../../../src/cipher/shift/ShiftAlphabetCipher';

describe('ShiftAlphabetCipher', () => {
  const cipher = new ShiftAlphabetCipher();

  describe('encode', () => {
    it('should encode a simple string with shift 3', () => {
      const result = cipher.encode('ABC', { shift: 3 });
      expect(result).toBe('DEF');
    });

    it('should wrap around the alphabet', () => {
      const result = cipher.encode('XYZ', { shift: 3 });
      expect(result).toBe('ABC');
    });

    it('should ignore non-alphabet characters', () => {
      const result = cipher.encode('A B-C', { shift: 1 });
      expect(result).toBe('B CD'); // dash is ignored
    });

    it('should respect case sensitivity when enabled', () => {
      const result = cipher.encode(
        'aBc',
        { shift: 1 },
        { input: { caseSensitive: true } },
      );
      expect(result).toBe('C'); // because 'a', 'B', 'c' are not in default alphabet in case-sensitive mode
    });
  });

  describe('decode', () => {
    it('should decode a simple string with shift 3', () => {
      const result = cipher.decode('DEF', { shift: 3 });
      expect(result).toBe('ABC');
    });

    it('should wrap around the alphabet when decoding', () => {
      const result = cipher.decode('ABC', { shift: 3 });
      expect(result).toBe('XYZ');
    });

    it('should respect output casing options', () => {
      const result = cipher.decode(
        'DEF',
        { shift: 3 },
        { output: { casing: 'lower' } },
      );
      expect(result).toBe('abc');
    });

    it('should ignore non-alphabet characters', () => {
      const result = cipher.decode('D E-F', { shift: 3 });
      expect(result).toBe('A BC'); // dash ignored
    });
  });
});
