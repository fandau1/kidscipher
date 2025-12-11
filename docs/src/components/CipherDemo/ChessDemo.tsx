import GenericCipherDemo from './base/GenericCipherDemo';
import { ChessCipher } from 'kidscipher';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import { Schema } from '../DynamicForm/DynamicForm';

const schema: Schema = {
  constructorOptions: {
    type: 'object',
    fields: {
      height: { type: 'number', default: 8 },
      width: { type: 'number', default: 8 },
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
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'lower' },
  }),
};

export default function ChessDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={(options) =>
        new ChessCipher(options.height, options.width)
      }
    />
  );
}
