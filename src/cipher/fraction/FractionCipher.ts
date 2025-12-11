import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class FractionCipher extends SubstitutionCipher {
  static FRACTION_MAP: Record<string, string> = {
    A: KidscipherGlyphs.FRACTION_1_1,
    B: KidscipherGlyphs.FRACTION_2_1,
    C: KidscipherGlyphs.FRACTION_3_1,
    D: KidscipherGlyphs.FRACTION_4_1,
    E: KidscipherGlyphs.FRACTION_5_1,
    F: KidscipherGlyphs.FRACTION_1_2,
    G: KidscipherGlyphs.FRACTION_2_2,
    H: KidscipherGlyphs.FRACTION_3_2,
    I: KidscipherGlyphs.FRACTION_4_2,
    J: KidscipherGlyphs.FRACTION_5_2,
    K: KidscipherGlyphs.FRACTION_1_3,
    L: KidscipherGlyphs.FRACTION_2_3,
    M: KidscipherGlyphs.FRACTION_3_3,
    N: KidscipherGlyphs.FRACTION_4_3,
    O: KidscipherGlyphs.FRACTION_5_3,
    P: KidscipherGlyphs.FRACTION_1_4,
    Q: KidscipherGlyphs.FRACTION_2_4,
    R: KidscipherGlyphs.FRACTION_3_4,
    S: KidscipherGlyphs.FRACTION_4_4,
    T: KidscipherGlyphs.FRACTION_5_4,
    U: KidscipherGlyphs.FRACTION_1_5,
    V: KidscipherGlyphs.FRACTION_2_5,
    X: KidscipherGlyphs.FRACTION_3_5,
    Y: KidscipherGlyphs.FRACTION_4_5,
    Z: KidscipherGlyphs.FRACTION_5_5,
  };

  constructor() {
    super(FractionCipher.FRACTION_MAP);
  }
}

export default FractionCipher;
