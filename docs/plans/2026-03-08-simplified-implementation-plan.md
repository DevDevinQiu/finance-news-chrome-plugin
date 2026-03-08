# Finance News Chrome Plugin - 简化版实施计划

> **版本**: 2.0 (简化版)
> **修改日期**: 2026-03-08
> **修改说明**: 移除AI预测功能，专注数据推送

---

## 📋 需求变更说明

### 原版需求 vs 简化版需求对比

| 功能模块 | 原版需求 | 简化版需求 | 变更说明 |
|---------|---------|-----------|---------|
| **新闻聚合** | 多数据源抓取 | ✅ 保留 | - |
| **实时更新** | 5分钟刷新 | ✅ 保留 | - |
| **数据分类** | 财经/国内政治/国际 | ✅ 保留 | - |
| **搜索筛选** | 关键词、类别、日期 | ✅ 保留 | - |
| **AI预测** | 9:00开盘、14:00尾盘 | ❌ **移除** | 简化核心需求 |
| **置信度** | 0-1进度条显示 | ❌ **移除** | - |
| **预测理由** | AI分析文本 | ❌ **移除** | - |
| **数据可视化** | 图表、统计 | ⚠️ 简化 | 保留基础统计 |
| **通知功能** | 实时推送 | ⏳ 后续 | P2功能 |
| **个性化** | 用户偏好 | ⏳ 后续 | P1功能 |

---

## 🎯 产品经理 (PM) - 简化版需求

### 1.1 核心需求 (MVP)

#### 新闻聚合
- **数据源**（至少3个）：
  - [ ] 新浪财经 - 市场快讯、财经头条
  - [ ] 东方财富网 - 财经资讯
  - [ ] 和讯网 - 综合、国际新闻
  - [ ] 备用：腾讯新闻API

- **更新频率**：
  - [ ] 默认5分钟刷新一次
  - [ ] 用户可配置（1-60分钟）

- **数据去重**：
  - [ ] 基于URL去重
  - [ ] 基于标题去重（可选）
  - [ ] 24小时内重复新闻不显示

#### 新闻展示
- **列表展示**：
  - [ ] 按时间倒序
  - [ ] 显示标题、来源、时间、类别标签
  - [ ] 显示重要程度（基于关键词匹配）

- **分类标签**：
  - [ ] 财经类 - 黄色标签
  - [ ] 国内政治类 - 蓝色标签
  - [ ] 国际类 - 紫色标签
  - [ ] 普通新闻 - 灰色标签

#### 搜索筛选
- **基础搜索**：
  - [ ] 标题关键词搜索
  - [ ] 实时搜索结果更新

- **分类筛选**：
  - [ ] 按分类筛选显示
  - [ ] 支持多选

- **时间筛选**：
  - [ ] 按时间范围筛选（今天/本周/本月/全部）
  - [ ] 快速筛选按钮

#### 重要程度计算
- **关键词规则**：
  - [ ] 财经关键词：股票、股市、指数、基金、理财（+2权重）
  - [ ] 政策关键词：政策、法规、央行、监管（+2权重）
  - [ ] 普通新闻（默认权重+1）

- **来源权重**：
  - [ ] 新浪财经：权重×1.5（权威性强）
  - [ ] 东方财富：权重×1.3
  - [ ] 和讯网：权重×1.0
  - [ ] 其他：权重×0.8

#### UI界面
- **侧边栏面板**：
  - [ ] 可折叠/展开（380px宽度）
  - [ ] 固定在浏览器右侧
  - [ ] 平滑展开/收起动画（150-300ms）

- **Popup页面**：
  - [ ] 显示基础统计（新闻总数、最后更新时间）
  - [ ] 快速刷新按钮
  - [ ] 设置入口
  - [ ] 尺寸：400px × 500px

- **Options配置页面**：
  - [ ] 更新间隔设置（1-60分钟滑块）
  - [ ] 数据源开关（启用/禁用各数据源）
  - [ ] 通知开关（预留P2功能）
  - [ ] 清除数据按钮

---

## 🏗 架构师 - 简化架构

### 2.1 技术栈简化

#### 原版 vs 简化版

| 组件 | 原版 | 简化版 |
|-----|-----|-------|
| 前端框架 | React 18 + TypeScript | ✅ 保留 |
| 状态管理 | Zustand | ✅ 保留 |
| 数据库 | sql.js (SQLite) | ⚠️ 可选，chrome.storage.local足够 |
| 构建工具 | Vite + CRXJS | ✅ 保留 |
| AI服务 | 智谱AI | ❌ **移除** | 不需要 |
| 测试 | Vitest + Playwright | ✅ 保留 |

### 2.2 架构简化

```
┌─────────────────────────────────┐
│  Content Script (注入到页面)     │
│      ↓                           │
├────────────────────────────────┤
│                                  │
│  Background (Service Worker)         │
│  ├─ 新闻抓取 (定时任务)         │
│  ├─ 数据存储 (chrome.storage)    │
│  ├─ 数据去重逻辑                │
│  └─ 重要性计算                 │
│                                  │
└────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Popup (配置页面)              │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Content Script Panel (侧边栏)  │
│  ├─ 新闻列表                   │
│  ├─ 搜索框                     │
│  ├─ 分类筛选                   │
│  └─ 时间筛选                   │
└─────────────────────────────────┘
```

### 2.3 Manifest配置简化

```json
{
  "manifest_version": 3,
  "name": "AI金融新闻推送 (简化版)",
  "version": "2.0.0",
  "description": "自动聚合财经新闻和政治新闻，实时推送的Chrome扩展",
  "permissions": [
    "storage",
    "alarms"
  ],
  "host_permissions": [
    "https://finance.sina.com.cn/*",
    "https://www.eastmoney.com/*",
    "https://news.qq.com/*",
    "https://www.chinanews.com/*"
  ],
  "background": {
    "service_worker": "src/background/index.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["dist/content/index.js"],
      "css": ["dist/content/panel.css"]
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
  "options_page": "src/options/index.html",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "web_accessible_resources": []
}
```

### 2.4 目录结构调整

**移除**：
```
src/
  ├── services/
  │   └── zhipuAI.ts  # ❌ 移除AI服务
  └── types/
      └── prediction.ts  # ❌ 移除预测类型
```

---

## 🔧 后端开发 - 简化任务

### 3.1 核心职责

- 新闻抓取服务实现（定时任务）
- 数据存储封装
- 数据去重逻辑
- 重要性计算规则引擎
- 定时任务调度管理

### 3.2 任务清单（按优先级）

#### P0 - 核心抓取功能（必须完成）

- [ ] **Task 1**: 创建新闻数据源配置
  ```typescript
  // src/constants/newsSources.ts
  export const NEWS_SOURCES = {
    SINA: {
      name: '新浪财经',
      url: 'https://finance.sina.com.cn/',
      enabled: true,
      weight: 1.5
    },
    EAST_MONEY: {
      name: '东方财富网',
      url: 'https://www.eastmoney.com/',
      enabled: true,
      weight: 1.3
    },
    TENCENT: {
      name: '和讯网',
      url: 'https://news.qq.com/',
      enabled: true,
      weight: 1.0
    }
  }
  }
  ```

- [ ] **Task 2**: 实现新闻抓取服务
  ```typescript
  // src/services/newsScraper.ts 已有，需要完善
  - fetchFromSource(source): 从单个来源抓取
  - fetchAllSources(): 并行抓取所有来源
  - parseNewsItem(): 统一解析新闻项
  - validateNewsItem(): 验证新闻项完整性
  ```

- [ ] **Task 3**: 实现数据去重逻辑
  ```typescript
  // src/utils/deduplication.ts
  - shouldStoreNews(newsItem): 判断是否应该存储
  - checkDuplicate(newsList, newsItem): 检查重复
  - updateDuplicateTimestamp(): 更新重复新闻时间戳
  ```

- [ ] **Task 4**: 实现重要性计算
  ```typescript
  // src/utils/importanceCalculator.ts
  - calculateImportance(newsItem, keywordRules): 计算重要性分数
  - matchKeywords(content, keywords): 匹配关键词
  - applySourceWeight(importance, sourceWeight): 应用来源权重
  ```

- [ ] **Task 5**: 创建chrome.storage封装
  ```typescript
  // src/storage/newsStorage.ts
  - 存储新闻列表
  - 查询新闻列表
  - 按类别筛选
  - 按时间范围筛选
  - 搜索关键词
  ```

- [ ] **Task 6**: 实现定时任务调度
  ```typescript
  // src/background/scheduler.ts
  - setupNewsRefreshAlarm(interval): 设置新闻刷新定时任务
  - setupKeepAliveAlarm(): 保持Service Worker存活
  - handleNewsRefresh(): 处理刷新逻辑
  - clearAllAlarms(): 清除所有定时任务
  ```

#### P1 - 完善功能（P0完成后）

- [ ] **Task 7**: 添加数据源开关
  - [ ] **Task 8**: 添加自定义刷新间隔
  - [ ] **Task 9**: 优化去重策略
- [ ] **Task 10**: 添加错误重试机制

---

## 💻 前端开发工程师A (Content Script) - 简化任务

### 4.1 核心职责

- Content Script面板组件实现
- 新闻列表UI
- 搜索和筛选功能
- 与Background通信

### 4.2 任务清单

#### P0 - 核心面板功能（必须完成）

- [ ] **Task 1**: 创建Content Script入口
  ```typescript
  // src/content/index.tsx
  - 初始化面板
  - 监听Background消息
  - 处理面板展开/收起
  - 请求数据并更新UI
  ```

- [ ] **Task 2**: 创建主面板组件
  ```tsx
  // src/content/NewsPanel.tsx
  - 面板容器（固定右侧）
  - 展开/收起按钮
  - 面板内容区域
  ```

- [ ] **Task 3**: 创建新闻列表组件
  ```tsx
  // src/content/NewsList.tsx
  - NewsItem组件
  - 空列表展示
  - 加载状态
  - 空状态处理
  ```

- [ ] **Task 4**: 创建新闻项组件
  ```tsx
  // src/content/NewsItem.tsx
  - 标题展示
  - 分类标签（颜色区分）
  - 来源和时间
  - 点击跳转原链接
  ```

- [ ] **Task 5**: 实现搜索功能
  ```tsx
  // src/content/SearchBar.tsx
  - 搜索输入框
  - 实时搜索（防抖300ms）
  - 清空按钮
  ```

- [ ] **Task 6**: 实现分类筛选
  ```tsx
  // src/content/CategoryFilter.tsx
  - 分类标签按钮
  - 单选/多选
  - 实时筛选
  ```

- [ ] **Task 7**: 实现时间筛选
  ```tsx
  // src/content/TimeFilter.tsx
  - 时间范围按钮
  - 快速筛选：今天/本周/本月/全部
  - active状态管理
  ```

#### P1 - 完善功能（P0完成后）

- [ ] **Task 8**: 添加加载动画
- [ ] **Task 9**: 添加空状态展示
- [ ] **Task 10**: 优化性能（虚拟列表）
- [ ] **Task 11**: 添加键盘快捷键

---

## 💻 前端开发工程师B (Popup) - 简化任务

### 5.1 核心职责

- Popup页面主框架
- 基础统计显示
- 配置表单UI

### 5.2 任务清单

#### P0 - 核心Popup功能（必须完成）

- [ ] **Task 1**: 创建Popup入口
  ```tsx
  // src/popup/Popup.tsx
  - 基础统计卡片
  - 刷新按钮
  - 设置入口按钮
  - Glassmorphism样式
  ```

- [ ] **Task 2**: 创建统计卡片组件
  ```tsx
  // src/popup/StatsCard.tsx
  - 新闻总数
  - 最后更新时间
  - 数据状态指示器
  ```

- [ ] **Task 3**: 实现刷新功能
  - 点击刷新按钮
  - 请求Background立即刷新
  - 显示加载状态
  - 成功/失败提示

#### P1 - 配置页面（P0完成后）

- [ ] **Task 4**: 创建Options页面
  ```tsx
  // src/options/Options.tsx
  - 更新间隔滑块（1-60分钟）
  - 数据源开关列表
  - 保存按钮
  ```

- [ ] **Task 5**: 实现配置保存
  - 保存到chrome.storage
  - 验证输入有效性
  - 显示保存成功提示

---

## 🧪 测试开发工程师 - 简化测试

### 6.1 测试策略调整

#### 移除的测试
- ❌ AI预测相关测试
- ❌ AI响应解析测试
- ❌ 置信度测试
- ❌ 预测理由测试

#### 保留的测试
- ✅ 新闻抓取服务测试
- ✅ 数据去重逻辑测试
- ✅ 重要性计算测试
- ✅ chrome.storage封装测试
- ✅ Content Script组件测试
- ✅ Popup/Options组件测试

### 6.2 任务清单

#### 单元测试

- [ ] **Task 1**: 新闻抓取服务测试 (15个用例)
  - fetchFromSource测试
  - parseNewsItem测试
  - validateNewsItem测试
  - 去重逻辑测试

- [ ] **Task 2**: 重要性计算测试 (10个用例)
  - 关键词匹配测试
  - 来源权重应用测试
  - 边界值测试

- [ ] **Task 3**: 存储服务测试 (12个用例)
  - 存储新闻测试
  - 查询新闻测试
  - 分类筛选测试
  - 时间筛选测试
  - 搜索功能测试

- [ ] **Task 4**: 组件测试
  - NewsPanel组件测试
  - NewsList组件测试
  - NewsItem组件测试
  - SearchBar组件测试
  - Filter组件测试

#### E2E测试

- [ ] **Task 5**: 数据流测试
  - 定时任务触发测试
  - 数据抓取完整流程测试
  - 去重逻辑验证测试
  - 重要性计算验证测试

- [ ] **Task 6**: UI交互测试
  - 面板展开/收起测试
  - 搜索功能测试
  - 筛选功能测试
  - 配置保存测试

---

## 📊 里程碑规划

### Phase 1: 基础架构搭建（预计1天）

- [ ] manifest.json配置
- [ ] 目录结构调整
- [ ] 构建配置验证
- [ ] 图标文件添加

**交付物**：
- ✅ 可加载的Chrome扩展框架
- ✅ manifest.json正确配置

---

### Phase 2: 后端数据层（预计2天）

- [ ] 新闻抓取服务
- [ ] 数据去重逻辑
- [ ] 重要性计算
- [ ] chrome.storage封装
- [ ] 定时任务调度

**交付物**：
- ✅ 完整的新闻抓取和存储模块
- ✅ 单元测试通过

---

### Phase 3: Content Script面板（预计2天）

- [ ] Content Script入口
- [ ] 面板组件
- [ ] 新闻列表
- [ ] 搜索筛选
- [ ] 样式实现

**交付物**：
- ✅ 可展开/收起的侧边栏面板
- ✅ 新闻列表展示
- ✅ 搜索筛选功能
- ✅ 单元测试通过

---

### Phase 4: Popup/Options页面（预计1天）

- [ ] Popup页面
- [ ] 统计卡片
- [ ] Options配置页
- [ ] 样式实现

**交付物**：
- ✅ Popup页面可正常打开
- ✅ Options配置可保存
- ✅ 单元测试通过

---

### Phase 5: 集成测试（预计1天）

- [ ] E2E数据流测试
- [ ] E2E UI交互测试
- [ ] 性能优化
- [ ] 错误处理完善

**交付物**：
- ✅ 所有E2E测试通过
- ✅ 性能达标（启动<3秒，操作<300ms）
- ✅ 可发布的扩展包

---

## 🔧 开发规范（保持不变）

- **组件文件命名**: PascalCase
- **工具文件命名**: camelCase
- **常量命名**: UPPER_SNAKE_CASE
- **提交规范**: feat/fix/docs/test

---

## 🚀 工作流程

### 开发流程

1. **每日站会**（10分钟）
   - 同步进度
   - 阻碍讨论

2. **任务执行**
   - 按Phase优先级执行
   - 每个Task完成后更新状态

3. **代码审查**
   - PR必须至少1人审查
   - 通过后才能合并

4. **测试验证**
   - 单元测试必须通过
   - E2E测试必须通过

### 沟通机制

- **每日进度同步**：PROGRESS.md
- **问题追踪**：创建GitHub Issues
- **代码审查**：Pull Request
- **测试报告**：Vitest报告

---

## 📈 成功标准

### 功能验收标准

- [ ] 所有3个数据源正常抓取
- [ ] 数据去重正确（24小时内不重复）
- [ ] 重要性计算准确
- [ ] 面板可正常展开/收起
- [ ] 搜索功能实时响应（<300ms）
- [ ] 分类筛选正确
- [ ] 配置保存成功

### 性能标准

- [ ] 扩展启动时间 <3秒
- [ ] 面板展开动画流畅（150-300ms）
- [ ] 搜索响应 <300ms
- [ ] 内存占用 <50MB
- [ ] CPU占用正常

### 测试标准

- [ ] 单元测试覆盖率 ≥70%
- [ ] E2E测试通过率 = 100%
- [ ] 无阻塞bug
- [ ] 无控制台错误

---

*文档版本：2.0 (简化版)*
*最后更新：2026-03-08*
