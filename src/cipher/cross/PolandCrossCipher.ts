import { KidscipherGlyphs } from '../../font';
import SubstitutionCipher from '../substitution/SubstitutionCipher';

class PolandCrossCipher extends SubstitutionCipher {
  static POLAND_CROSS_MAP: Record<string, string> = {
    A: KidscipherGlyphs.POLAND_CROSS_A,
    B: KidscipherGlyphs.POLAND_CROSS_B,
    C: KidscipherGlyphs.POLAND_CROSS_C,
    D: KidscipherGlyphs.POLAND_CROSS_D,
    E: KidscipherGlyphs.POLAND_CROSS_E,
    F: KidscipherGlyphs.POLAND_CROSS_F,
    G: KidscipherGlyphs.POLAND_CROSS_G,
    H: KidscipherGlyphs.POLAND_CROSS_H,
    CH: KidscipherGlyphs.POLAND_CROSS_CH,
    I: KidscipherGlyphs.POLAND_CROSS_I,
    J: KidscipherGlyphs.POLAND_CROSS_J,
    K: KidscipherGlyphs.POLAND_CROSS_K,
    L: KidscipherGlyphs.POLAND_CROSS_L,
    M: KidscipherGlyphs.POLAND_CROSS_M,
    N: KidscipherGlyphs.POLAND_CROSS_N,
    O: KidscipherGlyphs.POLAND_CROSS_O,
    P: KidscipherGlyphs.POLAND_CROSS_P,
    Q: KidscipherGlyphs.POLAND_CROSS_Q,
    R: KidscipherGlyphs.POLAND_CROSS_R,
    S: KidscipherGlyphs.POLAND_CROSS_S,
    T: KidscipherGlyphs.POLAND_CROSS_T,
    U: KidscipherGlyphs.POLAND_CROSS_U,
    V: KidscipherGlyphs.POLAND_CROSS_V,
    W: KidscipherGlyphs.POLAND_CROSS_W,
    X: KidscipherGlyphs.POLAND_CROSS_X,
    Y: KidscipherGlyphs.POLAND_CROSS_Y,
    Z: KidscipherGlyphs.POLAND_CROSS_Z,
  };

  constructor() {
    super(PolandCrossCipher.POLAND_CROSS_MAP);
  }
}

export default PolandCrossCipher;
