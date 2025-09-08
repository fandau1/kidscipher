import { CasingOptions, CipherOptions } from "../../core/cipher-options/CipherOptions";

class SubstitutionCipher {
  protected encodeMap: Record<string, string>;
  protected decodeMap: Record<string, string>;

  constructor(encodeMap: Record<string, string>) {
    this.encodeMap = encodeMap;
    this.decodeMap = Object.entries(encodeMap).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {} as Record<string, string>,
    );
  }


  encode(input: string, opts?: CipherOptions): string {
    const inputOpts = opts?.input || {};
    const outputOpts = opts?.output || {};

    const letterSeparator = outputOpts.letterSeparator ?? "";
    const wordSeparator = outputOpts.wordSeparator ?? " ";
    const casing: string = outputOpts.casing ?? "original";

    return input
      .split("")
      .map((char) => {
        if (!inputOpts.caseSensitive) char = char.toUpperCase();
        if (/[A-Z0-9]/.test(char)) {
          return this.encodeMap[char] || "";
        } else if (/\s/.test(char)) {
          return wordSeparator;
        }
        return "";
      })
      .join(letterSeparator);
  }

  decode(input: string, opts?: CipherOptions): string {
    const inputOpts = opts?.input || {};
    const outputOpts = opts?.output || {};
  
    const letterSep = inputOpts.letterSeparator ?? "/";  // default for Morse
    const wordSep = inputOpts.wordSeparator ?? " / ";
    const casing: CasingOptions = outputOpts.casing ?? "upper";

    // split using a regex to handle word separators
    const tokens = input.split(new RegExp(`(${wordSep}|${letterSep})`));
  
    return tokens
      .map((symbol) => {
        if (symbol === wordSep) return outputOpts.wordSeparator || " ";
        if (symbol === letterSep) return outputOpts.letterSeparator || "";
        const decoded = this.decodeMap[symbol] || "";
        if (casing === "upper") return decoded.toUpperCase();
        if (casing === "lower") return decoded.toLowerCase();
        return decoded; // original
      })
      .join("");
  }
}

export default SubstitutionCipher;
