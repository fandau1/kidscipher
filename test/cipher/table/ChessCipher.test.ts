import { describe, it, expect, beforeEach } from 'vitest';
import { ChessCipher } from '../../../src';

describe('ChessCipher', () => {
  let cipher: ChessCipher;

  beforeEach(() => {
    cipher = new ChessCipher(6, 6); // 36 cells = fits alphabet A–Z, 0–9
  });

  it('should encode a single letter correctly', () => {
    const encoded = cipher.encode('A');
    expect(encoded).toBe('A1');
  });

  it('should encode and decode alphanumeric string', () => {
    const message = 'TEST123';
    const encoded = cipher.encode(message);
    expect(encoded).toBe('D2 A5 D1 D2 E4 E5 E6');

    const decoded = cipher.decode(encoded);
    expect(decoded).toBe('test123');

    expect(decoded.toUpperCase()).toBe(message);
  });

  it('should throw error for too large board', () => {
    expect(() => new ChessCipher(3, 3)).toThrowError(/Invalid board size/);
  });
});
