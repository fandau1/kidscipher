---
sidebar_position: 3
hide_table_of_contents: true
---

# Morse Code Cipher

The `MorseCodeCipher` is part of the Kidscipher library.  
It allows encoding and decoding messages using **Morse code**, a method of transmitting text using sequences of dots (`.`) and dashes (`-`) to represent letters and numbers.

Morse code was originally developed for telegraph communication and is still used for learning, puzzles, and fun ciphers today.

## How It Works

Each letter, number, and some punctuation marks have a unique sequence of dots and dashes. Words are separated by slashes (`/`) or spaces, depending on the implementation.

For example, the word `HELLO` is encoded as:

```

...././.-../.-../---///.--/---/.-./.-../-..

```

---

## Morse Code Table

| Letter | Morse | Letter | Morse | Number | Morse |
| ------ | ----- | ------ | ----- | ------ | ----- |
| A      | .-    | N      | -.    | 0      | ----- |
| B      | -...  | O      | ---   | 1      | .---- |
| C      | -.-.  | P      | .--.  | 2      | ..--- |
| D      | -..   | Q      | --.-  | 3      | ...-- |
| E      | .     | R      | .-.   | 4      | ....- |
| F      | ..-.  | S      | ...   | 5      | ..... |
| G      | --.   | T      | -     | 6      | -.... |
| H      | ....  | U      | ..-   | 7      | --... |
| I      | ..    | V      | ...-  | 8      | ---.. |
| J      | .---  | W      | .--   | 9      | ----. |
| K      | -.-   | X      | -..-  |        |       |
| L      | .-..  | Y      | -.--  |        |       |
| M      | --    | Z      | --..  |        |       |

---

import MorseCodeDemo from '@site/src/components/MorseCodeDemo';

<MorseCodeDemo />
```
