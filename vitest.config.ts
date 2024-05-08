import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'forks',
    hookTimeout: 200000,
    exclude: [...defaultExclude.filter(val => val !== '**/cypress/**'), '**/templates/**', '**/resources/**'],
  },
});
