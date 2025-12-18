export default function SubstitutionCipherThreeWheel({
  plainAlphabet = [
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
  ],
  smallCircle = [
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
  ],
  mediumCircle = [
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
  ],
  largeCircle = [
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
  ],
}) {
  const outerRadius = 180;
  const innerOneRadius = 130;
  const innerTwoRadius = 80;
  const innerThreeRadius = 30;
  const centerX = 200;
  const centerY = 200;

  const filterSequentialDuplicates = (arr: string[]): string[] => {
    return arr.filter((item, index) => item !== arr[index - 1]);
  };

  const getLetterPosition = (
    index: number,
    radius: number,
    anglePerLetter: number,
  ) => {
    const angle =
      ((index + 1) * anglePerLetter + 180 - anglePerLetter / 2) *
      (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getPointOnCircle = (angleDegrees: number, radius: number) => {
    const angleRad = (angleDegrees - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

  const renderCircle = (alphabet: string[], radius: number, color: string) => {
    const anglePerLetter = 360 / alphabet.length;
    return alphabet.map((letter, index) => {
      const pos = getLetterPosition(index, radius, anglePerLetter);

      return (
        <g key={`outer-${index}`}>
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fontWeight="bold"
            fill={color}
            transform={`rotate(${pos.x}, ${pos.y})`}
          >
            {letter}
          </text>
        </g>
      );
    });
  };

  const renderDividers = (
    alphabet: string[],
    innerRadius: number,
    outerRadius: number,
  ) => {
    const anglePerLetter = 360 / alphabet.length;
    return Array.from({ length: alphabet.length }).map((_, index) => {
      const angle = index * anglePerLetter;
      const innerPos = getPointOnCircle(angle, innerRadius);
      const outerPos = getPointOnCircle(angle, outerRadius);

      return (
        <line
          key={`divider-${index}`}
          x1={innerPos.x}
          y1={innerPos.y}
          x2={outerPos.x}
          y2={outerPos.y}
          stroke="#a6a6a6"
          strokeWidth="1"
          opacity="0.5"
        />
      );
    });
  };

  const processedSmallCircle = filterSequentialDuplicates(smallCircle);
  const processedMediumCircle = filterSequentialDuplicates(mediumCircle);
  const processedLargeCircle = filterSequentialDuplicates(largeCircle);
  const processedPlainAlphabet = filterSequentialDuplicates(plainAlphabet);

  return (
    <svg
      viewBox="-5 -5 410 410"
      style={{
        width: '100%',
        height: '100%',
        userSelect: 'none',
        maxWidth: '450px',
        display: 'block',
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background circles */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius + 20}
        fill="white"
        stroke="#1a73e8"
        strokeWidth="3"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={innerOneRadius + 20}
        fill="white"
        stroke="#696969"
        strokeWidth="2"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={innerTwoRadius + 20}
        fill="white"
        stroke="#696969"
        strokeWidth="2"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={innerThreeRadius + 20}
        fill="white"
        stroke="#696969"
        strokeWidth="2"
      />

      {/* Divider lines */}

      {/* Small circle letters (plaintext) */}
      {renderCircle(processedSmallCircle, innerThreeRadius, '#ea4335')}
      {renderDividers(processedSmallCircle, 8, innerThreeRadius + 20)}

      {/* Medium circle letters (plaintext) */}
      {renderCircle(processedMediumCircle, innerTwoRadius, '#ea4335')}
      {renderDividers(
        processedMediumCircle,
        innerThreeRadius + 20,
        innerTwoRadius + 20,
      )}

      {/* Large circle letters (plaintext) */}
      {renderCircle(processedLargeCircle, innerOneRadius, '#ea4335')}
      {renderDividers(
        processedLargeCircle,
        innerTwoRadius + 20,
        innerOneRadius + 20,
      )}

      {/* Outer circle letters (ciphertext) */}
      {renderCircle(processedPlainAlphabet, outerRadius, '#1a73e8')}
      {renderDividers(
        processedPlainAlphabet,
        innerOneRadius + 20,
        outerRadius + 20,
      )}

      {/* Center point */}
      <circle cx={centerX} cy={centerY} r="8" fill="#666" />
      <circle cx={centerX} cy={centerY} r="4" fill="white" />
    </svg>
  );
}
