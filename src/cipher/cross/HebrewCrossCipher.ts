import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class HebrewCrossCipher extends SubstitutionCipher {
  static HEBREW_CROSS_MAP: Record<string, string> = {
    A: KidscipherGlyphs.HEBREW_CROSS_A,
    B: KidscipherGlyphs.HEBREW_CROSS_B,
    C: KidscipherGlyphs.HEBREW_CROSS_C,
    D: KidscipherGlyphs.HEBREW_CROSS_D,
    E: KidscipherGlyphs.HEBREW_CROSS_E,
    F: KidscipherGlyphs.HEBREW_CROSS_F,
    G: KidscipherGlyphs.HEBREW_CROSS_G,
    H: KidscipherGlyphs.HEBREW_CROSS_H,
    CH: KidscipherGlyphs.HEBREW_CROSS_CH,
    I: KidscipherGlyphs.HEBREW_CROSS_I,
    J: KidscipherGlyphs.HEBREW_CROSS_J,
    K: KidscipherGlyphs.HEBREW_CROSS_K,
    L: KidscipherGlyphs.HEBREW_CROSS_L,
    M: KidscipherGlyphs.HEBREW_CROSS_M,
    N: KidscipherGlyphs.HEBREW_CROSS_N,
    O: KidscipherGlyphs.HEBREW_CROSS_O,
    P: KidscipherGlyphs.HEBREW_CROSS_P,
    Q: KidscipherGlyphs.HEBREW_CROSS_Q,
    R: KidscipherGlyphs.HEBREW_CROSS_R,
    S: KidscipherGlyphs.HEBREW_CROSS_S,
    T: KidscipherGlyphs.HEBREW_CROSS_T,
    U: KidscipherGlyphs.HEBREW_CROSS_U,
    V: KidscipherGlyphs.HEBREW_CROSS_V,
    W: KidscipherGlyphs.HEBREW_CROSS_W,
    X: KidscipherGlyphs.HEBREW_CROSS_X,
    Y: KidscipherGlyphs.HEBREW_CROSS_Y,
    Z: KidscipherGlyphs.HEBREW_CROSS_Z,
  };

  constructor() {
    super(HebrewCrossCipher.HEBREW_CROSS_MAP);
  }
}

export default HebrewCrossCipher;
