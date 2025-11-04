export function generateSvgSymbolDifferentCross(config, options = {}) {
  const {
    width = 160,
    height = 120,
    padding = 10,
    dotRadius = 16,
    lineWidth = 12,
  } = options;

  // Dimensions
  const innerX = padding;
  const innerY = padding;
  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  const centerX = innerX + innerWidth / 2;
  const centerY = innerY + innerHeight / 2;

  const parts = [];

  if (config.type === 'ThreeRectangle') {
    // Square type: draw orthogonal lines (edges)
    const { topLine, bottomLine, leftLine, rightLine, dotPosition } = config;

    // Dot X mapping with padding
    const dotXMap = {
      0: innerX + innerWidth / 4, // left quarter
      1: innerX + innerWidth / 2, // center
      2: innerX + (3 * innerWidth) / 4, // right quarter
    };
    const dotX = dotXMap[dotPosition] ?? innerX + innerWidth / 2;

    // Arms as filled rectangles
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

    // Dot
    parts.push(
      `<circle cx="${dotX}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
    );
  } else if (config.type === 'TwoRectangle') {
    const {
      topLine,
      bottomLine,
      leftLine,
      rightLine,
      dotPosition,
      special = 'None',
    } = config;

    // Base symmetrical dot X positions (before special adjustments)
    const baseDotXMap = {
      0: innerX + innerWidth / 3, // left
      1: innerX + (2 * innerWidth) / 3, // right
    };
    let dotX = baseDotXMap[dotPosition] ?? centerX;

    // Special double lines
    if (special === 'DoubleRight') {
      // Add extra right vertical line
      parts.push(
        `<rect x="${innerX + innerWidth - lineWidth * 3}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`,
      );
      // If dot is near the right side → shift it slightly left to avoid overlap
      if (dotPosition === 1) dotX -= dotRadius;
    } else if (special === 'DoubleLeft') {
      // Add extra left vertical line
      parts.push(
        `<rect x="${innerX + lineWidth * 2}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`,
      );
      // If dot is near the left side → shift it slightly right
      if (dotPosition === 0) dotX += dotRadius;
    }

    // Arms as filled rectangles
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

    // Dot
    parts.push(
      `<circle cx="${dotX}" cy="${centerY}" r="${dotRadius}" fill="black" />`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    ${parts.join('\n  ')}
  </svg>`.trim();
}
