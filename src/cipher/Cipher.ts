import { CipherOptions } from '../core/cipher-options/CipherOptions';
import Processor from '../core/cipher-options/Processor';
import processingPipeline from '../core/cipher-options/ProcessorPipeline';

export type CipherConfigurationsRecord = Record<string, any>;

abstract class Cipher {
  abstract encodeToken(
    token: string,
    configuration?: CipherConfigurationsRecord,
  ): string;

  /**
   * Tokenize input using a dictionary of valid tokens.
   * Longest tokens win.
   */
  protected tokenize(input: string, tokens: string[]): string[] {
    const result: string[] = [];
    let i = 0;

    while (i < input.length) {
      let matched = false;

      for (const token of tokens) {
        if (input.startsWith(token, i)) {
          result.push(token);
          i += token.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        result.push(input[i]);
        i++;
      }
    }

    return result;
  }

  abstract getEncodeTokens(): string[];
  abstract getDecodeTokens(): string[];

  encode(
    input: string,
    configuration?: CipherConfigurationsRecord,
    opts?: CipherOptions,
  ): string {
    const {
      caseSensitive = false,
      normalizeDiacritics = true,
      letterSeparator: inputLetterSeparator = '',
      wordSeparator: inputWordSeparator = '///',
    } = opts?.input || {};

    const {
      casing = 'original',
      letterSeparator: outputLetterSeparator = '',
      wordSeparator: outputWordSeparator = ' ',
    } = opts?.output || {};

    const preprocessedInput = processingPipeline(input, [
      Processor.normalizeDiacritics(normalizeDiacritics),
    ]);

    // normalize input into words and letters
    const words = preprocessedInput.split(inputWordSeparator);

    const encodedWords = words.map((word) => {
      const normalizedWord = caseSensitive ? word : word.toUpperCase();

      // tokenize the word
      // eg. [".-", "-...", ...] or ["A", "B", "CH", ...]
      const tokens = inputLetterSeparator
        ? normalizedWord.split(inputLetterSeparator)
        : this.tokenize(normalizedWord, this.getEncodeTokens());

      // console.log('Tokenized letters:', tokens);

      return tokens
        .map((token) => {
          if (/\s/.test(token)) {
            return token;
          }

          let encoded = this.encodeToken(token, configuration);
          if (casing === 'upper') encoded = encoded.toUpperCase();
          if (casing === 'lower') encoded = encoded.toLowerCase();
          return encoded;
        })
        .join(outputLetterSeparator);
    });

    return encodedWords.join(outputWordSeparator);
  }

  abstract decodeToken(
    token: string,
    configuration?: CipherConfigurationsRecord,
  ): string;

  decode(
    input: string,
    configuration?: CipherConfigurationsRecord,
    opts?: CipherOptions,
  ): string {
    const {
      caseSensitive = false,
      normalizeDiacritics = false,
      letterSeparator: inputLetterSeparator = '',
      wordSeparator: inputWordSeparator = ' ',
    } = opts?.input || {};

    const {
      casing = 'original',
      letterSeparator: outputLetterSeparator = '',
      wordSeparator: outputWordSeparator = ' ',
    } = opts?.output || {};

    const preprocessedInput = processingPipeline(input, [
      Processor.normalizeDiacritics(normalizeDiacritics),
    ]);

    // split encoded text into words
    const words = preprocessedInput.split(inputWordSeparator);
    const decodedWords = words.map((word) => {
      const symbols = word.split(inputLetterSeparator);

      return symbols
        .map((symbol) => {
          if (/\s/.test(symbol)) {
            return symbol;
          }

          const c = caseSensitive ? symbol : symbol.toUpperCase();
          let decoded = this.decodeToken(c, configuration);

          if (casing === 'upper') decoded = decoded.toUpperCase();
          if (casing === 'lower') decoded = decoded.toLowerCase();
          return decoded;
        })
        .join(outputLetterSeparator);
    });

    return decodedWords.join(outputWordSeparator);
  }
}

export default Cipher;
