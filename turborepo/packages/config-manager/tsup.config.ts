import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["."],
  clean: true,
  dts: true,
  format: ["cjs"],
  ...options,
}));