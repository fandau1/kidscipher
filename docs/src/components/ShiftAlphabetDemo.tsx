import { ShiftAlphabetCipher } from '../../../dist/index.esm';
import BaseCipherDemo from './BaseCipherDemo';

export default function ShiftAlphabetDemo() {
  return (
    <BaseCipherDemo
      Cipher={ShiftAlphabetCipher}
      cipherConfiguration={{ shift: 3 }}
    />
  );
}
