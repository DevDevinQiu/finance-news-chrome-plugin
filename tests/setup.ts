import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// Mock Chrome APIs
vi.stubGlobal('chrome', {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn(),
    },
  },
  alarms: {
    create: vi.fn(),
    onAlarm: vi.fn(),
    clearAll: vi.fn(),
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: vi.fn(),
  },
} as unknown as typeof chrome)

// Mock ResizeObserver
global.ResizeObserver = ResizeObserver
