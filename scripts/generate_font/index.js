import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getAllSVGFiles } from './utils.js';
import { generateGlyphs, writeJSGlyphsFile } from './generateGlyphs.js';
import { generateFont, generateCSS } from './generateFont.js';
import { ensureDir } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INIT_GLYMP = 57345; // Private Use Area (PUA) = hex U+E000–U+F8FF
const FONT_NAME = 'Kidscipher';
const SVG_DIR = path.resolve(__dirname, './svg');
const OUTPUT_DIR = path.resolve(__dirname, './output');
const PROJECT_OUTPUT_DIR = path.resolve(__dirname, '../../src/fonts');

ensureDir(OUTPUT_DIR);
ensureDir(PROJECT_OUTPUT_DIR);

const folderOrder = [
  'cross_poland',
  'chinese',
  'fraction',
  'cross_small',
  'cross_hebrew',
  'cross_different',
];

// Collect SVG files in order
let svgFiles = [];
for (const folder of folderOrder) {
  const folderPath = path.join(SVG_DIR, folder);
  if (fs.existsSync(folderPath)) {
    const files = getAllSVGFiles(folderPath); // your util function
    svgFiles = svgFiles.concat(files);
  } else {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
  }
}

// 1️. Generate JS glyphs
const glyphs = generateGlyphs(svgFiles, INIT_GLYMP);
const jsFilePath = writeJSGlyphsFile(
  glyphs,
  path.join(OUTPUT_DIR, `${FONT_NAME}Glyphs.js`),
  FONT_NAME,
);

// 2️. Generate font files
const { ttfPath, woffPath, woff2Path, woff2Buffer } = await generateFont(svgFiles, {
  fontName: FONT_NAME,
  outputDir: OUTPUT_DIR,
  startCode: INIT_GLYMP,
});

// 3️. Generate CSS
const cssFilePath = generateCSS(woff2Buffer, OUTPUT_DIR, FONT_NAME);

// 4️. Copy JS + CSS to project
// JS file
fs.copyFileSync(jsFilePath, path.join(PROJECT_OUTPUT_DIR, path.basename(jsFilePath)),);
// CSS file
fs.copyFileSync(cssFilePath, path.join(PROJECT_OUTPUT_DIR, path.basename(cssFilePath)),);

// Font files
fs.copyFileSync(ttfPath, path.join(PROJECT_OUTPUT_DIR, path.basename(ttfPath)));
fs.copyFileSync(woffPath, path.join(PROJECT_OUTPUT_DIR, path.basename(woffPath)));
fs.copyFileSync(woff2Path, path.join(PROJECT_OUTPUT_DIR, path.basename(woff2Path)));

console.log('Font pipeline completed. JS + CSS generated.');
