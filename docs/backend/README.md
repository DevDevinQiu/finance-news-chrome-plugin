# 后端开发工程师 - 角色职责与文档

> 本文档定义后端开发工程师在AI金融新闻Chrome插件项目中的职责和文档位置

## 🔧 角色定义

**姓名**: 后端开发工程师

**职责**:
- API数据抓取实现
- 爬虫实现
- SQLite数据库封装层
- 数据去重逻辑
- 定时任务调度

## 📋 完成工作

### Phase 2: 数据层开发（预计2-3天）

#### 2.1 API数据抓取
- [ ] Task 8: 实现API数据抓取
  - [ ] 创建API Fetcher类
  - [ ] 腾讯新闻API集成
  - [ ] 新浪财经API集成
  - [ ] API响应数据转换
  - [ ] 请求重试和错误处理

#### 2.2 数据库模块
- [ ] Task 9: 实现SQLite数据库封装
  - [ ] 数据库初始化（news表、predictions表、settings表）
  - [ ] 创建DatabaseManager类
  - [ ] 实现新闻CRUD操作
  - [ ] 实现预测CRUD操作
  - [ ] 创建索引优化查询

#### 2.3 定时任务调度器
- [ ] Task 10: 实现chrome.alarms定时调度
  - [ ] 9:00开盘预测定时任务
  - [ ] 14:00尾盘建议定时任务
  - [ ] 新闻抓取定时任务（每5分钟）
  - [ ] Alarm监听器注册

## 📚 参考文档

**主实施计划**: [../plans/2026-03-06-implementation-plan.md](../plans/2026-03-06-implementation-plan.md)

**相关章节**:
- 第3节：后端开发工程师部分
  - 3.1 API数据抓取模块
  - 3.2 数据库模块
  - 3.3 定时任务调度器

## 🗄️ 数据源

### API数据源
1. **腾讯新闻API**
   - 财经新闻、国内政治
   - 分页支持
   - 实时更新

2. **新浪财经API**
   - 财经头条、市场快讯
   - 股票指数数据
   - 实时报价

3. **聚合数据API**（可选）
   - 综合新闻来源
   - 内容过滤和分类

### 爬虫数据源（备用）
1. **新浪财经**
   - 财经头条抓取
   - 关键词匹配和分类

2. **中国新闻网**
   - 国内政治新闻
   - 政策解读和影响

3. **新华网**
   - 重要新闻和公告
   - 官方发布源

## 🗄️ 数据库设计

### news表（新闻数据）
```sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  source TEXT,
  category TEXT CHECK(category IN ('finance', 'domestic', 'international')),
  url TEXT,
  publish_time TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(title, url)
)
```

### predictions表（AI预测结果）
```sql
CREATE TABLE predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prediction_type TEXT NOT NULL CHECK(prediction_type IN ('open_forecast', 'close_advice')),
  prediction_date TEXT NOT NULL,
  result TEXT NOT NULL,
  reason TEXT,
  confidence REAL NOT NULL CHECK(confidence >= 0 AND confidence <= 1),
  created_at INTEGER NOT NULL,
  UNIQUE(prediction_type, prediction_date)
)
```

### settings表（用户配置）
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
)
```

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../architect/README.md](../architect/README.md) - 项目脚手架和技术架构
- [../ai-engineer/README.md](../ai-engineer/README.md) - AI集成和预测数据存储

## 🚀 工作流程

1. **与产品经理协作** - 确认数据源和抓取频率
2. **与架构师协作** - 确认数据库设计和性能要求
3. **与AI集成工程师协作** - 提供数据接口供AI分析
4. **与前端开发协作** - 提供数据查询接口

## ✅ 交付物清单

- [ ] API Fetcher实现（含重试和错误处理）
- [ ] SQLite数据库封装层
- [ ] 数据库schema和初始化脚本
- [ ] 定时任务调度器实现
- [ ] 数据去重逻辑实现
- [ ] 本地规则引擎实现（新闻分类）

---

*文档创建日期: 2026-03-06*
