const CHINESE_MAP = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O'],
  ['P', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

export const CHINESE_REVERSE_MAP = {};

for (let row = 0; row < CHINESE_MAP.length; row++) {
  for (let col = 0; col < CHINESE_MAP[row].length; col++) {
    const letter = CHINESE_MAP[row][col];
    CHINESE_REVERSE_MAP[letter] = {
      letter: letter,
      row: row,
      column: col,
    };
  }
}
