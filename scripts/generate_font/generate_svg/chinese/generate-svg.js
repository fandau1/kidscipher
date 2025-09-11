import { LineGenerator } from './line-generator.js';
import { approxIntersect, lineToPolygon } from './utils.js';

export function generateSvgSymbolChinese(config, opts) {
  const {
    width = 100,
    height = 100,
    strokeWidth = 3,
    showLetter = false,
    randomness = 0.3,
    minSpacing = 8,
    seed = undefined,
  } = opts ?? {};
  const rows = config.row + 1; // počet vodorovných čar
  const cols = config.column + 1; // počet svislých čar

  const lineGenerator = new LineGenerator(seed);

  const margin = 10;
  const innerW = width - 2 * margin;
  const innerH = height - 2 * margin;

  const vertLines = [];
  const horLines = [];

  const MAX_INVALID_ATTEMPTS = 10;
  let invalidAttempts = 0;
  while (vertLines.length < cols || horLines.length < rows) {
    // generuj vertikální čáru
    if (vertLines.length < cols) {
      const line = lineGenerator.generateRandomLineCoordinates(
        true,
        margin,
        innerW,
        innerH,
        width,
        height,
        randomness,
      );
      const minDistanceOk = vertLines.every(
        (v) => Math.abs(v.x1 - line.x1) >= minSpacing,
      );
      const touchesExisting =
        horLines.length === 0 ||
        horLines.some((h) =>
          approxIntersect(
            {
              x1: line.x1,
              y1: line.y1,
              x2: line.x2,
              y2: line.y2,
            },
            {
              x1: h.x1,
              y1: h.y1,
              x2: h.x2,
              y2: h.y2,
            },
          ),
        );
      if (minDistanceOk && touchesExisting) {
        vertLines.push(line);
      } else {
        invalidAttempts++;
      }
    }

    // generuj horizontální čáru
    if (horLines.length < rows) {
      const line = lineGenerator.generateRandomLineCoordinates(
        false,
        margin,
        innerW,
        innerH,
        width,
        height,
        randomness,
      );
      const minDistanceOk = horLines.every(
        (v) => Math.abs(v.y1 - line.y1) >= minSpacing,
      );
      const touchesExisting =
        vertLines.length === 0 ||
        vertLines.some((v) =>
          approxIntersect(
            {
              x1: line.x1,
              y1: line.y1,
              x2: line.x2,
              y2: line.y2,
            },
            {
              x1: v.x1,
              y1: v.y1,
              x2: v.x2,
              y2: v.y2,
            },
          ),
        );
      if (minDistanceOk && touchesExisting) {
        horLines.push(line);
      } else {
        invalidAttempts++;
      }
    }

    if (invalidAttempts > MAX_INVALID_ATTEMPTS) {
      invalidAttempts = 0;
      vertLines.length = 0;
      horLines.length = 0;
      continue;
    }
  }

  // vygenerujeme vodorovné pozice s minSpacing
  let lines = '';

  // svislé čáry – náhodné x, náhodné délky
  for (const line of vertLines) {
    const { x1, x2, y1, y2, midX, midY } = line;
    lines += lineToPolygon({ x1, x2, y1, y2 }, strokeWidth);
  }

  // vodorovné čáry – náhodné y, náhodné délky
  for (const line of horLines) {
    const { x1, x2, y1, y2, midX, midY } = line;

    lines += lineToPolygon({ x1, x2, y1, y2 }, strokeWidth);
  }

  const letter = showLetter
    ? `<text x="${width - 4}" y="${height - 4}" text-anchor="end" font-size="12" fill="#555">${char.toUpperCase()}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${lines}
    ${letter}
  </svg>`;
}
