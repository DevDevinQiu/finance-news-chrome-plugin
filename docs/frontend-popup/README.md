# 前端开发工程师B (Popup) - 角色职责与文档

> 本文档定义前端开发工程师B在AI金融新闻Chrome插件项目中的职责和文档位置

## 💻 角色定义

**姓名**: 前端开发工程师B

**职责**:
- Popup页面主框架
- 配置表单UI
- 历史记录查看UI
- 统计数据可视化

## 📋 完成工作

### Phase 4: Popup页面开发（预计2天）

#### 4.1 Popup页面框架
- [ ] Task 12: 实现Popup页面框架
- [ ] 创建index.html（HTML入口）
- [ ] 创建index.tsx（React入口）
- [ ] 配置Vite构建设置

#### 4.2 配置页面UI
- [ ] Settings组件实现
- [ ] 新闻源选择表单
- [ ] 用户偏好设置（关注股票、行业、话题）
- [ ] API密钥配置（智谱AI）

#### 4.3 历史记录查看UI
- [ ] HistoryList组件实现
- [ ] 按日期筛选功能
- [ ] 按类型筛选（开盘预测/尾盘建议）
- [ ] 历史记录详情展开

#### 4.4 统计数据可视化
- [ ] StatsView组件实现
- [ ] 预测准确率统计
- [ ] 总预测次数统计
- [ ] 按时间趋势图表

## 📚 参考文档

**主实施计划**: [../plans/2026-03-06-implementation-plan.md](../plans/2026-03-06-implementation-plan.md)

**相关章节**:
- 第5节：前端开发工程师B部分
  - 5.1 Popup页面框架
  - 5.2 配置表单UI
  - 5.3 历史记录查看UI
  - 5.4 统计数据可视化

**设计系统**: [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md)
- 色彩系统（主色、功能色、状态色）
- 排版规范（字体层级、间距）
- Glassmorphism样式
- 表单交互设计

## 🗄️ Popup页面结构

```tsx
// 主布局
<Popup>
  <TabNavigation>
    <TabButton>设置</TabButton>
    <TabButton>历史</TabButton>
    <TabButton>统计</TabButton>
  </TabNavigation>

  <TabContent>
    {activeTab === 'settings' && <Settings />}
    {activeTab === 'history' && <HistoryList />}
    {activeTab === 'stats' && <StatsView />}
  </TabContent>
</Popup>
```

## 🎨 组件设计

### Settings组件
```tsx
interface SettingsProps {
  onSave: (settings: UserSettings) => void
}

export const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [newsSources, setNewsSources] = useState<string[]>([])
  const [apiKey, setApiKey] = useState('')

  return (
    <div className="settings-container">
      <h2>配置</h2>

      <div className="settings-section">
        <h3>新闻源</h3>
        <CheckboxGroup
          options={AVAILABLE_SOURCES}
          selected={newsSources}
          onChange={setNewsSources}
        />
      </div>

      <div className="settings-section">
        <h3>智谱AI配置</h3>
        <Input
          type="password"
          value={apiKey}
          onChange={setApiKey}
          placeholder="输入您的API密钥"
        />
      </div>

      <Button onClick={() => onSave({ newsSources, apiKey })}>
        保存设置
      </Button>
    </div>
  )
}
```

### HistoryList组件
```tsx
interface HistoryItem {
  id: string
  type: 'open_forecast' | 'close_advice'
  date: string
  result: string
  confidence: number
  reason: string
}

export const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [filterType, setFilterType] = useState<'all' | 'open_forecast' | 'close_advice'>('all')

  const filteredHistory = history.filter(item =>
    filterType === 'all' || item.type === filterType
  )

  return (
    <div className="history-list">
      <div className="filter-bar">
        <Button onClick={() => setFilterType('all')}>全部</Button>
        <Button onClick={() => setFilterType('open_forecast')}>开盘预测</Button>
        <Button onClick={() => setFilterType('close_advice')}>尾盘建议</Button>
      </div>

      {filteredHistory.map(item => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### StatsView组件
```tsx
export const StatsView: React.FC = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracyRate: 0,
    bullishCount: 0,
    bearishCount: 0,
  monthlyData: []
  })

  return (
    <div className="stats-view">
      <h2>统计</h2>

      <div className="stats-grid">
        <StatCard
          title="总预测次数"
          value={stats.totalPredictions}
        />
        <StatCard
          title="准确率"
          value={`${(stats.accuracyRate * 100).toFixed(1)}%`}
          color={stats.accuracyRate >= 0.6 ? 'success' : 'warning'}
        />
        <StatCard
          title="看涨次数"
          value={stats.bullishCount}
          color="bullish"
        />
        <StatCard
          title="看跌次数"
          value={stats.bearishCount}
          color="bearish"
        />
      </div>

      <div className="chart-container">
        <TrendChart data={stats.monthlyData} />
      </div>
    </div>
  )
}
```

## 🗄️ Popup页面HTML结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI金融新闻 - 配置</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      width: 400px;
      height: 500px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    #app {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./index.tsx"></script>
</body>
</html>
```

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md) - 完整设计系统
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../ai-engineer/README.md](../ai-engineer/README.md) - AI预测数据结构
- [../backend/README.md](../backend/README.md) - 数据库查询接口

## 🚀 工作流程

1. **与产品经理协作** - 理解配置页面和统计需求
2. **与UI/UX设计师协作** - 按照设计系统实现组件
3. **与架构师协作** - 确认Popup页面架构
4. **与后端开发协作** - 了解数据接口格式
5. **与测试开发协作** - 提供测试用例所需的数据格式

## ✅ 交付物清单

- [ ] index.html（Popup页面入口）
- [ ] index.tsx（React入口）
- [ ] Settings组件（含源选择、API配置）
- [ ] HistoryList组件（含筛选功能）
- [ ] StatsView组件（含图表展示）
- [ ] CSS样式文件（响应式设计）

---

*文档创建日期: 2026-03-06*
