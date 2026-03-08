import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

interface Settings {
  newsSources: string[]
  refreshInterval: number
  maxNewsCount: number
}

interface Stats {
  newsCount: number
  lastUpdate: string
}

const NEWS_SOURCE_NAMES: Record<string, string> = {
  sina: '新浪财经',
  eastmoney: '东方财富网',
  tencent: '和讯网'
}

function App() {
  const [settings, setSettings] = useState<Settings>({
    newsSources: ['sina', 'eastmoney', 'tencent'],
    refreshInterval: 5,
    maxNewsCount: 50
  })
  const [stats, setStats] = useState<Stats>({ newsCount: 0, lastUpdate: '--' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
    loadStats()
  }, [])

  const loadSettings = async () => {
    try {
      const result = await chrome.storage.local.get('settings')
      if (result.settings) {
        setSettings(result.settings)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const result = await chrome.storage.local.get('stats')
      if (result.stats) {
        setStats(result.stats)
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const saveSettings = async (newSettings: Settings) => {
    try {
      await chrome.storage.local.set({ settings: newSettings })
      setSettings(newSettings)
      loadStats()
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const toggleNewsSource = (source: string) => {
    const newSources = settings.newsSources.includes(source)
      ? settings.newsSources.filter((s) => s !== source)
      : [...settings.newsSources, source]
    saveSettings({ ...settings, newsSources: newSources })
  }

  const updateRefreshInterval = (interval: number) => {
    saveSettings({ ...settings, refreshInterval: interval })
  }

  const updateMaxNewsCount = (count: number) => {
    saveSettings({ ...settings, maxNewsCount: count })
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>加载中...</div>
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '24px' }}>设置</h1>

      {/* 统计信息 */}
      <div style={{
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>统计信息</h2>
        <p style={{ margin: '4px 0' }}>新闻数量: {stats.newsCount}</p>
        <p style={{ margin: '4px 0' }}>最后更新: {stats.lastUpdate}</p>
      </div>

      {/* 新闻源设置 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>新闻源</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(NEWS_SOURCE_NAMES).map(([key, name]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.newsSources.includes(key)}
                onChange={() => toggleNewsSource(key)}
                style={{ marginRight: '8px' }}
              />
              {name}
            </label>
          ))}
        </div>
      </div>

      {/* 刷新间隔 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>刷新间隔</h2>
        <select
          value={settings.refreshInterval}
          onChange={(e) => updateRefreshInterval(Number(e.target.value))}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        >
          <option value={1}>1 分钟</option>
          <option value={5}>5 分钟</option>
          <option value={10}>10 分钟</option>
          <option value={30}>30 分钟</option>
          <option value={60}>1 小时</option>
        </select>
      </div>

      {/* 最大新闻数量 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>最大新闻数量</h2>
        <input
          type="number"
          value={settings.maxNewsCount}
          onChange={(e) => updateMaxNewsCount(Number(e.target.value))}
          min={1}
          max={200}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '200px'
          }}
        />
      </div>

      {/* 保存状态 */}
      <div style={{
        padding: '12px',
        background: '#e8f5e9',
        color: '#2e7d32',
        borderRadius: '4px',
        fontSize: '14px',
        display: 'none'
      }}>
        设置已保存
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
