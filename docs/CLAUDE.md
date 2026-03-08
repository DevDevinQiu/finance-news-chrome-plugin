# Claude AI - 项目上下文文档

> 项目名称: Finance News Chrome Plugin
> 文档版本: 1.0.0
> 创建日期: 2026-03-06
> 最后更新: 2026-03-06

---

## 📋 项目概述

### 项目描述
AI驱动的金融信息推送Chrome扩展，自动抓取财经新闻和政治新闻，使用智谱AI进行股市预测，在浏览器右侧面板实时展示。

### 核心功能
- **新闻聚合**: 从多个数据源抓取财经新闻、国内政治新闻、国际新闻
- **AI智能分析**:
  - 每天上午9:00预测当日股市开盘走势（上证指数）- 看涨/看跌
  - 每天下午14:00给出尾盘操作建议 - 加仓/减仓/维持不动
- **实时推送**: 右侧可折叠面板，标签页切换（新闻/AI预测）
- **用户界面**: Popup配置页面，历史记录查看，统计数据可视化

### 技术亮点
- **Chrome扩展**: Manifest V3架构
- **React 18**: 现代前端框架
- **TypeScript**: 类型安全
- **智谱AI**: GLM-4-Flash模型进行股市分析
- **sql.js**: 轻量级SQLite数据库（浏览器端）
- **Zustand**: 现代状态管理

### 项目路径
```
d:/MenusifuStore/finance-news-chrome-plugin/
```

---

## 👥 团队结构与角色

| 角色 | 目录 | 核心职责 |
|-----|------|---------|
| 🎯 产品经理 | docs/product-manager/ | 需求分析、MVP定义、验收标准、里程碑规划 |
| 🎨 UI/UX设计师 | docs/ui-ux-designer/ | 设计系统、组件规范、交互设计、无障碍设计 |
| 🏗 架构师 | docs/architect/ | 项目初始化、环境配置、构建脚本、目录规划 |
| 🔧 后端开发工程师 | docs/backend/ | 数据抓取、数据库封装、定时任务调度 |
| 💻 前端开发工程师A | docs/frontend-content-script/ | Content Script注入、新闻面板、通信机制 |
| 💻 前端开发工程师B | docs/frontend-popup/ | Popup页面、配置表单、历史记录 |
| 🤖 AI集成工程师 | docs/ai-engineer/ | 智谱AI集成、Prompt设计、响应解析、降级策略 |
| 🧪 测试开发工程师 | docs/testing/ | 测试框架、测试用例、E2E测试 |

---

## 🗂 文档结构

```
finance-news-chrome-plugin/
├── docs/
│   ├── CLAUDE.md                    # 📄 本文件 - 项目上下文
│   ├── README.md                    # 📚 项目总览
│   ├── team-structure.md           # 👥 团队结构和依赖
│   ├── plans/
│   │   └── 2026-03-06-implementation-plan.md  # 📋 实施计划
│   ├── product-manager/            # 🎯 产品经理文档
│   │   └── README.md
│   ├── ui-ux-designer/            # 🎨 UI/UX设计师文档
│   │   ├── README.md
│   │   └── design-system.md          # 🎨 完整设计系统
│   ├── architect/                  # 🏗 架构师文档
│   │   └── README.md
│   ├── backend/                    # 🔧 后端开发文档
│   │   └── README.md
│   ├── frontend-content-script/   # 💻 前端A文档
│   │   └── README.md
│   ├── frontend-popup/             # 💻 前端B文档
│   │   └── README.md
│   ├── ai-engineer/               # 🤖 AI集成文档
│   │   └── README.md
│   └── testing/                    # 🧪 测试开发文档
│       └── README.md
├── PROGRESS.md                    # 📊 项目进度
└── (待创建源代码目录)
```

---

## 🔧 技术栈

### 前端
- **框架**: React 18.3.1
- **语言**: TypeScript 5.6.2
- **状态管理**: Zustand 4.5.2
- **构建工具**: Vite 5.4.8
- **Chrome扩展**: CRXJS 2.0.0-beta.22
- **样式方案**: CSS Modules + 自定义CSS变量

### 后端/数据层
- **数据库**: sql.js (SQLite WASM)
- **AI服务**: zhipu-ai 4.1.0 (GLM-4-Flash)
- **API**: Chrome Extension APIs (storage, alarms, messaging)

### 开发工具
- **包管理**: Yarn 3.4.1
- **代码规范**: ESLint 9.0.1 + Prettier 3.3.2
- **版本控制**: Git
- **测试框架**: Vitest 1.6.0 + Playwright

---

## 📋 项目阶段

| 阶段 | 状态 | 文档 |
|-----|------|------|
| Phase 1 - 需求分析与设计 | ✅ 完成 | team-structure.md, ui-design.md |
| Phase 2 - 实施计划编写 | ✅ 完成 | implementation-plan.md |
| Phase 3 - 文档组织 | ✅ 完成 | 所有角色README |
| Phase 4 - 项目初始化 | ⏳ 待开始 | 脚手架搭建 |
| Phase 5 - 数据层开发 | ⏳ 待开始 | 后端工程师 |
| Phase 6 - 前端开发 - Content Script | ⏳ 待开始 | 前端工程师A |
| Phase 7 - 前端开发 - Popup页面 | ⏳ 待开始 | 前端工程师B |
| Phase 8 - AI集成 | ⏳ 待开始 | AI工程师 |
| Phase 9 - 测试与优化 | ⏳ 待开始 | 测试工程师 |
| Phase 10 - 打包发布 | ⏳ 待开始 | - |

---

## 🏗 架构概述

```
┌─────────────────────────────────────────┐
│  Content Script (注入到页面)     │
│      ↓                           │
├───────────────────────────────────────┤
│                                  │
│  Background (Service Worker)         │
│  ├─ API抓取                   │
│  ├─ 数据库 (sql.js)            │
│  ├─ AI调用 (智谱AI)             │
│  └─ 定时任务 (chrome.alarms)      │
│                                  │
└───────────────────────────────────────┤
│  Popup (配置页面)              │
└─────────────────────────────────────────┘
```

---

## 🔧 开发规范

### 命名约定
- **组件文件**: PascalCase (例如: `FinancePanel.tsx`, `NewsCard.tsx`)
- **工具文件**: camelCase (例如: `fetchNews.ts`, `parseAIResponse.ts`)
- **常量**: UPPER_SNAKE_CASE (例如: `API_ENDPOINTS`, `DEFAULT_TIMEOUT`)

### 文件命名
- React组件: `*.tsx`
- 类型定义: `*.ts` (不在types目录下的)
- 工具函数: `*.utils.ts`
- 样式文件: `*.module.css` 或 `*.css`

### 目录命名
- 组件: kebab-case (例如: `news-list/`, `prediction-cards/`)
- 工具: `utils/`, `constants/`, `helpers/`
- 服务: `services/`

### 提交规范
- feat: 新功能
- fix: bug修复
- refactor: 重构
- docs: 文档更新
- test: 测试
- chore: 构建/工具更新

**提交信息格式**:
```
<type>(<scope>): <subject>

<详细描述>

Co-authored-by: @claude-code

Ref: <issue编号>
```

---

## 📊 当前任务

### 近期完成
- ✅ 需求分析和产品设计
- ✅ 团队结构和角色定义
- ✅ 完整的实施计划
- ✅ UI/UX设计系统（基于ui-ux-pro-max技能）
- ✅ 所有角色的独立README文档
- ✅ 文档目录结构组织

### 下一步行动
1. 初始化Git仓库
2. 执行Phase 4: 项目初始化
   - 创建package.json
   - 配置TypeScript
   - 创建manifest.json
   - 配置Vite + CRXJS
   - 配置ESLint + Prettier
   - 创建完整的目录结构

### 待开发阶段
- Phase 5: 数据层开发
- Phase 6: Content Script开发
- Phase 7: Popup页面开发
- Phase 8: AI集成
- Phase 9: 测试与优化
- Phase 10: 打包发布

---

## 🎯 设计系统（来自ui-ux-pro-max技能）

### 色彩系统
```css
:root {
  /* Fintech主色调 */
  --color-primary: #F59E0B;
  --color-secondary: #FBBF24;
  --color-tertiary: #8B5CF6;

  /* 股市状态色 */
  --color-bullish: #39FF14;      /* 看涨 */
  --color-bearish: #F59E0B;      /* 看跌 */
  --color-add: #0080FF;          /* 加仓 */
  --color-reduce: #BF00FF;        /* 减仓 */
  --color-neutral: #8B5CF6;       /* 维持 */

  /* 功能色 */
  --color-success: #39FF14;
  --color-warning: #FFD700;
  --color-danger: #F59E0B;
}
```

### 字体系统
- **主字体**: IBM Plex Sans
- **字体层级**: H1(28px) → H2(24px) → H3(20px) → H4(18px) → Body(14px)

### Glassmorphism风格
- 半透明卡片效果 (15-30%透明度)
- 背景模糊 (15px blur)
- OLED优化 (纯黑背景)

---

## 🤖 AI集成规范

### 智谱AI配置
- **模型**: GLM-4-Flash
- **温度**: 0.3 (分析型任务)
- **Max Tokens**: 1000
- **超时**: 30000ms

### Prompt模板位置
- 开盘预测: `src/background/ai/prompts/open-forecast.ts`
- 尾盘建议: `src/background/ai/prompts/close-advice.ts`

### 降级策略
- FULL: 完整功能，正常token数量
- SIMPLIFIED: 简化分析，降低token
- CACHE_ONLY: 使用缓存数据
- DISABLED: 完全禁用AI功能

---

## 📞 重要文件位置

### 配置文件
- `manifest.json` - Chrome扩展配置
- `package.json` - 项目依赖和脚本
- `tsconfig.json` - TypeScript配置
- `vite.config.ts` - Vite构建配置
- `.eslintrc.cjs` - ESLint配置
- `.prettierrc` - Prettier配置

### 入口文件
- `src/background/index.ts` - Background Service Worker入口
- `src/content-script/index.ts` - Content Script入口
- `src/popup/index.tsx` - Popup页面入口

### 文档文件
- `docs/CLAUDE.md` - 项目上下文（本文件）
- `docs/README.md` - 项目总览
- `docs/team-structure.md` - 团队结构
- `docs/plans/2026-03-06-implementation-plan.md` - 实施计划
- `docs/ui-ux-designer/design-system.md` - 完整设计系统

---

## 🚀 工作流程

### 开发流程
1. 从 `implementation-plan.md` 中查看当前阶段的任务
2. 按照角色目录下的README执行任务
3. 使用 `git commit` 提交代码
4. 运行 `npm test` 验证测试

### 测试流程
1. 运行 `npm test` - 执行单元测试
2. 运行 `npm run test:e2e` - 执行E2E测试
3. 确保覆盖率 ≥ 60%

### 发布流程
1. 更新 `package.json` 版本号
2. 运行 `npm run build`
3. 测试打包的扩展
4. 上传到Chrome开发者后台

---

## 🔗 外部资源

### 文档和工具
- [Chrome扩展文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3规范](https://developer.chrome.com/docs/extensions/mv3/)
- [React文档](https://react.dev/)
- [Zustand文档](https://zustand.pmnd.rs/)
- [sql.js文档](https://sql.js.org/)
- [智谱AI文档](https://open.bigmodel.cn/)

### 开发者工具
- [Chrome Extension Developer](https://chrome.google.com/webstore/dev)
- [React Developer Tools](https://react.dev/learn)

---

## 📝 更新日志

### 2026-03-06
- ✅ 创建团队结构文档
- ✅ 创建完整实施计划
- ✅ 使用ui-ux-pro-max技能生成设计系统
- ✅ 按角色组织文档目录
- ✅ 创建CLAUDE.md文档

---

*此文档由 Claude AI生成，为项目提供持续的开发上下文*
