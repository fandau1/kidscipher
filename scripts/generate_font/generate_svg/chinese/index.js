// Use ES module imports
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { generateSvgSymbolChinese } from './generate-svg.js';
import { CHINESE_REVERSE_MAP } from './map.js';

// __dirname is not available in ES modules, you can define it like this:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SYMBOL_PREFIX = 'CHINESE_';

export function generateChineseGlyphs() {
  const outDir = path.resolve(__dirname, '../../svg/chinese');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  Object.entries(CHINESE_REVERSE_MAP).forEach(([letter, config]) => {
    const svg = generateSvgSymbolChinese(config, {});
    const filePath = path.join(outDir, `${SYMBOL_PREFIX}${letter}.svg`);
    writeFileSync(filePath, svg, 'utf-8');
    console.log(`Generated ${filePath}`);
  });
}
