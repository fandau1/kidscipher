// Use ES module imports
import path from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { generateSvgSymbolPolandCross } from "./generate-svg.js";
import { POLAND_CROSS_CONFIG_MAP } from "./map.js";

// __dirname is not available in ES modules, you can define it like this:
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SYMBOL_PREFIX = "POLAND_CROSS_";

export function generateCrossPolandGlyphs() {
  const outDir = path.resolve(__dirname, "../../svg/cross_poland");

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  Object.entries(POLAND_CROSS_CONFIG_MAP).forEach(([letter, config]) => {
    const svg = generateSvgSymbolPolandCross(config, {});
    const filePath = path.join(outDir, `${SYMBOL_PREFIX}${letter}.svg`);
    writeFileSync(filePath, svg, "utf-8");
    console.log(`Generated ${filePath}`);
  });
}
