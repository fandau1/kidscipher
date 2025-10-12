import { textToPath } from '../../utils/textToPath.js';

export async function generateSvgSymbolFraction(config, options = {}) {
  const { numerator, denominator } = config;
  const {
    width = 40,
    height = 60,
    padding = 5,
    lineWidth = 2,
    fontSize = 20,
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

  parts.push(`${numPath.toSVG(2)}`);
  parts.push(`${denPath.toSVG(2)}`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${parts.join('\n  ')}
</svg>`.trim();
}
