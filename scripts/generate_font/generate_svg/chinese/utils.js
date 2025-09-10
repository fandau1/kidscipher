export const approxIntersect = (lineA, lineB) => {
  const minX1 = Math.min(lineA.x1, lineA.x2),
    maxX1 = Math.max(lineA.x1, lineA.x2);
  const minY1 = Math.min(lineA.y1, lineA.y2),
    maxY1 = Math.max(lineA.y1, lineA.y2);

  const minX2 = Math.min(lineB.x1, lineB.x2),
    maxX2 = Math.max(lineB.x1, lineB.x2);
  const minY2 = Math.min(lineB.y1, lineB.y2),
    maxY2 = Math.max(lineB.y1, lineB.y2);

  const horizontalOverlap = maxX1 >= minX2 && maxX2 >= minX1;
  const verticalOverlap = maxY1 >= minY2 && maxY2 >= minY1;

  return horizontalOverlap && verticalOverlap;
};

export const generateRandomLineCoordinates = (
  vertical,
  margin,
  innerW,
  innerH,
  width,
  height,
  randomness,
) => {
  if (vertical) {
    const x = margin + Math.random() * innerW;
    const y1 = margin + Math.random() * innerH * 0.3;
    const y2 = height - margin - Math.random() * innerH * 0.3;
    const midX = x + (Math.random() - 0.5) * randomness * 20;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * randomness * 20;
    return { x1: x, y1, x2: x, y2, midX, midY };
  } else {
    const y = margin + Math.random() * innerH;
    const x1 = margin + Math.random() * innerW * 0.3;
    const x2 = width - margin - Math.random() * innerW * 0.3;
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * randomness * 20;
    const midY = y + (Math.random() - 0.5) * randomness * 10;
    return { x1, y1: y, x2, y2: y, midX, midY };
  }
};
