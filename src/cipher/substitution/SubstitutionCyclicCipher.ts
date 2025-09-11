import Cipher from '../Cipher';

class SubstitutionCyclicCipher extends Cipher {
  protected encodeMap: Record<string, string[]>;
  protected decodeMap: Record<string, string>;
  protected counters: Record<string, number>; // counter for each letter

  constructor(encodeMap: Record<string, string | string[]>) {
    super();

    // chech encodeMap
    this.encodeMap = Object.fromEntries(
      Object.entries(encodeMap).map(([key, value]) => [
        key,
        Array.isArray(value) ? value : [value],
      ]),
    );

    // decode map
    this.decodeMap = {};
    for (const [key, values] of Object.entries(this.encodeMap)) {
      for (const val of values) {
        this.decodeMap[val] = key;
      }
    }

    // inialization counters
    this.counters = {};
    for (const key of Object.keys(this.encodeMap)) {
      this.counters[key] = 0;
    }
  }

  encodeToken(token: string): string {
    const options = this.encodeMap[token];
    if (!options || options.length === 0) return '';

    const index = this.counters[token] % options.length; // cyclic
    this.counters[token] += 1;
    return options[index];
  }

  decodeToken(token: string): string {
    return this.decodeMap[token] ?? '';
  }
}

export default SubstitutionCyclicCipher;
