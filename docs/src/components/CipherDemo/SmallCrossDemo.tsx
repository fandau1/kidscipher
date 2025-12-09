import { Schema } from '../DynamicForm/DynamicForm';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import GenericCipherDemo from './base/GenericCipherDemo';
import { SmallCrossCipher } from '../../../../dist/index.esm';

const schema: Schema = {
  encode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: ' ',
      caseSensitive: false,
      normalizeDiacritics: true,
    },
    output: { letterSeparator: '', wordSeparator: '  ', casing: 'upper' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '',
      wordSeparator: '  ',
      caseSensitive: false,
      normalizeDiacritics: false,
    },
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'upper' },
  }),
};

export default function SmallCrossDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new SmallCrossCipher()}
    />
  );
}
