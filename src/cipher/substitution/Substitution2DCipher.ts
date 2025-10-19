import SubstitutionCyclicCipher from './SubstitutionCyclicCipher';

class Substitution2DCipher extends SubstitutionCyclicCipher {
  constructor(
    alphabet: string[][],
    horizontalKey: string[],
    verticalKey: string[],
  ) {
    // Validation checks
    if (alphabet.length !== verticalKey.length) {
      throw new Error(
        `Alphabet row count (${alphabet.length}) must match verticalKey length (${verticalKey.length})`,
      );
    }

    for (const [rowIndex, row] of alphabet.entries()) {
      if (row.length !== horizontalKey.length) {
        throw new Error(
          `Alphabet column count in row ${rowIndex} (${row.length}) must match horizontalKey length (${horizontalKey.length})`,
        );
      }
    }

    const encodeMap: Record<string, string[]> = {};

    // Build the coordinate map
    for (const [rowIndex, rowKey] of verticalKey.entries()) {
      for (const [colIndex, colKey] of horizontalKey.entries()) {
        const value = alphabet[rowIndex][colIndex];
        const coord = `${rowKey}${colKey}`;

        if (!encodeMap[value]) encodeMap[value] = [];
        encodeMap[value].push(coord);
      }
    }

    super(encodeMap);
  }
}

export default Substitution2DCipher;
