import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kidscipher Docs',
  tagline:
    'Kidscipher is an js library for encoding and decoding educational and fun ciphers.',
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
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Kidscipher',
      logo: {
        alt: 'Kidscipher Logo',
        src: 'img/logo-kidscipher-square.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'cipherSidebar',
          docsPluginId: 'cipher',
          position: 'left',
          label: 'Cipher',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          docsPluginId: 'api',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/fandau1/kidscipher',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        /*
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        */
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kidscipher`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
