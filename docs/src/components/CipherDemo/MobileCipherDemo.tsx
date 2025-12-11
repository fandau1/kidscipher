import { MobileCipher } from 'kidscipher';
import { Schema } from '../DynamicForm/DynamicForm';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import GenericCipherDemo from './base/GenericCipherDemo';

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
