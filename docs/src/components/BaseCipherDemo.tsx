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

  const [plain, setPlain] = useState(defaultValue);
  const [encoded, setEncoded] = useState(() => {
    return cipher.encode(defaultValue);
  });

  const handleEncode = (value: string) => {
    setPlain(value);

    setEncoded(cipher.encode(value, {}, { caseSensitive: false }));
  };

  const handleDecode = (value: string) => {
    setEncoded(value);
    setPlain(cipher.decode(value, {}, {}));
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <h3>{title}</h3>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label>
            <strong>Raw text:</strong>
          </label>
          <textarea
            value={plain}
            onChange={(e) => handleEncode(e.target.value)}
            placeholder="Input raw text"
            style={{
              width: '100%',
              height: '120px',
              marginTop: '0.5rem',
              fontSize: '22px',
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>
            <strong>Decoded text:</strong>
          </label>
          <textarea
            value={encoded}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="Input decoded text"
            style={{
              width: '100%',
              height: '120px',
              marginTop: '0.5rem',
              fontFamily: 'Kidscipher',
              fontSize: '22px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
