import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import NewsSourceConfig from './components/NewsSourceConfig'
import RefreshIntervalConfig from './components/RefreshIntervalConfig'
import MaxNewsCountConfig from './components/MaxNewsCountConfig'
import StatisticsCard from './components/StatisticsCard'
import { getSettings, getStats, setStats } from '../shared/utils/storage'
import { DEFAULT_SETTINGS } from '../shared/constants'
import type { Settings as SettingsType, Stats as StatsType } from '../shared/types/news'

type TabType = 'statistics' | 'newsSources' | 'refreshInterval' | 'maxNewsCount'

interface TabConfig {
  id: TabType
  label: string
  icon: string
}

const TABS: TabConfig[] = [
  { id: 'statistics', label: '统计信息', icon: '📊' },
  { id: 'newsSources', label: '新闻源配置', icon: '📰' },
  { id: 'refreshInterval', label: '刷新间隔', icon: '⏱️' },
  { id: 'maxNewsCount', label: '最大数量', icon: '🔢' }
]

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('statistics')
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
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

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
      setSettings(DEFAULT_SETTINGS as SettingsType)
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
      const lastUpdate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

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

  const saveAllSettings = async () => {
    setSaving(true)
    setSaveMessage('')

    try {
      await setSettings(settings)
      setSaveMessage('设置已保存')

      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setSaveMessage('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>加载中...</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 600, color: '#1976d2' }}>
          财经新闻插件
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
          管理您的新闻偏好和设置
        </p>
      </div>

      {/* Tab 导航 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: '#f5f5f5',
          padding: '8px',
          borderRadius: '12px'
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={refreshing}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: activeTab === tab.id ? '#1976d2' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#666',
              border: 'none',
              borderRadius: '8px',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              transition: 'all 0.2s',
              opacity: refreshing ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '20px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div style={{ marginBottom: '24px' }}>
        {activeTab === 'statistics' && (
          <StatisticsCard stats={stats} onRefresh={handleRefresh} refreshing={refreshing} />
        )}

        {activeTab === 'newsSources' && (
          <div
            style={{
              padding: '32px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
            }}
          >
            <NewsSourceConfig
              settings={settings}
              onSettingsChange={handleSettingsChange}
              disabled={saving}
            />
          </div>
        )}

        {activeTab === 'refreshInterval' && (
          <div
            style={{
              padding: '32px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
            }}
          >
            <RefreshIntervalConfig
              settings={settings}
              onSettingsChange={handleSettingsChange}
              disabled={saving}
            />
          </div>
        )}

        {activeTab === 'maxNewsCount' && (
          <div
            style={{
              padding: '32px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
            }}
          >
            <MaxNewsCountConfig
              settings={settings}
              onSettingsChange={handleSettingsChange}
              disabled={saving}
            />
          </div>
        )}
      </div>

      {/* 保存状态提示 */}
      {saveMessage && (
        <div
          style={{
            padding: '16px 20px',
            background: saveMessage === '设置已保存' ? '#e8f5e9' : '#ffebee',
            color: saveMessage === '设置已保存' ? '#2e7d32' : '#c62828',
            borderRadius: '8px',
            fontSize: '15px',
            marginBottom: '24px',
            border: `2px solid ${saveMessage === '设置已保存' ? '#4caf50' : '#f44336'}`
          }}
        >
          {saveMessage}
        </div>
      )}

      {/* 保存按钮 */}
      {activeTab !== 'statistics' && (
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={saveAllSettings}
            disabled={saving}
            style={{
              padding: '14px 32px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              transition: 'all 0.2s',
              opacity: saving ? 0.6 : 1,
              ...(saving
                ? {}
                : {
                    ':hover': {
                      background: '#1565c0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                    }
                  })
            }}
          >
            {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      )}

      {/* 页脚 */}
      <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '13px', color: '#999' }}>
        <p style={{ margin: 0 }}>财经新闻插件 v1.0.0</p>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
