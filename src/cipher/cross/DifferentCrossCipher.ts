import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class DifferentCrossCipher extends SubstitutionCipher {
  static DIFFERENT_CROSS_MAP: Record<string, string> = {
    A: KidscipherGlyphs.DIFFERENT_CROSS_A,
    B: KidscipherGlyphs.DIFFERENT_CROSS_B,
    C: KidscipherGlyphs.DIFFERENT_CROSS_C,
    D: KidscipherGlyphs.DIFFERENT_CROSS_D,
    E: KidscipherGlyphs.DIFFERENT_CROSS_E,
    F: KidscipherGlyphs.DIFFERENT_CROSS_F,
    G: KidscipherGlyphs.DIFFERENT_CROSS_G,
    H: KidscipherGlyphs.DIFFERENT_CROSS_H,
    CH: KidscipherGlyphs.DIFFERENT_CROSS_CH,
    I: KidscipherGlyphs.DIFFERENT_CROSS_I,
    J: KidscipherGlyphs.DIFFERENT_CROSS_J,
    K: KidscipherGlyphs.DIFFERENT_CROSS_K,
    L: KidscipherGlyphs.DIFFERENT_CROSS_L,
    M: KidscipherGlyphs.DIFFERENT_CROSS_M,
    N: KidscipherGlyphs.DIFFERENT_CROSS_N,
    O: KidscipherGlyphs.DIFFERENT_CROSS_O,
    P: KidscipherGlyphs.DIFFERENT_CROSS_P,
    Q: KidscipherGlyphs.DIFFERENT_CROSS_Q,
    R: KidscipherGlyphs.DIFFERENT_CROSS_R,
    S: KidscipherGlyphs.DIFFERENT_CROSS_S,
    T: KidscipherGlyphs.DIFFERENT_CROSS_T,
    U: KidscipherGlyphs.DIFFERENT_CROSS_U,
    V: KidscipherGlyphs.DIFFERENT_CROSS_V,
    W: KidscipherGlyphs.DIFFERENT_CROSS_W,
    X: KidscipherGlyphs.DIFFERENT_CROSS_X,
    Y: KidscipherGlyphs.DIFFERENT_CROSS_Y,
    Z: KidscipherGlyphs.DIFFERENT_CROSS_Z,
  };

  constructor() {
    super(DifferentCrossCipher.DIFFERENT_CROSS_MAP);
  }
}

export default DifferentCrossCipher;
