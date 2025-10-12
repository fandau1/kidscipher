// Use ES module imports
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { generateSvgSymbolFraction } from './generate-svg.js';
import { FRACTIONS_CONFIG_MAP } from './map.js';

// __dirname is not available in ES modules, you can define it like this:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SYMBOL_PREFIX = 'FRACTION_';

export async function generateFractionGlyphs() {
  const outDir = path.resolve(__dirname, '../../svg/fraction');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  Object.entries(FRACTIONS_CONFIG_MAP).forEach(async ([letter, config]) => {
    const svg = await generateSvgSymbolFraction(config, {});
    const filePath = path.join(outDir, `${SYMBOL_PREFIX}${letter}.svg`);
    writeFileSync(filePath, svg, 'utf-8');
    console.log(`Generated ${filePath}`);
  });
}
