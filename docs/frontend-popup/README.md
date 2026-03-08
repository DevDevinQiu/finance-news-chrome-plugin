# 前端开发工程师B (Popup) - 简化版角色职责

> **文档版本**: v2.0 (简化版)
> **更新日期**: 2026-03-08
> **变更说明**: 移除AI配置、历史记录和统计预测相关功能

---

## 💻 角色定义

**姓名**: 前端开发工程师B

**核心职责**:
- Popup页面主框架
- 配置表单UI
- 基础统计展示

---

## 📋 完成工作

### Phase 4: Popup页面开发（预计1-2天）

#### 4.1 Popup页面框架
- [ ] Task 12: 实现Popup页面框架
- [ ] 创建index.html（HTML入口）
- [ ] 创建index.tsx（React入口）
- [ ] 配置Vite构建设置

#### 4.2 配置页面UI（简化版）
- [ ] Settings组件实现
- [ ] 新闻源开关配置（启用/禁用）
- [ ] 更新间隔滑块（1-60分钟）
- [ ] 保存按钮和成功提示

#### 4.3 基础统计展示
- [ ] StatsView组件实现
- [ ] 新闻总数统计
- [ ] 最后更新时间显示
- [ ] 数据源状态显示

---

## 📚 参考文档

**主实施计划**: [../plans/2026-03-08-simplified-implementation-plan.md](../plans/2026-03-08-simplified-implementation-plan.md)

**相关章节**:
- 第5节：前端开发工程师B部分
  - 5.1 Popup页面框架
  - 5.2 配置表单UI（简化版）
  - 5.3 基础统计展示

**设计系统**: [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md)
- 色彩系统（主色、功能色）
- 排版规范（字体层级、间距）
- Glassmorphism样式
- 表单交互设计

---

## 🗄️ Popup页面结构

```tsx
// 主布局（简化版）
<Popup>
  <TabNavigation>
    <TabButton active>设置</TabButton>
    <TabButton>统计</TabButton>
  </TabNavigation>

  <TabContent>
    {activeTab === 'settings' && <Settings />}
    {activeTab === 'stats' && <StatsView />}
  </TabContent>
</Popup>
```

---

## 🎨 组件设计（简化版）

### Settings组件
```tsx
interface SettingsProps {
  onSave: (settings: UserSettings) => void
}

interface UserSettings {
  newsSources: string[]        // 启用的新闻源
  refreshInterval: number       // 更新间隔（分钟）
  maxNewsCount: number         // 最大新闻数量
}

export const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [newsSources, setNewsSources] = useState<string[]>([])
  const [refreshInterval, setRefreshInterval] = useState(5)
  const [maxNewsCount, setMaxNewsCount] = useState(50)

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
        <h3>更新间隔</h3>
        <RangeSlider
          min={1}
          max={60}
          value={refreshInterval}
          onChange={setRefreshInterval}
          unit="分钟"
        />
      </div>

      <div className="settings-section">
        <h3>新闻数量</h3>
        <RangeSlider
          min={10}
          max={200}
          value={maxNewsCount}
          onChange={setMaxNewsCount}
          unit="条"
        />
      </div>

      <Button onClick={() => onSave({ newsSources, refreshInterval, maxNewsCount })}>
        保存设置
      </Button>
    </div>
  )
}
```

### StatsView组件
```tsx
interface StatsData {
  newsCount: number
  lastUpdate: string
  sourceStatus: { [key: string]: boolean }
  updateInterval: number
}

export const StatsView: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    newsCount: 0,
    lastUpdate: '--',
    sourceStatus: {},
    updateInterval: 5
  })

  // 从chrome.storage获取统计数据
  useEffect(() => {
    chrome.storage.local.get(['stats'], (result) => {
      if (result.stats) {
        setStats(result.stats)
      }
    })
  }, [])

  return (
    <div className="stats-view">
      <h2>统计</h2>

      <div className="stats-grid">
        <StatCard
          title="新闻总数"
          value={stats.newsCount}
        />
        <StatCard
          title="最后更新"
          value={stats.lastUpdate}
        />
        <StatCard
          title="更新间隔"
          value={`${stats.updateInterval}分钟`}
        />
      </div>

      <div className="source-status">
        <h3>数据源状态</h3>
        {Object.entries(stats.sourceStatus).map(([source, active]) => (
          <div key={source} className="source-item">
            <span className="source-name">{source}</span>
            <span className={`status-badge ${active ? 'active' : 'inactive'}`}>
              {active ? '✓ 启用' : '✗ 禁用'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

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

---

## 🔗 相关文档

- [team-structure.md](../team-structure.md) - 完整团队结构和依赖关系
- [../ui-ux-designer/design-system.md](../ui-ux-designer/design-system.md) - 完整设计系统
- [../architect/README.md](../architect/README.md) - 项目脚手架配置
- [../backend/README.md](../backend/README.md) - 数据库查询接口

---

## 🚀 工作流程

1. **与产品经理协作** - 理解配置页面和统计需求
2. **与UI/UX设计师协作** - 按照设计系统实现组件
3. **与架构师协作** - 确认Popup页面架构
4. **与后端开发协作** - 了解数据接口格式
5. **与测试开发协作** - 提供测试用例所需的数据格式

---

## 🔄 需求变更说明

| 功能模块 | 原版需求 | 简化版需求 | 变更说明 |
|---------|---------|-----------|---------|
| **API密钥配置** | 智谱AI密钥输入 | ❌ **移除** | 不再需要AI |
| **历史记录查看** | 开盘预测/尾盘建议 | ❌ **移除** | 无预测记录 |
| **预测统计** | 准确率、趋势图表 | ❌ **移除** | 无预测数据 |
| **新闻源配置** | 多源开关 | ✅ **保留** | 核心功能 |
| **更新间隔** | 滑块1-60分钟 | ✅ **保留** | 核心功能 |
| **基础统计** | 新闻数、更新时间 | ✅ **保留** | 核心功能 |

---

## ✅ 交付物清单

- [ ] index.html（Popup页面入口）
- [ ] index.tsx（React入口）
- [ ] Settings组件（含源选择、间隔配置）
- [ ] StatsView组件（含基础统计）
- [ ] CSS样式文件（响应式设计）
- [ ] 单元测试文件

---

*文档创建日期: 2026-03-06*
*更新日期: 2026-03-08（简化版）*
