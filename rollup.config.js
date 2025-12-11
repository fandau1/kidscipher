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
  url({
    limit: 0,
    include: ['**/*.png', '**/*.ttf', '**/*.woff', '**/*.woff2'],
    fileName: '[name][extname]',
    destDir: 'dist/assets',
  }),
  postcss({
    inject: true, // inject CSS into JS bundle
    minimize: true,
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: false },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: false },
    ],
    plugins,
  },
  {
    input: 'src/font.ts',
    output: [
      { file: 'dist/font.cjs.js', format: 'cjs', sourcemap: false },
      { file: 'dist/font.esm.js', format: 'esm', sourcemap: false },
    ],
    plugins,
  },
];
