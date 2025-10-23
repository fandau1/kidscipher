import { FieldSchema, Schema } from './DynamicForm';

export type EncodeDecodeDefaultsValues = {
  input?: {
    letterSeparator?: string;
    wordSeparator?: string;
    caseSensitive?: boolean;
    normalizeDiacritics?: boolean;
  };
  output?: {
    letterSeparator?: string;
    wordSeparator?: string;
    casing?: 'upper' | 'lower' | 'original';
  };
};

/**
 * Base default encode schema
 */
export function withDefaultEncodeDecode(
  customDefault?: EncodeDecodeDefaultsValues,
): FieldSchema {
  return {
    type: 'object',
    fields: {
      input: {
        type: 'object',
        fields: {
          letterSeparator: {
            type: 'string',
            default: customDefault?.input?.letterSeparator ?? '',
          },
          wordSeparator: {
            type: 'string',
            default: customDefault?.input?.wordSeparator ?? ' ',
          },
          caseSensitive: {
            type: 'boolean',
            default: customDefault?.input?.caseSensitive ?? false,
          },
          normalizeDiacritics: {
            type: 'boolean',
            default: customDefault?.input?.normalizeDiacritics ?? false,
          },
        },
      },
      output: {
        type: 'object',
        fields: {
          letterSeparator: {
            type: 'string',
            default: customDefault?.output?.letterSeparator ?? '',
          },
          wordSeparator: {
            type: 'string',
            default: customDefault?.output?.wordSeparator ?? ' ',
          },
          casing: {
            type: 'enum',
            options: ['upper', 'lower', 'original'],
            default: customDefault?.output?.casing ?? 'upper',
          },
        },
      },
    },
  };
}
