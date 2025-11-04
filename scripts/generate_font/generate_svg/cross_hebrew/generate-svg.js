export function generateSvgSymbolHebrewCross(config, options = {}) {
  const {
    width = 120,
    height = 100,
    padding = 10,
    dotRadius = 12,
    dotPadding = 18,
    lineWidth = 10,
  } = options;

  // Dimensions
  const innerX = padding;
  const innerY = padding;
  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  const centerX = innerX + innerWidth / 2;
  const centerY = innerY + innerHeight / 2;

  const parts = [];

  // Square type: draw orthogonal lines (edges)
  const { topLine, bottomLine, leftLine, rightLine, dotCount } = config;

  if (topLine) {
    parts.push(
      `<rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${lineWidth}" fill="black" />`,
    );
  }

  if (bottomLine) {
    parts.push(
      `<rect x="${innerX}" y="${innerY + innerHeight - lineWidth}" width="${innerWidth}" height="${lineWidth}" fill="black" />`,
    );
  }

  if (leftLine) {
    parts.push(
      `<rect x="${innerX}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`,
    );
  }

  if (rightLine) {
    parts.push(
      `<rect x="${innerX + innerWidth - lineWidth}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`,
    );
  }

  // Center dot for square
  if (dotCount == 1) {
    parts.push(
      `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
    );
  } else if (dotCount == 2) {
    parts.push(
      `<circle cx="${centerX - dotPadding}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
    );

    parts.push(
      `<circle cx="${centerX + dotPadding}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    ${parts.join('\n  ')}
  </svg>`.trim();
}
