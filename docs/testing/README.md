# 测试开发工程师 - 简化版角色职责

> **文档版本**: v2.0 (简化版)
> **更新日期**: 2026-03-08
> **变更说明**: 移除AI预测相关测试，专注核心功能

---

## 🧪 角色定义

**姓名**: 测试开发工程师

**核心职责**:
- 单元测试框架搭建
- 关键组件测试用例
- 集成测试配置
- E2E测试脚本编写

---

## 📋 完成工作

### Phase 6: 测试（预计2天）

#### 6.1 测试框架配置
- [ ] Task 14: 配置Vitest测试框架
- [ ] 创建vitest.config.ts
- [ ] 配置测试环境（jsdom、coverage）
- [ ] 创建测试setup文件

#### 6.2 单元测试（简化版）
- [ ] 工具函数测试（时间处理、哈希函数）
- [ ] 分类规则引擎测试（财经/政治/国际分类）
- [ ] 数据去重逻辑测试
- [ ] 重要性计算测试
- [ ] Chrome Storage操作测试

#### 6.3 集成测试（简化版）
- [ ] 数据抓取流程测试
- [ ] Background与Content Script通信测试
- [ ] 筛选和搜索功能测试
- [ ] 定时任务调度测试

#### 6.4 E2E测试（简化版）
- [ ] Content Script注入测试
- [ ] 新闻展示测试
- [ ] 分类筛选功能测试
- [ ] 搜索功能测试
- [ ] Popup页面功能测试
- [ ] 完整流程测试（抓取→存储→展示）

---

## 📚 参考文档

**主实施计划**: [../plans/2026-03-08-simplified-implementation-plan.md](../plans/2026-03-08-simplified-implementation-plan.md)

**相关章节**:
- 第6节：测试部分
  - 6.1 测试框架配置
  - 6.2 单元测试编写（简化版）
  - 6.3 集成测试配置（简化版）
  - 6.4 E2E测试脚本（简化版）

---

## 🧪 测试技术栈

- **单元测试**: Vitest + @testing-library/react
- **E2E测试**: Playwright
- **Mock数据**: Vitest Fetch Mock
- **覆盖率**: @vitest/coverage-v8

---

## ✅ 测试清单（简化版）

### 单元测试覆盖目标
- 工具函数: ≥ 80%
- 分类规则引擎: ≥ 85%
- 数据去重逻辑: ≥ 90%
- 重要性计算: ≥ 85%
- Chrome Storage操作: ≥ 90%

### 集成测试覆盖
- 数据抓取流程: 完整链路测试
- 通信机制: 双向通信测试
- chrome.storage读写: 测试边界条件
- 定时任务: 调度逻辑测试

### E2E测试场景
- [ ] 面板展开/收起
- [ ] 新闻列表滚动
- [ ] 分类筛选功能
- [ ] 时间筛选功能
- [ ] 搜索功能
- [ ] 刷新数据功能
- [ ] Popup页面配置保存
- [ ] 基础统计展示

---

## 📝 测试配置文件

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
      ],
      all: true,
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
  },
})
```

### 测试Setup文件
```typescript
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// Mock Chrome APIs
global.ResizeObserver = ResizeObserver

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

global.AudioContext = class AudioContext {} as any
```

---

## 📊 Mock数据文件（简化版）

### tests/mocks/news/finance-news.json
```json
{
  "news": [
    {
      "id": "1",
      "title": "A股市场今日表现强劲，三大指数集体上涨",
      "content": "受益于利好政策推动，投资者情绪乐观",
      "source": "腾讯新闻",
      "category": "finance",
      "url": "https://finance.qq.com/news/123456",
      "publish_time": "2024-03-06T09:30:00Z",
      "importance": 4
    },
    {
      "id": "2",
      "title": "央行宣布降准0.25个百分点",
      "content": "释放流动性支持实体经济",
      "source": "新浪财经",
      "category": "finance",
      "url": "https://finance.sina.com/news/789012",
      "publish_time": "2024-03-06T10:15:00Z",
      "importance": 5
    },
    {
      "id": "3",
      "title": "两会召开，提出多项经济政策",
      "content": "聚焦高质量发展",
      "source": "人民网",
      "category": "domestic",
      "url": "https://people.com/news/345678",
      "publish_time": "2024-03-06T11:00:00Z",
      "importance": 3
    },
    {
      "id": "4",
      "title": "美联储宣布维持利率不变",
      "content": "符合市场预期",
      "source": "路透社",
      "category": "international",
      "url": "https://reuters.com/news/567890",
      "publish_time": "2024-03-06T12:30:00Z",
      "importance": 4
    }
  ]
}
```

---

## 🧪 单元测试示例（简化版）

### 时间处理工具测试
```typescript
import { describe, it, expect } from 'vitest'
import { formatTime } from '@/utils/time'

describe('formatTime', () => {
  it('应该正确格式化时间', () => {
    const date = new Date('2024-03-06T09:30:00Z')
    const result = formatTime(date)
    expect(result).toBe('09:30')
  })

  it('应该处理未定义的时间', () => {
    const result = formatTime(undefined as any)
    expect(result).toBe('--:--')
  })
})
```

### 分类规则引擎测试
```typescript
import { describe, it, expect } from 'vitest'
import { categorizeNews } from '@/utils/categoryRules'

describe('categorizeNews', () => {
  it('应该正确分类财经新闻', () => {
    const news = {
      title: '股市今日大涨',
      content: '受益于政策利好'
    }
    const result = categorizeNews(news)
    expect(result).toBe('finance')
  })

  it('应该正确分类国内政治新闻', () => {
    const news = {
      title: '政府发布新政策',
      content: '两会期间'
    }
    const result = categorizeNews(news)
    expect(result).toBe('domestic')
  })

  it('应该正确分类国际新闻', () => {
    const news = {
      title: '美国发布新制裁',
      content: '中美关系'
    }
    const result = categorizeNews(news)
    expect(result).toBe('international')
  })

  it('应该正确分类普通新闻', () => {
    const news = {
      title: '天气转暖',
      content: '春暖花开'
    }
    const result = categorizeNews(news)
    expect(result).toBe('general')
  })
})
```

### 数据去重测试
```typescript
import { describe, it, expect } from 'vitest'
import { deduplicateNews } from '@/utils/deduplication'

describe('deduplicateNews', () => {
  it('应该去除24小时内重复的新闻', () => {
    const news = [
      {
        id: '1',
        title: '测试新闻',
        source: '测试源',
        publish_time: '2024-03-06T10:00:00Z'
      },
      {
        id: '2',
        title: '测试新闻',
        source: '测试源2',
        publish_time: '2024-03-06T10:30:00Z'
      }
    ]

    const result = deduplicateNews(news)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('1')
  })

  it('应该保留超过24小时的不同来源新闻', () => {
    const news = [
      {
        id: '1',
        title: '测试新闻',
        source: '测试源',
        publish_time: '2024-03-06T10:00:00Z'
      },
      {
        id: '2',
        title: '测试新闻',
        source: '测试源2',
        publish_time: '2024-03-07T10:00:00Z'
      }
    ]

    const result = deduplicateNews(news)
    expect(result.length).toBe(2)
  })
})
```

### 重要性计算测试
```typescript
import { describe, it, expect } from 'vitest'
import { calculateImportance } from '@/utils/importance'

describe('calculateImportance', () => {
  it('应该基于关键词计算重要性', () => {
    const news = {
      title: '央行宣布降准释放流动性',
      content: '支持实体经济'
    }
    const result = calculateImportance(news)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(5)
  })

  it('应该基于来源权威性调整权重', () => {
    const news1 = {
      title: '测试新闻',
      source: '官方发布'
    }
    const news2 = {
      title: '测试新闻',
      source: '小道消息'
    }

    const result1 = calculateImportance(news1)
    const result2 = calculateImportance(news2)

    expect(result1).toBeGreaterThan(result2)
  })
})
```

---

## 🌐 E2E测试示例（简化版）

### Content Script注入测试
```typescript
import { test, expect } from '@playwright/test'

test.describe('Content Script注入', () => {
  test('应该成功注入Shadow DOM容器', async ({ page }) => {
    // 加载扩展
    await page.goto('https://example.com')

    // 检查Shadow DOM容器是否存在
    const shadowHost = await page.locator('#finance-news-shadow-host').count()
    expect(shadowHost).toBeGreaterThan(0)
  })

  test('面板应该可以展开和收起', async ({ page }) => {
    await page.goto('https://example.com')

    const panel = page.locator('.finance-panel')

    // 测试初始展开状态
    await expect(panel).toHaveClass(/expanded/)

    // 点击收起按钮
    await page.locator('.toggle-button').click()
    await expect(panel).toHaveClass(/collapsed/)

    // 再次点击展开
    await page.locator('.toggle-button').click()
    await expect(panel).toHaveClass(/expanded/)
  })
})
```

### 新闻展示测试
```typescript
import { test, expect } from '@playwright/test'

test.describe('新闻展示', () => {
  test('应该展示新闻列表', async ({ page }) => {
    // Mock新闻数据
    await page.evaluate(() => {
      window.__mockNews = [
        {
          id: '1',
          title: '测试新闻标题',
          category: 'finance',
          source: '测试源',
          publish_time: '2024-03-06T09:30:00Z'
        }
      ]
    })

    await page.goto('https://example.com')

    // 检查新闻项是否渲染
    const newsItems = await page.locator('.news-item').count()
    expect(newsItems).toBeGreaterThan(0)
  })

  test('分类筛选功能应该正常工作', async ({ page }) => {
    await page.goto('https://example.com')

    // 点击"财经"分类标签
    await page.locator('.category-filter').filter({ hasText: '财经' }).click()

    // 验证只显示财经类别的新闻
    const newsItems = await page.locator('.news-item')
    const categories = await newsItems.evaluateAll(items =>
      items.map(item => item.getAttribute('data-category'))
    )

    expect(categories.every(cat => cat === 'finance')).toBe(true)
  })

  test('搜索功能应该正常工作', async ({ page }) => {
    await page.goto('https://example.com')

    // 输入搜索关键词
    const searchInput = page.locator('input[type="search"]')
    await searchInput.fill('股票')

    // 验证搜索结果
    const newsItems = await page.locator('.news-item').count()
    const titles = await newsItems.evaluateAll(items =>
      items.map(item => item.textContent())
    )

    expect(titles.some(title => '股票'.includes(title.split(' ')[0]))).toBe(true)
  })

  test('时间筛选功能应该正常工作', async ({ page }) => {
    await page.goto('https://example.com')

    // 点击"今天"时间筛选
    await page.locator('.time-filter').filter({ hasText: '今天' }).click()

    // 验证只显示今天的新闻
    const newsItems = await page.locator('.news-item')
    const times = await newsItems.evaluateAll(items =>
      items.map(item => item.getAttribute('data-time'))
    )

    const today = new Date().toDateString()
    expect(times.every(time => time.includes(today))).toBe(true)
  })
})
```

---

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../backend/README.md](../backend/README.md) - 数据库接口和Mock数据
- [../frontend-content-script/README.md](../frontend-content-script/README.md) - Content Script组件
- [../frontend-popup/README.md](../frontend-popup/README.md) - Popup组件

---

## 🔄 需求变更说明

| 测试类型 | 原版需求 | 简化版需求 | 变更说明 |
|---------|---------|-----------|---------|
| **AI响应解析器** | JSON解析测试 | ❌ **移除** | 不再需要 |
| **AI调用流程** | Mock API调用 | ❌ **移除** | 不再需要 |
| **AI预测展示** | 开盘/尾盘E2E测试 | ❌ **移除** | 不再需要 |
| **历史记录** | 预测历史查看测试 | ❌ **移除** | 不再需要 |
| **预测统计** | 准确率统计测试 | ❌ **移除** | 不再需要 |
| **新闻功能** | 搜索/筛选/展示 | ✅ **保留** | 核心功能 |
| **数据去重** | 去重逻辑测试 | ✅ **保留** | 核心功能 |
| **分类规则** | 分类准确性测试 | ✅ **保留** | 核心功能 |

---

## 🚀 工作流程

1. **与架构师协作** - 配置测试环境和框架
2. **与所有开发协作** - 理解各模块的测试需求
3. **编写测试用例** - 遵循AAA模式（Arrange-Act-Assert）
4. **持续执行测试** - 在开发过程中运行测试
5. **维护Mock数据** - 确保测试数据与实际数据一致

---

## ✅ 交付物清单

- [ ] vitest.config.ts（测试框架配置）
- [ ] tests/setup.ts（测试环境初始化）
- [ ] tests/unit/（单元测试文件）
- [ ] tests/integration/（集成测试文件）
- [ ] tests/e2e/（E2E测试文件）
- [ ] tests/mocks/（Mock数据文件）

---

## 📊 覆盖率目标

- 语句覆盖率: ≥ 70%
- 分支覆盖率: ≥ 70%
- 函数覆盖率: ≥ 70%
- 行覆盖率: ≥ 70%

---

*文档创建日期: 2026-03-06*
*更新日期: 2026-03-08（简化版）*
