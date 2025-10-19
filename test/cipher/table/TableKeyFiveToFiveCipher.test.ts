import { describe, it, expect } from 'vitest';
import { TableKeyFiveToFiveCipher } from '../../../src';

describe('TableKeyFiveToFiveCipher', () => {
  const horizontalKey = ['1', '2', '3', '4', '5'];
  const verticalKey = ['a', 'b', 'c', 'd', 'e'];

  it('should throw if vertical key length does not match alphabet rows', () => {
    const badVertical = ['a', 'b', 'c'];
    expect(
      () => new TableKeyFiveToFiveCipher(horizontalKey, badVertical),
    ).toThrowError(/must match verticalKey length/i);
  });

  it('should throw if horizontal key length does not match alphabet columns', () => {
    const badHorizontal = ['1', '2'];
    expect(
      () => new TableKeyFiveToFiveCipher(badHorizontal, verticalKey),
    ).toThrowError(/must match horizontalKey length/i);
  });

  it('should correctly encode letters into coordinates', () => {
    const cipher = new TableKeyFiveToFiveCipher(horizontalKey, verticalKey);
    expect(cipher.encodeToken('A')).toBe('a1');
    expect(cipher.encodeToken('B')).toBe('a2');
    expect(cipher.encodeToken('F')).toBe('b1');
    expect(cipher.encodeToken('Z')).toBe('e5');
  });

  it('should correctly decode coordinates into letters', () => {
    const cipher = new TableKeyFiveToFiveCipher(horizontalKey, verticalKey);
    expect(cipher.decodeToken('a1')).toBe('A');
    expect(cipher.decodeToken('a2')).toBe('B');
    expect(cipher.decodeToken('b1')).toBe('F');
    expect(cipher.decodeToken('e5')).toBe('Z');
  });

  it('should encode and decode consistently (round-trip)', () => {
    const cipher = new TableKeyFiveToFiveCipher(horizontalKey, verticalKey);
    const text = 'HELLO';
    const encoded = text
      .split('')
      .map((ch) => cipher.encodeToken(ch))
      .join(';');
    const decoded = encoded
      .split(';')
      .map((coord) => cipher.decodeToken(coord))
      .join('');

    expect(decoded).toBe(text);
  });
});
