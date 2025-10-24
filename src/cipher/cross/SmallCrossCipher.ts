import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class SmallCrossCipher extends SubstitutionCipher {
  static SMALL_CROSS_MAP: Record<string, string> = {
    A: KidscipherGlyphs.SMALL_CROSS_A,
    B: KidscipherGlyphs.SMALL_CROSS_B,
    C: KidscipherGlyphs.SMALL_CROSS_C,
    D: KidscipherGlyphs.SMALL_CROSS_D,
    E: KidscipherGlyphs.SMALL_CROSS_E,
    F: KidscipherGlyphs.SMALL_CROSS_F,
    G: KidscipherGlyphs.SMALL_CROSS_G,
    H: KidscipherGlyphs.SMALL_CROSS_H,
    I: KidscipherGlyphs.SMALL_CROSS_I,
    J: KidscipherGlyphs.SMALL_CROSS_J,
    K: KidscipherGlyphs.SMALL_CROSS_K,
    L: KidscipherGlyphs.SMALL_CROSS_L,
    M: KidscipherGlyphs.SMALL_CROSS_M,
    N: KidscipherGlyphs.SMALL_CROSS_N,
    O: KidscipherGlyphs.SMALL_CROSS_O,
    P: KidscipherGlyphs.SMALL_CROSS_P,
    Q: KidscipherGlyphs.SMALL_CROSS_Q,
    R: KidscipherGlyphs.SMALL_CROSS_R,
    S: KidscipherGlyphs.SMALL_CROSS_S,
    T: KidscipherGlyphs.SMALL_CROSS_T,
    U: KidscipherGlyphs.SMALL_CROSS_U,
    V: KidscipherGlyphs.SMALL_CROSS_V,
    W: KidscipherGlyphs.SMALL_CROSS_W,
    X: KidscipherGlyphs.SMALL_CROSS_X,
    Y: KidscipherGlyphs.SMALL_CROSS_Y,
    Z: KidscipherGlyphs.SMALL_CROSS_Z,
  };

  constructor() {
    super(SmallCrossCipher.SMALL_CROSS_MAP);
  }
}

export default SmallCrossCipher;
