# 前端开发工程师A (Content Script) - 角色职责与文档

> 本文档定义前端开发工程师A在AI金融新闻Chrome插件项目中的职责和文档位置

## 💻 角色定义

**姓名**: 前端开发工程师A

**职责**:
- Content Script注入逻辑
- 新闻面板主组件实现
- 新闻列表、筛选、搜索UI
- 与Background通信机制

## 📋 完成工作

### Phase 3: 前端开发 - Content Script（预计2-3天）

#### 3.1 Content Script入口
- [ ] Task 11: 实现Content Script注入
- [ ] 创建Shadow DOM容器
- [ ] 页面加载后初始化
- [ ] 样式隔离（Shadow DOM）

#### 3.2 面板组件
- [ ] 实现FinancePanel主组件
- [ ] PanelHeader（展开/收起、刷新按钮）
- [ ] TabNavigation和TabContent
- [ ] 标签页切换逻辑

#### 3.3 新闻列表UI
- [ ] NewsContent组件
- [ ] 分类筛选（财经/国内政治/国际）
- [ ] 搜索框和搜索逻辑
- [ ] NewsList和NewsItem组件
- [ ] 时间排序和格式化

#### 3.4 AI预测展示
- [ ] PredictionsContent组件
- [ ] OpenForecast卡片（9:00预测）
  - 看涨/看跌结果徽章
  - 置信度进度条
  - 预测理由文本
- [ ] CloseAdvice卡片（14:00建议）
  - 加仓/减仓/维持不动徽章
  - 置信度进度条
  - 建议理由文本
- [ ] AccuracyStats组件

## 📚 参考文档

**主实施计划**: [../plans/2026-03-06-implementation-plan.md](../plans/2026-03-06-implementation-plan.md)

**相关章节**:
- 第4节：前端开发工程师A部分
  - 4.1 Content Script入口
  - 4.2 面板展开/收起功能
  - 4.3 新闻列表组件
  - 4.4 AI预测展示组件

**设计系统**: [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md)
- 色彩系统（看涨绿#39FF14、看跌橙#F59E0B）
- Glassmorphism样式
- 状态色规范
- 交互动画（150-300ms）

## 🎨 UI组件清单

### NewsItem组件
```tsx
interface NewsItemProps {
  id: string
  title: string
  content?: string
  source: string
  category: 'finance' | 'domestic' | 'international'
  url?: string
  publishTime: string
}

export const NewsItem: React.FC<NewsItemProps> = ({ title, category, source, time, url }) => {
  return (
    <div className="glass-card news-item">
      <span className={`category-tag category-${category}`}>
        {category === 'finance' ? '财经' : category === 'domestic' ? '国内' : '国际'}
      </span>
      <h4 className="news-title">{title}</h4>
      <div className="news-meta">
        <span className="news-source">{source}</span>
        <span className="news-time">{time}</span>
      </div>
      {url && (
        <a href={url} target="_blank" className="read-more">
          阅读更多 →
        </a>
      )}
    </div>
  )
}
```

### PredictionCard组件
```tsx
interface PredictionCardProps {
  type: 'open_forecast' | 'close_advice'
  result: string
  confidence: number
  reason: string
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  type, result, confidence, reason
}) => {
  const isPositive = result === '看涨' || result === '加仓'
  const statusColor = isPositive ? 'var(--color-bullish)' : 'var(--color-bearish)'

  return (
    <div className="glass-card prediction-card">
      <div className="prediction-header">
        <span className="prediction-type">
          {type === 'open_forecast' ? '今日开盘预测' : '尾盘操作建议'}
        </span>
      </div>
      <div className={`prediction-result ${statusColor}`}>
        {result}
      </div>
      <div className="confidence-bar">
        <div className="confidence-fill" style={{ width: `${confidence * 100}%` }} />
        <span className="confidence-label">置信度: {(confidence * 100).toFixed(0)}%</span>
      </div>
      <p className="prediction-reason">{reason}</p>
    </div>
  )
}
```

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md) - 完整设计系统
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../backend/README.md](../backend/README.md) - 数据抓取和数据库接口

## 🎯 通信机制

### 与Background通信
```typescript
// 发送消息到Background
chrome.runtime.sendMessage({ type: 'GET_NEWS' }, (response) => {
  console.log('News received:', response.news)
})

// 监听来自Background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEWS_UPDATED') {
    updateNewsList(message.news)
  }
})
```

## 🚀 工作流程

1. **与UI/UX设计师协作** - 理解设计系统和组件规范
2. **与后端开发协作** - 了解数据接口和数据结构
3. **与AI集成工程师协作** - 理解预测数据格式
4. **实现开发** - 按照设计系统实现组件
5. **测试验证** - 验证组件在不同页面上的表现

---

*文档创建日期: 2026-03-06*
