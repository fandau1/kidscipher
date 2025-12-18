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

  const getLetterPosition = (
    index: number,
    radius: number,
    anglePerLetter: number,
  ) => {
    const angle = (index * anglePerLetter - 180) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getPointOnCircle = (angleDegrees: number, radius: number) => {
    const angleRad = (angleDegrees - 180) * (Math.PI / 180);
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
      {renderCircle(plainAlphabet, outerRadius, '#1a73e8')}

      {/* Inner circle letters (plaintext) */}
      {renderCircle(cipherAlphabet, innerRadius, '#ea4335')}

      {/* Center point */}
      <circle cx={centerX} cy={centerY} r="8" fill="#666" />
      <circle cx={centerX} cy={centerY} r="4" fill="white" />
    </svg>
  );
}
