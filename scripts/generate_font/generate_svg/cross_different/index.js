// Use ES module imports
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { generateSvgSymbolDifferentCross } from './generate-svg.js';
import { DIFFERENT_CROSS_CONFIG_MAP } from './map.js';

// __dirname is not available in ES modules, you can define it like this:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SYMBOL_PREFIX = 'DIFFERENT_CROSS_';

export function generateDifferentCrossGlyphs() {
  const outDir = path.resolve(__dirname, '../../svg/cross_different');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  Object.entries(DIFFERENT_CROSS_CONFIG_MAP).forEach(([letter, config]) => {
    const svg = generateSvgSymbolDifferentCross(config, {});
    const filePath = path.join(outDir, `${SYMBOL_PREFIX}${letter}.svg`);
    writeFileSync(filePath, svg, 'utf-8');
    console.log(`Generated ${filePath}`);
  });
}
