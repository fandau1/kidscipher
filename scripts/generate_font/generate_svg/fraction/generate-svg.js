import { textToPath } from '../../utils/textToPath.js';

export async function generateSvgSymbolFraction(config, options = {}) {
  const { numerator, denominator } = config;
  const {
    width = 120,
    height = 180,
    padding = 10,
    lineWidth = 4,
    fontSize = 60,
    fontPath = './scripts/generate_font/assets/OpenSans-Regular.ttf',
    textColor = 'black',
    lineColor = 'black',
  } = options;

  const innerX = padding;
  const innerY = padding;
  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;
  const centerY = innerY + innerHeight / 2;

  // Fraction line
  const parts = [
    `<rect x="${innerX}" y="${centerY - lineWidth / 2}" width="${innerWidth}" height="${lineWidth}" fill="${lineColor}" />`,
  ];

  const startTextX = width / 2 - fontSize / 4;

  // Convert text to path
  const numPath = await textToPath(
    '' + numerator,
    fontPath,
    fontSize,
    startTextX,
    padding + fontSize,
  );
  const denPath = await textToPath(
    '' + denominator,
    fontPath,
    fontSize,
    startTextX,
    centerY + fontSize,
  );

  parts.push(`${numPath.toSVG()}`);
  parts.push(`${denPath.toSVG()}`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${parts.join('\n  ')}
</svg>`.trim();
}
