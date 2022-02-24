import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/boot.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [resolve(), babel({ babelHelpers: 'bundled' }),cleanup()]
};