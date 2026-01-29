export const ALPHABET_NUMBERS = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

export type AlphabetNumber =
  (typeof ALPHABET_NUMBERS)[keyof typeof ALPHABET_NUMBERS];

export const ALPHABET_NUMBERS_ARRAY = Object.values(
  ALPHABET_NUMBERS,
) as AlphabetNumber[];
