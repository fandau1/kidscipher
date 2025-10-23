import GenericCipherDemo from './GenericCipherDemo';
import { ChessCipher, TableKeyFiveToFiveCipher } from '../../../dist/index.esm';
import { withDefaultEncodeDecode } from './ArgumentForm/DefaultFormOptions';
import { Schema } from './ArgumentForm/DynamicForm';

const schema: Schema = {
  constructorOptions: {
    type: 'object',
    fields: {
      horizontalKey: { type: 'array', default: ['0', '3', '5', '6', '8'] },
      verticalKey: { type: 'array', default: ['H', 'O', 'M', 'E', 'R'] },
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

export default function TableKeyFiveToFiveDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={(options) =>
        options.horizontalKey && options.verticalKey
          ? new TableKeyFiveToFiveCipher(
              options.horizontalKey,
              options.verticalKey,
            )
          : null
      }
    />
  );
}
