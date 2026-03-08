# 架构师 - 简化版角色职责

> **文档版本**: v2.0 (简化版)
> **更新日期**: 2026-03-08
> **变更说明**: 移除AI集成，使用chrome.storage替代sql.js

---

## 🏗 角色定义

**姓名**: 架构师

**核心职责**:
- 项目脚手架初始化
- 开发环境配置
- 构建配置和打包脚本
- 目录结构规划
- 技术选型决策

---

## 📋 完成工作

### Phase 1: 项目初始化 ✅ 已完成
- [x] Task 1: 创建项目目录结构
- [x] Task 2: 配置TypeScript
- [x] Task 3: 创建manifest.json
- [x] Task 4: 配置Vite + CRXJS
- [x] Task 5: 配置ESLint
- [x] Task 6: 配置Prettier
- [x] Task 7: Git hooks配置 (husky + lint-staged)
- [x] Task 8: 创建完整的目录结构

---

## 📚 参考文档

**主实施计划**: [../plans/2026-03-08-simplified-implementation-plan.md](../plans/2026-03-08-simplified-implementation-plan.md)

**相关章节**:
- 第2节：架构师部分
  - 2.1 项目初始化
  - 2.2 TypeScript配置
  - 2.3 Chrome扩展配置（manifest.json）
  - 2.4 Vite配置
  - 2.5 ESLint配置
  - 2.6 Prettier配置
  - 2.7 项目目录结构

---

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../product-manager/README.md](../product-manager/README.md) - 产品需求和功能规格
- [../ui-ux-designer/README.md](../ui-ux-designer/README.md) - 设计系统和组件规范

---

## 🏗 项目目录结构（简化版）

```
finance-news-chrome-plugin/
├── src/
│   ├── background/           # Background Service Worker
│   │   ├── index.ts         # 入口文件
│   │   ├── database/        # Chrome Storage封装
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
│   ├── options/             # Options页面
│   │   ├── index.html       # HTML入口
│   │   └── index.tsx       # React入口
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
└── README.md               # 项目文档
```

---

## 🎯 技术栈（简化版）

- **前端框架**: React 18 + TypeScript
- **Chrome扩展**: Manifest V3
- **状态管理**: Zustand
- **数据存储**: Chrome Storage API
- **构建工具**: Vite + CRXJS
- **测试框架**: Vitest + Playwright
- **代码规范**: ESLint + Prettier

---

## 🔄 技术选型变更说明

| 技术组件 | 原版选择 | 简化版选择 | 变更原因 |
|---------|---------|-----------|---------|
| **AI服务** | zhipu-ai SDK | ❌ **移除** | 不再需要AI |
| **数据库** | sql.js (SQLite WASM) | ✅ **改为** Chrome Storage | 简化架构，减少依赖 |
| **数据抓取** | fetch/axios | ✅ **保留** | 核心功能 |

---

## 🚀 工作流程

### 1. 项目初始化阶段 ✅ 已完成
- 搭建脚手架
- 配置开发环境
- 创建目录结构

### 2. 技术选型确认
- 与产品经理确认需求
- 与UI/UX设计师确认设计要求
- 评估技术方案的可行性

### 3. 环境搭建
- 配置ESLint和Prettier
- 配置Git hooks
- 编写项目README

---

## ✅ 交付物

- [x] TypeScript配置文件 (tsconfig.json, tsconfig.node.json)
- [x] Chrome扩展manifest.json
- [x] Vite构建配置 (vite.config.ts)
- [x] ESLint和Prettier配置 (.eslintrc.cjs, .prettierrc)
- [x] 项目目录结构规划
- [x] 配置脚本和命令
- [x] 所有入口文件和基础代码
- [x] 类型定义、常量、工具函数
- [x] 状态管理Store
- [x] 共享模块
- [x] 样式系统
- [x] VSCode配置

---

## 📦 关键配置文件

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "AI金融信息推送",
  "version": "1.0.0",
  "description": "财经新闻智能聚合和推送插件",
  "permissions": [
    "storage"
  ],
  "host_permissions": [
    "https://*/*",
    "http://*/*"
  ],
  "action": {
    "default_popup": "src/popup/index.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "options_page": "src/options/index.html",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: './manifest.json'
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
```

---

## 📂 目录说明

### src/background/
Background Service Worker，负责：
- 数据抓取调度
- Chrome Storage读写
- 定时任务管理
- 消息通信

### src/content-script/
Content Script，负责：
- 注入到页面
- 创建Shadow DOM
- 渲染侧边栏面板
- 与Background通信

### src/popup/
Popup页面，负责：
- 配置界面
- 统计展示

### src/options/
Options页面，负责：
- 详细的配置选项
- 数据源管理

---

*文档创建日期: 2026-03-06*
*更新日期: 2026-03-08（简化版）*
