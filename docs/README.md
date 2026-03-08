# AI金融新闻Chrome插件 - 完整文档（简化版）

> **项目名称**: Finance News Chrome Plugin
> **创建日期**: 2026-03-06
> **最后更新**: 2026-03-08（简化版）
> **文档结构**: 按角色分工组织

---

## 📚 文档结构总览

```
finance-news-chrome-plugin/
├── docs/                          # 📚 文档目录
│   ├── README.md                  # 本文件 - 文档总览
│   ├── team-structure.md          # 团队结构和依赖关系
│   ├── plans/                    # 实施计划
│   │   ├── 2026-03-06-implementation-plan.md
│   │   └── 2026-03-08-simplified-implementation-plan.md
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
│   │   └── README.md (已标记为暂不适用)
│   └── testing/                    # 🧪 测试开发工程师
│       └── README.md
├── PROGRESS.md                    # 📊 项目进度
└── (待创建源代码目录)
```

---

## 👥 角色分工（简化版）

| 角色 | 目录 | 核心职责 | 产出物 |
|-----|------|---------|-------|
| 🎯 产品经理 | product-manager | 需求分析、MVP定义、验收标准、里程碑 | 需求规格、功能清单 |
| 🎨 UI/UX设计师 | ui-ux-designer | 视觉设计、组件库、交互设计 | 设计系统、组件规范 |
| 🏗 架构师 | architect | 项目初始化、环境配置、目录规划 | 脚手架、配置文件 |
| 🔧 后端开发 | backend | 数据抓取、Chrome Storage、定时任务 | API抓取器、Chrome Storage封装 |
| 💻 前端A | frontend-content-script | Content Script、新闻面板 | 面板组件、通信机制 |
| 💻 前端B | frontend-popup | Popup页面、配置 | 设置组件、统计展示 |
| 🤖 AI集成 | ai-engineer | ⏸️ **暂不适用** | - |
| 🧪 测试开发 | testing | 单元测试、集成测试、E2E测试 | 测试框架、测试用例 |

---

## 📋 角色详情

### 1. 🎯 产品经理

**README**: [product-manager/README.md](product-manager/README.md)

**核心职责**:
- 需求分析与细化（简化版）
- MVP功能清单制定（移除AI预测）
- 验收标准(DoD)定义
- 项目里程碑规划

**关键产出**:
- 简化版需求规格说明书
- 简化版MVP功能清单
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
- 组件规范（新闻卡片、分类标签、搜索筛选器，移除AI预测组件）
- 无障碍设计（WCAG AA标准）
- 响应式设计（移动端/平板/桌面）

**设计亮点**:
- 🎨 Fintech配色（信任感+科技感）
- 🌟 OLED优化（纯黑背景）
- 🔆 彩虹色彩系（分类标签色）

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
- 项目目录结构（简化版，移除AI目录）

**技术栈**:
- React 18 + TypeScript
- Chrome Extension Manifest V3
- Vite + CRXJS（构建）
- Zustand（状态管理）
- Chrome Storage API（数据存储）
- Vitest + Playwright（测试）

---

### 4. 🔧 后端开发工程师

**README**: [backend/README.md](backend/README.md)

**核心职责**:
- 数据抓取引擎
- Chrome Storage API集成
- 数据去重逻辑
- 重要性计算

**关键产出**:
- API Fetcher类（含重试和错误处理）
- Chrome Storage Manager类（含CRUD操作）
- 本地规则引擎（新闻分类）
- 定时任务调度器（新闻更新，非AI预测）

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
- SearchBar组件
- Filter组件（分类筛选）
- TimeFilter组件（时间筛选）
- 与Background通信的封装

**保留组件**:
- NewsContent组件
- NewsList组件
- NewsItem组件
- SearchBar组件
- Filter组件
- TimeFilter组件
- PanelHeader组件

**移除组件**:
- ❌ PredictionsContent组件
- ❌ OpenForecast卡片
- ❌ CloseAdvice卡片
- ❌ AccuracyStats组件
- ❌ ConfidenceBar组件

---

### 6. 💻 前端开发工程师B (Popup)

**README**: [frontend-popup/README.md](frontend-popup/README.md)

**核心职责**:
- Popup页面主框架
- 配置表单UI
- 基础统计展示

**关键产出**:
- Popup页面HTML入口
- Settings组件（新闻源选择、更新间隔配置）
- StatsView组件（基础统计展示）

**移除功能**:
- ❌ API密钥配置（智谱AI）
- ❌ 历史记录查看（预测历史）
- ❌ 预测统计展示（准确率、趋势图表）

**保留功能**:
- ✅ 新闻源配置
- ✅ 更新间隔配置
- ✅ 基础统计展示（新闻数、更新时间）

---

### 7. 🤖 AI集成工程师

**README**: [ai-engineer/README.md](ai-engineer/README.md)

**状态**: ⏸️ **暂不适用**

**原因**: 根据简化版需求，本项目当前阶段不包含AI预测功能。

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
- 单元测试用例（工具函数、分类规则、去重逻辑）
- 集成测试（数据抓取流程、通信机制）
- E2E测试（Content Script注入、新闻展示、Popup页面）
- Mock数据文件

**移除测试**:
- ❌ AI响应解析器测试
- ❌ AI调用流程测试
- ❌ AI预测展示E2E测试
- ❌ 历史记录查看E2E测试
- ❌ 预测统计测试

**保留测试**:
- ✅ 新闻功能测试（搜索、筛选、展示）
- ✅ 数据去重测试
- ✅ 分类规则测试
- ✅ 重要性计算测试
- ✅ Chrome Storage操作测试

---

## 🎨 设计系统

**完整设计系统**: [ui-ux-designer/design-system.md](ui-ux-designer/design-system.md)

### 色彩系统
```css
/* 分类标签颜色 */
--category-finance: #FFD700;   /* 财经类 - 金黄 */
--category-domestic: #4A90E5;    /* 国内政治 - 蓝色 */
--category-international: #8B5CF6; /* 国际 - 紫色 */
--category-general: #999999;    /* 普通 - 灰色 */

/* 重要性标记颜色 */
--importance-1: #CCCCCC;
--importance-2: #AAAAAA;
--importance-3: #F59E0B;
--importance-4: #FBBF24;
--importance-5: #FFD700;

/* 功能色 */
--color-success: #39FF14;
--color-warning: #FFD700;
--color-danger: #F59E0B;
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
| 团队结构定义（简化版） | ✅ 完成 | 100% |
| 设计系统创建 | ✅ 完成 | 100% |
| 文档组织（简化版） | ✅ 完成 | 100% |

**下一阶段**: 项目初始化和代码开发

---

## 🔄 简化版变更说明

### 角色变更
- ❌ 移除：AI集成工程师（标记为暂不适用）
- ✅ 保留：产品经理、UI/UX设计师、架构师、后端开发、前端开发A、前端开发B、测试开发

### 功能变更
- ❌ 移除：AI股市预测（9:00开盘、14:00尾盘）
- ❌ 移除：AI置信度显示
- ❌ 移除：AI分析理由展示
- ✅ 保留：新闻聚合与展示（数据抓取、去重、分类）
- ✅ 保留：搜索与筛选功能（关键词搜索、分类筛选、时间筛选）
- ✅ 保留：定时刷新任务（新闻更新，1-60分钟可配置）

### 技术栈变更
- ❌ 移除：zhipu-ai SDK
- ❌ 移除：sql.js (SQLite WASM)
- ✅ 改用：Chrome Storage API（数据存储）
- ✅ 保留：React 18 + TypeScript
- ✅ 保留：Vite + CRXJS（构建）
- ✅ 保留：Zustand（状态管理）

---

## 🔗 相关资源

- [Chrome Extension文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3规范](https://developer.chrome.com/docs/extensions/mv3/)
- [React文档](https://react.dev/)
- [Zustand文档](https://zustand.pmnd.rs/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/api/storage/)

---

*文档创建日期: 2026-03-06*
*最后更新: 2026-03-08（简化版）*
