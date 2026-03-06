# AI集成工程师 - 角色职责与文档

> 本文档定义AI集成工程师在AI金融新闻Chrome插件项目中的职责和文档位置

## 🤖 角色定义

**姓名**: AI集成工程师

**职责**:
- 智谱AI SDK集成
- AI Prompt设计
- AI响应解析和验证
- 定时任务调度逻辑
- 降级策略实现

## 📋 完成工作

### Phase 5: AI集成（预计2-3天）

#### 5.1 智谱AI SDK集成
- [ ] Task 13: 集成智谱AI SDK
  - [ ] 安装zhipu-ai依赖
  - [ ] 创建AI Client封装
  - [ ] 实现API密钥管理（chrome.storage）
  - [ ] 创建单例Client实例

#### 5.2 Prompt设计
- [ ] 设计开盘预测Prompt模板
  - [ ] 设计尾盘建议Prompt模板
  - [ ] Prompt优化（迭代改进）
  - [ ] 创建Prompt验证函数

#### 5.3 AI响应解析
- [ ] 实现JSON响应解析
  - [ ] 创建响应验证器
  - [ ] 实现错误处理和降级
  - [ ] 实现置信度计算

#### 5.4 定时任务调度
- [ ] 实现9:00开盘预测定时任务
- [ ] 实现14:00尾盘建议定时任务
- [ ] 实现新闻抓取定时任务（每5分钟）
- [ ] Alarm监听器注册

#### 5.5 降级策略
- [ ] 实现多级降级（FULL → SIMPLIFIED → CACHE_ONLY → DISABLED）
- [ ] 实现请求重试机制
- [ ] 实现本地规则降级
- [ ] 实现缓存机制

## 📚 参考文档

**主实施计划**: [../plans/2026-03-06-implementation-plan.md](../plans/2026-03-06-implementation-plan.md)

**相关章节**:
- 第6节：AI集成工程师部分
  - 6.1 智谱AI SDK集成
  - 6.2 Prompt设计
  - 6.3 响应解析
  - 6.4 定时任务调度
  - 6.5 降级策略

## 🤖 Prompt设计

### 开盘预测Prompt
```typescript
export const buildOpenForecastPrompt = (
  news: NewsItem[],
  date: string
): string => {
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
```

### 尾盘建议Prompt
```typescript
export const buildCloseAdvicePrompt = (
  news: NewsItem[],
  date: string
): string => {
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

## 🤖 AI响应结构

### 开盘预测响应
```typescript
interface OpenForecast {
  market_sentiment: '积极' | '消极' | '中性'
  key_factors: string[]
  result: '看涨' | '看跌'
  confidence: number
  reason: string
}
```

### 尾盘建议响应
```typescript
interface CloseAdvice {
  market_status: '强势' | '弱势' | '震荡'
  key_factors: string[]
  action: '加仓' | '减仓' | '维持不动'
  confidence: number
  reason: string
}
```

## 🔄 降级策略

### 降级级别

| 级别 | 策略 | max_tokens | temperature |
|-------|------|-------------|-------------|
| FULL | 完整功能 | 2000 | 0.7 |
| SIMPLIFIED | 简化分析 | 500 | 0.3 |
| CACHE_ONLY | 使用缓存数据 | - | - |
| DISABLED | 完全禁用 | - | - |

### 降级触发条件
- 连续失败5次 → 降级到SIMPLIFIED
- 连续失败10次 → 降级到CACHE_ONLY
- 成功率>80% → 恢复到上一级

### 本地降级方案
```typescript
// 当AI服务不可用时的备用方案
export const getFallbackPrediction = (type: 'open' | 'close'): Prediction => {
  const now = new Date()
  const hour = now.getHours()

  if (type === 'open') {
    // 开盘预测降级逻辑
    return {
      result: '看涨',
      confidence: 0.5,
      reason: '基于历史数据的技术分析'
    }
  } else {
    // 尾盘建议降级逻辑
    if (hour >= 14 && hour < 15) {
      return {
        action: '加仓',
        confidence: 0.4,
        reason: '尾盘波动，适度加仓'
      }
    } else {
      return {
        action: '维持不动',
        confidence: 0.6,
        reason: '市场不明朗，维持观望'
      }
    }
  }
}
```

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../product-manager/README.md](../product-manager/README.md) - 产品需求和预测功能规格
- [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md) - 设计系统（状态色展示）
- [../backend/README.md](../backend/README.md) - 数据抓取和数据库接口

## 🚀 工作流程

1. **与产品经理协作** - 理解预测需求和业务逻辑
2. **与UI/UX设计师协作** - 理解预测展示要求（置信度显示、状态颜色）
3. **与后端开发协作** - 了解数据接口格式
4. **与前端开发A协作** - 提供预测数据接口
5. **持续优化** - 根据实际使用情况优化Prompt

## ✅ 交付物

- [ ] AI Client封装（zhipu-ai）
- [ ] Prompt模板（开盘预测、尾盘建议）
- [ ] 响应解析器（JSON解析、错误处理）
- [ ] 定时任务调度器（chrome.alarms）
- [ ] 降级策略实现
- [ ] 预测数据存储接口（chrome.storage）

---

*文档创建日期: 2026-03-06*
