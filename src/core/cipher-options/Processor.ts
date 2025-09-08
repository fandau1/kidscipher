import { CasingOptions } from "./CipherOptions";

export type TextProcessor = (text: string) => string;

const ignoreCasingSensitive = (caseSensitive?: boolean): TextProcessor => {
  return (text: string) => (caseSensitive ? text : text.toUpperCase());
};

const casing = (casingOption: CasingOptions): TextProcessor => {
  return (text: string) => {
    switch (casingOption) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "original":
        return text;
      default:
        throw new Error(`Invalid output casing option: ${casingOption}`);
    }
  };
};

const Processor = {
  ignoreCasingSensitive,
  casing,
};

export default Processor;
