---
sidebar_position: 1
---

# Get Started

**Kidscipher** is an npm library for encoding and decoding educational and fun ciphers. It provides ciphers that can be solved as games and includes a custom font, **Kidscipher**, which enables graphical ciphers and symbols.

## Installation

Install the library via npm:

```bash
npm install kidscipher
```

## Usage

Import the cipher you want to use:

```javascript
import { PolandCrossCipher } from 'kidscipher';

const cipher = new PolandCrossCipher();

const encoded = cipher.encode('HELLO');
console.log(encoded);

const decoded = cipher.decode(encoded);
console.log(decoded); // HELLO
```

## Custom Font

The Kidscipher font allows you to render encoded text as graphical symbols. It is automatically included in the package, so no separate import is required.

```html
<p style="font-family: Kidscipher;">{encoded}</p>
```
