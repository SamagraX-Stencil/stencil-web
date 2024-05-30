import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entryPoints: ['./index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  esbuildOptions(options) {
    options.external = ['next/*']
  },
  ...options,
}))
