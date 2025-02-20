import { defineConfig } from 'vitest/config';

defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json-summary'],
    },
  },
});
