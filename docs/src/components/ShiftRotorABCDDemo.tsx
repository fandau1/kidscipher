import GenericCipherDemo from './GenericCipherDemo';
import {
  ShiftAlphabetCipher,
  ShiftRotorABCDCipher,
} from '../../../dist/index.esm';
import { withDefaultEncodeDecode } from './ArgumentForm/DefaultFormOptions';
import { Schema } from './ArgumentForm/DynamicForm';

const schema: Schema = {
  cipher: {
    type: 'object',
    fields: {
      shifts: { type: 'array', default: ['0', '0', '0'] },
    },
    default: {},
  },
  encode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: ' ',
      caseSensitive: false,
      normalizeDiacritics: true,
    },
    output: { letterSeparator: ' ', wordSeparator: ' | ', casing: 'upper' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: ' ',
      wordSeparator: ' | ',
      caseSensitive: false,
      normalizeDiacritics: false,
    },
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'upper' },
  }),
};

export default function ShiftAlphabetDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new ShiftRotorABCDCipher()}
    />
  );
}
