import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kidscipher',
  tagline:
    'Educational cipher library for encoding and decoding fun cryptographic messages',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/kidscipher/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fandau1', // Usually your GitHub org/user name.
  projectName: 'kidscipher', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // vypneme defaultní docs v preset classic
  presets: [
    [
      'classic',
      {
        docs: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // tady přidáme dva plugins = dvě samostatné dokumentace
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cipher',
        path: 'cipher', // složka ./cipher
        routeBasePath: 'cipher', // URL = /cipher
        sidebarPath: require.resolve('./sidebarsCipher.ts'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api', // složka ./api
        routeBasePath: 'api', // URL = /api
        sidebarPath: require.resolve('./sidebarsApi.ts'),
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo-kidscipher-square.png',
    metadata: [
      {
        name: 'keywords',
        content:
          'cipher, encryption, education, cryptography, javascript, typescript',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Kidscipher',
      logo: {
        alt: 'Kidscipher Logo',
        src: 'img/logo-kidscipher-square.png',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'cipherSidebar',
          docsPluginId: 'cipher',
          position: 'left',
          label: '🔐 Ciphers',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          docsPluginId: 'api',
          position: 'left',
          label: '📚 API',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/kidscipher',
          label: '📦 npm',
          position: 'right',
        },
        {
          href: 'https://github.com/fandau1/kidscipher',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/api/intro',
            },
            {
              label: 'Cipher Types',
              to: '/cipher/intro',
            },
            {
              label: 'Contributing',
              to: '/api/contribute',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/kidscipher',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/fandau1/kidscipher',
            },
            {
              label: 'License (MIT)',
              href: 'https://github.com/fandau1/kidscipher/blob/main/LICENSE',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Report Issues',
              href: 'https://github.com/fandau1/kidscipher/issues',
            },
            {
              label: 'Request Features',
              href: 'https://github.com/fandau1/kidscipher/issues/new',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kidscipher. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
