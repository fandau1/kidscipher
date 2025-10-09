import {
  ShiftAlphabetCipher,
  ShiftRotorABCDCipher,
} from '../../../dist/index.esm';
import BaseCipherDemo from './BaseCipherDemo';

export default function ShiftRotorABCDDemo() {
  return (
    <BaseCipherDemo
      Cipher={ShiftRotorABCDCipher}
      cipherConfiguration={{ shifts: [0, 0, 0] }}
    />
  );
}
