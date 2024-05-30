import { defineConfig, type Options } from 'tsup'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'

export default defineConfig((options: Options) => ({
  entryPoints: ['./index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  nodeBuiltins: true,
  ...options,
  // esbuildPlugins: [
  //   polyfillNode({
  //     globals: {
  //       buffer: true,
  //     },
  //     polyfills: {
  //       buffer: true,
  //     },
  //   }),
  // ],
}))
