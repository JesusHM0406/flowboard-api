import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        extends: './vitest.shared.ts',
        test: {
          name: 'unit',
          include: ['test/unit/**/*.spec.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'dist/**', '**/*.spec.ts', '**/*.dto.ts'],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
