import { describe, it, expect } from 'vitest';
import { ShiftRotorABCDCipher } from '../../../src';

describe('ShiftRotorABCDCipher', () => {
  describe('encode', () => {
    it('should encode a simple string with shift 3', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.encode('ABC');
      expect(result).toBe('AAA AAB AAC');
    });

    it('should be able get multiple chars', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.encode('LTZ2');
      expect(result).toBe('BDD CCD CAB DBA');
    });

    it('should be able handle multiple words', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.encode('AA A');
      expect(result).toBe('AAA AAA | AAA'); // dash is ignored
    });

    it('should be able work with shift', () => {
      const cipher = new ShiftRotorABCDCipher([5, 9, 18]);

      const result = cipher.encode('ATZ2');
      expect(result).toBe('CDB ABA ADC BAB');
    });
  });

  describe('decode', () => {
    it('should decode a simple encoded string', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.decode('AAA AAB AAC');
      expect(result).toBe('ABC');
    });

    it('should decode multiple encoded chars', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.decode('BDD CCD CAB DBA');
      expect(result).toBe('LTZ2');
    });

    it('should decode multiple words', () => {
      const cipher = new ShiftRotorABCDCipher([0, 0, 0]);

      const result = cipher.decode('AAA AAA | AAA');
      expect(result).toBe('AA A');
    });

    it('should decode with applied shifts', () => {
      const cipher = new ShiftRotorABCDCipher([5, 9, 18]);

      const result = cipher.decode('CDB ABA ADC BAB');
      expect(result).toBe('ATZ2');
    });
  });
});
