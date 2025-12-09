import React, { useEffect, useState, useRef } from 'react';
import { ArrayField } from './FormField/ArrayField';
import { ArrayFixedField } from './FormField/ArrayFixedField';
import { EnumField } from './FormField/EnumField';
import { NumberField } from './FormField/NumberField';
import { StringField } from './FormField/StringField';
import { BooleanField } from './FormField/BooleanField';
import styles from './DynamicForm.module.css';

export type FieldSchema =
  | { type: 'string'; default?: string }
  | { type: 'number'; min?: number; max?: number; default?: number }
  | { type: 'enum'; options: string[]; default?: string }
  | { type: 'array'; default?: string[] }
  | { type: 'arrayFixed'; size: number; default?: string[] }
  | { type: 'boolean'; default?: boolean }
  | {
      type: 'object';
      fields: Record<string, FieldSchema>;
      default?: Record<string, any>;
    };

export type Schema = Record<string, FieldSchema>;

interface DynamicFormProps {
  schema: Schema;
  path?: string;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  path = '',
  values: externalValues,
  onChange,
}) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const initialized = useRef(false);

  const getDefaultValue = (field: FieldSchema) => {
    if ('default' in field && field.default !== undefined) return field.default;
    switch (field.type) {
      case 'string':
        return '';
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'array':
        return [];
      case 'arrayFixed':
        return Array(field.size).fill('');
      case 'enum':
        return field.options?.[0] ?? '';
      case 'object':
        return {};
      default:
        return '';
    }
  };

  const fillDefaults = (schema: Schema, target: Record<string, any> = {}) => {
    const filled = { ...target };
    for (const [key, field] of Object.entries(schema)) {
      if (field.type === 'object') {
        filled[key] = fillDefaults(field.fields, filled[key] || {});
      } else if (!(key in filled)) {
        filled[key] = getDefaultValue(field);
      }
    }
    return filled;
  };

  // Initialize once
  useEffect(() => {
    if (!initialized.current) {
      const defaults = fillDefaults(schema, externalValues || {});
      setValues(defaults);
      initialized.current = true;
      onChange?.(defaults);
    }
  }, [schema]);

  // Sync from parent only when parent provides new non-empty values
  useEffect(() => {
    if (
      initialized.current &&
      externalValues &&
      Object.keys(externalValues).length > 0
    ) {
      setValues((prev) => ({ ...prev, ...externalValues }));
    }
  }, [externalValues]);

  const handleChange = (key: string, value: any) => {
    setValues((prev) => {
      const newValues = { ...prev, [key]: value };
      onChange?.(newValues);
      return newValues;
    });
  };

  const renderField = (key: string, field: FieldSchema) => {
    const value = values[key];

    switch (field.type) {
      case 'string':
        return (
          <StringField
            key={key}
            label={key}
            value={value ?? ''}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'number':
        return (
          <NumberField
            key={key}
            label={key}
            value={value ?? 0}
            min={field.min}
            max={field.max}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'boolean':
        return (
          <BooleanField
            key={key}
            label={key}
            value={!!value}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'enum':
        return (
          <EnumField
            key={key}
            label={key}
            value={value ?? field.options?.[0] ?? ''}
            options={field.options}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'array':
        return (
          <ArrayField
            key={key}
            label={key}
            values={Array.isArray(value) ? value : []}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'arrayFixed':
        return (
          <ArrayFixedField
            key={key}
            label={key}
            values={Array.isArray(value) ? value : []}
            size={field.size}
            onChange={(v) => handleChange(key, v)}
          />
        );
      case 'object':
        return (
          <div
            key={key}
            className={styles.formSection}
            style={{ marginTop: '1rem' }}
          >
            <h4 className={styles.subsectionTitle}>{key}</h4>
            <DynamicForm
              schema={field.fields}
              values={value ?? {}}
              onChange={(v) => handleChange(key, v)}
            />
          </div>
        );
    }
  };

  return (
    <div className={styles.formGrid}>
      {Object.entries(schema).map(([key, field]) => renderField(key, field))}
    </div>
  );
};
