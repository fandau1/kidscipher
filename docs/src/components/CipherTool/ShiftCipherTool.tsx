import { useState } from 'react';
import SubstitutionCipherWheel from '../SubstitutionCipherWheel/SubstitutionCipherWheel';
import React from 'react';

const ShiftCipherTool = () => {
  const [shift, setShift] = useState<number>(3);
  const alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const shifted_alphabet = alphabet
    .slice(shift % alphabet.length)
    .concat(alphabet.slice(0, shift % alphabet.length));

  const uniqueId = React.useId();

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px', padding: '1rem' }}>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <label htmlFor={uniqueId}>{`Shift (0-${alphabet.length - 1})`}</label>
        <input
          id={uniqueId}
          type="number"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value))}
          min="0"
          max={alphabet.length - 1}
        />
      </div>

      {/* Responsive container for the wheel */}
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto',
          aspectRatio: '1 / 1',
        }}
      >
        <SubstitutionCipherWheel
          plainAlphabet={alphabet}
          cipherAlphabet={shifted_alphabet}
        />
      </div>
    </div>
  );
};

export default ShiftCipherTool;
