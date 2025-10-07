import { describe, it, expect, beforeEach } from 'vitest';
import { SpiderCipher } from '../../../src';

describe('SpiderCipher', () => {
  let cipher = new SpiderCipher();

  it('should encode a single letter correctly', () => {
    const encodedA = cipher.encode('A');
    // A has substitutions ['BC', 'JX'], so first cycle should be 'BC'
    expect(encodedA).toBe('BC');

    const encodedB = cipher.encode('B');
    expect(encodedB).toBe('AC');
  });

  it('should encode a word correctly', () => {
    const encoded = cipher.encode('AB');
    // A -> BC, B -> AC
    expect(encoded).toBe('BC AC');
  });

  it('should decode a single letter correctly', () => {
    const decoded = cipher.decode('BC'); // 'BC' corresponds to 'A'
    expect(decoded).toBe('a');

    const decodedB = cipher.decode('AC'); // 'AC' corresponds to 'B'
    expect(decodedB).toBe('b');
  });

  it('should encode and decode a full message', () => {
    const message = 'hello';
    const encoded = cipher.encode(message);
    const decoded = cipher.decode(encoded);

    expect(decoded).toBe(message);
  });

  it('should cycle through multiple substitutions', () => {
    // A -> ['BC', 'JX']
    expect(cipher.encode('AAA')).toBe('BC JX BC'); // first cycle
    expect(cipher.encode('A')).toBe('BC'); // back to first
  });

  it.skip('should throw or skip unsupported letters', () => {
    // Q and W are not defined in the map
    expect(() => cipher.encode('Q')).toThrow();
    expect(() => cipher.encode('W')).toThrow();
  });
});
