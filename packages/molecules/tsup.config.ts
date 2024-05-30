import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entryPoints: ['./index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es5',
  swc: true,
  ...options,
}))
