import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: './src/main.js',
  output: {
    file: './lib/haztrak.js',
    format: 'es',
    name: 'haztrak'
  },
  plugins: [commonjs(), nodeResolve(), json()]
}
