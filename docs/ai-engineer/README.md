# AI集成工程师 - 暂不适用

> **文档版本**: v2.0 (简化版)
> **更新日期**: 2026-03-08
> **状态**: ⏸️ **此角色在简化版项目中暂不适用**

---

## 🤖 角色状态

**状态**: ❌ **不活跃** - 已移除

**原因**: 根据简化版需求，本项目当前阶段不包含AI预测功能。

---

## 📋 简化版需求变更

### 移除的功能

- ❌ AI股市预测（9:00开盘预测）
- ❌ AI尾盘操作建议（14:00建议）
- ❌ AI置信度显示
- ❌ AI分析理由展示
- ❌ 智谱AI SDK集成
- ❌ AI Prompt设计
- ❌ AI响应解析和验证
- ❌ 定时任务调度（AI相关）

### 保留的功能

- ✅ 新闻聚合与展示（数据抓取、去重、分类）
- ✅ 搜索与筛选功能
- ✅ 定时刷新任务（新闻更新，非AI预测）

---

## 🔄 恢复说明

如果未来需要恢复AI预测功能，可以参考以下文档：

### 原始任务清单
- 智谱AI SDK集成
- 开盘预测Prompt设计
- 尾盘建议Prompt设计
- AI响应解析和验证
- 定时任务调度逻辑
- 降级策略实现

### 预测数据结构（参考原设计）

```typescript
// 开盘预测响应
interface OpenForecast {
  market_sentiment: '积极' | '消极' | '中性'
  key_factors: string[]
  result: '看涨' | '看跌'
  confidence: number
  reason: string
}

// 尾盘建议响应
interface CloseAdvice {
  market_status: '强势' | '弱势' | '震荡'
  key_factors: string[]
  action: '加仓' | '减仓' | '维持不动'
  confidence: number
  reason: string
}
```

---

## 🔗 相关文档

- [../plans/2026-03-08-simplified-implementation-plan.md](../plans/2026-03-08-simplified-implementation-plan.md) - 简化版实施计划
- [../team-structure.md](../team-structure.md) - 团队结构（已移除此角色）

---

*文档创建日期: 2026-03-06*
*更新日期: 2026-03-08（标记为暂不适用）*
