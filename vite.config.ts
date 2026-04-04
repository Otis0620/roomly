import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ tsDecorators: true }), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.spec.ts', '**/*.spec.tsx'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.tsx',
        'src/**/*.spec.ts',
        'src/**/routes.ts',
        'src/core/router/**',
        'src/core/store/**',
        'src/core/di/**',
        'src/**/*Types.ts',
        'src/**/*types.ts',
        'src/**/I*.ts',
        'src/**/hooks/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
