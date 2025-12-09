import React from 'react';

interface GlyphAlphabetRenderProps {
  map: Record<string, string>; // Object like { A: "AA", B: "BB" }
  fontFamily?: string;
  className?: string;
}

const GlyphAlphabetRender: React.FC<GlyphAlphabetRenderProps> = ({
  map,
  fontFamily = 'Kidscipher',
  className = '',
}) => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        console.log(`Copied: ${value}`);
      },
      (err) => {
        console.error('Failed to copy!', err);
      },
    );
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '1rem',
        width: '100%',
      }}
      className={className}
    >
      {Object.entries(map).map(([letter, glyph]) => (
        <button
          key={letter}
          onClick={() => handleCopy(glyph)}
          style={{
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            textAlign: 'center',
            background: 'white',
            transition: 'background 0.2s',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
          title={`Click to copy ${letter}`}
        >
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#666' }}>
            {letter}
          </div>
          <div style={{ fontFamily: fontFamily, fontSize: '2rem' }}>
            {glyph}
          </div>
        </button>
      ))}
    </div>
  );
};

export default GlyphAlphabetRender;
