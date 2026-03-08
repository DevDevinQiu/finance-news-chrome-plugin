import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Settings from './components/Settings'
import StatsView from './components/StatsView'
import { getSettings, getStats, setStats } from '../shared/utils/storage'
import type { Settings as SettingsType, Stats as StatsType } from '../shared/types/news'

function App() {
  const [settings, setSettings] = useState<SettingsType>({
    newsSources: [],
    refreshInterval: 5,
    maxNewsCount: 50
  })
  const [stats, setStatsState] = useState<StatsType>({
    newsCount: 0,
    lastUpdate: '',
    updateInterval: 5
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadSettings()
    loadStats()
  }, [])

  const loadSettings = async () => {
    try {
      const loadedSettings = await getSettings()
      setSettings(loadedSettings)
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const loadedStats = await getStats()
      setStatsState(loadedStats)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const handleSettingsChange = (newSettings: SettingsType) => {
    setSettings(newSettings)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      // 更新最后更新时间
      const now = new Date()
      const lastUpdate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      const updatedStats: StatsType = {
        ...stats,
        lastUpdate
      }
      await setStats(updatedStats)
      setStatsState(updatedStats)
    } catch (error) {
      console.error('Failed to refresh:', error)
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div style={{ width: '320px', padding: '16px' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>加载中...</div>
      </div>
    )
  }

  return (
    <div style={{ width: '320px', padding: '16px' }}>
      <h2
        style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: 600,
          color: '#1976d2'
        }}
      >
        财经新闻
      </h2>
      <p
        style={{
          margin: '0 0 16px 0',
          color: '#666',
          fontSize: '13px'
        }}
      >
        自动聚合财经新闻和政治新闻
      </p>

      {/* 统计信息 */}
      <StatsView stats={stats} onRefresh={handleRefresh} refreshing={refreshing} />

      {/* 设置区域 */}
      <div
        style={{
          marginTop: '12px',
          padding: '12px',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          backgroundColor: '#fafafa'
        }}
      >
        <h3
          style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          快捷设置
        </h3>
        <Settings
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>

      {/* 设置区域 */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #eee',
          borderRadius: '6px',
          backgroundColor: '#fafafa'
        }}
      >
        <Settings
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
