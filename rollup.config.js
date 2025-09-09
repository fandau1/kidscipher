// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';

const plugins = [
  resolve(),
  commonjs(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        sourceMap: true,
        declarationDir: 'dist/types',
        rootDir: 'src',
      },
    },
    useTsconfigDeclarationDir: true,
    clean: true,
    exclude: ['**/test/**'],
  }),
  postcss({ inject: true }),
  url({
    limit: 0,
    include: ['**/*.png', '**/*.ttf', '**/*.woff', '**/*.woff2'],
    fileName: '[name][hash][extname]',
    destDir: 'dist/assets',
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
  {
    input: 'src/font.ts',
    output: [
      { file: 'dist/font.cjs.js', format: 'cjs', sourcemap: true },
      { file: 'dist/font.esm.js', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
];
