import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class FractionCipher extends SubstitutionCipher {
  static FRACTION_MAP: Record<string, string> = {
    A: KidscipherGlyphs.FRACTION_1_1,
    B: KidscipherGlyphs.FRACTION_1_2,
    C: KidscipherGlyphs.FRACTION_1_3,
    D: KidscipherGlyphs.FRACTION_1_4,
    E: KidscipherGlyphs.FRACTION_1_5,
    F: KidscipherGlyphs.FRACTION_2_1,
    G: KidscipherGlyphs.FRACTION_2_2,
    H: KidscipherGlyphs.FRACTION_2_3,
    I: KidscipherGlyphs.FRACTION_2_4,
    J: KidscipherGlyphs.FRACTION_2_5,
    K: KidscipherGlyphs.FRACTION_3_1,
    L: KidscipherGlyphs.FRACTION_3_2,
    M: KidscipherGlyphs.FRACTION_3_3,
    N: KidscipherGlyphs.FRACTION_3_4,
    O: KidscipherGlyphs.FRACTION_3_5,
    P: KidscipherGlyphs.FRACTION_4_1,
    Q: KidscipherGlyphs.FRACTION_4_2,
    R: KidscipherGlyphs.FRACTION_4_3,
    S: KidscipherGlyphs.FRACTION_4_4,
    T: KidscipherGlyphs.FRACTION_4_5,
    U: KidscipherGlyphs.FRACTION_5_1,
    V: KidscipherGlyphs.FRACTION_5_2,
    X: KidscipherGlyphs.FRACTION_5_3,
    Y: KidscipherGlyphs.FRACTION_5_4,
    Z: KidscipherGlyphs.FRACTION_5_5,
  };

  constructor() {
    super(FractionCipher.FRACTION_MAP);
  }
}

export default FractionCipher;
