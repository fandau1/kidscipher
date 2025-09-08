export type CasingOptions = "upper" | "lower" | "original";

export type InputCipherOptions = {
  letterSeparator?: string = "";
  wordSeparator?: string = " / ";
  caseSensitive?: boolean = false;
};

export type OutputCipherOptions = {
  letterSeparator?: string = "/";
  wordSeparator?: string = " // ";
  casing?: CasingOptions = "upper";
};


export type CipherOptions = {
  input?: InputCipherOptions;
  output?: PostprocessCipherOptions;
}