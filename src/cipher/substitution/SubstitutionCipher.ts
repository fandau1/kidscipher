import Cipher from '../Cipher';

class SubstitutionCipher extends Cipher {
  protected encodeMap: Record<string, string>;
  protected decodeMap: Record<string, string>;

  protected encodeTokens: string[];
  protected decodeTokens: string[];

  constructor(encodeMap: Record<string, string>) {
    super();

    this.encodeMap = encodeMap;

    this.decodeMap = Object.fromEntries(
      Object.entries(encodeMap).map(([k, v]) => [v, k]),
    );

    this.encodeTokens = Object.keys(this.encodeMap).sort(
      (a, b) => b.length - a.length, // longest first
    );

    this.decodeTokens = Object.keys(this.decodeMap).sort(
      (a, b) => b.length - a.length, // longest first
    );
  }

  getEncodeTokens(): string[] {
    return this.encodeTokens;
  }

  getDecodeTokens(): string[] {
    return this.decodeTokens;
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
