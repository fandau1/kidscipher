import { useState } from 'react';
import React from 'react';
import SubstitutionCipherThreeWheel from '../SubstitutionCipherWheel/SubstitutionCipherThreeWheel';

const ShiftABCDCipherTool = () => {
  const [shiftSmall, setShiftSmall] = useState<number>(0);
  const [shiftMedium, setShiftMedium] = useState<number>(0);
  const [shiftLarge, setShiftLarge] = useState<number>(0);

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
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  const smallRotor: string[] = [
    'A',
    'A',
    'A',
    'A',
    'A',
    'A',
    'A',
    'A',
    'A',
    'B',
    'B',
    'B',
    'B',
    'B',
    'B',
    'B',
    'B',
    'B',
    'C',
    'C',
    'C',
    'C',
    'C',
    'C',
    'C',
    'C',
    'C',
    'D',
    'D',
    'D',
    'D',
    'D',
    'D',
    'D',
    'D',
    'D',
  ];

  const mediumRotor: string[] = [
    'A',
    'A',
    'A',
    'B',
    'B',
    'B',
    'C',
    'C',
    'C',
    'D',
    'D',
    'D',
    'A',
    'A',
    'A',
    'B',
    'B',
    'B',
    'C',
    'C',
    'C',
    'D',
    'D',
    'D',
    'A',
    'A',
    'A',
    'B',
    'B',
    'B',
    'C',
    'C',
    'C',
    'D',
    'D',
    'D',
  ];

  const largeRotor: string[] = [
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
    'A',
    'B',
    'C',
    'D',
  ];

  const shiftLargeRotor = largeRotor
    .slice(shiftLarge % largeRotor.length)
    .concat(largeRotor.slice(0, shiftLarge % largeRotor.length));

  const shiftMediumRotor = mediumRotor
    .slice(shiftMedium % mediumRotor.length)
    .concat(mediumRotor.slice(0, shiftMedium % mediumRotor.length));

  const shiftSmallRotor = smallRotor
    .slice(shiftSmall % smallRotor.length)
    .concat(smallRotor.slice(0, shiftSmall % smallRotor.length));

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
        <label
          htmlFor={uniqueId}
        >{`Shift Large: (0-${alphabet.length - 1})`}</label>
        <input
          id={uniqueId}
          type="number"
          value={shiftLarge}
          onChange={(e) => setShiftLarge(parseInt(e.target.value))}
          min="0"
          max={alphabet.length - 1}
        />

        <label
          htmlFor={uniqueId}
        >{`Shift Medium: (0-${alphabet.length - 1})`}</label>
        <input
          id={uniqueId}
          type="number"
          value={shiftMedium}
          onChange={(e) => setShiftMedium(parseInt(e.target.value))}
          min="0"
          max={alphabet.length - 1}
        />

        <label
          htmlFor={uniqueId}
        >{`Shift Small: (0-${alphabet.length - 1})`}</label>
        <input
          id={uniqueId}
          type="number"
          value={shiftSmall}
          onChange={(e) => setShiftSmall(parseInt(e.target.value))}
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
        <SubstitutionCipherThreeWheel
          plainAlphabet={alphabet}
          smallCircle={shiftSmallRotor}
          mediumCircle={shiftMediumRotor}
          largeCircle={shiftLargeRotor}
        />
      </div>
    </div>
  );
};

export default ShiftABCDCipherTool;
