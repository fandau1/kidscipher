import { useEffect, useState } from 'react';
import Cipher from '../../../dist/types/cipher/Cipher';
import styles from './CipherDemo.module.css';

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
    <div style={{ marginTop: '1.5rem' }}>
      {/* Mode switcher */}
      {/* Mode switcher - Translator style */}
      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${mode === 'encode' ? styles.modeButtonActive : ''}`}
          onClick={() => {
            if (mode === 'decode') handleSwitchMode();
          }}
        >
          Encode
        </button>
        <button
          className={styles.swapButton}
          onClick={handleSwitchMode}
          title="Swap encode/decode"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
          </svg>
        </button>
        <button
          className={`${styles.modeButton} ${mode === 'decode' ? styles.modeButtonActive : ''}`}
          onClick={() => {
            if (mode === 'encode') handleSwitchMode();
          }}
        >
          Decode
        </button>
      </div>

      {/* Input + Output */}
      <div className={styles.ioSection}>
        <div className={styles.ioPanel}>
          <label className={styles.ioLabel}>
            {mode === 'encode' ? 'Plain Text' : 'Cipher Text'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleTransform(e.target.value)}
            placeholder={
              mode === 'encode' ? 'Enter plain text...' : 'Enter cipher text...'
            }
            className={`${styles.ioTextarea} ${mode === 'decode' ? styles.cipherFont : ''}`}
          />
        </div>

        <div className={styles.ioPanel}>
          <label className={styles.ioLabel}>
            {mode === 'encode' ? 'Cipher Text' : 'Plain Text'}
          </label>
          <textarea
            value={output}
            placeholder="Result will appear here..."
            className={`${styles.ioTextarea} ${mode === 'encode' ? styles.cipherFont : ''}`}
          />
        </div>
      </div>
    </div>
  );
}
