import { beforeEach, describe, expect, it } from 'vitest';
import { LetterNumberCipher } from '../../../src';

describe('LetterNumberCipher', () => {
  let cipher: LetterNumberCipher;

  beforeEach(() => {
    cipher = new LetterNumberCipher();
  });

  describe('encode', () => {
    it('encodes single word correctly', () => {
      const result = cipher.encode('ABC');
      expect(result).toBe('1-2-3');
    });

    it('encodes multiple words with correct word separator', () => {
      const result = cipher.encode('HELLO WORLD');
      expect(result).toBe('8-5-12-12-15---23-15-18-12-4');
    });

    it('is case-insensitive on input', () => {
      const result = cipher.encode('aBc');
      expect(result).toBe('1-2-3');
    });
  });

  describe('decode', () => {
    it('decodes single word correctly', () => {
      const result = cipher.decode('1-2-3');
      expect(result).toBe('abc');
    });

    it('decodes multiple words with correct word separator', () => {
      const result = cipher.decode('8-5-12-12-15---23-15-18-12-4');
      expect(result).toBe('hello world');
    });

    it('outputs lowercase letters by default', () => {
      const result = cipher.decode('1-2-3');
      expect(result).toBe(result.toLowerCase());
    });
  });
});
