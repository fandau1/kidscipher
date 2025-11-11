import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import { withDefaultCipherOptions } from '../../core/cipher-options/CipherOptionsDefault';
import Cipher, { CipherConfigurationsRecord } from '../Cipher';
import ShiftCipher from './ShiftCipher';

type ShiftAlphabetCipherOptions =
  | CipherConfigurationsRecord
  | {
      shift: number;
      outputAsIndex?: boolean; // output index instead of letter
      inputAsIndex?: boolean; // interpret input as index instead of letter
    };

class ShiftAlphabetCipher extends ShiftCipher {
  static DEFAULT_ALPHABET = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  constructor(shift: number = 1) {
    super(ShiftAlphabetCipher.DEFAULT_ALPHABET, shift);
  }
}

export default ShiftAlphabetCipher;
