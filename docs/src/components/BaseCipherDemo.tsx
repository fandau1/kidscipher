import { useEffect, useState } from 'react';
import Cipher from '../../../dist/types/cipher/Cipher';

interface BaseDemoProps {
  title?: string;
  cipher: Cipher;
  cipherConfiguration?: Record<string, any>;
  encodeOptions?: Record<string, any>;
  decodeOptions?: Record<string, any>;
  defaultValue?: string;
  mode?: 'encode' | 'decode';
}

export default function BaseCipherDemo({
  cipher,
  cipherConfiguration,
  encodeOptions,
  decodeOptions,
  defaultValue = 'The quick brown fox jumps over the lazy dog',
}: BaseDemoProps) {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState(defaultValue);
  const [output, setOutput] = useState(() =>
    safeTransform(defaultValue, 'encode'),
  );

  // unified encode/decode logic
  function safeTransform(
    value: string,
    currentMode: 'encode' | 'decode',
  ): string {
    if (!value) return '';
    try {
      const config = cipherConfiguration || {};
      return currentMode === 'encode'
        ? cipher.encode(value, config, {
            caseSensitive: false,
            ...encodeOptions,
          })
        : cipher.decode(value, config, {
            caseSensitive: false,
            ...decodeOptions,
          });
    } catch {
      return '⚠️ Error during transformation';
    }
  }

  const handleTransform = (value: string) => {
    setInput(value);
    setOutput(safeTransform(value, mode));
  };

  useEffect(() => {
    // re-transform when options or configuration change
    setOutput(safeTransform(input, mode));
  }, [cipher, cipherConfiguration, encodeOptions, decodeOptions]);

  const handleSwitchMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    const newInput = output; // swap input/output when switching
    const newOutput = safeTransform(newInput, newMode);

    setMode(newMode);
    setInput(newInput);
    setOutput(newOutput);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Mode switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <span>
          <strong>Mode:</strong> {mode === 'encode' ? 'Encoding' : 'Decoding'}
        </span>
        <button
          onClick={handleSwitchMode}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#f5f5f5',
            fontWeight: 500,
          }}
        >
          🔁 Switch
        </button>
      </div>

      {/* Input + Output */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label>
            <strong>
              {mode === 'encode' ? 'Plain text:' : 'Cipher text:'}
            </strong>
          </label>
          <textarea
            value={input}
            onChange={(e) => handleTransform(e.target.value)}
            placeholder={
              mode === 'encode' ? 'Enter plain text' : 'Enter cipher text'
            }
            style={{
              width: '100%',
              height: '300px',
              marginTop: '0.5rem',
              fontSize: '20px',
              fontFamily:
                mode === 'encode' ? 'monospace' : 'Kidscipher, monospace',
              borderRadius: '8px',
              padding: '0.5rem',
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>
            <strong>Result:</strong>
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            style={{
              width: '100%',
              height: '300px',
              marginTop: '0.5rem',
              fontSize: '20px',
              fontFamily:
                mode === 'decode' ? 'monospace' : 'Kidscipher, monospace',
              backgroundColor: '#f3f3f3',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#333',
            }}
          />
        </div>
      </div>
    </div>
  );
}
