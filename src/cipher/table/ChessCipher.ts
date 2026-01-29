import { ALPHABET_EN_ARRAY } from '../../core/alphabet/MapEn';
import { ALPHABET_NUMBERS_ARRAY } from '../../core/alphabet/MapNumbers';
import Substitution2DCipher from '../substitution/Substitution2DCipher';

class ChessCipher extends Substitution2DCipher {
  // base alphabet: A-Z + 0-9
  static BASE_ALPHABET = [
    ...ALPHABET_EN_ARRAY,
    ALPHABET_NUMBERS_ARRAY,
  ] as string[];

  constructor(height: number, width: number) {
    const totalCells = height * width;

    if (totalCells < ChessCipher.BASE_ALPHABET.length) {
      throw new Error(
        `Invalid board size: ${height}x${width} = ${totalCells} cells, but alphabet requires at least ${ChessCipher.BASE_ALPHABET.length} cells.`,
      );
    }

    // horizontal key (rows 1, 2, 3, …)
    const horizontalKey: string[] = [];
    for (let i = 0; i < width; i++) {
      horizontalKey.push((i + 1).toString());
    }

    // vertical key (columns A, B, C, …)
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
