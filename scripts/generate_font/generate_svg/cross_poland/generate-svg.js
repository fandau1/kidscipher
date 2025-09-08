export function generateSvgSymbolPolandCross(config, options = {}) {
    const { topLine, bottomLine, leftLine, rightLine, dotPosition } = config;
    const { width = 80, height = 60, padding = 5, dotRadius = 8, lineWidth = 6 } = options;

    // Dimensions
    const innerX = padding;
    const innerY = padding;
    const innerWidth = width - 2 * padding;
    const innerHeight = height - 2 * padding;

    const centerY = innerY + innerHeight / 2;

    // Dot X mapping with padding
    const dotXMap = {
        0: innerX + innerWidth / 4,       // left quarter
        1: innerX + innerWidth / 2,       // center
        2: innerX + (3 * innerWidth) / 4, // right quarter
    };
    const dotX = dotXMap[dotPosition] ?? innerX + innerWidth / 2;

    const parts = [];

    // Arms as filled rectangles
    if (topLine) {
        parts.push(
            `<rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${lineWidth}" fill="black" />`
        );
    }

    if (bottomLine) {
        parts.push(
            `<rect x="${innerX}" y="${innerY + innerHeight - lineWidth}" width="${innerWidth}" height="${lineWidth}" fill="black" />`
        );
    }

    if (leftLine) {
        parts.push(
            `<rect x="${innerX}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`
        );
    }

    if (rightLine) {
        parts.push(
            `<rect x="${innerX + innerWidth - lineWidth}" y="${innerY}" width="${lineWidth}" height="${innerHeight}" fill="black" />`
        );
    }

    // Dot
    parts.push(
        `<circle cx="${dotX}" cy="${centerY}" r="${dotRadius}" fill="black" />`
    );

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${parts.join("\n  ")}
</svg>`.trim();
}
