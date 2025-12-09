import { useState, useMemo } from 'react';
import BaseCipherDemo from './BaseCipherDemo';
import { Schema, DynamicForm } from '../../ArgumentForm/DynamicForm';
import { Cipher } from '../../../../../dist/types';
import styles from './CipherDemo.module.css';

type GenericCipherDemoProps = {
  schema: Schema;
  createCipherInstance: (constructorConfig: Record<string, any>) => Cipher;
  title?: string;
};

export default function GenericCipherDemo({
  schema,
  createCipherInstance,
  title = 'Demo',
}: GenericCipherDemoProps) {
  // Safe fallback: empty object if constructorOptions is undefined
  const constructorFields =
    schema.constructorOptions?.type === 'object'
      ? schema.constructorOptions.fields
      : {};

  const cipherFields =
    schema.cipher?.type === 'object' ? schema.cipher.fields : {};
  const encodeFields =
    schema.encode?.type === 'object' ? schema.encode.fields : {};
  const decodeFields =
    schema.decode?.type === 'object' ? schema.decode.fields : {};

  const [constructorConfig, setConstructorConfig] = useState<
    Record<string, any>
  >({});
  const [cipherConfiguration, setCipherConfiguration] = useState<
    Record<string, any>
  >({});
  const [encodeOptions, setEncodeOptions] = useState<Record<string, any>>({});
  const [decodeOptions, setDecodeOptions] = useState<Record<string, any>>({});

  const cipherInstance = useMemo(() => {
    return createCipherInstance(constructorConfig || {});
  }, [constructorConfig, createCipherInstance]);

  return (
    <div className={styles.demoContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      {Object.keys(constructorFields).length > 0 && (
        <div className={styles.formSection}>
          <h3 className={styles.subsectionTitle}>Constructor Options</h3>
          <DynamicForm
            schema={constructorFields}
            values={constructorConfig}
            onChange={setConstructorConfig}
          />
        </div>
      )}

      {Object.keys(cipherFields).length > 0 && (
        <div className={styles.formSection}>
          <h3 className={styles.subsectionTitle}>Configuration</h3>
          <DynamicForm
            schema={cipherFields}
            values={cipherConfiguration}
            onChange={setCipherConfiguration}
          />
        </div>
      )}

      <div className={styles.optionsGrid}>
        <div className={styles.optionsPanel}>
          <h4 className={styles.optionsTitle}>Encode Options</h4>
          <DynamicForm
            schema={encodeFields}
            values={encodeOptions}
            onChange={setEncodeOptions}
          />
        </div>

        <div className={styles.optionsPanel}>
          <h4 className={styles.optionsTitle}>Decode Options</h4>
          <DynamicForm
            schema={decodeFields}
            values={decodeOptions}
            onChange={setDecodeOptions}
          />
        </div>
      </div>

      {cipherInstance && (
        <BaseCipherDemo
          cipher={cipherInstance}
          cipherConfiguration={cipherConfiguration}
          encodeOptions={encodeOptions}
          decodeOptions={decodeOptions}
          defaultValue="The quick brown fox jumps over the lazy dog"
        />
      )}
    </div>
  );
}
