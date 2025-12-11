import GenericCipherDemo from './base/GenericCipherDemo';
import {
  ShiftRotorABCDCipher,
} from 'kidscipher';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import { Schema } from '../DynamicForm/DynamicForm';

const schema: Schema = {
  constructorOptions: {
    type: 'object',
    fields: {
      shifts: { type: 'arrayFixed', size: 3, default: ['0', '0', '0'] },
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
      createCipherInstance={(options) =>
        options.shifts
          ? new ShiftRotorABCDCipher(options.shifts.map(Number))
          : null
      }
    />
  );
}
