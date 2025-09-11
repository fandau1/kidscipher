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
