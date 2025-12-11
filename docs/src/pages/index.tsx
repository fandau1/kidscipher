// src/pages/index.tsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../css/index.module.css';
import BaseCipherDemo from '../components/CipherDemo/base/BaseCipherDemo';
import {
  ChineseCipher,
  FractionCipher,
  MobileCipher,
  MorseCodeCipher,
  PolandCrossCipher,
  ShiftAlphabetCipher,
  SmallCrossCipher,
} from '../../../dist/index.esm';
import CodeBlock from '@theme/CodeBlock';
import fontTTF from '../../../dist/assets/Kidscipher.ttf';
import fontWOFF from '../../../dist/assets/Kidscipher.woff';
import fontWOFF2 from '../../../dist/assets/Kidscipher.woff2';

const DEMO_CIPHERS = [
  {
    id: 'cross_poland',
    name: 'Poland Cross',
    icon: '',
    cipher: new PolandCrossCipher(),
  },
  {
    id: 'morse',
    name: 'Morse Code',
    icon: '',
    cipher: new MorseCodeCipher(),
  },
  {
    id: 'caesar',
    name: 'Caesar',
    icon: '',
    cipher: new ShiftAlphabetCipher(3),
  },
  { id: 'chinese', name: 'Chinese', icon: '', cipher: new ChineseCipher() },
  { id: 'mobile', name: 'Mobile', icon: '', cipher: new MobileCipher() },
];
const CODE_EXAMPLE = `import { ShiftCipher, MorseCodeCipher } from 'kidscipher';

// Caesar Cipher with shift of 3
const caesar = new ShiftCipher(3);
const encoded = caesar.encode('Hello World');
console.log(encoded); // "Khoor Zruog"

// Morse Code
const morse = new MorseCodeCipher();
const secret = morse.encode('SOS');
console.log(secret); // "... --- ..."`;

const CIPHER_TYPES_LIST = [
  {
    category: 'Basic Ciphers',
    items: ['Shift', 'Morsecode', 'Mobile', 'Affine'],
  },
  {
    category: 'Cross symbol Ciphers',
    items: ['Poland', 'Small', 'Hebrew', 'Different'],
  },
  {
    category: 'Special Ciphers',
    items: ['Chinese', 'Fraction'],
  },
];

export default function Home() {
  const [selectedCipher, setSelectedCipher] = useState(DEMO_CIPHERS[0]);

  const appShowcase = () => {
    return (
      <div className={styles.demoContainer}>
        <div className={styles.cipherSelector}>
          {DEMO_CIPHERS.map((cipher) => (
            <button
              key={cipher.id}
              className={clsx(
                styles.cipherButton,
                selectedCipher.id === cipher.id && styles.cipherButtonActive,
              )}
              onClick={() => setSelectedCipher(cipher)}
            >
              <span className={styles.cipherIcon}>{cipher.icon}</span>
              <span className={styles.cipherName}>{cipher.name}</span>
            </button>
          ))}
        </div>
        <BaseCipherDemo cipher={selectedCipher.cipher} />
      </div>
    );
  };

  return (
    <Layout
      title="Kidscipher"
      description="Educational and fun cipher library with custom font support"
    >
      {/* Hero Section */}
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Kidscipher</h1>
          <p className="hero__subtitle">
            Educational ciphers for learning, games & creativity
          </p>
          {appShowcase()}
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/cipher/intro"
            >
              🔍 Explore more Ciphers
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/api/intro"
            >
              🚀 Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Section 1: Easy to Use API */}
        <section className={styles.apiSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>🎯 Easy to Use API</h2>
              <p className={styles.sectionSubtitle}>
                Simple, intuitive, and powerful. Zero dependencies, pure
                TypeScript.
              </p>
            </div>

            <div className={styles.apiContent}>
              <div className={styles.apiFeatures}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>📦</div>
                  <h3>Zero Dependencies</h3>
                  <p>
                    Lightweight and efficient with no external dependencies. The
                    entire library is self-contained, making it perfect for
                    projects where bundle size matters.
                  </p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>⚡</div>
                  <h3>TypeScript First</h3>
                  <p>
                    Built with TypeScript for excellent IDE support,
                    autocomplete, and type safety. Catch errors before runtime.
                  </p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>🌐</div>
                  <h3>Universal</h3>
                  <p>
                    Works seamlessly in browsers, Node.js, and modern
                    frameworks. One library, every JavaScript environment.
                  </p>
                </div>
              </div>

              <div className={styles.codeShowcase}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeDot}></span>
                  <span className={styles.codeDot}></span>
                  <span className={styles.codeDot}></span>
                  <span className={styles.codeTitle}>example.ts</span>
                </div>
                <CodeBlock language="typescript">{CODE_EXAMPLE}</CodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Custom Font Support */}
        <section className={styles.fontSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>🎨 Custom Font Support</h2>
              <p className={styles.sectionSubtitle}>
                Transform your ciphers into stunning visual symbols with the
                Kidscipher font family.
              </p>
            </div>

            <div className={styles.fontDownloads}>
              <a
                href={fontTTF}
                download="Kidscipher.ttf"
                className={styles.fontDownloadButton}
              >
                Download TTF
              </a>
              <a
                href={fontWOFF}
                download="Kidscipher.woff"
                className={styles.fontDownloadButton}
              >
                Download WOFF
              </a>
              <a
                href={fontWOFF2}
                download="Kidscipher.woff2"
                className={styles.fontDownloadButton}
              >
                Download WOFF2
              </a>
            </div>

            <div className={styles.fontShowcase}>
              <p className={styles.fontDescription}>
                The Kidscipher font collection renders encoded text as unique,
                beautiful symbols. Perfect for creating puzzles, escape rooms,
                educational materials, or adding mystery to your designs.
              </p>

              <div className={styles.fontExamples}>
                <div className={styles.fontExample}>
                  <div className={styles.fontLabel}>Poland Cross Cipher</div>
                  <div
                    className={styles.fontDisplay}
                    style={{ fontFamily: 'kidscipher' }}
                  >
                    {new PolandCrossCipher().encode(
                      'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                    )}
                  </div>
                </div>
                <div className={styles.fontExample}>
                  <div className={styles.fontLabel}>Small Cross Cipher</div>
                  <div
                    className={styles.fontDisplay}
                    style={{ fontFamily: 'kidscipher' }}
                  >
                    {new SmallCrossCipher().encode(
                      'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                    )}
                  </div>
                </div>
                <div className={styles.fontExample}>
                  <div className={styles.fontLabel}>Chinese Cipher</div>
                  <div
                    className={styles.fontDisplay}
                    style={{ fontFamily: 'kidscipher' }}
                  >
                    {new ChineseCipher().encode(
                      'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                    )}
                  </div>
                </div>
                <div className={styles.fontExample}>
                  <div className={styles.fontLabel}>Fraction Cipher</div>
                  <div
                    className={styles.fontDisplay}
                    style={{ fontFamily: 'kidscipher', fontSize: '2rem' }}
                  >
                    {new FractionCipher().encode(
                      'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Multiple Cipher Types */}
        <section className={styles.cipherTypesSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>🔒 Multiple Cipher Types</h2>
              <p className={styles.sectionSubtitle}>
                Support for substitution, shift, cross, table, morse code, and
                many more cipher types with flexible options.
              </p>
            </div>

            <div className={styles.cipherTypesGrid}>
              {CIPHER_TYPES_LIST.map((group, idx) => (
                <div key={idx} className={styles.cipherTypeCard}>
                  <h3 className={styles.cipherTypeCategory}>
                    {group.category}
                  </h3>
                  <ul className={styles.cipherTypeList}>
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.cipherTypesFooter}>
              <p>
                Each cipher comes with extensive configuration options, allowing
                you to customize behavior, handle edge cases, and create unique
                encoding schemes.
              </p>
              <Link
                className="button button--primary button--lg"
                to="/cipher/intro"
              >
                Explore All Ciphers →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
