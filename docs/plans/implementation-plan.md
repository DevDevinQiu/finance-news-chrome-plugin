# AI金融信息推送Chrome插件 - 项目脚手架实施计划

> 文档创建日期: 2026-03-06
> 负责人: 架构师 (finance-news-architect)
> 预计完成时间: 1-2天

---

## 一、概述

本文档详细描述了AI金融信息推送Chrome插件项目的脚手架搭建步骤，包括项目初始化、开发环境配置、代码规范设置、Git hooks配置和目录结构规划。

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | >=18.0.0 | 运行环境 |
| Vite | ^5.0.0 | 构建工具 |
| CRXJS | ^2.0.0 | Chrome扩展开发框架 |
| TypeScript | ^5.0.0 | 类型系统 |
| React | ^18.2.0 | UI框架 |
| ESLint | ^8.56.0 | 代码检查 |
| Prettier | ^3.1.0 | 代码格式化 |
| Husky | ^8.0.0 | Git hooks |
| lint-staged | ^15.0.0 | 暂存文件检查 |

---

## 二、项目初始化

### 2.1 创建项目目录

```bash
# 在 D:/MenusifuStore/finance-news-chrome-plugin 目录下
cd finance-news-chrome-plugin

# 初始化 Git 仓库（如果尚未初始化）
git init
```

### 2.2 初始化 package.json

```bash
npm init -y
```

### 2.3 安装核心依赖

```bash
# Vite + CRXJS + TypeScript
npm install --save-dev vite @crxjs/vite-plugin typescript

# React 相关
npm install react react-dom
npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react

# 构建工具
npm install --save-dev @types/node vite-plugin-static-copy cross-env
```

### 2.4 安装开发工具

```bash
# ESLint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks

# Prettier
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Git hooks
npm install --save-dev husky lint-staged

# 测试框架
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

---

## 三、TypeScript 配置

### 3.1 创建 tsconfig.json

在项目根目录创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/background/*": ["src/background/*"],
      "@/content-script/*": ["src/content-script/*"],
      "@/popup/*": ["src/popup/*"],
      "@/shared/*": ["src/shared/*"],
      "@/store/*": ["src/store/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/constants/*": ["src/constants/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### 3.2 创建 tsconfig.node.json

在项目根目录创建 `tsconfig.node.json`：

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

---

## 四、Vite + CRXJS 配置

### 4.1 创建 vite.config.ts

在项目根目录创建 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
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
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['antd'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
```

### 4.2 创建 manifest.json

在项目根目录创建 `manifest.json`：

```json
{
  "manifest_version": 3,
  "name": "AI金融信息推送",
  "version": "1.0.0",
  "description": "基于智谱AI的财经新闻智能分析和股市预测插件",
  "permissions": [
    "storage",
    "alarms",
    "activeTab"
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
      "js": ["src/content-script/index.tsx"],
      "css": ["src/content-script/index.css"]
    }
  ],
  "action": {
    "default_popup": "src/popup/index.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

---

## 五、ESLint 配置

### 5.1 创建 .eslintrc.cjs

在项目根目录创建 `.eslintrc.cjs`：

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
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.config.js',
    '*.config.ts',
  ],
}
```

### 5.2 创建 .eslintignore

在项目根目录创建 `.eslintignore`：

```
dist
node_modules
*.config.js
*.config.ts
coverage
build
```

---

## 六、Prettier 配置

### 6.1 创建 .prettierrc

在项目根目录创建 `.prettierrc`：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 6.2 创建 .prettierignore

在项目根目录创建 `.prettierignore`：

```
dist
node_modules
coverage
build
*.config.js
*.config.ts
package-lock.json
pnpm-lock.yaml
```

---

## 七、Git Hooks 配置

### 7.1 初始化 Husky

```bash
npx husky install
npm pkg set scripts.prepare="husky install"
```

### 7.2 创建 pre-commit hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 7.3 创建 commit-msg hook（可选）

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

### 7.4 配置 lint-staged

在 `package.json` 中添加 `lint-staged` 配置：

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 八、目录结构规划

### 8.1 完整目录结构

```
finance-news-chrome-plugin/
├── .husky/                          # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── .vscode/                         # VSCode 配置
│   ├── settings.json
│   └── extensions.json
├── docs/                            # 项目文档
│   ├── plans/                       # 实施计划
│   │   └── implementation-plan.md
│   ├── team-structure.md
│   └── design.md
├── icons/                           # 图标资源
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── public/                          # 静态资源
├── scripts/                         # 构建脚本
│   ├── build.js
│   └── dev.js
├── src/                             # 源代码
│   ├── background/                  # Service Worker
│   │   ├── index.ts                 # 主入口
│   │   ├── fetchers/                # 数据抓取
│   │   │   ├── apiFetcher.ts
│   │   │   └── crawlerFetcher.ts
│   │   ├── database/                # 数据库操作
│   │   │   ├── db.ts
│   │   │   └── migrations.ts
│   │   ├── ai/                      # AI 集成
│   │   │   ├── client.ts
│   │   │   └── prompts.ts
│   │   ├── scheduler/               # 定时任务
│   │   │   └── alarms.ts
│   │   └── utils/                   # 工具函数
│   │       ├── logger.ts
│   │       └── retry.ts
│   ├── content-script/              # Content Script
│   │   ├── index.tsx                # 主入口
│   │   ├── index.css                # 样式
│   │   └── components/              # UI 组件
│   │       ├── FinancePanel.tsx
│   │       ├── PanelHeader.tsx
│   │       ├── TabNavigation.tsx
│   │       ├── NewsContent.tsx
│   │       ├── PredictionsContent.tsx
│   │       └── shared/              # 共享组件
│   │           ├── NewsList.tsx
│   │           ├── NewsItem.tsx
│   │           └── Badge.tsx
│   ├── popup/                       # Popup 页面
│   │   ├── index.html
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── components/
│   │       ├── SettingsForm.tsx
│   │       ├── HistoryList.tsx
│   │       └── StatsView.tsx
│   ├── components/                  # 共享组件
│   │   └── ui/                      # UI 基础组件
│   ├── store/                       # 状态管理
│   │   ├── index.ts
│   │   ├── newsStore.ts
│   │   └── predictionStore.ts
│   ├── types/                       # TypeScript 类型
│   │   ├── index.ts
│   │   ├── news.ts
│   │   ├── prediction.ts
│   │   └── extension.ts
│   ├── utils/                       # 工具函数
│   │   ├── time.ts
│   │   ├── storage.ts
│   │   └── validation.ts
│   ├── constants/                   # 常量
│   │   ├── api.ts
│   │   ├── categories.ts
│   │   └── config.ts
│   ├── shared/                      # 共享代码
│   │   ├── messaging.ts             # 消息通信
│   │   └── api-client.ts            # API 客户端
│   └── assets/                      # 资源文件
│       └── styles/
│           ├── variables.css
│           └── global.css
├── tests/                           # 测试文件
│   ├── unit/
│   │   ├── utils/
│   │   │   └── time.test.ts
│   │   ├── store/
│   │   │   └── newsStore.test.ts
│   │   └── background/
│   │       ├── fetchers.test.ts
│   │       └── database.test.ts
│   ├── integration/
│   │   └── messaging.test.ts
│   ├── e2e/
│   │   └── main.spec.ts
│   └── setup.ts
├── .editorconfig                    # 编辑器配置
├── .eslintrc.cjs                    # ESLint 配置
├── .eslintignore                    # ESLint 忽略
├── .prettierrc                      # Prettier 配置
├── .prettierignore                  # Prettier 忽略
├── .gitignore                       # Git 忽略
├── tsconfig.json                    # TypeScript 配置
├── tsconfig.node.json               # Node TypeScript 配置
├── vite.config.ts                   # Vite 配置
├── vitest.config.ts                 # Vitest 配置
├── playwright.config.ts             # Playwright 配置
├── manifest.json                    # Chrome 扩展清单
├── package.json                     # 项目配置
├── README.md                        # 项目说明
└── PROGRESS.md                      # 进度追踪
```

### 8.2 目录职责说明

| 目录 | 职责 |
|------|------|
| `.husky/` | Git hooks 脚本 |
| `.vscode/` | VSCode 工作区配置 |
| `docs/` | 项目文档 |
| `icons/` | Chrome 扩展图标 |
| `public/` | 静态资源（不经过打包） |
| `scripts/` | 构建和部署脚本 |
| `src/background/` | Service Worker，数据抓取、AI 调用、定时任务 |
| `src/content-script/` | 注入页面的脚本，UI 面板 |
| `src/popup/` | 扩展弹窗页面 |
| `src/components/` | 跨模块共享的 React 组件 |
| `src/store/` | Zustand 状态管理 |
| `src/types/` | TypeScript 类型定义 |
| `src/utils/` | 纯函数工具库 |
| `src/constants/` | 常量定义 |
| `src/shared/` | 前后端共享代码 |
| `tests/` | 测试文件 |

---

## 九、package.json 完整配置

在项目根目录创建/更新 `package.json`：

```json
{
  "name": "finance-news-chrome-plugin",
  "version": "1.0.0",
  "description": "AI金融信息推送Chrome插件 - 基于智谱AI的财经新闻智能分析和股市预测",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "prepare": "husky install",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "sql.js": "^1.10.0",
    "dayjs": "^1.11.0"
  },
  "devDependencies": {
    "@crxjs/vite-plugin": "^2.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.1.0",
    "@types/chrome": "^0.0.250",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@vitest/coverage-v8": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "cross-env": "^7.0.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "husky": "^8.0.0",
    "jsdom": "^23.0.0",
    "lint-staged": "^15.2.0",
    "playwright": "^1.40.0",
    "prettier": "^3.1.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vite-plugin-static-copy": "^1.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 十、其他配置文件

### 10.1 创建 .gitignore

```gitignore
# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml
yarn.lock

# Build outputs
dist/
build/
out/

# IDE
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
*.lcov

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*

# Temporary
*.tmp
.cache/
```

### 10.2 创建 .editorconfig

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2
```

### 10.3 创建 vitest.config.ts

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
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.{ts,js}',
        '**/dist/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

### 10.4 创建 playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 10.5 创建 VSCode 配置

**.vscode/settings.json**:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}
```

**.vscode/extensions.json**:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 10.6 创建 tests/setup.ts

```typescript
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock chrome API
global.chrome = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
  alarms: {
    create: vi.fn(),
    clear: vi.fn(),
    onAlarm: {
      addListener: vi.fn(),
    },
  },
} as any
```

---

## 十一、开发环境配置说明

### 11.1 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Chrome >= 120 (Manifest V3 支持)
- Git >= 2.0

### 11.2 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在 Chrome 中加载扩展
# - 打开 chrome://extensions/
# - 启用"开发者模式"
# - 点击"加载已解压的扩展程序"
# - 选择项目的 dist 目录
```

### 11.3 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发模式，支持热更新 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 错误 |
| `npm run format` | 格式化代码 |
| `npm run test` | 运行单元测试 |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run test:e2e` | 运行 E2E 测试 |
| `npm run type-check` | TypeScript 类型检查 |

---

## 十二、检查清单

完成脚手架搭建后，请确认以下事项：

### 基础配置
- [ ] package.json 已创建，包含所有依赖和脚本
- [ ] tsconfig.json 和 tsconfig.node.json 已创建
- [ ] vite.config.ts 已配置 CRXJS 插件
- [ ] manifest.json 已创建，配置正确的权限

### 代码规范
- [ ] .eslintrc.cjs 已配置 React 和 TypeScript 规则
- [ ] .prettierrc 已配置代码格式化规则
- [ ] .eslintignore 和 .prettierignore 已创建

### Git Hooks
- [ ] Husky 已初始化
- [ ] pre-commit hook 已配置 lint-staged
- [ ] commit-msg hook 已配置（可选）
- [ ] lint-staged 在 package.json 中已配置

### 目录结构
- [ ] 所有主要目录已创建
- [ ] 目录职责明确，符合设计文档

### 测试配置
- [ ] vitest.config.ts 已创建
- [ ] playwright.config.ts 已创建
- [ ] tests/setup.ts 已创建

### 文档
- [ ] README.md 已更新开发环境说明
- [ ] .gitignore 已配置
- [ ] .editorconfig 已创建

### 验证命令
- [ ] `npm run dev` 可以正常启动
- [ ] `npm run build` 可以成功构建
- [ ] `npm run lint` 可以正常运行
- [ ] `npm run test` 可以运行测试
- [ ] `npm run format` 可以格式化代码
- [ ] Git commit 时可以触发 lint-staged

---

## 十三、移交说明

### 13.1 移交对象

| 角色 | 移交内容 |
|------|----------|
| 产品经理 | 项目可运行，可以进行需求验证 |
| UI/UX 设计师 | 项目结构清晰，可以开始实现设计 |
| 前端开发工程师 A/B | 完整的开发环境，可以开始编码 |
| 后端开发工程师 | 目录结构清晰，可以开始数据抓取实现 |
| AI 集成工程师 | 项目可运行，可以开始 AI 集成 |
| 测试开发工程师 | 测试框架已配置，可以开始编写测试 |

### 13.2 注意事项

1. **首次加载扩展**：开发模式下，每次修改代码后需要重新加载扩展
2. **热更新限制**：CRXJS 的热更新有部分限制，background 脚本修改需要手动重载
3. **权限配置**：后续添加新的权限时，记得更新 manifest.json
4. **数据库初始化**：首次运行需要初始化 SQLite 数据库

---

## 十四、后续优化建议

1. **CI/CD 配置**：添加 GitHub Actions 或 GitLab CI，自动运行测试和构建
2. **代码生成**：配置 Plop 或 Hygen，快速生成组件和模块
3. **文档生成**：配置 TypeDoc，自动生成 API 文档
4. **性能监控**：添加性能监控和错误追踪（如 Sentry）
5. **更新机制**：实现扩展自动更新机制

---

*文档创建日期: 2026-03-06*
*负责人: 架构师 (finance-news-architect)*
*文档版本: 1.0*
