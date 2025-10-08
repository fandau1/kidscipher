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
      const result = cipher.encode('ATZ2', { shifts: [5, 9, 18] });
      expect(result).toBe('CDB ABA ADC BAB');
    });
  });

  describe('decode', () => {
    it('should decode a simple encoded string', () => {
      const result = cipher.decode('AAA AAB AAC', { shifts: [0, 0, 0] });
      expect(result).toBe('ABC');
    });

    it('should decode multiple encoded chars', () => {
      const result = cipher.decode('BDD CCD CAB DBA', { shifts: [0, 0, 0] });
      expect(result).toBe('LTZ2');
    });

    it('should decode multiple words', () => {
      const result = cipher.decode('AAA AAA | AAA', { shifts: [0, 0, 0] });
      expect(result).toBe('AA A');
    });

    it('should decode with applied shifts', () => {
      const result = cipher.decode('CDB ABA ADC BAB', { shifts: [5, 9, 18] });
      expect(result).toBe('ATZ2');
    });
  });
});
