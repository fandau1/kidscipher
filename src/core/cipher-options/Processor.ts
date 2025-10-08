import { CasingOptions } from './CipherOptions';

export type TextProcessor = (text: string) => string;

const ignoreCasingSensitive = (caseSensitive?: boolean): TextProcessor => {
  return (text: string) => (caseSensitive ? text : text.toUpperCase());
};

const casing = (casingOption: CasingOptions): TextProcessor => {
  return (text: string) => {
    switch (casingOption) {
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'original':
        return text;
      default:
        throw new Error(`Invalid output casing option: ${casingOption}`);
    }
  };
};

export const normalizeDiacritics = (normalize: boolean): TextProcessor => {
  return (text: string): string => {
    return normalize
      ? text
          // normalize Unicode chars (etc. "é" → "e" + "´")
          .normalize('NFD')
          // remove diacritic symbols
          .replace(/[\u0300-\u036f]/g, '')
          // exceptions which are normally not normalized
          .replace(/ß/g, 'ss')
          .replace(/ø/g, 'o')
          .replace(/Ø/g, 'O')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .replace(/ł/g, 'l')
          .replace(/Ł/g, 'L')
          .replace(/æ/g, 'ae')
          .replace(/Æ/g, 'AE')
          .replace(/œ/g, 'oe')
          .replace(/Œ/g, 'OE')
          .replace(/ð/g, 'd')
          .replace(/Ð/g, 'D')
          .replace(/þ/g, 'th')
          .replace(/Þ/g, 'Th')
          .replace(/ñ/g, 'n')
          .replace(/Ñ/g, 'N')
      : text;
  };
};

const Processor = {
  ignoreCasingSensitive,
  casing,
  normalizeDiacritics,
};

export default Processor;
