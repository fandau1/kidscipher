import Substitution2DCipher from '../substitution/Substitution2DCipher';

class TableKeyFiveToFiveCipher extends Substitution2DCipher {
  static ALPHABET = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
  ];

  constructor(horizontalKey: string[], verticalKey: string[]) {
    super(TableKeyFiveToFiveCipher.ALPHABET, horizontalKey, verticalKey);
  }
}

export default TableKeyFiveToFiveCipher;
