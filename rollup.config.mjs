import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import dts from 'rollup-plugin-dts';
import pkg from "./package.json" assert { type: "json" };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    peerDepsExternal(),
    postcss({ extensions: ['.css'], inject: true, extract: false }),
    typescript({ tsconfig: "./tsconfig.json" }),
    copy({
      targets: [
        { src: './package.json', dest: './dist' }
      ]
    }),
    {
      input: 'dist/esm/types/index.d.ts',
      output: [{ file: 'dist/index.d.ts', format: 'esm' }],
      plugins: [dts()],
      external: [/\.css$/],
    },
  ],
  
  
};
