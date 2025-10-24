export function generateSvgSymbolSmallCross(config, options = {}) {
  const {
    width = 80,
    height = 60,
    padding = 5,
    dotRadius = 8,
    lineWidth = 6,
  } = options;

  // Dimensions
  const innerX = padding;
  const innerY = padding;
  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  const centerX = innerX + innerWidth / 2;
  const centerY = innerY + innerHeight / 2;

  const parts = [];

  if (config.type === 'square') {
    // Square type: draw orthogonal lines (edges)
    const { topLine, bottomLine, leftLine, rightLine, dot } = config;

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
    if (dot) {
      parts.push(
        `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
      );
    }
  } else if (config.type === 'rhombus') {
    // Rhombus type: draw diagonal lines
    const { line, dot } = config;

    // Calculate diagonal endpoints
    const topX = centerX;
    const topY = innerY;
    const rightX = innerX + innerWidth;
    const rightY = centerY;
    const bottomX = centerX;
    const bottomY = innerY + innerHeight;
    const leftX = innerX;
    const leftY = centerY;

    // Draw the appropriate diagonal line
    if (line === 'top') {
      // Bottom-right to bottom-left diagonal
      parts.push(
        `<line x1="${rightX}" y1="${rightY}" x2="${bottomX}" y2="${bottomY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
      parts.push(
        `<line x1="${bottomX}" y1="${bottomY}" x2="${leftX}" y2="${leftY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
    } else if (line === 'right') {
      // Bottom-left to top-left diagonal
      parts.push(
        `<line x1="${bottomX}" y1="${bottomY}" x2="${leftX}" y2="${leftY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
      parts.push(
        `<line x1="${leftX}" y1="${leftY}" x2="${topX}" y2="${topY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
    } else if (line === 'bottom') {
      // Top-left to top-right diagonal
      parts.push(
        `<line x1="${leftX}" y1="${leftY}" x2="${topX}" y2="${topY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
      parts.push(
        `<line x1="${topX}" y1="${topY}" x2="${rightX}" y2="${rightY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
    } else if (line === 'left') {
      // Top-right to bottom-right diagonal
      parts.push(
        `<line x1="${topX}" y1="${topY}" x2="${rightX}" y2="${rightY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
      parts.push(
        `<line x1="${rightX}" y1="${rightY}" x2="${bottomX}" y2="${bottomY}" stroke="black" stroke-width="${lineWidth}" stroke-linecap="round" />`,
      );
    }

    // Center dot for rhombus
    if (dot) {
      parts.push(
        `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    ${parts.join('\n  ')}
  </svg>`.trim();
}
