import { KidscipherGlyphs } from '../../font';
import SubstitutionCyclicCipher from '../substitution/SubstitutionCyclicCipher';

class ChineseCipher extends SubstitutionCyclicCipher {
  static CHINESE_MAP: Record<string, string[]> = ChineseCipher.generateMap();

  private static generateMap(): Record<string, string[]> {
    const map: Record<string, string[]> = {};

    // considering that chinese symbol have this format CHINESE_<LETTER>_<NUMBER>
    for (const key of Object.keys(KidscipherGlyphs)) {
      const match = key.match(/^CHINESE_([A-Z])_\d+$/);
      if (match) {
        const letter = match[1];
        if (!map[letter]) map[letter] = [];
        map[letter].push(
          KidscipherGlyphs[key as keyof typeof KidscipherGlyphs],
        );
      }
    }

    return map;
  }

  constructor() {
    super(ChineseCipher.CHINESE_MAP);
  }
}

export default ChineseCipher;
