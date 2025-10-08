import { describe, it, expect } from 'vitest';
import { ShiftRotorABCDCipher } from '../../../src';

describe('ShiftRotorABCDCipher', () => {
  const cipher = new ShiftRotorABCDCipher();

  describe('encode', () => {
    it('should encode a simple string with shift 3', () => {
      const result = cipher.encode('ABC', { shifts: [0, 0, 0] });
      expect(result).toBe('AAA AAB AAC');
    });

    it('should be able get multiple chars', () => {
      const result = cipher.encode('LTZ2', { shifts: [0, 0, 0] });
      expect(result).toBe('BDD CCD CAB DBA');
    });

    it('should be able handle multiple words', () => {
      const result = cipher.encode('AA A', { shifts: [0, 0, 0] });
      expect(result).toBe('AAA AAA | AAA'); // dash is ignored
    });

    it('should be able work with shift', () => {
      const result = cipher.encode('ATZ2', { shifts: [1, 3, 0] });
      expect(result).toBe('ADA BBA BDC CAB');
    });
  });

  describe('decode', () => {});
});
