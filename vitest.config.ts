import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    include: ['**/*.vitest.ts'],
    poolOptions: {
      workers: {
        main: './tests/fixtures/cfworker.ts',
        miniflare: {
          compatibilityDate: '2024-07-25',
          compatibilityFlags: ['nodejs_compat']
        }
      },
    },
  }
})
