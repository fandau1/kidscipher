import { useState, useMemo } from 'react';
import BaseCipherDemo from './BaseCipherDemo';
import { Schema, DynamicForm } from './ArgumentForm/DynamicForm';
import { Cipher } from '../../../dist/types';

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
    <div>
      <h2>{title}</h2>

      {Object.keys(constructorFields).length > 0 && (
        <>
          <h3>Constructor options</h3>
          <div style={{ marginBottom: '1rem' }}>
            <DynamicForm
              schema={constructorFields}
              values={constructorConfig}
              onChange={setConstructorConfig}
            />
          </div>
        </>
      )}

      {Object.keys(cipherFields).length > 0 && (
        <>
          <h3>Configuration</h3>
          <div style={{ marginBottom: '1rem' }}>
            <DynamicForm
              schema={cipherFields}
              values={cipherConfiguration}
              onChange={setCipherConfiguration}
            />
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h4>Encode Options</h4>
          <DynamicForm
            schema={encodeFields}
            values={encodeOptions}
            onChange={setEncodeOptions}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h4>Decode Options</h4>
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
