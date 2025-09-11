import seedrandom from 'seedrandom';

export class LineGenerator {
  constructor(seed) {
    this.rng = seedrandom(seed);
  }

  generateRandomLineCoordinates(
    vertical,
    margin,
    innerW,
    innerH,
    width,
    height,
    randomness,
  ) {
    if (vertical) {
      const x = margin + this.rng() * innerW;
      const y1 = margin + this.rng() * innerH * 0.3;
      const y2 = height - margin - this.rng() * innerH * 0.3;
      const midX = x + (this.rng() - 0.5) * randomness * 20;
      const midY = (y1 + y2) / 2 + (this.rng() - 0.5) * randomness * 20;
      return { x1: x, y1, x2: x, y2, midX, midY };
    } else {
      const y = margin + this.rng() * innerH;
      const x1 = margin + this.rng() * innerW * 0.3;
      const x2 = width - margin - this.rng() * innerW * 0.3;
      const midX = (x1 + x2) / 2 + (this.rng() - 0.5) * randomness * 20;
      const midY = y + (this.rng() - 0.5) * randomness * 10;
      return { x1, y1: y, x2, y2: y, midX, midY };
    }
  }
}
