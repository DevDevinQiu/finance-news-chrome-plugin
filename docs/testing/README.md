# 测试开发工程师 - 角色职责与文档

> 本文档定义测试开发工程师在AI金融新闻Chrome插件项目中的职责和文档位置

## 🧪 角色定义

**姓名**: 测试开发工程师

**职责**:
- 单元测试框架搭建
- 关键组件测试用例
- 集成测试配置
- E2E测试脚本编写

## 📋 完成工作

### Phase 6: 测试（预计2-3天）

#### 6.1 测试框架配置
- [ ] Task 14: 配置Vitest测试框架
- [ ] 创建vitest.config.ts
- [ ] 配置测试环境（jsdom、coverage）
- [ ] 创建测试setup文件

#### 6.2 单元测试
- [ ] 工具函数测试（时间处理、哈希函数）
- [ ] 本地规则引擎测试（分类逻辑）
- [ ] AI响应解析器测试
- [ ] 数据库操作测试

#### 6.3 集成测试
- [ ] 数据抓取流程测试
- [ ] AI调用流程测试（使用mock）
- [ ] Background与Content Script通信测试

#### 6.4 E2E测试
- [ ] Content Script注入测试
- [ ] 新闻展示测试
- [ ] AI预测展示测试
- [ ] Popup页面功能测试
- [ ] 完整流程测试（抓取→存储→展示）

## 📚 参考文档

**主实施计划**: [../plans/2026-03-06-implementation-plan.md](../plans/2026-03-06-implementation-plan.md)

**相关章节**:
- 第7节：测试部分
  - 7.1 测试框架配置
  - 7.2 单元测试编写
  - 7.3 集成测试配置
  - 7.4 E2E测试脚本

## 🧪 测试技术栈

- **单元测试**: Vitest + @testing-library/react
- **E2E测试**: Playwright
- **Mock数据**: Vitest Fetch Mock
- **覆盖率**: @vitest/coverage-v8

## ✅ 测试清单

### 单元测试覆盖目标
- 工具函数: ≥ 80%
- 本地规则引擎: ≥ 75%
- AI响应解析: ≥ 80%
- 数据库操作: ≥ 85%

### 集成测试覆盖
- 数据抓取流程: 完整链路测试
- AI调用流程: 包含降级逻辑测试
- Background通信: 双向通信测试
- chrome.storage读写: 测试边界条件

### E2E测试场景
- [ ] 面板展开/收起
- [ ] 标签页切换
- [ ] 新闻搜索功能
- [ ] 分类筛选功能
- [ ] 刷新数据功能
- [ ] Popup页面配置保存
- [ ] 历史记录查看
- [ ] 统计数据展示

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

## 📊 Mock数据文件

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
      "publish_time": "2024-03-06T09:30:00Z"
    },
    {
      "id": "2",
      "title": "央行宣布降准0.25个百分点",
      "content": "释放流动性支持实体经济",
      "source": "新浪财经",
      "category": "finance",
      "url": "https://finance.sina.com/news/789012",
      "publish_time": "2024-03-06T10:15:00Z"
    }
  ]
}
```

### tests/mocks/predictions/open-forecast.json
```json
{
  "market_sentiment": "积极",
  "key_factors": ["政策利好", "流动性充裕", "外部环境改善"],
  "result": "看涨",
  "confidence": 0.75,
  "reason": "多项利好政策共同推动市场情绪"
}
```

### tests/mocks/predictions/close-advice.json
```json
{
  "market_status": "强势",
  "key_factors": ["利好消息持续增加", "板块轮动活跃", "尾盘资金流入明显"],
  "action": "加仓",
  "confidence": 0.65,
  "reason": "利好消息明显偏多，适度加仓"
}
```

## 🧪 单元测试示例

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

### 本地规则引擎测试
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
})
```

### AI响应解析器测试
```typescript
import { describe, it, expect } from 'vitest'
import { parseAIResponse } from '@/utils/aiResponseParser'

describe('parseAIResponse', () => {
  it('应该正确解析有效JSON响应', () => {
    const response = JSON.stringify({
      result: '看涨',
      confidence: 0.75,
      reason: '利好消息推动'
    })
    const result = parseAIResponse(response)
    expect(result.success).toBe(true)
    expect(result.data.result).toBe('看涨')
    expect(result.data.confidence).toBe(0.75)
  })

  it('应该处理无效JSON格式', () => {
    const response = '这不是一个有效的JSON'
    const result = parseAIResponse(response)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('应该处理代码块包装的JSON', () => {
    const response = `这是一个markdown格式的响应：
\`\`\`json
{"result": "看涨", "confidence": 0.75}
\`\`\``
    const result = parseAIResponse(response)
    expect(result.success).toBe(true)
    expect(result.data.result).toBe('看涨')
  })
})
```

## 🌐 E2E测试示例

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
})
```

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../backend/README.md](../backend/README.md) - 数据库接口和Mock数据
- [../ai-engineer/README.md](../ai-engineer/README.md) - AI集成接口格式
- [../frontend-content-script/README.md](../frontend-content-script/README.md) - Content Script组件
- [../frontend-popup/README.md](../frontend-popup/README.md) - Popup组件

## 🚀 工作流程

1. **与架构师协作** - 配置测试环境和框架
2. **与所有开发协作** - 理解各模块的测试需求
3. **编写测试用例** - 遵循AAA模式（Arrange-Act-Assert）
4. **持续执行测试** - 在开发过程中运行测试
5. **维护Mock数据** - 确保测试数据与实际数据一致

## ✅ 交付物清单

- [ ] vitest.config.ts（测试框架配置）
- [ ] tests/setup.ts（测试环境初始化）
- [ ] tests/unit/（单元测试文件）
- [ ] tests/integration/（集成测试文件）
- [ ] tests/e2e/（E2E测试文件）
- [ ] tests/mocks/（Mock数据文件）

## 📊 覆盖率目标

- 语句覆盖率: ≥ 70%
- 分支覆盖率: ≥ 70%
- 函数覆盖率: ≥ 70%
- 行覆盖率: ≥ 70%

---

*文档创建日期: 2026-03-06*
