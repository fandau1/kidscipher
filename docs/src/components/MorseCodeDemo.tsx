import { useState, useMemo } from 'react';
import { MorseCodeCipher, ShiftAlphabetCipher } from '../../../dist/index.esm';
import BaseCipherDemo from './BaseCipherDemo';
import { Schema, DynamicForm } from './ArgumentForm/DynamicForm';
import { withDefaultEncodeDecode } from './ArgumentForm/DefaultFormOptions';
import GenericCipherDemo from './GenericCipherDemo';

const schema: Schema = {
  cipher: {
    type: 'object',
    fields: {
      dotDashMapping: {
        type: 'object',
        fields: {
          dot: { type: 'string', default: '.' },
          dash: { type: 'string', default: '-' },
        },
      },
    },
  },
  encode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: ' ',
      caseSensitive: false,
      normalizeDiacritics: true,
    },
    output: { letterSeparator: '/', wordSeparator: '///', casing: 'upper' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '/',
      wordSeparator: '///',
      caseSensitive: false,
      normalizeDiacritics: false,
    },
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'upper' },
  }),
};

export default function MorseCodeDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new MorseCodeCipher()}
    />
  );
}
