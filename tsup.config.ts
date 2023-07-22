import { defineConfig, type Options } from 'tsup'

const common: Options = {
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.build.json',
  outDir: 'dist',
  sourcemap: false,
  minify: true,
  replaceNodeEnv: true,
}

function getBuildMode(): Options {
  const mode = process.env.BUILD_MODE
  switch (mode) {
    case 'esm':
      return {
        format: ['esm'],
        dts: true,
      }
    case 'cjs':
      return {
        format: ['cjs'],
      }
    case 'iife':
      return {
        format: ['iife'],
        globalName: 'formulas',
      }
    default:
      throw new Error(`Invalid BUILD_MODE - ${mode}`)
  }
}

export default defineConfig({ ...common, ...getBuildMode() })
