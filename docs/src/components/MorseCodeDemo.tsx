import { MorseCodeCipher } from '../../../dist/index.esm';
import BaseCipherDemo from './BaseCipherDemo';

export default function MorseCodeDemo() {
  return <BaseCipherDemo Cipher={MorseCodeCipher} />;
}
