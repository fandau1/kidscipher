import GenericCipherDemo from './base/GenericCipherDemo';
import { ShiftAlphabetCipher } from '../../../../dist/index.esm';
import { withDefaultEncodeDecode } from '../ArgumentForm/DefaultFormOptions';
import { Schema } from '../ArgumentForm/DynamicForm';

const schema: Schema = {
  constructorOptions: {
    type: 'object',
    fields: {
      shift: { type: 'number', default: 3 },
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
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'upper' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: ' ',
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
      createCipherInstance={(options) => new ShiftAlphabetCipher(options.shift)}
    />
  );
}
