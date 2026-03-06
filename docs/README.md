# AI金融新闻Chrome插件 - 完整文档

> 项目名称: Finance News Chrome Plugin
> 创建日期: 2026-03-06
> 文档结构: 按角色分工组织

---

## 📚 文档结构总览

```
finance-news-chrome-plugin/
├── docs/                          # 📚 文档目录
│   ├── README.md                  # 本文件 - 文档总览
│   ├── team-structure.md          # 团队结构和依赖关系
│   ├── plans/                    # 实施计划
│   │   └── 2026-03-06-implementation-plan.md
│   ├── product-manager/            # 🎯 产品经理
│   │   └── README.md
│   ├── ui-ux-designer/            # 🎨 UI/UX设计师
│   │   ├── README.md
│   │   └── design-system.md
│   ├── architect/                  # 🏗 架构师
│   │   └── README.md
│   ├── backend/                    # 🔧 后端开发工程师
│   │   └── README.md
│   ├── frontend-content-script/   # 💻 前端开发工程师A
│   │   └── README.md
│   ├── frontend-popup/             # 💻 前端开发工程师B
│   │   └── README.md
│   ├── ai-engineer/               # 🤖 AI集成工程师
│   │   └── README.md
│   └── testing/                    # 🧪 测试开发工程师
│       └── README.md
├── PROGRESS.md                    # 📊 项目进度
└── (待创建源代码目录)          # 💾 源代码目录
```

---

## 👥 角色分工

| 角色 | 目录 | 核心职责 | 产出物 |
|-----|------|---------|-------|
| 🎯 产品经理 | product-manager | 需求分析、MVP定义、验收标准、里程碑 | 需求规格、功能清单 |
| 🎨 UI/UX设计师 | ui-ux-designer | 视觉设计、组件库、交互设计 | 设计系统、组件规范 |
| 🏗 架构师 | architect | 项目初始化、环境配置、目录规划 | 脚手架、配置文件 |
| 🔧 后端开发 | backend | 数据抓取、数据库、定时任务 | API抓取器、数据库封装 |
| 💻 前端A | frontend-content-script | Content Script、新闻面板 | 面板组件、通信机制 |
| 💻 前端B | frontend-popup | Popup页面、配置、历史 | 设置组件、历史记录 |
| 🤖 AI集成 | ai-engineer | 智谱AI集成、Prompt设计、调度 | AI服务、Prompt模板 |
| 🧪 测试开发 | testing | 单元测试、集成测试、E2E测试 | 测试框架、测试用例 |

---

## 📋 角色详情

### 1. 🎯 产品经理
**README**: [product-manager/README.md](product-manager/README.md)

**核心职责**:
- 需求分析与细化
- MVP功能清单制定
- 验收标准(DoD)定义
- 项目里程碑规划

**关键产出**:
- 需求规格说明书
- MVP功能清单
- 验收标准文档
- 项目里程碑计划

---

### 2. 🎨 UI/UX设计师
**README**: [ui-ux-designer/README.md](ui-ux-designer/README.md)

**核心职责**:
- 视觉设计系统
- 组件库设计
- 交互设计
- 设计规范文档编写

**关键产出**:
- 设计系统文档（完整色彩系统、字体规范、Glassmorphism风格）
- 组件规范（新闻卡片、预测卡片、按钮、输入框）
- 无障碍设计（WCAG AA标准）
- 响应式设计（移动端/平板/桌面）

**设计亮点**:
- 🎨 Fintech配色（信任感+科技感）
- 📈 股市专用状态色（看涨绿#39FF14、看跌橙#F59E0B）
- 🪟 Glassmorphism风格（半透明卡片、背景模糊）
- ♿ WCAG AA对比度标准
- 📱 响应式设计（375px/768px/1024px）

---

### 3. 🏗 架构师
**README**: [architect/README.md](architect/README.md)

**核心职责**:
- 项目脚手架初始化
- 开发环境配置
- 构建配置和打包脚本
- 目录结构规划

**关键产出**:
- Chrome扩展manifest.json
- TypeScript配置
- Vite + CRXJS配置
- ESLint和Prettier配置
- 项目目录结构

**技术栈**:
- React 18 + TypeScript
- Chrome Extension Manifest V3
- Vite + CRXJS（构建）
- Zustand（状态管理）
- sql.js（数据库）

---

### 4. 🔧 后端开发工程师
**README**: [backend/README.md](backend/README.md)

**核心职责**:
- API数据抓取实现
- 爬虫实现
- SQLite数据库封装层
- 数据去重逻辑
- 定时任务调度

**关键产出**:
- API Fetcher类（含重试和错误处理）
- 数据库Manager类（含CRUD操作）
- 本地规则引擎（新闻分类）
- 定时任务调度器（chrome.alarms）

**数据源**:
- 腾讯新闻API
- 新浪财经API
- 聚合数据API（可选）
- 备用爬虫（新浪财经、中国新闻网、新华网）

---

### 5. 💻 前端开发工程师A (Content Script)
**README**: [frontend-content-script/README.md](frontend-content-script/README.md)

**核心职责**:
- Content Script注入逻辑
- 新闻面板主组件实现
- 新闻列表、筛选、搜索UI
- 与Background通信机制

**关键产出**:
- Content Script入口文件
- FinancePanel主组件
- NewsList和NewsItem组件
- TabNavigation组件
- 分类筛选和搜索功能
- AI预测展示组件（OpenForecast、CloseAdvice、AccuracyStats）

**通信机制**:
- chrome.runtime.sendMessage（发送请求）
- chrome.runtime.onMessage（接收响应）

---

### 6. 💻 前端开发工程师B (Popup)
**README**: [frontend-popup/README.md](frontend-popup/README.md)

**核心职责**:
- Popup页面主框架
- 配置表单UI
- 历史记录查看UI
- 统计数据可视化

**关键产出**:
- Popup页面HTML入口
- Settings组件（新闻源选择、API密钥配置）
- HistoryList组件（含筛选功能）
- StatsView组件（含图表展示）

**Popup尺寸**: 400px × 500px

---

### 7. 🤖 AI集成工程师
**README**: [ai-engineer/README.md](ai-engineer/README.md)

**核心职责**:
- 智谱AI SDK集成
- AI Prompt模板设计
- AI响应解析和验证
- 定时任务调度逻辑
- 降级策略实现

**关键产出**:
- AI Client封装
- Prompt模板（开盘预测、尾盘建议）
- AI响应解析器
- 定时任务调度器（9:00开盘预测、14:00尾盘建议）
- 多级降级策略（FULL → SIMPLIFIED → CACHE_ONLY → DISABLED）

**降级策略**:
- **FULL**: 完整功能，正常token数量
- **SIMPLIFIED**: 简化分析，降低token，提高温度
- **CACHE_ONLY**: 使用缓存数据，不调用AI
- **DISABLED**: 完全禁用AI功能

---

### 8. 🧪 测试开发工程师
**README**: [testing/README.md](testing/README.md)

**核心职责**:
- 单元测试框架搭建
- 关键组件测试用例
- 集成测试配置
- E2E测试脚本

**关键产出**:
- Vitest配置文件
- 测试Setup文件
- 单元测试用例（工具函数、AI响应解析、本地规则引擎）
- 集成测试（数据抓取流程）
- E2E测试（Content Script注入、新闻展示、Popup页面）
- Mock数据文件

**覆盖目标**:
- 语句覆盖率 ≥ 70%
- 分支覆盖率 ≥ 70%
- 函数覆盖率 ≥ 70%

---

## 📖 设计系统

**完整设计系统**: [ui-ux-designer/design-system.md](ui-ux-designer/design-system.md)

### 色彩系统
```css
/* 主色调 - Fintech */
--color-primary: #F59E0B;         /* 主色 */
--color-secondary: #FBBF24;       /* 辅助色 */
--color-tertiary: #8B5CF6;       /* 强调色 */

/* 状态色 - 股市 */
--color-bullish: #39FF14;         /* 看涨 */
--color-bearish: #F59E0B;        /* 看跌 */
--color-add: #0080FF;            /* 加仓 */
--color-reduce: #BF00FF;         /* 减仓 */
--color-neutral: #8B5CF6;         /* 维持不动 */
```

### Glassmorphism效果
```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

---

## 📅 项目进度

**总进度**: 规划阶段 ✅ 完成

| 阶段 | 状态 | 进度 |
|-----|------|------|
| 需求分析和设计 | ✅ 完成 | 100% |
| 实施计划编写 | ✅ 完成 | 100% |
| 团队结构定义 | ✅ 完成 | 100% |
| 设计系统创建 | ✅ 完成 | 100% |

**下一阶段**: 项目初始化和代码开发

---

## 🔗 相关资源

- [Chrome Extension文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3规范](https://developer.chrome.com/docs/extensions/mv3/)
- [React文档](https://react.dev/)
- [Zustand文档](https://zustand-demo.pmnd.rs/)
- [sql.js文档](https://sql.js.org/)
- [智谱AI文档](https://open.bigmodel.cn/)

---

*文档创建日期: 2026-03-06*
