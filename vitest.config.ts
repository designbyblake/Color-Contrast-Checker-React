import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: '/src'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/components/**/index.ts',
        'src/hooks/**/index.ts'
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      all: true
    }
  }
});
