# Finance News Chrome Plugin - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个AI驱动的金融信息推送Chrome扩展，抓取财经新闻和政治新闻，使用智谱AI进行股市预测（9:30看涨/看跌，14:30加仓/减仓/维持不动），在浏览器右侧面板展示。

**Architecture:** Chrome Extension Manifest V3架构，使用React + TypeScript，背景服务处理数据抓取和AI调用，内容脚本注入右侧面板，使用Zustand管理状态，智谱AI提供预测分析。

**Tech Stack:** React 18, TypeScript, Chrome Extension Manifest V3, Zhipu AI SDK (zhipu-ai), chrome.storage API, chrome.alarms API, Zustand, Vitest, Playwright

---

## 1. 产品经理部分 (PM)

### 1.1 需求规格说明

#### 1.1.1 项目概述

**项目名称**: AI金融新闻推送Chrome插件

**目标用户**:
- 散户投资者
- 金融从业者
- 对股市感兴趣的普通用户

**核心价值主张**:
- 效率提升：快速获取关键金融信息，节省阅读时间
- 智能分析：AI驱动的情感分析和趋势预测
- 实时性：第一时间获取重要市场动态
- 个性化：根据用户偏好定制新闻推送

#### 1.1.2 功能需求

##### 核心功能 (P0 - MVP)

**新闻聚合与展示**
- 从多个数据源抓取财经新闻
- 实时更新新闻列表（5分钟刷新频率）
- 按时间倒序展示
- 基础分类标签（财经、国内政治、国际）
- 搜索功能（标题和内容）

**AI智能分析**
- 每天上午9:00预测当日股市开盘走势（上证指数）
- 每天下午14:00给出尾盘操作建议
- 显示预测结果（看涨/看跌，加仓/减仓/维持不动）
- 显示AI置信度（0-1）
- 显示预测理由（不超过100字）

**用户界面**
- 右侧可折叠面板
- 点击展开/收起
- 新闻标签页
- AI预测标签页
- 配置页面（可选）

##### 重要功能 (P1)

**个性化功能**
- 用户偏好设置（关注的股票、行业、话题）
- 基于历史行为的智能推荐
- 浏览历史记录

**通知功能**
- 重要新闻实时推送（Chrome通知）
- AI预测完成通知
- 可自定义通知频率

**数据可视化**
- 新闻趋势图表
- 预测准确率统计
- 分类统计

##### 增强功能 (P2)

**高级AI功能**
- 深度趋势分析
- 新闻关联分析
- 智能问答助手

**社交功能**
- 分享到社交媒体
- 用户讨论区

#### 1.1.3 非功能需求

##### 性能要求
- 插件启动时间 < 3秒
- 新闻加载时间 < 2秒
- AI分析响应时间 < 5秒
- 内存占用 < 100MB

##### 可用性要求
- 界面简洁直观
- 支持中英双语
- 适配暗色/亮色主题
- 响应式设计

##### 安全要求
- 用户数据加密存储
- API调用频率限制
- 符合Chrome扩展安全策略

##### 兼容性要求
- Chrome 90+版本
- Edge（后续支持）
- Firefox（后续支持）

#### 1.1.4 MVP功能清单

**必须包含**:
1. 新闻数据抓取（至少3个数据源）
2. 新闻列表展示（按时间排序）
3. 新闻分类（财经/国内政治/国际）
4. 新闻搜索功能
5. 9:00开盘预测（看涨/看跌 + 理由）
6. 14:00尾盘建议（加仓/减仓/维持不动 + 理由）
7. AI置信度显示
8. 面板展开/收起
9. 刷新按钮
10. 配置页面（基础）

#### 1.1.5 验收标准 (DoD)

**MVP验收标准**:

1. **功能完整性**
   - [x] 能成功抓取至少3个新闻源
   - [ ] 新闻更新延迟不超过10分钟
   - [ ] 每次展示至少20条新闻
   - [ ] 分类筛选正常工作
   - [ ] 搜索功能正常工作

2. **AI分析**
   - [ ] 9:00预测准时触发（误差±5分钟）
   - [ ] 14:00建议准时触发（误差±5分钟）
   - [ ] AI调用成功率 ≥ 95%
   - [ ] 预测结果格式正确（JSON解析成功）
   - [ ] 降级策略正常工作

3. **用户体验**
   - [ ] 界面加载时间 ≤ 3秒
   - [ ] 操作流程 ≤ 3步可到达核心功能
   - [ ] 面板展开/收起流畅
   - [ ] 没有明显的UI卡顿

4. **技术验收**
   - [ ] 插件可在Chrome商店发布（通过所有检查）
   - [ ] 无严重bug（P0级bug为0）
   - [ ] 通过Chrome扩展安全扫描
   - [ ] 代码覆盖率 ≥ 60%

5. **集成验收**
   - [ ] Background与Content Script通信正常
   - [ ] chrome.storage读写正常
   - [ ] chrome.alarms定时任务正常
   - [ ] 数据库操作正常

#### 1.1.6 项目里程碑

**M1: 需求分析与设计 (第1周)**
- 需求规格说明书 ✓
- UI/UX设计稿
- 技术架构设计文档
- API接口设计文档
- 数据库设计文档
- 验收: 通过产品评审

**M2: 基础框架搭建 (第2周)**
- Chrome插件框架搭建
- 新闻抓取模块开发
- 基础UI界面实现
- API集成测试
- 验收: 通过技术评审

**M3: 核心功能开发 (第3-4周)**
- AI分析功能实现
- 新闻列表优化
- 详情页面开发
- 主题切换功能
- 基础设置页面
- 本地数据存储
- 单元测试
- 验收: 通过Alpha测试

**M4: 功能增强与优化 (第5-6周)**
- 数据可视化
- 性能优化
- 安全性加固
- Bug修复
- Beta测试
- 验收: 通过Beta测试，用户满意度 ≥ 4.0/5.0

**M5: 发布准备 (第7周)**
- Chrome商店打包准备
- 应用商店素材
- 用户文档完善
- 最终测试
- 正式对外发布
- 验收: 通过Chrome商店审核

---

## 2. 架构师部分

### 2.1 项目初始化

#### Task 1: 创建项目目录结构

**Files:**
- Create: `finance-news-chrome-plugin/package.json`
- Create: `finance-news-chrome-plugin/tsconfig.json`
- Create: `finance-news-chrome-plugin/vite.config.ts`
- Create: `finance-news-chrome-plugin/manifest.json`
- Create: `finance-news-chrome-plugin/.gitignore`
- Create: `finance-news-chrome-plugin/README.md`

**Step 1: 创建package.json**

```json
{
  "name": "finance-news-chrome-plugin",
  "version": "0.1.0",
  "description": "AI驱动的金融新闻推送Chrome扩展",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zhipu-ai": "^4.1.0",
    "zustand": "^4.5.2",
    "dayjs": "^1.11.10",
    "axios": "^1.7.7"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@types/chrome": "^0.0.255",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "@vitejs/plugin-react": "^4.3.3",
    "vitest": "^1.6.0",
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.4.0",
    "prettier": "^3.3.2",
    "eslint": "^9.0.1",
    "@typescript-eslint/eslint-plugin": "^7.1.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "crxjs": "^2.0.0-beta.22"
  },
  "engines": {
    "node": ">= 18.18.0"
  }
}
```

**Step 2: 运行 npm install**

```bash
cd finance-news-chrome-plugin
npm install
```

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore: 初始化项目配置"
```

---

### 2.2 TypeScript配置

#### Task 2: 配置TypeScript

**Files:**
- Create: `finance-news-chrome-plugin/tsconfig.json`
- Create: `finance-news-chrome-plugin/tsconfig.node.json`

**Step 1: 编写tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 2: 编写tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

**Step 3: Commit**

```bash
git add tsconfig.json tsconfig.node.json
git commit -m "chore: 配置TypeScript"
```

---

### 2.3 Chrome扩展配置

#### Task 3: 创建manifest.json

**Files:**
- Create: `finance-news-chrome-plugin/manifest.json`

**Step 1: 编写manifest.json**

```json
{
  "manifest_version": 3,
  "name": "AI金融新闻",
  "version": "0.1.0",
  "description": "AI驱动的金融信息推送，自动抓取新闻并预测股市走势",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "permissions": [
    "storage",
    "alarms",
    "activeTab",
    "notifications"
  ],
  "host_permissions": [
    "https://*/*",
    "http://*/*"
  ],
  "background": {
    "service_worker": "src/background/index.ts",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["src/content-script/index.ts"],
      "type": "module"
    }
  ],
  "action": {
    "default_popup": "src/popup/index.html",
    "default_title": "AI金融新闻"
  },
  "web_accessible_resources": [
    "icons/*"
  ]
}
```

**Step 2: Commit**

```bash
git add manifest.json
git commit -m "feat: 添加Chrome扩展manifest"
```

---

### 2.4 Vite配置

#### Task 4: 配置Vite + CRXJS

**Files:**
- Create: `finance-news-chrome-plugin/vite.config.ts`

**Step 1: 编写vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: './manifest.json',
      contentScripts: {
        injectCss: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        contentScript: './src/content-script/index.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "feat: 配置Vite和CRXJS"
```

---

### 2.5 ESLint配置

#### Task 5: 配置代码规范

**Files:**
- Create: `finance-news-chrome-plugin/.eslintrc.cjs`
- Create: `finance-news-chrome-plugin/.eslintignore`

**Step 1: 编写.eslintrc.cjs**

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    tsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'warn',
    'react/jsx-uses-react': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', 'node_modules'],
}
```

**Step 2: 编写.eslintignore**

```
dist
node_modules
*.config.js
```

**Step 3: Commit**

```bash
git add .eslintrc.cjs .eslintignore
git commit -m "chore: 配置ESLint"
```

---

### 2.6 Prettier配置

#### Task 6: 配置代码格式化

**Files:**
- Create: `finance-news-chrome-plugin/.prettierrc`
- Create: `finance-news-chrome-plugin/.prettierignore`

**Step 1: 编写.prettierrc**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false
  "plugins": ["prettier-plugin-organize-imports"]
}
```

**Step 2: 编写.prettierignore**

```
dist
node_modules
package-lock.json
```

**Step 3: Commit**

```bash
git add .prettierrc .prettierignore
git commit -m "chore: 配置Prettier"
```

---

### 2.7 项目目录结构

#### Task 7: 创建完整的目录结构

**Files:**
- Create: `finance-news-chrome-plugin/src/background/`
- Create: `finance-news-chrome-plugin/src/content-script/`
- Create: `finance-news-chrome-plugin/src/popup/`
- Create: `finance-news-chrome-plugin/src/shared/`
- Create: `finance-news-chrome-plugin/public/icons/`
- Create: `finance-news-chrome-plugin/tests/`

**目录结构:**
```
finance-news-chrome-plugin/
├── src/
│   ├── background/           # Background Service Worker
│   │   ├── index.ts         # 入口文件
│   │   ├── ai/             # AI集成
│   │   ├── database/        # 数据库操作
│   │   ├── fetchers/        # 数据抓取
│   │   └── scheduler/       # 定时任务
│   ├── content-script/       # Content Script
│   │   ├── index.ts         # 入口文件
│   │   ├── components/      # UI组件
│   │   └── hooks/          # 自定义hooks
│   ├── popup/               # Popup页面
│   │   ├── index.html       # HTML入口
│   │   ├── index.tsx       # React入口
│   │   └── components/      # UI组件
│   └── shared/              # 共享代码
│       ├── types/           # 类型定义
│       ├── utils/           # 工具函数
│       └── constants/       # 常量
├── public/
│   └── icons/              # 图标
├── tests/                   # 测试文件
│   ├── unit/              # 单元测试
│   ├── integration/         # 集成测试
│   └── e2e/               # E2E测试
├── manifest.json             # Chrome扩展配置
├── package.json              # 项目配置
├── tsconfig.json            # TypeScript配置
├── vite.config.ts           # Vite配置
├── .eslintrc.cjs           # ESLint配置
├── .prettierrc             # Prettier配置
├── .gitignore               # Git忽略
└── README.md               # 项目文档
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: 创建项目目录结构"
```

---

## 3. 后端开发工程师部分

### 3.1 数据抓取模块

#### Task 8: 实现API数据抓取

**Files:**
- Create: `finance-news-chrome-plugin/src/background/fetchers/api-fetcher.ts`
- Create: `finance-news-chrome-plugin/src/background/fetchers/types.ts`

**Step 1: 编写types.ts**

```typescript
export interface NewsItem {
  id: string
  title: string
  content?: string
  source: string
  category: 'finance' | 'domestic' | 'international'
  url?: string
  publishTime: string
}

export interface FetchResult {
  success: boolean
  data?: NewsItem[]
  error?: string
}

export interface NewsSource {
  name: string
  url: string
  type: 'api' | 'crawler'
  category: 'finance' | 'domestic' | 'international'
}
```

**Step 2: 编写api-fetcher.ts**

```typescript
import axios, { AxiosInstance } from 'axios'

export class APIFetcher {
  private client: AxiosInstance
  private rateLimit: number

  constructor() {
    this.client = axios.create({
      timeout: 30000,
    validateStatus: (status) => status < 500,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })
    this.rateLimit = 2000
  }

  async fetchFromTencent(): Promise<FetchResult> {
    try {
      const response = await this.client.get('https://api.finance.qq.com/api/news/list', {
        params: {
          limit: 20,
          page: 1,
        },
      })

      const data = response.data.data?.list || []

      return {
        success: true,
        data: data.map((item: any) => ({
          id: item.id || Date.now().toString(),
          title: item.title || '',
          content: item.summary || item.digest,
          source: '腾讯新闻',
          category: this.categorizeNews(item),
          url: item.url,
          publishTime: item.publishTime || item.pubtime || new Date().toISOString(),
        })),
      }
    } catch (error: any) {
      console.error('腾讯新闻API调用失败:', error)
      return {
        success: false,
        error: error.message || 'API调用失败',
      }
    }
  }

  async fetchFromSina(): Promise<FetchResult> {
    try {
      const response = await this.client.get('https://finance.sina.com.cn/api/jsonp.php', {
        params: {
          limit: 20,
        },
      })

      const data = response.data?.list || []

      return {
        success: true,
        data: data.map((item: any) => ({
          id: item.id || Date.now().toString(),
          title: item.title || '',
          content: item.summary || item.digest,
          source: '新浪财经',
          category: this.categorizeNews(item),
          url: item.url,
          publishTime: new Date().toISOString(),
        })),
      }
    } catch (error: any) {
      console.error('新浪财经API调用失败:', error)
      return {
        success: false,
        error: error.message || 'API调用失败',
      }
    }
  }

  private categorizeNews(item: any): 'finance' | 'domestic' | 'international' {
    const keywords = {
      finance: ['股票', '基金', '股市', '经济', '汇率', '贸易', '通胀', '利率', 'GDP', '财报'],
      domestic: ['政府', '政策', '两会', '部委', '民生', '反腐', '人事'],
      international: ['美国', '欧盟', '日本', '韩国', '中美', '地缘政治', '制裁'],
    }

    const text = `${item.title} ${item.summary || item.digest || ''}`.toLowerCase()

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some((w: string) => text.includes(w.toLowerCase()))) {
        return category as 'finance' | 'domestic' | 'international'
      }
    }

    return 'finance' // 默认
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const apiFetcher = new APIFetcher()
```

**Step 3: Commit**

```bash
git add src/background/fetchers/api-fetcher.ts src/background/fetchers/types.ts
git commit -m "feat: 实现API数据抓取"
```

---

### 3.2 数据库模块

#### Task 9: 实现sqlite.js数据库封装

**Files:**
- Create: `finance-news-chrome-plugin/src/background/database/db.ts`
- Create: `finance-news-chrome-plugin/src/background/database/queries.ts`

**Step 1: 编写db.ts**

```typescript
import initSqlJs, { Database } from 'sql.js'

let dbInstance: Database | null = null

export async function initDatabase(): Promise<void> {
  if (dbInstance) return

  const SQL = await initSqlJs({
    locateFile: (file) => file,
  })

  dbInstance = new SQL(DB)

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      source TEXT,
      category TEXT CHECK(category IN ('finance', 'domestic', 'international')),
      url TEXT,
      publish_time TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      UNIQUE(title, url)
    );

    CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prediction_type TEXT NOT NULL CHECK(prediction_type IN ('open_forecast', 'close_advice')),
      prediction_date TEXT NOT NULL,
      result TEXT NOT NULL,
      reason TEXT,
      confidence REAL NOT NULL CHECK(confidence >= 0 AND confidence <= 1),
      created_at INTEGER NOT NULL,
      UNIQUE(prediction_type, prediction_date)
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_news_publish_time ON news(publish_time DESC);
    CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
    CREATE INDEX IF NOT EXISTS idx_predictions_date ON predictions(prediction_date DESC);
  `)

  console.log('[Database] 数据库初始化完成')
}

export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.close()
    dbInstance = null
  }
}

export function getDatabase(): Database {
  if (!dbInstance) {
    throw new Error('数据库未初始化，请先调用initDatabase()')
  }
  return dbInstance
}

export interface NewsItemDB {
  id: number
  title: string
  content: string | null
  source: string
  category: 'finance' | 'domestic' | 'international'
  url: string | null
  publish_time: string
  created_at: number
}

export interface PredictionItemDB {
  id: number
  prediction_type: 'open_forecast' | 'close_advice'
  prediction_date: string
  result: string
  reason: string | null
  confidence: number
  created_at: number
}
```

**Step 2: 编写queries.ts**

```typescript
import type { NewsItemDB, PredictionItemDB } from './db'

export async function insertNews(db: any, news: {
  title: string
  content?: string
  source: string
  category: 'finance' | 'domestic' | 'international'
  url?: string
  publishTime: string
}): Promise<number> {
  const result = await db.run(
    'INSERT INTO news (title, content, source, category, url, publish_time, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      news.title,
      news.content || null,
      news.source,
      news.category,
      news.url || null,
      news.publishTime,
      Date.now(),
    ]
  )
  return result.lastInsertRowid as number
}

export async function getLatestNews(db: any, limit: number = 20): Promise<NewsItemDB[]> {
  const result = await db.query(
    'SELECT * FROM news ORDER BY publish_time DESC LIMIT ?',
    [limit]
  )
  return result as NewsItemDB[]
}

export async function insertPrediction(
  db: any,
  prediction: {
    prediction_type: 'open_forecast' | 'close_advice'
    prediction_date: string
    result: string
    reason: string
    confidence: number
  }
): Promise<number> {
  const result = await db.run(
    'INSERT OR REPLACE INTO predictions (prediction_type, prediction_date, result, reason, confidence, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      prediction.prediction_type,
      prediction.prediction_date,
      prediction.result,
      prediction.reason,
      prediction.confidence,
      Date.now(),
    ]
  )
  return result.lastInsertRowid as number
}

export async function getPredictionByTypeAndDate(
  db: any,
  prediction_type: 'open_forecast' | 'close_advice',
  prediction_date: string
): Promise<PredictionItemDB | null> {
  const result = await db.get(
    'SELECT * FROM predictions WHERE prediction_type = ? AND prediction_date = ?',
    [prediction_type, prediction_date]
  )
  return result as PredictionItemDB | null
}

export async function getAllPredictions(db: any, limit: number = 30): Promise<PredictionItemDB[]> {
  const result = await db.query(
    'SELECT * FROM predictions ORDER BY created_at DESC LIMIT ?',
    [limit]
  )
  return result as PredictionItemDB[]
}

export async function getNewsByCategory(
  db: any,
  category: 'finance' | 'domestic' | 'international',
  limit: number = 20
): Promise<NewsItemDB[]> {
  const result = await db.query(
    'SELECT * FROM news WHERE category = ? ORDER BY publish_time DESC LIMIT ?',
    [category, limit]
  )
  return result as NewsItemDB[]
}
```

**Step 3: Commit**

```bash
git add src/background/database/db.ts src/background/database/queries.ts
git commit -m "feat: 实现sqlite.js数据库封装"
```

---

### 3.3 定时任务调度器

#### Task 10: 实现chrome.alarms定时调度

**Files:**
- Create: `finance-news-chrome-plugin/src/background/scheduler/alarms.ts`
- Create: `finance-news-chrome-plugin/src/background/scheduler/types.ts`

**Step 1: 编写types.ts**

```typescript
export interface AlarmHandler {
  (alarm: chrome.alarms.Alarm): void | Promise<void>
}

export const ALARM_NAMES = {
  OPEN_FORECAST: 'open_forecast',      // 9:00开盘预测
  CLOSE_ADVICE: 'close_advice',          // 14:00尾盘建议
  NEWS_FETCH: 'news_fetch',            // 每5分钟抓取新闻
} as const

export interface ScheduledTask {
  name: string
  handler: AlarmHandler
  periodInMinutes: number
  delayInMinutes?: number
}
```

**Step 2: 编写alarms.ts**

```typescript
import { ALARM_NAMES } from './types'

export async function initializeAlarms(): Promise<void> {
  // 清除已有的alarms
  chrome.alarms.clearAll()

  // 设置9:00开盘预测
  await scheduleDailyAlarm(ALARM_NAMES.OPEN_FORECAST, 9, 0, () => {
    console.log('[Scheduler] 执行9:00开盘预测')
    // TODO: 调用AI预测模块
  })

  // 设置14:00尾盘建议
  await scheduleDailyAlarm(ALARM_NAMES.CLOSE_ADVICE, 14, 0, () => {
    console.log('[Scheduler] 执行14:00尾盘建议')
    // TODO: 调用AI预测模块
  })

  // 设置新闻抓取（每5分钟）
  chrome.alarms.create(ALARM_NAMES.NEWS_FETCH, {
    periodInMinutes: 5,
  })

  console.log('[Scheduler] 定时任务初始化完成')
}

async function scheduleDailyAlarm(
  name: string,
  hour: number,
  minute: number,
  handler: () => void | Promise<void>
): Promise<void> {
  const now = new Date()
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  )

  // 如果目标时间已过，设置为明天
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1)
  }

  chrome.alarms.create(name, {
    when: target.getTime(),
    periodInMinutes: 24 * 60, // 每24小时
  })

  // 立即执行一次
  setTimeout(() => {
    handler({ name })
  }, 0)
}

export function registerAlarmListener(): void {
  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('[Scheduler] Alarm触发:', alarm.name)

    switch (alarm.name) {
      case ALARM_NAMES.OPEN_FORECAST:
        // TODO: 调用开盘预测逻辑
        break
      case ALARM_NAMES.CLOSE_ADVICE:
        // TODO: 调用尾盘建议逻辑
        break
      case ALARM_NAMES.NEWS_FETCH:
        // TODO: 调用新闻抓取逻辑
        break
      default:
        console.warn('[Scheduler] 未知的alarm:', alarm.name)
    }
  })
}
```

**Step 3: Commit**

```bash
git add src/background/scheduler/alarms.ts src/background/scheduler/types.ts
git commit -m "feat: 实现chrome.alarms定时调度"
```

---

## 4. 前端开发工程师A部分 (Content Script)

### 4.1 Content Script入口

#### Task 11: 实现Content Script注入

**Files:**
- Create: `finance-news-chrome-plugin/src/content-script/index.ts`
- Create: `finance-news-chrome-plugin/src/content-script/components/FinancePanel.tsx`
- Create: `finance-news-chrome-plugin/src/content-script/hooks/useBackgroundCommunication.ts`

**Step 1: 编写index.ts**

```typescript
import React from 'react'
import { createRoot } from 'react-dom/client'
import FinancePanel from './components/FinancePanel'
import './styles/main.css'

// 创建Shadow DOM避免样式污染
function initContentScript() {
  const shadowHost = document.createElement('div')
  shadowHost.id = 'finance-news-shadow-host'
  shadowHost.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
  `

  document.body.appendChild(shadowHost)

  const shadowRoot = shadowHost.attachShadow({ mode: 'open' })

  const rootContainer = document.createElement('div')
  shadowRoot.appendChild(rootContainer)

  const root = createRoot(rootContainer)
  root.render(<FinancePanel />)
}

// 页面加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentScript)
} else {
  initContentScript()
}
```

**Step 2: 编写main.css**

```css
#finance-news-shadow-host {
  all: initial;
}

.finance-panel {
  width: 380px;
  max-height: 600px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.finance-panel.collapsed {
  width: auto;
}

.finance-panel.collapsed .panel-content {
  display: none;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.icon-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 1s linear infinite;
}
```

**Step 3: 编写FinancePanel.tsx**

```typescript
import { useState } from 'react'
import { FiRefreshCw, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface FinancePanelProps {}

export const FinancePanel: React.FC<FinancePanelProps> = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'news' | 'predictions'>('news')

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // TODO: 调用Background刷新数据
      console.log('[Panel] 刷新数据')
    } finally {
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  return (
    <div className={`finance-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="panel-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="panel-title">AI金融新闻</span>
        <div className="panel-actions">
          <button
            className="icon-button"
            onClick={(e) => e.stopPropagation()}
            disabled={isRefreshing}
            title="刷新数据"
          >
            <FiRefreshCw className={isRefreshing ? 'spinning' : ''} />
          </button>
          <button
            className="icon-button"
            onClick={(e) => e.stopPropagation()}
            title={isExpanded ? '收起' : '展开'}
          >
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="panel-content">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              新闻
            </button>
            <button
              className={`tab-button ${activeTab === 'predictions' ? 'active' : ''}`}
              onClick={() => setActiveTab('predictions')}
            >
              AI预测
            </button>
          </div>

          {activeTab === 'news' && (
            <div className="news-content">
              <p>新闻列表（待实现）</p>
            </div>
          )}

          {activeTab === 'predictions' && (
            <div className="predictions-content">
              <div className="prediction-card">
                <div className="card-title">今日开盘预测</div>
                <p>等待9:00预测...</p>
              </div>
              <div className="prediction-card">
                <div className="card-title">尾盘操作建议</div>
                <p>等待14:00建议...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

**Step 4: Commit**

```bash
git add src/content-script/index.ts src/content-script/components/FinancePanel.tsx src/content-script/styles/main.css
git commit -m "feat: 实现Content Script主面板"
```

---

## 5. 前端开发工程师B部分 (Popup)

### 5.1 Popup页面框架

#### Task 12: 实现Popup页面

**Files:**
- Create: `finance-news-chrome-plugin/src/popup/index.html`
- Create: `finance-news-chrome-plugin/src/popup/index.tsx`
- Create: `finance-news-chrome-plugin/src/popup/components/Settings.tsx`
- Create: `finance-news-chrome-plugin/src/popup/components/HistoryList.tsx`
- Create: `finance-news-chrome-plugin/src/popup/components/StatsView.tsx`

**Step 1: 编写index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI金融新闻 - 配置</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 400px;
      height: 500px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }

    #app {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./index.tsx"></script>
</body>
</html>
```

**Step 2: 编写index.tsx**

```typescript
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/popup.css'

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
```

**Step 3: 编写App.tsx**

```typescript
import { useState } from 'react'
import Settings from './components/Settings'
import HistoryList from './components/HistoryList'
import StatsView from './components/StatsView'

const App = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'history' | 'stats'>('settings')

  return (
    <div className="popup-container">
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          设置
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          历史
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          统计
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'history' && <HistoryList />}
        {activeTab === 'stats' && <StatsView />}
      </div>
    </div>
  )
}

export default App
```

**Step 4: Commit**

```bash
git add src/popup/index.html src/popup/index.tsx src/popup/components/
git commit -m "feat: 实现Popup页面框架"
```

---

## 6. AI集成工程师部分

### 6.1 智谱AI SDK集成

#### Task 13: 集成智谱AI SDK

**Files:**
- Create: `finance-news-chrome-plugin/src/background/ai/client.ts`
- Create: `finance-news-chrome-plugin/src/background/ai/prompts.ts`
- Create: `finance-news-chrome-plugin/src/background/ai/service.ts`
- Create: `finance-news-chrome-plugin/src/types/prediction.ts`

**Step 1: 安装依赖**

```bash
npm install zhipu-ai
```

**Step 2: 编写client.ts**

```typescript
import { ZhipuAI } from 'zhipu-ai'

let clientInstance: ZhipuAI | null = null

export async function getAIClient(): Promise<ZhipuAI> {
  if (!clientInstance) {
    const apiKey = await getApiKey()
    if (!apiKey) {
      throw new Error('智谱AI API密钥未配置')
    }

    clientInstance = new ZhipuAI({
      apiKey,
    })
  }
  return clientInstance
}

async function getApiKey(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['zhipuai_api_key'], (result) => {
      resolve(result.zhipuai_api_key || '')
    })
  })
}

export function resetAIClient(): void {
  clientInstance = null
}
```

**Step 3: 编写prompts.ts**

```typescript
export interface NewsItem {
  title: string
  content?: string
  source?: string
  category?: string
  publish_time?: string
}

export const buildOpenForecastPrompt = (news: NewsItem[], date: string): string => {
  const newsText = news.slice(0, 20)
    .map((item, index) => {
      const category = item.category || '未分类'
      const content = item.content ? `: ${item.content.substring(0, 100)}...` : ''
      return `${index + 1}. [${category}] ${item.title}${content}`
    })
    .join('\n')

  return `你是一位专业的股市分析师。请基于以下${date}的当日新闻，预测中国股市（上证指数）开盘后的走势。

**新闻列表：**
${newsText}

**分析要求：**
1. 综合分析市场情绪（积极/消极/中性）
2. 识别关键影响因素（政策、经济数据、国际事件等）
3. 给出明确的预测结果：看涨 或 看跌
4. 评估预测的置信度（0-1之间的数值，保留2位小数）
5. 用简短的语言说明预测理由（不超过100字）

**输出格式：**
请严格按照以下JSON格式返回，不要包含任何其他内容：
\`\`\`json
{
  "market_sentiment": "积极/消极/中性",
  "key_factors": ["因素1", "因素2", "因素3"],
  "result": "看涨/看跌",
  "confidence": 0.xx,
  "reason": "简短理由（不超过100字）"
}
\`\`\`

注意：
- 这是一个预测任务，不是投资建议
- 置信度应基于新闻的明确程度和影响力度
- 理由要简洁明了，突出核心逻辑`
}

export const buildCloseAdvicePrompt = (news: NewsItem[], date: string): string => {
  const newsText = news.slice(0, 20)
    .map((item, index) => {
      const category = item.category || '未分类'
      const content = item.content ? `: ${item.content.substring(0, 100)}...` : ''
      return `${index + 1}. [${category}] ${item.title}${content}`
    })
    .join('\n')

  return `你是一位专业的股市分析师。请基于以下${date}的当日新闻，给出尾盘操作建议。

**新闻列表：**
${newsText}

**分析要求：**
1. 综合分析市场整体状况和最新动态
2. 识别尾盘阶段的主要影响因素
3. 给出明确的操作建议：加仓、减仓 或 维持不动
4. 评估建议的置信度（0-1之间的数值，保留2位小数）
5. 用简短的语言说明建议理由（不超过100字）

**输出格式：**
请严格按照以下JSON格式返回，不要包含任何其他内容：
\`\`\`json
{
  "market_status": "强势/弱势/震荡",
  "key_factors": ["因素1", "因素2", "因素3"],
  "action": "加仓/减仓/维持不动",
  "confidence": 0.xx,
  "reason": "简短理由（不超过100字）"
}
\`\`\`

注意：
- 这是一个建议任务，不是投资建议
- 考虑尾盘特殊的时间窗口（临近收盘）
- 置信度应基于新闻的明确程度和市场状况`
}
```

**Step 4: 编写service.ts**

```typescript
import { getAIClient } from './client'
import { buildOpenForecastPrompt, buildCloseAdvicePrompt } from './prompts'
import type { NewsItem } from './prompts'

interface AIResponse {
  success: boolean
  data?: any
  error?: string
}

const parseAIResponse = (responseText: string): AIResponse => {
  try {
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || [null, responseText]
    if (!jsonMatch) {
      throw new Error('无法解析响应格式')
    }

    const jsonText = jsonMatch[1] || jsonMatch[0]
    const data = JSON.parse(jsonText)

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : '未知错误' }
  }
}

export const performOpenForecast = async (news: NewsItem[]): Promise<AIResponse> => {
  const date = new Date().toISOString().split('T')[0]
  const prompt = buildOpenForecastPrompt(news, date)

  const client = await getAIClient()

  try {
    const response = await client.chat.completions.create({
      model: 'glm-4-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return { success: false, error: 'AI响应为空' }
    }

    return parseAIResponse(content)
  } catch (error: any) {
    return { success: false, error: error.message || 'AI调用失败' }
  }
}

export const performCloseAdvice = async (news: NewsItem[]): Promise<AIResponse> => {
  const date = new Date().toISOString().split('T')[0]
  const prompt = buildCloseAdvicePrompt(news, date)

  const client = await getAIClient()

  try {
    const response = await client.chat.completions.create({
      model: 'glm-4-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return { success: false, error: 'AI响应为空' }
    }

    return parseAIResponse(content)
  } catch (error: any) {
    return { success: false, error: error.message || 'AI调用失败' }
  }
}

export const savePrediction = async (type: 'open_forecast' | 'close_advice', data: any): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [type]: data }, () => {
      resolve()
    })
  })
}

export const getPrediction = async (type: 'open_forecast' | 'close_advice'): Promise<any> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([type], (result) => {
      resolve(result[type] || null)
    })
  })
}
```

**Step 5: Commit**

```bash
git add src/background/ai/client.ts src/background/ai/prompts.ts src/background/ai/service.ts src/types/prediction.ts
git commit -m "feat: 集成智谱AI SDK"
```

---

## 7. 测试部分

### 7.1 测试框架配置

#### Task 14: 配置测试框架

**Files:**
- Create: `finance-news-chrome-plugin/vitest.config.ts`
- Create: `finance-news-chrome-plugin/tests/setup.ts`
- Create: `finance-news-chrome-plugin/tests/unit/background/ai/service.test.ts`

**Step 1: 编写vitest.config.ts**

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

**Step 2: 编写setup.ts**

```typescript
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

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
  },
} as unknown as typeof chrome)

global.AudioContext = class AudioContext {} as any
```

**Step 3: 编写service.test.ts**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { performOpenForecast, performCloseAdvice } from '@/background/ai/service'

// Mock zhipu-ai client
vi.mock('@/background/ai/client', () => ({
  getAIClient: vi.fn().mockResolvedValue({
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  }),
}))

describe('AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('performOpenForecast', () => {
    it('应该正确调用AI并返回结果', async () => {
      const { getAIClient } = await import('@/background/ai/client')
      const mockClient = await getAIClient.getAIClient()

      mockClient.chat.completions.create.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              market_sentiment: '积极',
              key_factors: ['政策利好'],
              result: '看涨',
              confidence: 0.75,
              reason: '利好消息推动市场',
            }),
          },
        }],
      })

      const result = await performOpenForecast([
        { title: '股市上涨', category: 'finance' },
      ])

      expect(result.success).toBe(true)
      expect(result.data?.result).toBe('看涨')
      expect(mockClient.chat.completions.create).toHaveBeenCalled()
    })

    it('应该在AI调用失败时返回错误', async () => {
      const { getAIClient } = await import('@/background/ai/client')
      const mockClient = await getAIClient.getAIClient()

      mockClient.chat.completions.create.mockRejectedValue(new Error('API调用失败'))

      const result = await performOpenForecast([
        { title: '测试新闻', category: 'finance' },
      ])

      expect(result.success).toBe(false)
      expect(result.error).toBe('API调用失败')
    })
  })

  describe('performCloseAdvice', () => {
    it('应该正确调用AI并返回结果', async () => {
      const { getAIClient } = await import('@/background/ai/client')
      const mockClient = await getAIClient.getAIClient()

      mockClient.chat.completions.create.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              market_status: '强势',
              key_factors: ['利好'],
              action: '加仓',
              confidence: 0.65,
              reason: '市场情绪积极',
            }),
          },
        }],
      })

      const result = await performCloseAdvice([
        { title: '测试新闻', category: 'finance' },
      ])

      expect(result.success).toBe(true)
      expect(result.data?.action).toBe('加仓')
    })
  })
})
```

**Step 4: Commit**

```bash
git add vitest.config.ts tests/setup.ts tests/unit/background/ai/service.test.ts
git commit -m "feat: 配置测试框架并编写AI服务测试"
```

---

## 8. 实施步骤总结

### Phase 1: 项目初始化 (预计1-2天)
- [ ] Task 1: 创建项目目录结构
- [ ] Task 2: 配置TypeScript
- [ ] Task 3: 创建manifest.json
- [ ] Task 4: 配置Vite + CRXJS
- [ ] Task 5: 配置ESLint
- [ ] Task 6: 配置Prettier
- [ ] Task 7: 创建所有必要的目录

### Phase 2: 数据层开发 (预计2-3天)
- [ ] Task 8: 实现API数据抓取
- [ ] Task 9: 实现sqlite.js数据库封装
- [ ] Task 10: 实现chrome.alarms定时调度

### Phase 3: 前端开发 - Content Script (预计2-3天)
- [ ] Task 11: 实现Content Script注入
- [ ] 新闻列表组件
- [ ] AI预测展示组件
- [ ] 面板展开/收起功能

### Phase 4: 前端开发 - Popup (预计2天)
- [ ] Task 12: 实现Popup页面框架
- [ ] 设置组件
- [ ] 历史记录组件
- [ ] 统计数据组件

### Phase 5: AI集成 (预计2-3天)
- [ ] Task 13: 集成智谱AI SDK
- [ ] Prompt模板设计
- [ ] AI响应解析
- [ ] 定时任务集成

### Phase 6: 测试 (预计2-3天)
- [ ] Task 14: 配置测试框架
- [ ] 单元测试编写
- [ ] 集成测试编写
- [ ] E2E测试编写

---

## 9. 验收标准总结

### MVP验收标准

1. **功能完整性**
   - 新闻数据抓取正常工作
   - 新闻列表展示正常
   - 分类筛选正常工作
   - 搜索功能正常工作
   - 9:00预测正常触发
   - 14:00建议正常触发
   - 面板展开/收起流畅

2. **AI分析**
   - AI调用成功率 ≥ 95%
   - 预测结果格式正确
   - 降级策略正常工作

3. **用户体验**
   - 界面加载时间 ≤ 3秒
   - 操作流程 ≤ 3步可到达核心功能
   - 没有明显的UI卡顿

4. **技术验收**
   - 插件可在Chrome商店发布
   - 无严重bug（P0级bug为0）
   - 通过Chrome扩展安全扫描
   - 代码覆盖率 ≥ 60%

5. **集成验收**
   - Background与Content Script通信正常
   - chrome.storage读写正常
   - chrome.alarms定时任务正常
   - 数据库操作正常

---

*文档创建日期: 2026-03-06*
