// Use ES module imports
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { generateSvgSymbolHebrewCross } from './generate-svg.js';
import { HEBREW_CROSS_CONFIG_MAP } from './map.js';

// __dirname is not available in ES modules, you can define it like this:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SYMBOL_PREFIX = 'HEBREW_CROSS_';

export function generateCrossHebrewGlyphs() {
  const outDir = path.resolve(__dirname, '../../svg/cross_hebrew');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  Object.entries(HEBREW_CROSS_CONFIG_MAP).forEach(([letter, config]) => {
    const svg = generateSvgSymbolHebrewCross(config, {});
    const filePath = path.join(outDir, `${SYMBOL_PREFIX}${letter}.svg`);
    writeFileSync(filePath, svg, 'utf-8');
    console.log(`Generated ${filePath}`);
  });
}
