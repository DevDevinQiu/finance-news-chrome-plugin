import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.{ts,js}',
        '**/dist/**',
        '**/types/**',
        '**/*.d.ts',
      ],
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build'],
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/background': resolve(__dirname, 'src/background'),
      '@/content-script': resolve(__dirname, 'src/content-script'),
      '@/popup': resolve(__dirname, 'src/popup'),
      '@/shared': resolve(__dirname, 'src/shared'),
      '@/store': resolve(__dirname, 'src/store'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/constants': resolve(__dirname, 'src/constants'),
    },
  },
})
