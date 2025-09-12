---
sidebar_position: 2
---

# Contribute

The main goal of **Kidscipher** is to provide a lightweight, dependency-minimal library with high customization for ciphers.

All ciphers are text-based (even graphical ones). The graphical part is powered by the **Kidscipher** font, which is automatically generated using:

```bash
scripts/generate-font
```

This script maps symbols to Unicode, so every graphical cipher is just normal text rendered with the custom font.

---

## Setup

Install dependencies:

```bash
npm install
```

Prebuild fonts:

```bash
npm run prebuild-fonts
```

Build the package:

```bash
npm run build
```

---

## Local Testing in Another Project

To try the package in a different project without publishing to npm, link the built `dist` folder directly:

```json
{
  "dependencies": {
    "kidscipher": "file:../dist"
  }
}
```

> Note: After adding the dependency, run `npm install` in the new project.
> This creates a symlink to the `../dist` folder, so any updates you rebuild in **Kidscipher** will immediately be available without reinstalling, as long as the folder structure stays the same.
