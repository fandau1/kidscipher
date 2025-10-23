import { useState, useMemo } from 'react';
import { MobileCipher, PolandCrossCipher } from '../../../dist/index.esm';
import BaseCipherDemo from './BaseCipherDemo';
import { Schema, DynamicForm } from './ArgumentForm/DynamicForm';
import { withDefaultEncodeDecode } from './ArgumentForm/DefaultFormOptions';
import GenericCipherDemo from './GenericCipherDemo';

const schema: Schema = {
  encode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: ' ',
      caseSensitive: false,
      normalizeDiacritics: true,
    },
    output: { letterSeparator: ' ', wordSeparator: ' 1 ', casing: 'upper' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: ' ',
      wordSeparator: ' 1 ',
      caseSensitive: false,
      normalizeDiacritics: false,
    },
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'upper' },
  }),
};

export default function MobileCipherDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new MobileCipher()}
    />
  );
}
