export function generateSvgSymbolSmallCross(config, options = {}) {
  const {
    width = 100,
    height = 100,
    padding = 10,
    dotRadius = 12,
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
    const { line, dot } = config;

    const halfW = innerWidth / 2;
    const halfH = innerHeight / 2;
    const r = lineWidth / 2;

    const top = { x: centerX, y: centerY - halfH };
    const right = { x: centerX + halfW, y: centerY };
    const bottom = { x: centerX, y: centerY + halfH };
    const left = { x: centerX - halfW, y: centerY };

    // helper for filled thick segment between two points with rounded ends
    const makeThickLine = (x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      const nx = (dy / len) * r; // normal x
      const ny = -(dx / len) * r; // normal y

      // path: semicircle at start, side, semicircle at end, side back
      return `
        M ${x1 - nx} ${y1 - ny}
        A ${r} ${r} 0 0 1 ${x1 + nx} ${y1 + ny}
        L ${x2 + nx} ${y2 + ny}
        A ${r} ${r} 0 0 1 ${x2 - nx} ${y2 - ny}
        Z
      `;
    };

    // build the polygon for each arm type
    if (line === 'top') {
      const d1 = makeThickLine(left.x, left.y, top.x, top.y);
      const d2 = makeThickLine(top.x, top.y, right.x, right.y);
      parts.push(`<path d="${d1 + d2}" fill="black" />`);
    } else if (line === 'right') {
      const d1 = makeThickLine(top.x, top.y, right.x, right.y);
      const d2 = makeThickLine(right.x, right.y, bottom.x, bottom.y);
      parts.push(`<path d="${d1 + d2}" fill="black" />`);
    } else if (line === 'bottom') {
      const d1 = makeThickLine(right.x, right.y, bottom.x, bottom.y);
      const d2 = makeThickLine(bottom.x, bottom.y, left.x, left.y);
      parts.push(`<path d="${d1 + d2}" fill="black" />`);
    } else if (line === 'left') {
      const d1 = makeThickLine(bottom.x, bottom.y, left.x, left.y);
      const d2 = makeThickLine(left.x, left.y, top.x, top.y);
      parts.push(`<path d="${d1 + d2}" fill="black" />`);
    }

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
