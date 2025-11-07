---
sidebar_position: 4
hide_table_of_contents: true
---

# Spider Cipher

The `SpiderCipher` is part of the **Kidscipher** library.  
It encodes and decodes text using the **Spider Cipher**, inspired by classic **bifid/polybius** methods and the concept of a **spider web**.

---

## How It Works

Each letter is replaced by a **pair of letters** according to its position in a predefined grid.  
Some letters have **multiple substitution pairs** which cycle each time the letter is encoded.

For example:

- `A → BC / JX / DG`
- `B → AC / FX / EH`

This cycling helps make the cipher harder to break, while still being reversible.

---

### Example

Message:

```

HELLO

```

Encoded:

```

MF RF LF LF TK

```

Decoded:

```

hello

```

---

import SpiderCipherDemo from '@site/src/components/SpiderCipherDemo';

<SpiderCipherDemo />

