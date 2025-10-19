import Substitution2DCipher from '../substitution/Substitution2DCipher';

class ChessCipher extends Substitution2DCipher {
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

  constructor(height: number, width: number) {
    const totalCells = height * width;

    if (totalCells < ChessCipher.BASE_ALPHABET.length) {
      throw new Error(
        `Invalid board size: ${height}x${width} = ${totalCells} cells, but alphabet requires at least ${ChessCipher.BASE_ALPHABET.length} cells.`,
      );
    }

    // horizontal key (columns A, B, C, …)
    const horizontalKey: string[] = [];
    for (let i = 0; i < width; i++) {
      horizontalKey.push((i + 1).toString());
    }

    // vertical key (rows 1, 2, 3, …)
    const verticalKey: string[] = [];
    for (let i = 0; i < height; i++) {
      verticalKey.push(String.fromCharCode('A'.charCodeAt(0) + i));
    }

    // create 2D table
    const encodeAlphabet2D: string[][] = [];

    for (let row = 0; row < height; row++) {
      encodeAlphabet2D[row] = [];
      for (let col = 0; col < width; col++) {
        const index = (row * width + col) % ChessCipher.BASE_ALPHABET.length; // repeat alphabet
        encodeAlphabet2D[row][col] = ChessCipher.BASE_ALPHABET[index];
      }
    }

    super(encodeAlphabet2D, horizontalKey, verticalKey);
  }
}

export default ChessCipher;
