import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" with { type: "json" };
import url from "@rollup/plugin-url";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss(),
    url({
      limit: 0,                        // Always copy files instead of embedding them as base64
      include: ["**/*.png" , "**/*.ttf", "**/*.woff", "**/*.woff2"],           // Include these file types
      fileName: '[name][hash][extname]', // output file name
      destDir: "dist/assets",          // Destination folder for copied assets
    }),
  ],
};
