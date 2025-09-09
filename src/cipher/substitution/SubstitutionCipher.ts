import Cipher from '../Cipher';

class SubstitutionCipher extends Cipher {
  protected encodeMap: Record<string, string>;
  protected decodeMap: Record<string, string>;

  constructor(encodeMap: Record<string, string>) {
    super();
    this.encodeMap = encodeMap;
    this.decodeMap = Object.entries(encodeMap).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {} as Record<string, string>,
    );
  }

  encodeToken(token: string): string {
    return this.encodeMap[token] ?? '';
  }

  decodeToken(token: string): string {
    let decoded = this.decodeMap[token] ?? '';
    return decoded;
  }
}

export default SubstitutionCipher;
