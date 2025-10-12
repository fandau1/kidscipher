import opentype from 'opentype.js';

export async function textToPath(text, fontPath, fontSize, x = 0, y = 0) {
  const font = await opentype.load(fontPath);
  const path = font.getPath(text, x, y, fontSize);
  return path;
}
