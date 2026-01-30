import { MorseCodeCipher } from 'kidscipher';
import { Schema } from '../DynamicForm/DynamicForm';
import { withDefaultEncodeDecode } from '../DynamicForm/DefaultFormOptions';
import GenericCipherDemo from './base/GenericCipherDemo';

const schema: Schema = {
  constructorOptions: {
    type: 'object',
    fields: {
      alphabetVariant: {
        type: 'enum',
        options: ['intl', 'cs', 'de', 'es'],
        default: 'intl',
      },
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
      createCipherInstance={(options) =>
        new MorseCodeCipher({
          alphabetVariant: options.alphabetVariant,
          dotDashMapping: options.dotDashMapping,
        })
      }
    />
  );
}
