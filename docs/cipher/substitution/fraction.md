---
sidebar_position: 6
hide_table_of_contents: true
---

# Fraction Cipher

The `FractionCipher` is part of the **Kidscipher** library.  
It encodes and decodes text using **mathematical fractions**, where each letter is replaced by a specific fraction representation.

---

## How It Works

Each letter is replaced by a unique fraction from 1/1 to 5/5.  
The fractions are mapped alphabetically, starting with A = 1/1, B = 1/2, C = 1/3, and so on through the entire alphabet.

---

### Example

Message:

```
HELLO
```

Encoded:

```
½ ⅖ ⅗ ⅗ ⅗
```

_(Visual representation would show actual fraction glyphs)_

Decoded:

```
hello
```

---

## Map Table

| Letter | Fraction | Glyph        |
| ------ | -------- | ------------ |
| A      | 1/1      | FRACTION_1_1 |
| B      | 1/2      | FRACTION_1_2 |
| C      | 1/3      | FRACTION_1_3 |
| D      | 1/4      | FRACTION_1_4 |
| E      | 1/5      | FRACTION_1_5 |
| F      | 2/1      | FRACTION_2_1 |
| G      | 2/2      | FRACTION_2_2 |
| H      | 2/3      | FRACTION_2_3 |
| I      | 2/4      | FRACTION_2_4 |
| J      | 2/5      | FRACTION_2_5 |
| K      | 3/1      | FRACTION_3_1 |
| L      | 3/2      | FRACTION_3_2 |
| M      | 3/3      | FRACTION_3_3 |
| N      | 3/4      | FRACTION_3_4 |
| O      | 3/5      | FRACTION_3_5 |
| P      | 4/1      | FRACTION_4_1 |
| Q      | 4/2      | FRACTION_4_2 |
| R      | 4/3      | FRACTION_4_3 |
| S      | 4/4      | FRACTION_4_4 |
| T      | 4/5      | FRACTION_4_5 |
| U      | 5/1      | FRACTION_5_1 |
| V      | 5/2      | FRACTION_5_2 |
| W      | 5/3      | FRACTION_5_3 |
| X      | 5/4      | FRACTION_5_4 |
| Y      | 5/5      | FRACTION_5_5 |

---

import FractionCipherDemo from '@site/src/components/FractionCipherDemo';

<FractionCipherDemo />
