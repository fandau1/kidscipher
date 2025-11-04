import { HebrewCrossCipher } from '../../../dist/index.esm';
import { Schema } from './ArgumentForm/DynamicForm';
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

export default function HebrewCrossDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new HebrewCrossCipher()}
    />
  );
}
