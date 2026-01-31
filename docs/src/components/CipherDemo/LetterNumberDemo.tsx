import { LetterNumberCipher } from 'kidscipher';
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
    output: { letterSeparator: '-', wordSeparator: '---', casing: 'lower' },
  }),
  decode: withDefaultEncodeDecode({
    input: {
      letterSeparator: '-',
      wordSeparator: '---',
      caseSensitive: false,
      normalizeDiacritics: false,
    },
    output: { letterSeparator: '', wordSeparator: ' ', casing: 'lower' },
  }),
};

export default function FractionDemo() {
  return (
    <GenericCipherDemo
      schema={schema}
      createCipherInstance={() => new LetterNumberCipher()}
    />
  );
}
