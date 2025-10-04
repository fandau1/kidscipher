import { useState } from 'react';
import Cipher from '../../../dist/types/cipher/Cipher';

interface BaseDemoProps {
  title?: string;
  Cipher: new () => Cipher;
  defaultValue?: string;
}

export default function BaseCipherDemo({
  title = 'Demo',
  Cipher,
  defaultValue = 'The quick brown fox jumps over the lazy dog',
}: BaseDemoProps) {
  const cipher = new Cipher();

  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState(defaultValue);
  const [output, setOutput] = useState(() => cipher.encode(defaultValue));

  const handleTransform = (value: string) => {
    setInput(value);

    try {
      const result =
        mode === 'encode'
          ? cipher.encode(value, {}, { caseSensitive: false })
          : cipher.decode(value, {}, { caseSensitive: false });
      setOutput(result);
    } catch {
      setOutput('⚠️ Error during transformation');
    }
  };

  const handleSwitchMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';

    // Swap input and output
    const newInput = output;

    try {
      const newOutput =
        newMode === 'encode'
          ? cipher.encode(newInput, {}, { caseSensitive: false })
          : cipher.decode(newInput, {}, { caseSensitive: false });

      setMode(newMode);
      setInput(newInput);
      setOutput(newOutput);
    } catch {
      setMode(newMode);
      setInput(newInput);
      setOutput('⚠️ Error during transformation');
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <h3>{title}</h3>

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
              height: '120px',
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
              height: '120px',
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
