export default function SubstitutionCipherWheel({
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
  ],
  cipherAlphabet = [
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
    'A',
    'B',
    'C',
  ],
}) {
  const outerRadius = 180;
  const innerRadius = 130;
  const centerX = 200;
  const centerY = 200;
  const totalLetters = plainAlphabet.length;
  const anglePerLetter = 360 / totalLetters;

  const getLetterPosition = (index: number, radius: number) => {
    const angle = (index * anglePerLetter - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getPointOnCircle = (angleDegrees, radius) => {
    const angleRad = (angleDegrees - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

  const renderOuterCircle = () => {
    return cipherAlphabet.map((letter, index) => {
      const pos = getLetterPosition(index, outerRadius);
      const angle = index * anglePerLetter;

      return (
        <g key={`outer-${index}`}>
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fontWeight="bold"
            fill="#1a73e8"
            transform={`rotate(${angle}, ${pos.x}, ${pos.y})`}
          >
            {letter}
          </text>
        </g>
      );
    });
  };

  const renderInnerCircle = () => {
    return plainAlphabet.map((letter, index) => {
      const pos = getLetterPosition(index, innerRadius);
      const angle = index * anglePerLetter;

      return (
        <g key={`inner-${index}`}>
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="600"
            fill="#ea4335"
            transform={`rotate(${angle}, ${pos.x}, ${pos.y})`}
          >
            {letter}
          </text>
        </g>
      );
    });
  };

  const renderDividers = () => {
    return Array.from({ length: totalLetters }).map((_, index) => {
      const angle = index * anglePerLetter + anglePerLetter / 2;
      const innerPos = getPointOnCircle(angle, innerRadius - 25);
      const outerPos = getPointOnCircle(angle, outerRadius + 25);

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
        r={outerRadius + 23}
        fill="white"
        stroke="#1a73e8"
        strokeWidth="3"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius + 20}
        fill="white"
        stroke="#ea4335"
        strokeWidth="3"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius - 23}
        fill="white"
        stroke="#696969"
        strokeWidth="2"
      />

      {/* Divider lines */}
      {renderDividers()}

      {/* Outer circle letters (ciphertext) */}
      {renderOuterCircle()}

      {/* Inner circle letters (plaintext) */}
      {renderInnerCircle()}

      {/* Center point */}
      <circle cx={centerX} cy={centerY} r="8" fill="#666" />
      <circle cx={centerX} cy={centerY} r="4" fill="white" />
    </svg>
  );
}
