import ShiftCipher from './ShiftCipher';
import ShiftRotorCipher from './ShiftRotorCipher';

class ShiftRotorABCDCipher extends ShiftRotorCipher {
  static BASE_ALPHABET = [
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
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  static REPEAT_ALPHABET = ['A', 'B', 'C', 'D'];

  private static generateRepeatRotorAlphabet = (
    repeatAlphabet: string[],
    repeat: number,
  ) => {
    let output = [];

    while (output.length < ShiftRotorABCDCipher.BASE_ALPHABET.length) {
      for (let i = 0; i < repeatAlphabet.length; i++) {
        for (let k = 0; k < repeat; k++) {
          output.push(repeatAlphabet[i]);
        }
      }
    }

    return output;
  };

  static ROTOR_ALPHABETS = [
    ShiftRotorABCDCipher.generateRepeatRotorAlphabet(
      ShiftRotorABCDCipher.REPEAT_ALPHABET,
      9,
    ),
    ShiftRotorABCDCipher.generateRepeatRotorAlphabet(
      ShiftRotorABCDCipher.REPEAT_ALPHABET,
      3,
    ),
    ShiftRotorABCDCipher.generateRepeatRotorAlphabet(
      ShiftRotorABCDCipher.REPEAT_ALPHABET,
      1,
    ),
  ];

  constructor(shifts: number[]) {
    const rotors: string[][] = [];
    const baseAlphabet = ShiftRotorABCDCipher.BASE_ALPHABET;

    for (let i = 0; i < ShiftRotorABCDCipher.ROTOR_ALPHABETS.length; i++) {
      rotors.push(ShiftRotorABCDCipher.ROTOR_ALPHABETS[i]);
    }

    super(baseAlphabet, rotors, shifts);
  }
}

export default ShiftRotorABCDCipher;
