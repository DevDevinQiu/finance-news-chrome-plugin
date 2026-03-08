# AI金融信息推送Chrome插件 - 测试实施计划

> 文档创建日期: 2026-03-06
> 负责人: 测试开发工程师 (finance-news-test)
> 预计完成时间: 2-3天

---

## 一、概述

本文档详细描述了AI金融信息推送Chrome插件的测试实施计划，包括测试环境配置、测试用例编写、测试覆盖率要求和持续集成配置。

### 测试目标

- 确保核心功能稳定可靠
- 代码覆盖率不低于 80%
- 关键路径 100% E2E 覆盖
- 支持快速回归测试

---

## 二、测试环境配置

### 2.1 Vitest 配置

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/vitest.config.ts`

```typescript
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
```

### 2.2 Playwright 配置

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

### 2.3 测试环境初始化

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/setup.ts`

```typescript
import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock chrome API
const mockChrome = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    getURL: vi.fn((path: string) => `chrome-extension://test/${path}`),
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn(),
    },
  },
  alarms: {
    create: vi.fn(),
    clear: vi.fn(),
    clearAll: vi.fn(),
    onAlarm: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  tabs: {
    sendMessage: vi.fn(),
  },
}

global.chrome = mockChrome as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any
```

---

## 三、单元测试

### 3.1 工具函数测试

#### 3.1.1 时间处理工具测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/unit/utils/time.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { formatTime, getTodayStart, isToday } from '@/utils/time'

describe('Time Utils', () => {
  describe('formatTime', () => {
    it('should format date string correctly', () => {
      const date = '2026-03-06T10:30:00'
      expect(formatTime(date)).toBe('10:30')
    })

    it('should format Date object correctly', () => {
      const date = new Date('2026-03-06T14:30:00')
      expect(formatTime(date)).toBe('14:30')
    })

    it('should handle invalid date', () => {
      expect(formatTime('invalid')).toBe('--:--')
    })
  })

  describe('getTodayStart', () => {
    it('should return start of today', () => {
      const todayStart = getTodayStart()
      const now = new Date()
      const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      expect(todayStart.toISOString().split('T')[0]).toBe(expected.toISOString().split('T')[0])
    })
  })

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date()
      expect(isToday(today.toISOString())).toBe(true)
    })

    it('should return false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(isToday(yesterday.toISOString())).toBe(false)
    })
  })
})
```

#### 3.1.2 存储工具测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/unit/utils/storage.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storage, StorageKeys } from '@/utils/storage'

describe('Storage Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('get', () => {
    it('should get value from storage', async () => {
      const mockData = { key: 'value' }
      vi.mocked(chrome.storage.local.get).mockImplementation((keys, callback) => {
        if (callback) callback(mockData)
        return Promise.resolve(mockData)
      })

      const result = await storage.get(StorageKeys.SETTINGS)
      expect(result).toEqual(mockData)
    })

    it('should return default value when not found', async () => {
      vi.mocked(chrome.storage.local.get).mockResolvedValue({})

      const result = await storage.get(StorageKeys.SETTINGS, { default: true })
      expect(result).toEqual({ default: true })
    })
  })

  describe('set', () => {
    it('should set value to storage', async () => {
      const data = { key: 'value' }
      vi.mocked(chrome.storage.local.set).mockResolvedValue()

      await storage.set(StorageKeys.SETTINGS, data)
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ [StorageKeys.SETTINGS]: data })
    })
  })
})
```

### 3.2 本地规则引擎测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/unit/background/categoryRules.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { categorizeNews } from '@/background/utils/categoryRules'

describe('Category Rules', () => {
  it('should categorize finance news correctly', () => {
    const news = {
      title: '股市今日大涨，投资者信心提升',
      content: '经济数据显示...',
    }
    expect(categorizeNews(news)).toBe('财经')
  })

  it('should categorize domestic politics news correctly', () => {
    const news = {
      title: '政府发布新的经济政策',
      content: '两会期间...',
    }
    expect(categorizeNews(news)).toBe('国内政治')
  })

  it('should categorize international news correctly', () => {
    const news = {
      title: '美国对华实施新制裁',
      content: '中美关系...',
    }
    expect(categorizeNews(news)).toBe('国际')
  })

  it('should return uncategorized for unknown content', () => {
    const news = {
      title: '科技新闻：新手机发布',
      content: '产品介绍...',
    }
    expect(categorizeNews(news)).toBe('未分类')
  })
})
```

### 3.3 AI响应解析测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/unit/background/aiResponseParser.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { parseAIResponse, validatePrediction } from '@/background/ai/responseParser'

describe('AI Response Parser', () => {
  describe('parseAIResponse', () => {
    it('should parse valid JSON response', () => {
      const response = JSON.stringify({
        result: '看涨',
        confidence: 0.75,
        reason: '市场情绪积极'
      })
      const parsed = parseAIResponse(response)
      expect(parsed).toEqual({
        result: '看涨',
        confidence: 0.75,
        reason: '市场情绪积极'
      })
    })

    it('should handle response with markdown code blocks', () => {
      const response = '```json\n{"result": "看跌", "confidence": 0.6, "reason": "测试"}\n```'
      const parsed = parseAIResponse(response)
      expect(parsed.result).toBe('看跌')
    })

    it('should throw error for invalid JSON', () => {
      const response = 'invalid json'
      expect(() => parseAIResponse(response)).toThrow()
    })
  })

  describe('validatePrediction', () => {
    it('should validate correct prediction format', () => {
      const prediction = {
        result: '看涨',
        confidence: 0.8,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(true)
    })

    it('should reject invalid result value', () => {
      const prediction = {
        result: 'invalid',
        confidence: 0.8,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(false)
    })

    it('should reject out of range confidence', () => {
      const prediction = {
        result: '看涨',
        confidence: 1.5,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(false)
    })
  })
})
```

### 3.4 数据库操作测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/unit/background/database.test.ts`

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Database } from '@/background/database/db'
import { NewsItem } from '@/types/news'

describe('Database', () => {
  let db: Database

  beforeEach(async () => {
    db = new Database(':memory:')
    await db.initialize()
  })

  afterEach(async () => {
    await db.close()
  })

  describe('insertNews', () => {
    it('should insert news item', async () => {
      const news: NewsItem = {
        title: 'Test news',
        content: 'Test content',
        source: 'test',
        category: '财经',
        url: 'https://example.com',
        publishTime: new Date().toISOString(),
      }
      const id = await db.insertNews(news)
      expect(id).toBeGreaterThan(0)
    })

    it('should reject duplicate news', async () => {
      const news: NewsItem = {
        title: 'Test news',
        content: 'Test content',
        source: 'test',
        category: '财经',
        url: 'https://example.com',
        publishTime: new Date().toISOString(),
      }
      await db.insertNews(news)
      await expect(db.insertNews(news)).rejects.toThrow()
    })
  })

  describe('getNews', () => {
    it('should get all news', async () => {
      const news1: NewsItem = {
        title: 'News 1',
        source: 'test',
        category: '财经',
        url: 'https://example.com/1',
        publishTime: new Date().toISOString(),
      }
      const news2: NewsItem = {
        title: 'News 2',
        source: 'test',
        category: '国内政治',
        url: 'https://example.com/2',
        publishTime: new Date().toISOString(),
      }

      await db.insertNews(news1)
      await db.insertNews(news2)

      const allNews = await db.getNews()
      expect(allNews).toHaveLength(2)
    })

    it('should filter by category', async () => {
      const news1: NewsItem = {
        title: 'News 1',
        source: 'test',
        category: '财经',
        url: 'https://example.com/1',
        publishTime: new Date().toISOString(),
      }
      const news2: NewsItem = {
        title: 'News 2',
        source: 'test',
        category: '国内政治',
        url: 'https://example.com/2',
        publishTime: new Date().toISOString(),
      }

      await db.insertNews(news1)
      await db.insertNews(news2)

      const financeNews = await db.getNews({ category: '财经' })
      expect(financeNews).toHaveLength(1)
      expect(financeNews[0].category).toBe('财经')
    })
  })
})
```

---

## 四、集成测试

### 4.1 消息通信测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/integration/messaging.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MessageHandler } from '@/shared/messaging'
import { MessageTypes } from '@/types/extension'

describe('Messaging Integration', () => {
  let messageHandler: MessageHandler

  beforeEach(() => {
    messageHandler = new MessageHandler()
    vi.clearAllMocks()
  })

  describe('Content Script to Background', () => {
    it('should send GET_NEWS request', async () => {
      const mockResponse = {
        news: [{ id: 1, title: 'Test news' }]
      }
      vi.mocked(chrome.runtime.sendMessage).mockResolvedValue(mockResponse)

      const response = await messageHandler.send(MessageTypes.GET_NEWS)
      expect(response).toEqual(mockResponse)
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: MessageTypes.GET_NEWS
      })
    })

    it('should handle GET_PREDICTIONS request', async () => {
      const mockResponse = {
        predictions: [
          {
            type: 'open_forecast',
            result: '看涨',
            confidence: 0.8,
            reason: 'Test reason'
          }
        ]
      }
      vi.mocked(chrome.runtime.sendMessage).mockResolvedValue(mockResponse)

      const response = await messageHandler.send(MessageTypes.GET_PREDICTIONS)
      expect(response.predictions).toHaveLength(1)
    })
  })

  describe('Background to Content Script', () => {
    it('should broadcast news update', () => {
      let receivedMessage: any = null
      vi.mocked(chrome.runtime.onMessage.addListener).mockImplementation(
        (callback: (message: any) => void) => {
          receivedMessage = callback
          return vi.fn()
        }
      )

      messageHandler.onNewsUpdate((news) => {
        expect(news).toHaveLength(1)
      })

      const testNews = [{ id: 1, title: 'New news' }]
      receivedMessage?.({ type: 'NEWS_UPDATE', data: testNews })
    })
  })
})
```

### 4.2 数据抓取流程测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/integration/fetching.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NewsFetcher } from '@/background/fetchers/apiFetcher'
import { fetch as mockFetch } from 'vitest-fetch-mock'

describe('News Fetching Integration', () => {
  let fetcher: NewsFetcher

  beforeEach(() => {
    fetcher = new NewsFetcher()
    mockFetch.enableMocks()
  })

  afterEach(() => {
    mockFetch.disableMocks()
  })

  it('should fetch news from API', async () => {
    const mockResponse = {
      data: {
        newslist: [
          { title: 'News 1', url: 'https://example.com/1', source: 'test' },
          { title: 'News 2', url: 'https://example.com/2', source: 'test' },
        ]
      }
    }
    mockFetch.mockResponse(JSON.stringify(mockResponse))

    const news = await fetcher.fetchFromAPI('test-api-url')
    expect(news).toHaveLength(2)
    expect(news[0].title).toBe('News 1')
  })

  it('should handle API errors with retry', async () => {
    mockFetch.mockReject(new Error('Network error'))

    const news = await fetcher.fetchFromAPI('test-api-url', { retries: 3 })
    expect(news).toEqual([])
    expect(mockFetch).toHaveBeenCalledTimes(3)
  })

  it('should deduplicate news', async () => {
    const mockResponse = {
      data: {
        newslist: [
          { title: 'Duplicate', url: 'https://example.com/dup', source: 'test' },
          { title: 'Duplicate', url: 'https://example.com/dup', source: 'test' },
          { title: 'Unique', url: 'https://example.com/unique', source: 'test' },
        ]
      }
    }
    mockFetch.mockResponse(JSON.stringify(mockResponse))

    const news = await fetcher.fetchFromAPI('test-api-url')
    expect(news).toHaveLength(2)
  })
})
```

### 4.3 AI调用集成测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/integration/aiIntegration.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AIAnalyzer } from '@/background/ai/client'
import { fetch as mockFetch } from 'vitest-fetch-mock'

describe('AI Integration', () => {
  let analyzer: AIAnalyzer

  beforeEach(() => {
    analyzer = new AIAnalyzer('test-api-key')
    mockFetch.enableMocks()
  })

  afterEach(() => {
    mockFetch.disableMocks()
  })

  it('should call AI API for prediction', async () => {
    const mockAIResponse = {
      choices: [{
        message: {
          content: JSON.stringify({
            result: '看涨',
            confidence: 0.75,
            reason: '市场情绪积极'
          })
        }
      }]
    }
    mockFetch.mockResponse(JSON.stringify(mockAIResponse))

    const news = [
      { title: 'Market news', content: 'Test content' }
    ]

    const prediction = await analyzer.predictOpenTrend(news)
    expect(prediction.result).toBe('看涨')
    expect(prediction.confidence).toBe(0.75)
  })

  it('should use fallback when AI fails', async () => {
    mockFetch.mockReject(new Error('API error'))

    const news = [
      { title: '股市大跌', content: '经济数据不佳' }
    ]

    const prediction = await analyzer.predictOpenTrend(news)
    expect(prediction).toBeDefined()
    expect(prediction.source).toBe('fallback')
  })
})
```

---

## 五、E2E测试

### 5.1 Content Script 注入测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/e2e/content-script.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Content Script Injection', () => {
  test('should inject finance panel on page load', async ({ page }) => {
    await page.goto('https://example.com')

    // Check if panel exists
    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toBeVisible()

    // Check if panel is positioned on right side
    const boundingBox = await panel.boundingBox()
    expect(boundingBox?.x).toBeGreaterThan(500)
  })

  test('should show collapsed panel initially', async ({ page }) => {
    await page.goto('https://example.com')

    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toHaveAttribute('data-collapsed', 'true')

    const content = page.locator('[data-testid="panel-content"]')
    await expect(content).not.toBeVisible()
  })

  test('should expand panel on toggle click', async ({ page }) => {
    await page.goto('https://example.com')

    const toggleButton = page.locator('[data-testid="panel-toggle"]')
    await toggleButton.click()

    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toHaveAttribute('data-collapsed', 'false')

    const content = page.locator('[data-testid="panel-content"]')
    await expect(content).toBeVisible()
  })
})
```

### 5.2 新闻展示测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/e2e/news-display.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('News Display', () => {
  test('should display news items', async ({ page, context }) => {
    // Setup mock data
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        {
          id: 1,
          title: 'Test News 1',
          source: 'Test Source',
          category: '财经',
          publishTime: '2026-03-06T10:00:00',
          url: 'https://example.com/1'
        },
        {
          id: 2,
          title: 'Test News 2',
          source: 'Test Source',
          category: '国内政治',
          publishTime: '2026-03-06T09:00:00',
          url: 'https://example.com/2'
        }
      ]
    })

    await page.goto('https://example.com')

    // Expand panel
    await page.click('[data-testid="panel-toggle"]')

    // Check news items
    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(2)

    // Check first news item
    const firstNews = newsItems.first()
    await expect(firstNews).toContainText('Test News 1')
    await expect(firstNews).toContainText('10:00')
    await expect(firstNews).toContainText('财经')
  })

  test('should filter news by category', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        { id: 1, title: 'Finance', category: '财经', publishTime: '2026-03-06T10:00:00' },
        { id: 2, title: 'Politics', category: '国内政治', publishTime: '2026-03-06T09:00:00' }
      ]
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Select finance category
    await page.click('[data-testid="category-filter"]')
    await page.click('text=财经')

    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(1)
    await expect(newsItems.first()).toContainText('Finance')
  })

  test('should search news by keyword', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        { id: 1, title: '股市大涨', category: '财经', publishTime: '2026-03-06T10:00:00' },
        { id: 2, title: '政策发布', category: '国内政治', publishTime: '2026-03-06T09:00:00' }
      ]
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Search for '股市'
    await page.fill('[data-testid="search-input"]', '股市')

    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(1)
    await expect(newsItems.first()).toContainText('股市大涨')
  })
})
```

### 5.3 预测展示测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/e2e/predictions.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Predictions Display', () => {
  test('should display open forecast', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_PREDICTIONS__ = {
        open_forecast: {
          result: '看涨',
          confidence: 0.75,
          reason: '市场情绪积极',
          time: '09:30'
        }
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Switch to predictions tab
    await page.click('[data-testid="tab-predictions"]')

    const forecast = page.locator('[data-testid="open-forecast"]')
    await expect(forecast).toBeVisible()
    await expect(forecast).toContainText('看涨')
    await expect(forecast).toContainText('09:30')

    const confidenceBar = page.locator('[data-testid="confidence-bar"]')
    await expect(confidenceBar).toHaveAttribute('data-value', '75')
  })

  test('should display close advice', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_PREDICTIONS__ = {
        close_advice: {
          result: '加仓',
          confidence: 0.6,
          reason: '尾盘有机会',
          time: '14:30'
        }
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')
    await page.click('[data-testid="tab-predictions"]')

    const advice = page.locator('[data-testid="close-advice"]')
    await expect(advice).toBeVisible()
    await expect(advice).toContainText('加仓')
    await expect(advice).toContainText('14:30')
  })

  test('should display accuracy stats', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_STATS__ = {
        totalPredictions: 100,
        accuratePredictions: 75,
        accuracy: 0.75
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')
    await page.click('[data-testid="tab-predictions"]')

    const stats = page.locator('[data-testid="accuracy-stats"]')
    await expect(stats).toBeVisible()
    await expect(stats).toContainText('75%')
    await expect(stats).toContainText('100')
  })
})
```

### 5.4 Popup 页面测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/e2e/popup.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Popup Page', () => {
  test.beforeEach(async ({ context }) => {
    // Load extension
    await context.addInitScript(() => {
      window.chrome = {
        runtime: {
          getURL: (path: string) => `chrome-extension://test/${path}`
        }
      }
    })
  })

  test('should load popup page', async ({ page }) => {
    await page.goto('chrome-extension://test/src/popup/index.html')

    await expect(page.locator('[data-testid="settings-form"]')).toBeVisible()
    await expect(page.locator('[data-testid="history-list"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-view"]')).toBeVisible()
  })

  test('should save settings', async ({ page }) => {
    await page.goto('chrome-extension://test/src/popup/index.html')

    // Update settings
    await page.fill('[data-testid="news-sources"]', 'source1,source2')
    await page.click('[data-testid="save-button"]')

    // Check success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })

  test('should display history', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_HISTORY__ = [
        { date: '2026-03-06', type: 'open_forecast', result: '看涨', accuracy: true },
        { date: '2026-03-05', type: 'close_advice', result: '加仓', accuracy: false }
      ]
    })

    await page.goto('chrome-extension://test/src/popup/index.html')

    const historyItems = page.locator('[data-testid="history-item"]')
    await expect(historyItems).toHaveCount(2)
  })
})
```

### 5.5 完整流程测试

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/e2e/full-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Full User Flow', () => {
  test('should complete news viewing flow', async ({ page }) => {
    await page.goto('https://example.com')

    // Step 1: Panel should be collapsed initially
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'true')

    // Step 2: Expand panel
    await page.click('[data-testid="panel-toggle"]')
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'false')

    // Step 3: View news
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(10)

    // Step 4: Switch category
    await page.click('[data-testid="category-filter"]')
    await page.click('text=国内政治')
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(5)

    // Step 5: Search
    await page.fill('[data-testid="search-input"]', '股市')
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(2)

    // Step 6: View predictions
    await page.click('[data-testid="tab-predictions"]')
    await expect(page.locator('[data-testid="open-forecast"]')).toBeVisible()

    // Step 7: Collapse panel
    await page.click('[data-testid="panel-toggle"]')
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'true')
  })

  test('should handle real-time updates', async ({ page }) => {
    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    const initialCount = await page.locator('[data-testid="news-item"]').count()

    // Simulate new news arrival
    await page.evaluate(() => {
      window.__MOCK_NEWS__.push({
        id: 999,
        title: 'Breaking News',
        category: '财经',
        publishTime: new Date().toISOString()
      })
    })

    // Wait for update
    await page.waitForTimeout(1000)
    await page.click('[data-testid="refresh-button"]')

    const newCount = await page.locator('[data-testid="news-item"]').count()
    expect(newCount).toBe(initialCount + 1)
  })
})
```

---

## 六、测试覆盖率要求

### 6.1 覆盖率目标

| 指标 | 目标值 | 说明 |
|------|--------|------|
| 语句覆盖率 | >= 80% | 所有可执行语句 |
| 分支覆盖率 | >= 75% | 所有条件分支 |
| 函数覆盖率 | >= 80% | 所有函数 |
| 行覆盖率 | >= 80% | 所有代码行 |

### 6.2 模块覆盖率要求

| 模块 | 最低覆盖率 | 优先级 |
|------|-----------|--------|
| `src/utils/*` | 90% | 高 |
| `src/background/ai/*` | 85% | 高 |
| `src/background/database/*` | 85% | 高 |
| `src/background/utils/categoryRules.ts` | 100% | 高 |
| `src/content-script/components/*` | 75% | 中 |
| `src/popup/components/*` | 75% | 中 |
| `src/shared/messaging.ts` | 80% | 高 |

---

## 七、测试运行命令

### 7.1 npm scripts

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:unit": "vitest --run tests/unit",
    "test:integration": "vitest --run tests/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e"
  }
}
```

### 7.2 命令说明

| 命令 | 说明 |
|------|------|
| `npm run test` | 运行所有单元测试和集成测试（watch模式） |
| `npm run test:ui` | 在浏览器中查看测试结果UI |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run test:unit` | 仅运行单元测试 |
| `npm run test:integration` | 仅运行集成测试 |
| `npm run test:e2e` | 运行E2E测试 |
| `npm run test:e2e:ui` | 在浏览器中运行E2E测试 |
| `npm run test:e2e:debug` | 调试E2E测试 |
| `npm run test:all` | 运行所有测试 |

---

## 八、持续集成配置

### 8.1 GitHub Actions 配置

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-and-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### 8.2 GitLab CI 配置

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/.gitlab-ci.yml`

```yaml
stages:
  - test
  - e2e

variables:
  NODE_VERSION: "18"

unit-test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

e2e-test:
  stage: e2e
  image: mcr.microsoft.com/playwright:v${NODE_VERSION}
  script:
    - npm ci
    - npx playwright install --with-deps chromium
    - npm run test:e2e
  artifacts:
    when: always
    paths:
      - playwright-report/
```

---

## 九、测试数据管理

### 9.1 Mock 数据目录

```
d:/MenusifuStore/finance-news-chrome-plugin/tests/mocks/
├── news/
│   ├── finance-news.json
│   ├── politics-news.json
│   └── international-news.json
├── predictions/
│   ├── open-forecast.json
│   └── close-advice.json
├── api/
│   ├── tencent-news-response.json
│   └── yahoo-finance-response.json
└── database/
    ├── sample-news.sql
    └── sample-predictions.sql
```

### 9.2 示例 Mock 数据

**文件路径**: `d:/MenusifuStore/finance-news-chrome-plugin/tests/mocks/news/finance-news.json`

```json
{
  "news": [
    {
      "id": 1,
      "title": "A股三大指数集体收涨",
      "content": "沪指涨0.5%，深成指涨0.8%，创业板指涨1.2%",
      "source": "新浪财经",
      "category": "财经",
      "url": "https://finance.sina.com.cn/test/1",
      "publish_time": "2026-03-06T10:30:00"
    },
    {
      "id": 2,
      "title": "央行降准0.5个百分点",
      "content": "中国人民银行决定下调金融机构存款准备金率",
      "source": "新华网",
      "category": "财经",
      "url": "https://www.xinhuanet.com/test/2",
      "publish_time": "2026-03-06T09:15:00"
    }
  ]
}
```

---

## 十、测试最佳实践

### 10.1 命名规范

- 单元测试文件: `*.test.ts` 或 `*.test.tsx`
- E2E测试文件: `*.spec.ts`
- 测试描述: 使用 `describe` 分组，`it` 或 `test` 定义用例
- 测试名称: 应该描述被测试的行为，而不是实现细节

### 10.2 测试结构

遵循 AAA 模式:

```typescript
it('should calculate sum correctly', () => {
  // Arrange - 准备测试数据
  const a = 1
  const b = 2

  // Act - 执行被测试的代码
  const result = sum(a, b)

  // Assert - 验证结果
  expect(result).toBe(3)
})
```

### 10.3 Mock 使用

- 仅对外部依赖使用 mock
- 不要 mock 被测试的模块
- 使用 `vi.fn()` 创建函数 mock
- 使用 `vi.mocked()` 获取类型安全的 mock

### 10.4 异步测试

- 使用 `async/await` 处理异步代码
- 确保所有异步操作都被等待
- 设置合理的超时时间

### 10.5 E2E 测试原则

- 测试用户关键路径，不覆盖所有边界情况
- 使用稳定的选择器（data-testid）
- 避免硬编码等待时间，使用 `waitFor` 或自动等待
- 保持测试独立，不相互依赖

---

## 十一、测试检查清单

### 11.1 单元测试检查清单

- [ ] 工具函数测试完成
- [ ] 本地规则引擎测试完成
- [ ] AI响应解析测试完成
- [ ] 数据库CRUD测试完成
- [ ] 存储工具测试完成
- [ ] 关键React组件测试完成

### 11.2 集成测试检查清单

- [ ] 消息通信测试完成
- [ ] 数据抓取流程测试完成
- [ ] AI调用集成测试完成
- [ ] 定时任务测试完成

### 11.3 E2E测试检查清单

- [ ] Content Script注入测试完成
- [ ] 新闻展示测试完成
- [ ] 预测展示测试完成
- [ ] Popup页面测试完成
- [ ] 完整用户流程测试完成

### 11.4 测试环境检查清单

- [ ] Vitest配置完成
- [ ] Playwright配置完成
- [ ] Mock数据准备完成
- [ ] CI/CD配置完成
- [ ] 测试文档完善

---

## 十二、风险评估

### 12.1 测试风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Chrome扩展API mock不完整 | 高 | 定期更新mock，对比真实API |
| E2E测试不稳定 | 中 | 使用重试机制，稳定选择器 |
| AI调用测试依赖外部服务 | 高 | 使用mock和降级策略 |
| 测试数据过期 | 低 | 定期更新mock数据 |

### 12.2 测试时间估算

| 测试类型 | 预计时间 |
|----------|----------|
| 单元测试框架搭建 | 4小时 |
| 单元测试用例编写 | 12小时 |
| 集成测试配置 | 3小时 |
| 集成测试用例编写 | 8小时 |
| E2E测试环境配置 | 4小时 |
| E2E测试用例编写 | 12小时 |
| CI/CD配置 | 4小时 |
| 测试文档编写 | 3小时 |
| **总计** | **约50小时（6-7天）** |

---

## 十三、后续优化

1. **性能测试**: 添加性能基准测试
2. **视觉回归测试**: 使用Chromatic等工具
3. **负载测试**: 测试大量数据情况
4. **安全测试**: SQL注入、XSS等安全漏洞扫描
5. **测试报告**: 集成测试报告到项目管理工具

---

*文档创建日期: 2026-03-06*
*负责人: 测试开发工程师 (finance-news-test)*
*文档版本: 1.0*
