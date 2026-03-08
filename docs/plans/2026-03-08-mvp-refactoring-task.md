# Finance News Chrome Plugin - MVP重构任务计划

> **版本**: 1.0
> **创建日期**: 2026-03-08
> **任务类型**: MVP 版本重构为 React + TypeScript

---

## 📋 任务概述

### 当前状态
- **现有代码**: MVP 版本（HTML + 纯 JavaScript）
- **目标架构**: React 18 + TypeScript + Vite + CRXJS
- **功能范围**: 保持 MVP 功能不变，仅重构代码结构
- **AI 功能**: ❌ 移除（按简化版计划）

### 重构原则
1. **保持功能不变**: MVP 的所有功能逻辑保持一致
2. **提升代码质量**: TypeScript 类型安全，组件化架构
3. **遵循架构**: 按 docs/ 中的简化版架构组织代码
4. **分角色实施**: 按架构师、前端A/B、后端、测试工程师分工

---

## 📝 重构任务清单

### 阶段 1：架构师 - 基础架构搭建

#### 1.1 项目配置文件
- [ ] 创建 package.json
  ```json
  {
    "name": "finance-news-chrome-plugin",
    "version": "2.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "test": "vitest",
      "test:ui": "vitest --ui",
      "test:e2e": "playwright test"
    },
    "dependencies": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "zustand": "^4.5.2"
    },
    "devDependencies": {
      "@crxjs/vite-plugin": "^2.0.0",
      "@playwright/test": "^1.40.0",
      "@testing-library/react": "^14.3.1",
      "@types/chrome": "^0.0.257",
      "@types/react": "^18.3.1",
      "@types/react-dom": "^18.3.1",
      "typescript": "^5.6.2",
      "vite": "^5.4.8",
      "vitest": "^1.5.0"
    }
  }
  ```

- [ ] 创建 tsconfig.json
- [ ] 创建 tsconfig.node.json
- [ ] 创建 vite.config.ts
  ```typescript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import { crx } from '@crxjs/vite-plugin'

  export default defineConfig({
    plugins: [react(), crx({ manifest: './manifest.json' })],
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  })
  ```

- [ ] 创建 manifest.json（完整版，无 AI）
  ```json
  {
    "manifest_version": 3,
    "name": "AI金融信息推送 (简化版)",
    "version": "2.0.0",
    "permissions": ["storage", "alarms"],
    "background": {
      "service_worker": "src/background/index.ts",
      "type": "module"
    },
    "content_scripts": [
      {
        "matches": ["<all_urls>"],
        "js": ["dist/content-script/index.js"],
        "css": ["dist/content-script/panel.css"]
      }
    ],
    "action": {
      "default_popup": "dist/popup/index.html"
    },
    "options_page": "dist/options/index.html"
  }
  ```

- [ ] 创建 vitest.config.ts
- [ ] 创建 playwright.config.ts
- [ ] 创建 ESLint 和 Prettier 配置

#### 1.2 目录结构创建
- [ ] 创建 src/background/
- [ ] 创建 src/content-script/
- [ ] 创建 src/popup/
- [ ] 创建 src/options/
- [ ] 创建 src/shared/
- [ ] 创建 src/shared/types/
- [ ] 创建 src/shared/utils/
- [ ] 创建 src/shared/constants/
- [ ] 创建 src/store/
- [ ] 创建 tests/

---

### 阶段 2：后端工程师 - Background 重构

#### 2.1 迁移 MVP 功能到 TypeScript
- [ ] 重构 background/index.js → background/index.ts
  ```typescript
  // 保持 MVP 的功能逻辑
  // - 初始化统计数据
  // - 消息监听器
  // - 定时刷新任务
  ```

- [ ] 创建数据抓取服务（预留接口）
- [ ] 创建 Chrome Storage 封装
  ```typescript
  // src/shared/utils/storage.ts
  export const getNewsList = async () => { ... }
  export const setNewsList = async (news: News[]) => { ... }
  ```

- [ ] 创建类型定义
  ```typescript
  // src/shared/types/news.ts
  export interface News {
    id: string
    title: string
    content?: string
    source: string
    url?: string
    publish_time: string
  }

  export interface Stats {
    newsCount: number
    lastUpdate: string
  }
  ```

---

### 阶段 3：前端工程师A - Content Script 重构

#### 3.1 迁移 MVP 功能到 React + TSX
- [ ] 创建 Content Script 入口
  ```typescript
  // src/content-script/index.tsx
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import { FinancePanel } from './components/FinancePanel'

  const container = document.createElement('div')
  container.id = 'finance-news-root'
  document.body.appendChild(container)

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <FinancePanel />
    </React.StrictMode>
  )
  ```

- [ ] 创建 FinancePanel 组件
  ```tsx
  // src/content-script/components/FinancePanel.tsx
  - 可展开/收起的侧边栏面板
  - 固定在浏览器右侧
  - 平滑展开/收起动画
  ```

- [ ] 创建 PanelHeader 组件
  ```tsx
  // src/content-script/components/PanelHeader.tsx
  - 标题显示
  - 展开/收起按钮
  - 刷新按钮
  ```

- [ ] 创建 NewsList 组件
  ```tsx
  // src/content-script/components/NewsList.tsx
  - 新闻列表展示
  - 加载状态
  - 空状态
  ```

- [ ] 创建 NewsItem 组件
  ```tsx
  // src/content-script/components/NewsItem.tsx
  - 标题、来源、时间
  - Glassmorphism 样式
  ```

---

### 阶段 4：前端工程师B - Popup/Options 重构

#### 4.1 重构 Popup 页面
- [ ] 迁移 popup/index.html + index.js → popup/index.tsx
  ```typescript
  // src/popup/index.tsx
  - 主框架（Tab 导航）
  - Settings 组件
  - StatsView 组件
  ```

- [ ] 创建 Settings 组件
  ```tsx
  // src/popup/components/Settings.tsx
  - 新闻源开关
  - 更新间隔滑块
  - 保存按钮
  ```

- [ ] 创建 StatsView 组件
  ```tsx
  // src/popup/components/StatsView.tsx
  - 新闻总数
  - 最后更新时间
  - 基础统计卡片
  ```

#### 4.2 重构 Options 页面
- [ ] 迁移 options/index.html → options/index.tsx
  ```typescript
  // src/options/index.tsx
  - 详细的配置界面
  - 与 Popup 共享配置逻辑
  ```

---

### 阶段 5：测试工程师 - 测试配置

#### 5.1 测试框架搭建
- [ ] 配置 Vitest 测试环境
- [ ] 配置 Playwright E2E 测试
- [ ] 创建测试目录结构
- [ ] 创建 Mock 数据

#### 5.2 测试用例编写
- [ ] Background Service Worker 测试
- [ ] Content Script 组件测试
- [ ] Popup/Options 组件测试
- [ ] 数据存储操作测试

---

## 🎯 重构完成标准

### 功能完整性
- [ ] MVP 的所有功能保持不变
- [ ] Background 定时任务正常工作
- [ ] Content Script 面板可以展开/收起
- [ ] Popup 页面可以正常打开
- [ ] 配置保存功能正常

### 代码质量
- [ ] TypeScript 编译无错误
- [ ] ESLint 检查通过
- [ ] 单元测试覆盖率 ≥ 70%
- [ ] 组件采用 React Hooks 模式

### 架构一致性
- [ ] 按 docs/ 中的简化版架构组织
- [ ] 组件按职责分离
- [ ] 类型定义完整
- [ ] 工具函数独立模块

---

## 📅 执行顺序

1. **架构师**: 搭建项目基础架构
2. **后端工程师**: 重构 Background
3. **前端工程师A**: 重构 Content Script
4. **前端工程师B**: 重构 Popup/Options
5. **测试工程师**: 配置测试和编写用例

---

## 🔗 相关文档

- [../README.md](../README.md) - 项目总览
- [../team-structure.md](../team-structure.md) - 团队结构
- [2026-03-08-simplified-implementation-plan.md](./2026-03-08-simplified-implementation-plan.md) - 简化版实施计划
- [../backend/README.md](../backend/README.md) - 后端开发文档
- [../frontend-content-script/README.md](../frontend-content-script/README.md) - Content Script 文档
- [../frontend-popup/README.md](../frontend-popup/README.md) - Popup 文档

---

*文档创建日期: 2026-03-08*
