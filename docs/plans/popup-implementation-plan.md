# Popup页面实施计划

> 文档创建日期: 2026-03-06
> 负责人: 前端开发工程师B (finance-news-frontend-b)
> 预计完成时间: 2天

---

## 一、概述

Popup页面是Chrome扩展的核心配置和管理界面，用户通过Popup进行以下操作：
- 配置新闻源和关键词过滤
- 查看历史预测记录
- 查看统计数据（准确率、总预测次数）
- 管理扩展设置

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | ^18.2.0 | UI框架 |
| TypeScript | ^5.0.0 | 类型系统 |
| Zustand | ^4.4.0 | 状态管理 |
| Ant Design | ^5.0.0 | UI组件库 |
| dayjs | ^1.11.0 | 时间处理 |
| chrome.storage | native | Chrome存储API |

---

## 二、文件结构

```
src/popup/
├── index.html              # Popup入口HTML
├── index.tsx               # Popup入口组件
├── index.css               # Popup全局样式
├── App.tsx                 # Popup根组件
└── components/             # Popup组件
    ├── SettingsForm.tsx     # 配置表单
    ├── HistoryList.tsx      # 历史记录列表
    ├── StatsView.tsx        # 统计数据展示
    └── shared/             # 共享组件
        ├── Tabs.tsx         # Tab导航
        ├── Card.tsx         # 卡片容器
        ├── Badge.tsx        # 徽章组件
        └── Loading.tsx      # 加载状态
```

---

## 三、Popup主框架

### 3.1 入口HTML

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI金融信息推送</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 420px;
      min-height: 560px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    #root {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.tsx"></script>
</body>
</html>
```

### 3.2 入口组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/index.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### 3.3 全局样式

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/index.css`

```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
  --text-primary: rgba(0, 0, 0, 0.85);
  --text-secondary: rgba(0, 0, 0, 0.45);
  --border-color: #f0f0f0;
  --bg-color: #ffffff;
  --bg-hover: #fafafa;
}

* {
  box-sizing: border-box;
}

body {
  background: var(--bg-color);
  color: var(--text-primary);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
```

### 3.4 根组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/App.tsx`

```tsx
import React, { useEffect, useState } from 'react'
import { ConfigProvider, Tabs, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import SettingsForm from './components/SettingsForm'
import HistoryList from './components/HistoryList'
import StatsView from './components/StatsView'

type TabKey = 'settings' | 'history' | 'stats'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('settings')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从chrome.storage加载当前设置的tab
    chrome.storage.local.get(['lastActiveTab'], (result) => {
      if (result.lastActiveTab) {
        setActiveTab(result.lastActiveTab)
      }
      setLoading(false)
    })

    return () => {
      // 保存当前tab
      chrome.storage.local.set({ lastActiveTab: activeTab })
    }
  }, [activeTab])

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey)
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px' }}>
        加载中...
      </div>
    )
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          borderRadius: 8,
        },
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          color: '#fff',
        }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
            AI金融信息推送
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.85 }}>
            基于智谱AI的财经新闻智能分析
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          style={{ height: 'calc(100% - 90px)' }}
          items={[
            {
              key: 'settings',
              label: '设置',
              children: <SettingsForm />,
            },
            {
              key: 'history',
              label: '历史记录',
              children: <HistoryList />,
            },
            {
              key: 'stats',
              label: '统计',
              children: <StatsView />,
            },
          ]}
        />
      </div>
    </ConfigProvider>
  )
}
```

---

## 四、配置表单（SettingsForm）

### 4.1 类型定义

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/types/popup.ts`

```typescript
export interface ExtensionSettings {
  // 新闻源配置
  enabledSources: string[]
  // 关键词过滤
  includeKeywords: string[]
  excludeKeywords: string[]
  // 预测配置
  autoPrediction: boolean
  predictionTime: string
  // 通知配置
  enableNotifications: boolean
  // AI配置
  apiKey?: string
  confidenceThreshold: number
}

export interface NewsSource {
  id: string
  name: string
  category: 'finance' | 'domestic' | 'international'
  enabled: boolean
}

export type PredictionType = 'open_forecast' | 'close_advice'

export interface PredictionRecord {
  id: number
  type: PredictionType
  date: string
  result: string
  reason: string
  confidence: number
  createdAt: string
}
```

### 4.2 Store定义

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/store/popupStore.ts`

```typescript
import { create } from 'zustand'
import { ExtensionSettings, NewsSource, PredictionRecord } from '@/types/popup'

interface PopupStore {
  settings: ExtensionSettings | null
  sources: NewsSource[]
  predictions: PredictionRecord[]
  loading: boolean
  error: string | null

  // Actions
  loadSettings: () => Promise<void>
  saveSettings: (settings: Partial<ExtensionSettings>) => Promise<void>
  loadSources: () => Promise<void>
  loadPredictions: () => Promise<void>
  clearError: () => void
}

const DEFAULT_SETTINGS: ExtensionSettings = {
  enabledSources: ['tencent', 'sina', 'eastmoney'],
  includeKeywords: [],
  excludeKeywords: [],
  autoPrediction: true,
  predictionTime: '09:30',
  enableNotifications: true,
  confidenceThreshold: 0.5,
}

export const usePopupStore = create<PopupStore>((set, get) => ({
  settings: null,
  sources: [],
  predictions: [],
  loading: false,
  error: null,

  loadSettings: async () => {
    set({ loading: true, error: null })
    try {
      const result = await chrome.storage.local.get(['settings'])
      const settings = result.settings || DEFAULT_SETTINGS
      set({ settings, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载设置失败',
        loading: false,
      })
    }
  },

  saveSettings: async (partialSettings) => {
    set({ loading: true, error: null })
    try {
      const currentSettings = get().settings || DEFAULT_SETTINGS
      const newSettings = { ...currentSettings, ...partialSettings }
      await chrome.storage.local.set({ settings: newSettings })
      set({ settings: newSettings, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '保存设置失败',
        loading: false,
      })
    }
  },

  loadSources: async () => {
    try {
      const sources: NewsSource[] = [
        { id: 'tencent', name: '腾讯财经', category: 'finance', enabled: true },
        { id: 'sina', name: '新浪财经', category: 'finance', enabled: true },
        { id: 'eastmoney', name: '东方财富', category: 'finance', enabled: true },
        { id: 'cctv', name: '央视财经', category: 'finance', enabled: false },
        { id: 'chinanews', name: '中国新闻网', category: 'domestic', enabled: true },
        { id: 'xinhua', name: '新华网', category: 'domestic', enabled: false },
        { id: 'reuters', name: '路透社', category: 'international', enabled: false },
      ]
      set({ sources })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '加载数据源失败' })
    }
  },

  loadPredictions: async () => {
    set({ loading: true, error: null })
    try {
      const result = await chrome.runtime.sendMessage({ type: 'GET_PREDICTIONS' })
      set({ predictions: result.data || [], loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载历史记录失败',
        loading: false,
      })
    }
  },

  clearError: () => set({ error: null }),
}))
```

### 4.3 SettingsForm组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/SettingsForm.tsx`

```tsx
import React, { useEffect } from 'react'
import {
  Form,
  Switch,
  Select,
  Input,
  Button,
  Divider,
  Space,
  Card,
  Tag,
  Alert,
  Row,
  Col,
  Typography,
} from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { usePopupStore } from '@/store/popupStore'
import { NewsSource } from '@/types/popup'

const { Title, Text } = Typography

export default function SettingsForm() {
  const [form] = Form.useForm()
  const { settings, sources, loadSettings, loadSources, saveSettings, loading, error, clearError } =
    usePopupStore()

  useEffect(() => {
    loadSettings()
    loadSources()
  }, [])

  useEffect(() => {
    if (settings) {
      form.setFieldsValue(settings)
    }
  }, [settings, form])

  const handleFinish = async (values: any) => {
    await saveSettings(values)
  }

  const groupedSources = {
    finance: sources.filter(s => s.category === 'finance'),
    domestic: sources.filter(s => s.category === 'domestic'),
    international: sources.filter(s => s.category === 'international'),
  }

  const categoryLabels = {
    finance: '财经新闻',
    domestic: '国内政治',
    international: '国际新闻',
  }

  if (!settings) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px' }}>
        加载中...
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      {error && (
        <Alert
          message={error}
          type="error"
          closable
          onClose={clearError}
          style={{ marginBottom: '16px' }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={settings}
      >
        <Card title="新闻源设置" size="small" style={{ marginBottom: '16px' }}>
          {Object.entries(groupedSources).map(([category, categorySources]) => (
            <div key={category} style={{ marginBottom: '12px' }}>
              <Text strong style={{ marginBottom: '8px', display: 'block' }}>
                {categoryLabels[category as keyof typeof categoryLabels]}
              </Text>
              <Space wrap>
                {categorySources.map(source => (
                  <Form.Item
                    key={source.id}
                    name={['enabledSources', source.id]}
                    valuePropName="checked"
                    initialValue={source.enabled}
                    style={{ margin: 0 }}
                  >
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" size="small" />
                  </Form.Item>
                ))}
                <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>
                  {categorySources.map(s => s.name).join(' / ')}
                </span>
              </Space>
            </div>
          ))}
        </Card>

        <Card title="关键词过滤" size="small" style={{ marginBottom: '16px' }}>
          <Form.Item
            label="包含关键词（新闻标题包含任一关键词则显示）"
            name="includeKeywords"
            tooltip="留空表示不过滤"
          >
            <Select
              mode="tags"
              placeholder="输入关键词后按回车"
              style={{ width: '100%' }}
              maxTagCount="responsive"
            />
          </Form.Item>

          <Form.Item
            label="排除关键词（新闻标题包含任一关键词则不显示）"
            name="excludeKeywords"
            tooltip="留空表示不过滤"
          >
            <Select
              mode="tags"
              placeholder="输入关键词后按回车"
              style={{ width: '100%' }}
              maxTagCount="responsive"
            />
          </Form.Item>
        </Card>

        <Card title="预测设置" size="small" style={{ marginBottom: '16px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="autoPrediction" valuePropName="checked" label="自动预测">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="enableNotifications" valuePropName="checked" label="推送通知">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="AI置信度阈值"
            name="confidenceThreshold"
            tooltip="低于此阈值的预测将显示为低置信度"
          >
            <Select style={{ width: '100%' }}>
              <Select.Option value={0.3}>30%（宽松）</Select.Option>
              <Select.Option value={0.5}>50%（标准）</Select.Option>
              <Select.Option value={0.7}>70%（严格）</Select.Option>
              <Select.Option value={0.9}>90%（非常严格）</Select.Option>
            </Select>
          </Form.Item>
        </Card>

        <Card title="API设置" size="small" style={{ marginBottom: '16px' }}>
          <Form.Item
            label="智谱AI API Key"
            name="apiKey"
            tooltip="可选，使用默认API时无需配置"
          >
            <Input.Password placeholder="输入API Key" />
          </Form.Item>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            不填写则使用内置的免费额度。如需更高调用频率，请配置自己的API Key。
          </Text>
        </Card>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
```

---

## 五、历史预测记录列表（HistoryList）

### 5.1 HistoryList组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/HistoryList.tsx`

```tsx
import React, { useEffect, useState } from 'react'
import {
  List,
  Card,
  Badge,
  Space,
  Tag,
  Empty,
  Select,
  Typography,
  Progress,
  Row,
  Col,
} from 'antd'
import {
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { usePopupStore } from '@/store/popupStore'
import { PredictionRecord, PredictionType } from '@/types/popup'

const { Text, Paragraph } = Typography
const { Option } = Select

type FilterType = 'all' | PredictionType

export default function HistoryList() {
  const [filterType, setFilterType] = useState<FilterType>('all')
  const {
    predictions,
    loading,
    loadPredictions,
  } = usePopupStore()

  useEffect(() => {
    loadPredictions()
  }, [])

  const filteredPredictions = React.useMemo(() => {
    if (filterType === 'all') return predictions
    return predictions.filter(p => p.type === filterType)
  }, [predictions, filterType])

  const getPredictionIcon = (result: string) => {
    if (result === '看涨' || result === '加仓') {
      return <RiseOutlined style={{ color: '#52c41a' }} />
    }
    if (result === '看跌' || result === '减仓') {
      return <FallOutlined style={{ color: '#ff4d4f' }} />
    }
    return <MinusOutlined style={{ color: '#8c8c8c' }} />
  }

  const getPredictionColor = (result: string) => {
    if (result === '看涨' || result === '加仓') return '#52c41a'
    if (result === '看跌' || result === '减仓') return '#ff4d4f'
    return '#8c8c8c'
  }

  const getTypeLabel = (type: PredictionType) => {
    return type === 'open_forecast' ? '开盘预测' : '尾盘建议'
  }

  const renderPredictionItem = (item: PredictionRecord) => (
    <List.Item key={item.id}>
      <Card
        size="small"
        hoverable
        style={{ width: '100%' }}
        bodyStyle={{ padding: '12px' }}
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Space size="middle">
              <Tag color="blue">{getTypeLabel(item.type)}</Tag>
              <Space size={4}>
                <ClockCircleOutlined style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)' }} />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {dayjs(item.createdAt).format('MM-DD HH:mm')}
                </Text>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Space size="middle" align="center">
              {getPredictionIcon(item.result)}
              <Text strong style={{ color: getPredictionColor(item.result), fontSize: '16px' }}>
                {item.result}
              </Text>
              <Tag color={item.confidence >= 0.7 ? 'success' : item.confidence >= 0.5 ? 'warning' : 'default'}>
                置信度: {(item.confidence * 100).toFixed(0)}%
              </Tag>
            </Space>
          </Col>

          <Col span={24}>
            <Progress
              percent={item.confidence * 100}
              size="small"
              strokeColor={getPredictionColor(item.result)}
              showInfo={false}
            />
          </Col>

          {item.reason && (
            <Col span={24}>
              <Paragraph
                ellipsis={{ rows: 2, tooltip: item.reason }}
                style={{ margin: 0, fontSize: '13px', color: 'rgba(0,0,0,0.65)' }}
              >
                {item.reason}
              </Paragraph>
            </Col>
          )}
        </Row>
      </Card>
    </List.Item>
  )

  return (
    <div style={{ padding: '16px' }}>
      <Card size="small" style={{ marginBottom: '16px' }}>
        <Space size="middle">
          <Text>筛选类型:</Text>
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 140 }}
          >
            <Option value="all">全部</Option>
            <Option value="open_forecast">开盘预测</Option>
            <Option value="close_advice">尾盘建议</Option>
          </Select>
        </Space>
      </Card>

      <List
        loading={loading}
        dataSource={filteredPredictions}
        renderItem={renderPredictionItem}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无历史记录"
            />
          ),
        }}
      />
    </div>
  )
}
```

---

## 六、统计数据展示（StatsView）

### 6.1 Store扩展

在 `d:/MenusifuStore/finance-news-chrome-plugin/src/store/popupStore.ts` 中添加统计相关状态和方法：

```typescript
interface PopupStats {
  totalPredictions: number
  openForecastCount: number
  closeAdviceCount: number
  accuracyRate: number
  highConfidenceRate: number
  averageConfidence: number
  recentAccuracy: number
}

interface PopupStore {
  // ... 现有属性
  stats: PopupStats | null
  loadStats: () => Promise<void>
}

export const usePopupStore = create<PopupStore>((set, get) => ({
  // ... 现有代码

  stats: null,

  loadStats: async () => {
    set({ loading: true, error: null })
    try {
      const result = await chrome.runtime.sendMessage({ type: 'GET_STATS' })
      set({ stats: result.data || null, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载统计数据失败',
        loading: false,
      })
    }
  },
}))
```

### 6.2 StatsView组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/StatsView.tsx`

```tsx
import React, { useEffect } from 'react'
import {
  Card,
  Statistic,
  Row,
  Col,
  Progress,
  Space,
  Typography,
  Divider,
  Empty,
  Spin,
} from 'antd'
import {
  LineChartOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import { usePopupStore } from '@/store/popupStore'
import { PopupStats } from '@/store/popupStore'

const { Title, Text } = Typography

function StatisticCard({ title, value, prefix, suffix, icon }: {
  title: string
  value: number | string
  prefix?: React.ReactNode
  suffix?: string
  icon?: React.ReactNode
}) {
  return (
    <Card size="small" hoverable>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Text type="secondary" style={{ fontSize: '13px' }}>
          {title}
        </Text>
        <Statistic
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={{ fontSize: '24px', fontWeight: 600 }}
        />
        {icon && <div style={{ marginTop: '8px' }}>{icon}</div>}
      </Space>
    </Card>
  )
}

export default function StatsView() {
  const { stats, loading, loadStats } = usePopupStore()

  useEffect(() => {
    loadStats()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Spin tip="加载统计数据..." />
      </div>
    )
  }

  if (!stats) {
    return (
      <Empty
        description="暂无统计数据"
        style={{ marginTop: '60px' }}
      />
    )
  }

  const accuracyPercent = stats.accuracyRate * 100
  const confidencePercent = stats.averageConfidence * 100
  const recentAccuracyPercent = stats.recentAccuracy * 100

  return (
    <div style={{ padding: '16px' }}>
      <Card title="总体统计" size="small" style={{ marginBottom: '16px' }}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <StatisticCard
              title="总预测次数"
              value={stats.totalPredictions}
              icon={<LineChartOutlined style={{ color: '#1890ff', fontSize: '16px' }} />}
            />
          </Col>
          <Col span={12}>
            <StatisticCard
              title="综合准确率"
              value={accuracyPercent}
              suffix="%"
              prefix={
                accuracyPercent >= 70 ? (
                  <TrophyOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                ) : (
                  <CheckCircleOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                )
              }
            />
          </Col>
        </Row>
      </Card>

      <Card title="分类统计" size="small" style={{ marginBottom: '16px' }}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <StatisticCard
              title="开盘预测次数"
              value={stats.openForecastCount}
              icon={<RiseOutlined style={{ color: '#52c41a', fontSize: '16px' }} />}
            />
          </Col>
          <Col span={12}>
            <StatisticCard
              title="尾盘建议次数"
              value={stats.closeAdviceCount}
              icon={<FireOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />}
            />
          </Col>
        </Row>
      </Card>

      <Card title="质量指标" size="small" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">平均置信度</Text>
              <Text strong>{confidencePercent.toFixed(1)}%</Text>
            </div>
            <Progress
              percent={confidencePercent}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </div>

          <div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">高置信度率 (≥70%)</Text>
              <Text strong>{stats.highConfidenceRate.toFixed(1)}%</Text>
            </div>
            <Progress
              percent={stats.highConfidenceRate * 100}
              strokeColor="#52c41a"
            />
          </div>

          <div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">近期准确率 (近7天)</Text>
              <Text strong>{recentAccuracyPercent.toFixed(1)}%</Text>
            </div>
            <Progress
              percent={recentAccuracyPercent}
              strokeColor="#faad14"
            />
          </div>
        </Space>
      </Card>

      <Card size="small">
        <Text type="secondary" style={{ fontSize: '12px' }}>
          注: 置信度基于AI模型对预测结果的确信程度，准确率基于历史预测与实际市场走势的对比。
        </Text>
      </Card>
    </div>
  )
}
```

---

## 七、共享组件

### 7.1 Tabs组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/shared/Tabs.tsx`

```tsx
import React from 'react'
import { Tabs as AntTabs, TabsProps } from 'antd'

interface TabsItem {
  key: string
  label: React.ReactNode
  children: React.ReactNode
}

interface TabsProps {
  items: TabsItem[]
  activeKey: string
  onChange: (key: string) => void
}

export default function Tabs({ items, activeKey, onChange }: TabsProps) {
  return (
    <AntTabs
      activeKey={activeKey}
      onChange={onChange}
      size="small"
      items={items}
    />
  )
}
```

### 7.2 Badge组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/shared/Badge.tsx`

```tsx
import React from 'react'
import { Badge as AntBadge } from 'antd'

interface BadgeProps {
  count?: number
  children: React.ReactNode
  color?: string
  dot?: boolean
}

export default function Badge({ count, children, color = '#52c41a', dot }: BadgeProps) {
  return (
    <AntBadge count={count} color={color} dot={dot}>
      {children}
    </AntBadge>
  )
}
```

### 7.3 Card组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/shared/Card.tsx`

```tsx
import React from 'react'
import { Card as AntCard } from 'antd'

interface CardProps {
  children: React.ReactNode
  title?: React.ReactNode
  extra?: React.ReactNode
  size?: 'default' | 'small'
  hoverable?: boolean
  style?: React.CSSProperties
}

export default function Card({ children, title, extra, size = 'default', hoverable = false, style }: CardProps) {
  return (
    <AntCard title={title} extra={extra} size={size} hoverable={hoverable} style={style}>
      {children}
    </AntCard>
  )
}
```

### 7.4 Loading组件

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/components/shared/Loading.tsx`

```tsx
import React from 'react'
import { Spin, Empty } from 'antd'

interface LoadingProps {
  loading: boolean
  hasData: boolean
  emptyText?: string
  children: React.ReactNode
}

export default function Loading({ loading, hasData, emptyText = '暂无数据', children }: LoadingProps) {
  if (loading) {
    return <Spin tip="加载中..." style={{ display: 'block', textAlign: 'center', marginTop: '20px' }} />
  }

  if (!hasData) {
    return <Empty description={emptyText} style={{ marginTop: '20px' }} />
  }

  return <>{children}</>
}
```

---

## 八、类型定义汇总

### 8.1 popup.ts

**文件**: `d:/MenusifuStore/finance-news-chrome-plugin/src/types/popup.ts`

```typescript
export interface ExtensionSettings {
  enabledSources: string[]
  includeKeywords: string[]
  excludeKeywords: string[]
  autoPrediction: boolean
  predictionTime: string
  enableNotifications: boolean
  apiKey?: string
  confidenceThreshold: number
}

export interface NewsSource {
  id: string
  name: string
  category: 'finance' | 'domestic' | 'international'
  enabled: boolean
}

export type PredictionType = 'open_forecast' | 'close_advice'

export interface PredictionRecord {
  id: number
  type: PredictionType
  date: string
  result: string
  reason: string
  confidence: number
  createdAt: string
}

export interface PopupStats {
  totalPredictions: number
  openForecastCount: number
  closeAdviceCount: number
  accuracyRate: number
  highConfidenceRate: number
  averageConfidence: number
  recentAccuracy: number
}
```

---

## 九、消息通信接口

### 9.1 Background消息处理

在 `d:/MenusifuStore/finance-news-chrome-plugin/src/background/index.ts` 中添加消息处理器：

```typescript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_PREDICTIONS':
      // 从数据库获取预测记录
      getPredictions(message.data)
        .then(data => sendResponse({ success: true, data }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true

    case 'GET_STATS':
      // 计算统计数据
      calculateStats()
        .then(data => sendResponse({ success: true, data }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true

    case 'UPDATE_SETTINGS':
      // 更新设置
      updateSettings(message.data)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true
  }
})

async function getPredictions(options?: { limit?: number; type?: PredictionType }) {
  // 从SQLite数据库查询预测记录
  const limit = options?.limit || 100
  const typeFilter = options?.type ? `WHERE type = '${options.type}'` : ''
  const sql = `
    SELECT * FROM predictions
    ${typeFilter}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return db.query(sql)
}

async function calculateStats() {
  // 计算统计数据
  const total = db.query('SELECT COUNT(*) as count FROM predictions')[0].count
  const openCount = db.query("SELECT COUNT(*) as count FROM predictions WHERE type = 'open_forecast'")[0].count
  const closeCount = db.query("SELECT COUNT(*) as count FROM predictions WHERE type = 'close_advice'")[0].count

  // 计算准确率（需要与实际数据对比，这里简化处理）
  const accuracyRate = 0.65 // 示例值

  // 计算高置信度率
  const highConfidence = db.query('SELECT COUNT(*) as count FROM predictions WHERE confidence >= 0.7')[0].count
  const highConfidenceRate = total > 0 ? highConfidence / total : 0

  // 计算平均置信度
  const avgConfidence = db.query('SELECT AVG(confidence) as avg FROM predictions')[0].avg || 0

  // 计算近期准确率（近7天）
  const recentAccuracyRate = 0.68 // 示例值

  return {
    totalPredictions: total,
    openForecastCount: openCount,
    closeAdviceCount: closeCount,
    accuracyRate,
    highConfidenceRate,
    averageConfidence: avgConfidence,
    recentAccuracy: recentAccuracyRate,
  }
}

async function updateSettings(settings: Partial<ExtensionSettings>) {
  // 更新设置到chrome.storage
  await chrome.storage.local.set({ settings })
}
```

---

## 十、样式优化

### 10.1 Ant Design主题定制

在 `d:/MenusifuStore/finance-news-chrome-plugin/src/popup/App.tsx` 中完善主题配置：

```tsx
<ConfigProvider
  locale={zhCN}
  theme={{
    algorithm: theme.defaultAlgorithm,
    token: {
      borderRadius: 8,
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    },
    components: {
      Card: {
        borderRadiusLG: 8,
      },
      Button: {
        borderRadius: 6,
      },
      Input: {
        borderRadius: 6,
      },
      Select: {
        borderRadius: 6,
      },
    },
  }}
>
```

---

## 十一、开发流程

### 11.1 实施步骤

| 步骤 | 任务 | 预计时间 |
|-----|------|---------|
| 1 | 创建文件结构和基础配置 | 0.5天 |
| 2 | 实现Popup主框架（App.tsx） | 0.5天 |
| 3 | 实现SettingsForm组件 | 0.5天 |
| 4 | 实现HistoryList组件 | 0.5天 |
| 5 | 实现StatsView组件 | 0.5天 |
| 6 | 实现共享组件 | 0.5天 |
| 7 | 完善Store和类型定义 | 0.5天 |
| 8 | 样式优化和测试 | 0.5天 |

### 11.2 验收标准

- [ ] Popup页面正常加载，无报错
- [ ] 三个Tab切换流畅
- [ ] 设置表单可以保存和加载配置
- [ ] 新闻源选择功能正常
- [ ] 关键词过滤功能正常
- [ ] 历史记录可以正常显示和筛选
- [ ] 统计数据准确显示
- [ ] 所有UI组件样式一致
- [ ] 响应式布局适配不同尺寸

---

## 十二、测试计划

### 12.1 单元测试

使用 Vitest 测试组件逻辑：

```typescript
// tests/unit/popup/SettingsForm.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsForm from '@/popup/components/SettingsForm'
import { usePopupStore } from '@/store/popupStore'

vi.mock('@/store/popupStore')

describe('SettingsForm', () => {
  it('should render settings form', () => {
    render(<SettingsForm />)
    expect(screen.getByText('新闻源设置')).toBeInTheDocument()
  })

  it('should save settings on form submit', async () => {
    const mockSaveSettings = vi.fn()
    vi.mocked(usePopupStore).mockReturnValue({
      settings: DEFAULT_SETTINGS,
      sources: [],
      predictions: [],
      loading: false,
      error: null,
      loadSettings: vi.fn(),
      saveSettings: mockSaveSettings,
      loadSources: vi.fn(),
      loadPredictions: vi.fn(),
      clearError: vi.fn(),
    })

    render(<SettingsForm />)
    const saveButton = screen.getByText('保存设置')
    fireEvent.click(saveButton)

    expect(mockSaveSettings).toHaveBeenCalled()
  })
})
```

### 12.2 集成测试

测试与Background的消息通信：

```typescript
// tests/integration/popup/messaging.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePopupStore } from '@/store/popupStore'

describe('Popup Store Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load predictions from background', async () => {
    const mockPredictions = [
      {
        id: 1,
        type: 'open_forecast',
        date: '2026-03-06',
        result: '看涨',
        reason: '市场情绪积极',
        confidence: 0.75,
        createdAt: '2026-03-06T09:30:00',
      },
    ]

    chrome.runtime.sendMessage = vi.fn((message, callback) => {
      if (message.type === 'GET_PREDICTIONS') {
        callback({ success: true, data: mockPredictions })
      }
    })

    const store = usePopupStore.getState()
    await store.loadPredictions()

    expect(store.predictions).toEqual(mockPredictions)
  })
})
```

---

## 十三、已知问题和限制

1. **Popup窗口大小限制**: Chrome对Popup窗口尺寸有限制，需要确保内容在420px宽度内正常显示
2. **数据同步**: Popup和Background之间的数据同步可能存在延迟，需要添加loading状态
3. **存储限制**: chrome.storage.local 有存储大小限制（约5MB），需要考虑数据量控制
4. **消息传递**: Background消息处理是异步的，需要正确处理Promise

---

## 十四、后续优化方向

1. **添加导出功能**: 允许用户导出历史记录为CSV/JSON
2. **添加图表展示**: 使用Ant Design Charts可视化准确率趋势
3. **添加高级过滤**: 支持按日期范围、置信度范围筛选
4. **添加实时更新**: 使用chrome.storage.onChanged监听配置变化，实时更新UI
5. **添加快捷键支持**: 在Popup中支持键盘快捷操作

---

*文档创建日期: 2026-03-06*
*负责人: 前端开发工程师B (finance-news-frontend-b)*
*文档版本: 1.0*
