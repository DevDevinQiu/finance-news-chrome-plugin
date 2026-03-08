import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// Mock Chrome APIs
const mockStorage = {
  get: vi.fn((keys, callback) => {
    if (callback) callback({})
  }),
  set: vi.fn((data, callback) => {
    if (callback) callback()
  }),
  clear: vi.fn((callback) => {
    if (callback) callback()
  }),
}

vi.stubGlobal('chrome', {
  storage: {
    local: mockStorage,
  },
  alarms: {
    create: vi.fn(),
    onAlarm: vi.fn(),
    clearAll: vi.fn(),
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: vi.fn(),
    lastError: null,
  },
} as unknown as typeof chrome)

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
