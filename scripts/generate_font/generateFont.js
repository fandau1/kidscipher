import fs from 'fs';
import path from 'path';
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont';
import svg2ttf from 'svg2ttf';
import ttf2woff from 'ttf2woff';
import ttf2woff2 from 'ttf2woff2';
import { ensureDir } from './utils.js';

export async function generateFont(svgFiles, options) {
  const { fontName, outputDir, startCode = 100 } = options;
  ensureDir(outputDir);

  const fontStream = new SVGIcons2SVGFontStream({ fontName, normalize: true });
  const svgFontPath = path.join(outputDir, `${fontName}.svg`);
  const writeStream = fs.createWriteStream(svgFontPath);
  fontStream.pipe(writeStream);

  let currentCode = startCode;

  svgFiles.forEach((file) => {
    const glyphStream = fs.createReadStream(file);
    const unicodeChar = String.fromCharCode(currentCode);
    const name = path.basename(file, '.svg').toUpperCase().replace(/\W+/g, '_');
    glyphStream.metadata = { unicode: [unicodeChar], name };
    fontStream.write(glyphStream);
    currentCode++;
  });

  fontStream.end();

  await new Promise((resolve) => writeStream.on('finish', resolve));

  const svgFont = fs.readFileSync(svgFontPath, 'utf-8');
  const ttfBuffer = Buffer.from(svg2ttf(svgFont, {}).buffer);
  fs.writeFileSync(path.join(outputDir, `${fontName}.ttf`), ttfBuffer);
  fs.writeFileSync(
    path.join(outputDir, `${fontName}.woff`),
    Buffer.from(ttf2woff(ttfBuffer).buffer),
  );
  const woff2Buffer = ttf2woff2(ttfBuffer);
  fs.writeFileSync(path.join(outputDir, `${fontName}.woff2`), woff2Buffer);

  return { ttfBuffer, woff2Buffer };
}

export function generateCSS(woff2Buffer, outputDir, fontName) {
  const base64 = woff2Buffer.toString('base64');
  const cssContent = `@font-face {
    font-family: '${fontName}';
    src: url(data:font/woff2;base64,${base64}) format('woff2');
    font-weight: normal;
    font-style: normal;
}`;
  const cssPath = path.join(outputDir, `${fontName}.css`);
  fs.writeFileSync(cssPath, cssContent);
  return cssPath;
}
