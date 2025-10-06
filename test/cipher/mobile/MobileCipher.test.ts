import { describe, it, expect } from 'vitest';
import { MobileCipher } from '../../../src/';

describe('MobileCipher', () => {
  const cipher = new MobileCipher();

  it('encodes a simple word correctly', () => {
    const result = cipher.encode('HELLO');
    expect(result).toBe('44 33 555 555 666');
  });

  it('encodes a sentence with spaces correctly', () => {
    const result = cipher.encode('HELLO WORLD');
    expect(result).toBe('44 33 555 555 666 | 9 666 777 555 3');
  });

  it('decodes an encoded string correctly', () => {
    const result = cipher.decode('44 33 555 555 666 | 9 666 777 555 3');
    expect(result).toBe('hello world');
  });

  it('is case insensitive', () => {
    const lower = cipher.encode('hello');
    const upper = cipher.encode('HELLO');
    expect(lower).toBe(upper);
  });
});
