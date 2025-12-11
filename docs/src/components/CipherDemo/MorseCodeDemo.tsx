import { MorseCodeCipher } from 'kidscipher';
import { Schema } from '../DynamicForm/DynamicForm';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import GenericCipherDemo from './base/GenericCipherDemo';

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
