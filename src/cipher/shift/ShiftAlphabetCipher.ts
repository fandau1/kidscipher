import { ALPHABET_EN_ARRAY } from '../../core/alphabet/MapEn';
import ShiftCipher from './ShiftCipher';

class ShiftAlphabetCipher extends ShiftCipher {
  constructor(shift: number = 1) {
    super(ALPHABET_EN_ARRAY, shift);
  }
}

export default ShiftAlphabetCipher;
