# AI金融信息推送Chrome插件 - 设计文档

## 项目概述

创建一个基于智谱AI的Chrome扩展，用于自动抓取财经新闻和政治新闻，并进行智能分析和股市预测。

### 核心功能
- 财经新闻 + 国际/国内经济政治新闻
- Chrome插件右侧展示推送新闻信息
- 免费、实时推送
- 每天9:30中国股市开盘时预测大盘（看跌/看涨）
- 每天14:30根据新闻判断尾盘操作建议（加仓/减仓/维持不动）
- AI置信度显示和历史准确率统计

---

## 一、整体架构

系统采用Chrome扩展架构，分为三个核心部分：

### 1. Background Service Worker
- 定时任务调度（9:30和14:30的AI分析触发）
- API调用和爬虫执行
- 数据抓取和存储到SQLite数据库
- 处理智谱AI的API请求

### 2. Content Script
- 在右侧注入可折叠的新闻面板
- 与Background通信获取最新数据
- 处理面板的展开/收起交互
- 监听数据更新并刷新UI

### 3. Popup页面
- 配置设置（如新闻源选择、AI提示词调整）
- 历史预测记录查看
- 数据统计和准确率展示
- 关键词过滤设置

### 技术栈
- **前端**: React + TypeScript
- **数据库**: sql.js（SQLite的JavaScript移植版）
- **爬虫/AI调用**: Background fetch + 智谱AI SDK
- **构建工具**: Vite + CRXJS（Chrome扩展开发框架）

---

## 二、数据模型设计

### news表（存储新闻数据）
```sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  source TEXT,          -- 数据源
  category TEXT,        -- 财经/国内政治/国际
  url TEXT,             -- 原文链接
  publish_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (publish_time),
  INDEX (category)
)
```

### predictions表（存储AI预测结果）
```sql
CREATE TABLE predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prediction_type TEXT,   -- 'open_forecast' 或 'close_advice'
  prediction_date DATE,   -- 预测日期
  result TEXT,            -- '看涨'/'看跌' 或 '加仓'/'减仓'/'维持不动'
  reason TEXT,            -- AI分析理由
  confidence REAL,        -- 置信度 0-1
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (prediction_type, prediction_date)
)
```

### settings表（存储用户配置）
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
)
```

---

## 三、UI组件设计

### 组件树结构
```
FinancePanel
├── PanelHeader
│   ├── ToggleButton (展开/收起)
│   └── RefreshButton
├── TabNavigation
│   ├── NewsTab (新闻列表)
│   └── PredictionsTab (AI预测)
└── TabContent
    ├── NewsContent
    │   ├── CategoryFilter (财经/国内/国际)
    │   ├── SearchBar
    │   └── NewsList
    │       └── NewsItem
    │           ├── Title
    │           ├── Time & Source
    │           └── ReadMoreLink
    └── PredictionsContent
        ├── OpenForecast (9:30预测)
        │   ├── ResultBadge (看涨/看跌)
        │   ├── ConfidenceBar
        │   ├── ReasonText
        │   └── TimeLabel
        ├── CloseAdvice (14:30建议)
        │   ├── ActionBadge (加仓/减仓/维持)
        │   ├── ConfidenceBar
        │   ├── ReasonText
        │   └── TimeLabel
        └── AccuracyStats
            ├── TotalPredictions
            └── AccuracyRate
```

### 样式设计
- 面板宽度：320-400px，可收起到图标状态
- 固定在页面右侧，不遮挡主要内容
- 使用深色主题突出显示重要信息
- 看涨用绿色，看跌用红色，维持用灰色
- 响应式设计，移动端自动调整布局

---

## 四、数据源与抓取策略

### 免费数据源

#### API部分
1. **腾讯新闻API** - 财经新闻、国内政治
2. **聚合数据API**（免费额度）- 综合新闻
3. **Yahoo Finance API** - 股票指数实时数据
4. **东方财富RSS** - 作为补充数据源

#### 爬虫部分（备用）
1. **新浪财经** - 财经头条
2. **中国新闻网** - 国内政治新闻
3. **新华网** - 重要新闻
4. **央视财经** - 财经快讯

### 抓取策略
- 使用Chrome扩展的`background.fetch`进行网络请求
- 每分钟检查一次新闻更新
- 设置去重机制：根据title+url进行hash去重
- 失败重试：最多3次，指数退避策略
- 遵守robots.txt，设置合理的请求间隔（至少2秒）

### 本地规则引擎
```javascript
// 关键词匹配规则
const categoryRules = {
  '财经': ['股市', '经济', '投资', '金融', '基金', '债券', '汇率', '贸易'],
  '国内政治': ['政府', '政策', '两会', '部委', '反腐', '人事', '民生'],
  '国际': ['美国', '欧盟', '俄罗斯', '中东', '中美', '地缘政治', '制裁']
}
```

---

## 五、智谱AI集成与定时任务

### AI Prompt设计

#### 开盘预测Prompt
```
基于以下当日新闻，预测今日中国股市（上证指数）开盘后趋势：

{news}

请分析：
1. 市场情绪（积极/消极/中性）
2. 关键影响因素
3. 预测结果（看涨/看跌）
4. 置信度（0-1之间）
5. 简短理由（不超过100字）

以JSON格式返回：{"result": "看涨/看跌", "confidence": 0.7, "reason": "..."}
```

#### 尾盘建议Prompt
```
基于以下当日新闻，判断尾盘操作建议：

{news}

请给出操作建议：加仓/减仓/维持不动，并说明理由（不超过100字）

以JSON格式返回：{"action": "加仓/减仓/维持不动", "confidence": 0.6, "reason": "..."}
```

### 定时任务调度

使用Chrome扩展的`chrome.alarms` API：
- `open_forecast_alarm` - 每天上午9:00触发（提前30分钟准备）
- `close_advice_alarm` - 每天下午14:00触发（提前30分钟准备）
- `news_fetch_alarm` - 每分钟触发，检查新闻更新

### 任务执行流程
```
9:00定时触发
  ↓
获取当日新闻（从SQLite）
  ↓
调用智谱AI API
  ↓
解析JSON响应
  ↓
存入predictions表
  ↓
通知Content Script更新UI
```

### 成本估算
- 假设每天100条新闻需要AI分析
- 每次分析约500 tokens
- 智谱AI GLM-4-Flash约 ¥0.001/千tokens
- 每日成本约 ¥0.1，月成本约 ¥3

---

## 六、错误处理与容错机制

### 网络请求错误处理
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await delay(Math.pow(2, 3 - retries) * 1000);
      return fetchWithRetry(url, options, retries - 1);
    }
    logError('Fetch failed', error);
    return null;
  }
}
```

### AI调用失败降级策略
1. AI API调用失败 → 使用本地规则引擎的简化预测
2. AI响应格式错误 → 尝试修复JSON，失败则标记为"分析失败"
3. AI服务不可用 → 显示"AI服务暂时不可用"通知

### 数据库操作保护
- 所有SQLite操作使用try-catch包裹
- 数据库损坏时自动重建
- 定期备份（导出为JSON文件）

### 用户体验保障
- 新闻加载失败 → 显示缓存数据，标记"数据可能过期"
- 定时任务失败 → 通知用户，提供手动刷新按钮
- 配置错误 → 显示友好的错误提示和修复建议

---

## 七、测试策略

### 测试分层

#### 1. 单元测试
- 本地规则引擎的关键词匹配
- 数据库CRUD操作
- AI Prompt构建逻辑
- 工具函数（时间处理、数据解析等）

#### 2. 集成测试
- 数据源抓取流程
- AI API调用完整流程
- Background与Content Script通信
- 定时任务触发机制

#### 3. E2E测试（关键路径）
- 完整的数据抓取→存储→展示流程
- 9:30预测完整流程
- 14:30建议完整流程
- 用户配置变更验证

### 测试工具
- Vitest - 单元测试
- Playwright - Chrome扩展E2E测试
- Mock Service Worker - Mock API响应

---

## 八、开发计划

### Phase 1 - 基础框架（2-3天）
- Chrome扩展项目初始化
- SQLite数据库集成
- 基础UI框架搭建

### Phase 2 - 数据抓取（2-3天）
- 集成免费API
- 实现爬虫
- 数据去重和存储

### Phase 3 - AI集成（2-3天）
- 智谱AI SDK集成
- Prompt设计和优化
- 定时任务实现

### Phase 4 - UI完善（2天）
- 完善面板交互
- 添加搜索和筛选
- 美化样式

### Phase 5 - 测试和优化（2-3天）
- 编写测试用例
- 错误处理完善
- 性能优化

### Phase 6 - 打包发布（1天）
- Chrome商店打包准备
- 文档编写

---

## 九、技术选型总结

| 组件 | 技术选型 | 理由 |
|------|---------|------|
| 前端框架 | React + TypeScript | 成熟、生态好、用户有经验 |
| UI库 | Ant Design / shadcn/ui | 组件丰富、易定制 |
| 数据库 | sql.js | 浏览器端SQLite、无需额外服务 |
| AI模型 | 智谱AI GLM-4-Flash | 中文支持好、成本低 |
| 构建工具 | Vite + CRXJS | 快速、Chrome扩展专用 |
| 测试框架 | Vitest + Playwright | 现代化、覆盖完整 |
| 状态管理 | Zustand | 轻量、简单 |

---

## 十、风险与注意事项

### 技术风险
1. **数据源稳定性**：免费API可能限流或停止服务，需要多个备用源
2. **反爬限制**：爬虫可能被封IP，需要设置合理的请求频率
3. **AI准确性**：AI预测仅供参考，不能作为投资依据
4. **浏览器兼容性**：需要测试Chrome各版本兼容性

### 合规注意事项
1. 明确声明：AI预测仅供参考，不构成投资建议
2. 遵守数据源的使用条款和robots.txt
3. 尊重用户隐私，不上传敏感数据
4. 及时响应用户的反馈和投诉

---

*文档创建日期: 2026-03-05*
