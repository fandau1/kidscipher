import React, { useMemo, useState } from 'react';
import { MorseCodeCipher } from 'kidscipher';

// Human-friendly metadata (small, stable)
const ALPHABET_META = {
  intl: {
    name: 'International (ITU) Morse [intl]',
    description: 'Standard international Morse code (A–Z, 0–9).',
  },
  cs: {
    name: 'Czech / Slovak [cs]',
    description: 'International Morse with the special digraph CH.',
  },
  de: {
    name: 'German [de]',
    description: 'Adds umlauts and ß.',
  },
  es: {
    name: 'Spanish [es]',
    description: 'Adds Ñ.',
  },
};

const DOT = '●';
const DASH = '▬';

function renderMorse(code) {
  return code
    .replace(/\./g, DOT)
    .replace(/-/g, DASH)
    .split('')
    .map((c, i) => (
      <span key={i} style={{ marginRight: 2 }}>
        {c}
      </span>
    ));
}

function AlphabetShowcase({ alphabetKey }) {
  const alphabet = MorseCodeCipher.ALPHABETS[alphabetKey];

  const entries = useMemo(() => {
    return Object.entries(alphabet).sort(([a], [b]) => a.localeCompare(b));
  }, [alphabet]);

  const extras = useMemo(() => {
    if (alphabetKey === 'intl') return [];
    const base = MorseCodeCipher.ALPHABETS.intl;
    return Object.keys(alphabet).filter((k) => !(k in base));
  }, [alphabetKey, alphabet]);

  return (
    <div className="card shadow--md">
      <div className="card__header">
        <h3>{ALPHABET_META[alphabetKey].name}</h3>
      </div>

      <div className="card__body">
        <p>{ALPHABET_META[alphabetKey].description}</p>

        <p>
          <strong>Extra symbols:</strong>{' '}
          {extras.length > 0 ? extras.join(', ') : 'none'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: '0.75rem',
            marginTop: '1rem',
          }}
        >
          {entries.map(([char, morse]) => (
            <div
              key={char}
              className="card shadow--sm"
              style={{ padding: '0.5rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{char}</div>
              <div
                style={{
                  fontFamily: 'monospace',
                  marginTop: 4,
                  fontSize: '0.9rem',
                }}
              >
                {renderMorse(morse)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MorseAlphabetGallery() {
  const alphabetKeys = Object.keys(MorseCodeCipher.ALPHABETS);
  const [selected, setSelected] = useState(alphabetKeys[0]);

  return (
    <section className="container margin-vert--lg">
      <div style={{ maxWidth: 360, marginBottom: '1rem' }}>
        <label className="margin-bottom--xs" htmlFor="alphabet-select">
          Alphabet variant
        </label>
        <select
          id="alphabet-select"
          className="select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {alphabetKeys.map((key) => (
            <option key={key} value={key}>
              {ALPHABET_META[key]?.name ?? key}
            </option>
          ))}
        </select>
      </div>

      <AlphabetShowcase alphabetKey={selected} />
    </section>
  );
}
