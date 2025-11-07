// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../css/index.module.css';

const FEATURES = [
  {
    emoji: '✨',
    title: 'Fun & Educational',
    description:
      'Explore classic and playful ciphers designed for learning, puzzles, and games. Perfect for educators and students.',
  },
  {
    emoji: '🎨',
    title: 'Custom Font Support',
    description:
      'The Kidscipher font lets you render encoded text as unique symbols, making your ciphers visually stunning.',
  },
  {
    emoji: '⚡',
    title: 'Lightweight & Fast',
    description:
      'Minimal dependencies, TypeScript support, and easy to integrate into any JavaScript or TypeScript project.',
  },
  {
    emoji: '🔒',
    title: 'Multiple Cipher Types',
    description:
      'Support for substitution, shift, cross, table, morse code, and many more cipher types with flexible options.',
  },
  {
    emoji: '🎯',
    title: 'Easy to Use API',
    description:
      'Simple and intuitive API design. Encode and decode messages with just a few lines of code.',
  },
  {
    emoji: '🌐',
    title: 'Browser & Node.js',
    description:
      'Works seamlessly in both browser and Node.js environments. Use it anywhere JavaScript runs.',
  },
];

const CIPHER_TYPES = [
  { name: '🔤 Morse Code', description: 'Classic dots and dashes' },
  { name: '📱 Mobile Cipher', description: 'Phone keypad encoding' },
  { name: '🕷️ Spider Cipher', description: 'Web-based symbol system' },
  { name: '🇨🇳 Chinese Cipher', description: 'Asian character style' },
  { name: '✝️ Cross Cipher', description: 'Multiple cross patterns' },
  { name: '🔢 Fraction Cipher', description: 'Mathematical fractions' },
  { name: '📊 Table Cipher', description: 'Grid-based encryption' },
  { name: '🔄 Shift Cipher', description: 'Caesar & rotor systems' },
];

export default function Home() {
  return (
    <Layout
      title="Kidscipher"
      description="Educational and fun cipher library with custom font support"
    >
      {/* Hero Section */}
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">🔐 Kidscipher</h1>
          <p className="hero__subtitle">
            Educational ciphers for learning, games & creativity
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/cipher/intro"
            >
              🚀 Try Interactive Demos
            </Link>
            <Link className="button button--primary button--lg" to="/api/intro">
              📚 Get Started
            </Link>
            <Link
              className="button button--outline button--lg"
              to="https://www.npmjs.com/package/kidscipher"
            >
              📦 View on npm
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section className={styles.features}>
          <div className="container">
            <h2>Why Choose Kidscipher?</h2>
            <div className="row">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="col col--4">
                  <div className={styles.featureCard}>
                    <h3>
                      <span style={{ fontSize: '1.8rem' }}>{feature.emoji}</span>{' '}
                      {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cipher Showcase Section */}
        <section className={styles.cipherShowcase}>
          <div className="container">
            <h2>Supported Cipher Types</h2>
            <p>
              Discover a wide variety of cipher systems, from classic
              cryptography to playful educational encodings.
            </p>
            <div className={styles.cipherGrid}>
              {CIPHER_TYPES.map((cipher, idx) => (
                <div key={idx} className={styles.cipherItem}>
                  <h4>{cipher.name}</h4>
                  <p>{cipher.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}


