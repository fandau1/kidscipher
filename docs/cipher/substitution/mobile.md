---
sidebar_position: 3
---

# Mobile Cipher

The `MobileCipher` is part of the **Kidscipher** library.  
It encodes and decodes text using the **mobile keypad cipher**, inspired by classic **T9 input** on old phones.

---

## How It Works

Each letter is replaced by the number key sequence used on a mobile keypad.  
For example, `A → 2`, `B → 22`, `C → 222`.  
Digits `0–9` are encoded as four repeated digits — e.g. `2 → 2222`.

---

### Example

Message:

```

HELLO 2

```

Encoded:

```

44 33 555 555 666 | 2222

```

Decoded:

```

hello 2

```

---

## Keypad Table

| Key | Letters | Encoded             |
| --- | ------- | ------------------- |
| 1   | —       | 1111                |
| 2   | A B C   | 2 / 22 / 222 / 2222 |
| 3   | D E F   | 3 / 33 / 333 / 3333 |
| 4   | G H I   | 4 / 44 / 444 / 4444 |
| 5   | J K L   | 5 / 55 / 555 / 5555 |
| 6   | M N O   | 6 / 66 / 666 / 6666 |
| 7   | P Q R S | 7 / 77 / 777 / 7777 |
| 8   | T U V   | 8 / 88 / 888 / 8888 |
| 9   | W X Y Z | 9 / 99 / 999 / 9999 |
| 0   | —       | 0000                |

---

import MobileCipherDemo from '@site/src/components/MobileCipherDemo';

<MobileCipherDemo />
```
