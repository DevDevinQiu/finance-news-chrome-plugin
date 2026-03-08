# 前端开发工程师A (Content Script) - 简化版角色职责

> **文档版本**: v2.0 (简化版)
> **更新日期**: 2026-03-08
> **变更说明**: 移除AI预测展示组件，专注新闻面板

---

## 💻 角色定义

**姓名**: 前端开发工程师A

**核心职责**:
- Content Script注入逻辑
- 新闻面板主组件实现
- 新闻列表、筛选、搜索UI
- 与Background通信机制

---

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
- [ ] 标签页切换（简化版：仅新闻标签）

#### 3.3 新闻列表UI
- [ ] NewsContent组件
- [ ] 分类筛选（财经/国内政治/国际/普通）
- [ ] 搜索框和搜索逻辑
- [ ] NewsList和NewsItem组件
- [ ] 时间排序和格式化
- [ ] 重要性标记显示

#### 3.4 交互优化
- [ ] 平滑展开/收起动画（150-300ms）
- [ ] 搜索实时响应（<300ms）
- [ ] 筛选即时更新
- [ ] 滚动性能优化（100+条新闻）

---

## 📚 参考文档

**主实施计划**: [../plans/2026-03-08-simplified-implementation-plan.md](../plans/2026-03-08-simplified-implementation-plan.md)

**相关章节**:
- 第4节：前端开发工程师A部分
  - 4.1 Content Script入口
  - 4.2 面板展开/收起功能
  - 4.3 新闻列表组件

**设计系统**: [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md)
- 色彩系统（分类标签：财经黄#FFD700、国内蓝#4A90E5、国际紫#8B5CF6）
- Glassmorphism样式
- 交互动画（150-300ms）

---

## 🎨 UI组件清单（简化版）

### NewsItem组件
```tsx
interface NewsItemProps {
  id: string
  title: string
  content?: string
  source: string
  category: 'finance' | 'domestic' | 'international' | 'general'
  url?: string
  publishTime: string
  importance?: number  // 重要性评分 1-5
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title, category, source, publishTime, url, importance
}) => {
  const importanceStars = importance ? '★'.repeat(importance) : ''

  return (
    <div className="glass-card news-item">
      <span className={`category-tag category-${category}`}>
        {category === 'finance' ? '财经' :
         category === 'domestic' ? '国内政治' :
         category === 'international' ? '国际' : '普通'}
      </span>
      <h4 className="news-title">{title}</h4>
      {importance && (
        <div className="importance-marker">
          {importanceStars}
        </div>
      )}
      <div className="news-meta">
        <span className="news-source">{source}</span>
        <span className="news-time">{publishTime}</span>
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

---

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md) - 完整设计系统
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../backend/README.md](../backend/README.md) - 数据抓取和存储接口

---

## 🎯 通信机制

### 与Background通信
```typescript
// 发送消息到Background
chrome.runtime.sendMessage({ type: 'GET_PANEL_DATA' }, (response) => {
  if (response.success) {
    console.log('Data received:', response.data)
  }
})

// 监听来自Background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_PANEL') {
    // 刷新面板数据
    refreshPanel()
  }
})
```

### 搜索和筛选
```typescript
// 发送搜索请求
chrome.runtime.sendMessage({
  type: 'SEARCH_NEWS',
  data: {
    keyword: '股票',
    category: 'finance',
    timeRange: 'today'
  }
})
```

---

## 🔄 需求变更说明

| 组件 | 原版需求 | 简化版需求 | 变更说明 |
|------|---------|-----------|---------|
| **PredictionsContent** | AI预测展示组件 | ❌ **移除** | 不再需要 |
| **OpenForecast** | 9:00开盘预测卡片 | ❌ **移除** | 不再需要 |
| **CloseAdvice** | 14:00尾盘建议卡片 | ❌ **移除** | 不再需要 |
| **AccuracyStats** | AI准确率统计组件 | ❌ **移除** | 不再需要 |
| **NewsContent** | 新闻列表 | ✅ **保留** | 核心功能 |
| **SearchBar** | 搜索框 | ✅ **保留** | 核心功能 |
| **Filter** | 分类筛选 | ✅ **保留** | 核心功能 |
| **TimeFilter** | 时间筛选 | ✅ **保留** | 核心功能 |

---

## 🚀 工作流程

1. **与UI/UX设计师协作** - 理解设计系统和组件规范
2. **与后端开发协作** - 了解数据接口和数据结构
3. **实现开发** - 按照设计系统实现组件
4. **测试验证** - 验证组件在不同页面上的表现
5. **性能优化** - 确保滚动流畅、搜索快速

---

## ✅ 交付物清单

- [ ] Content Script入口文件（index.ts）
- [ ] FinancePanel主组件
- [ ] NewsList组件
- [ ] NewsItem组件
- [ ] SearchBar组件
- [ ] Filter组件（分类筛选）
- [ ] TimeFilter组件（时间筛选）
- [ ] CSS样式文件（响应式设计）
- [ ] 单元测试文件

---

*文档创建日期: 2026-03-06*
*更新日期: 2026-03-08（简化版）*
