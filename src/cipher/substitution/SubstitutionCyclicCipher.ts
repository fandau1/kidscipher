import { CipherOptions } from '../../core/cipher-options/CipherOptions';
import Cipher, { CipherConfigurationsRecord } from '../Cipher';

class SubstitutionCyclicCipher extends Cipher {
  protected encodeMap: Record<string, string[]>;
  protected decodeMap: Record<string, string>;
  protected counters: Record<string, number>; // counter for each letter

  protected encodeTokens: string[];
  protected decodeTokens: string[];

  constructor(encodeMap: Record<string, string | string[]>) {
    super();

    // normalize encode map to arrays
    this.encodeMap = Object.fromEntries(
      Object.entries(encodeMap).map(([key, value]) => [
        key,
        Array.isArray(value) ? value : [value],
      ]),
    );

    // build decode map
    this.decodeMap = {};
    for (const [key, values] of Object.entries(this.encodeMap)) {
      for (const val of values) {
        this.decodeMap[val] = key;
      }
    }

    // tokenize keys (longest first)
    this.encodeTokens = Object.keys(this.encodeMap).sort(
      (a, b) => b.length - a.length,
    );

    this.decodeTokens = Object.keys(this.decodeMap).sort(
      (a, b) => b.length - a.length,
    );

    // initialize counters
    this.counters = {};
    this.resetCounters();
  }

  getEncodeTokens(): string[] {
    return this.encodeTokens;
  }

  getDecodeTokens(): string[] {
    return this.decodeTokens;
  }

  resetCounters = () => {
    for (const key of Object.keys(this.encodeMap)) {
      this.counters[key] = 0;
    }
  };

  encodeToken(token: string): string {
    const options = this.encodeMap[token];
    if (!options || options.length === 0) return '';

    const index = this.counters[token] % options.length; // cyclic
    this.counters[token] += 1;
    return options[index];
  }

  encode(
    input: string,
    configuration?: CipherConfigurationsRecord,
    opts?: CipherOptions,
  ): string {
    const value = super.encode(input, configuration, opts);

    this.resetCounters();
    return value;
  }

  decodeToken(token: string): string {
    return this.decodeMap[token] ?? '';
  }
}

export default SubstitutionCyclicCipher;
