// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../css/index.module.css';

export default function Home() {
  return (
    <Layout
      title="Kidscipher"
      description="Educational and fun cipher library with custom font support"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">🔐 Kidscipher</h1>
          <p className="hero__subtitle">
            Playful ciphers for education, games & creativity
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg margin-right--sm"
              to="/cipher/intro"
            >
              Try Demo yourself 🚀
            </Link>
            <Link className="button button--primary button--lg" to="/api/intro">
              Get Started
            </Link>
            <Link
              className="button button--outline button--lg margin-left--sm"
              to="https://www.npmjs.com/package/kidscipher"
            >
              View on npm
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Features section */}
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h3>✨ Fun & Educational</h3>
                <p>
                  Explore classic and playful ciphers designed for learning,
                  puzzles, and games.
                </p>
              </div>
              <div className="col col--4">
                <h3>🎨 Custom Font</h3>
                <p>
                  The <strong>Kidscipher font</strong> lets you render encoded
                  text as unique symbols.
                </p>
              </div>
              <div className="col col--4">
                <h3>⚡ Lightweight</h3>
                <p>
                  Minimal dependencies, easy to use, and ready for integration
                  into any project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
