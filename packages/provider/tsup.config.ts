import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entryPoints: ['./index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  esbuildOptions: (options) => {
    options.define = {
      global: 'window',
    }
    return options
  },
  ...options,
}))

// import { defineConfig } from 'tsup'

// export default defineConfig({
//   entryPoints: ['./index.ts'],
//   clean: true,
//   minify: true,
//   target: 'es5', // external: ["react"],
//   sourcemap: true,
//   dts: true,
//   format: ['esm', 'cjs'],
//   esbuildOptions(options) {
//     options.define = {
//       'process.env.NODE_ENV': JSON.stringify('production'),
//     }
//     options.banner = {
//       js: '"use client"',
//     }
//   },
//  esbuildOptions(options) {
//     options.external = ['next/*']
//   },
// })
