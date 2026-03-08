import { useState } from 'react'
import { NEWS_SOURCE_NAMES } from '../../shared/constants'
import { setSettings } from '../../shared/utils/storage'
import type { Settings } from '../../shared/types/news'

interface SettingsProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export default function Settings({ settings, onSettingsChange }: SettingsProps) {
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const toggleNewsSource = async (source: string) => {
    const newSources = settings.newsSources.includes(source)
      ? settings.newsSources.filter((s) => s !== source)
      : [...settings.newsSources, source]
    await saveSettings({ ...settings, newsSources: newSources })
  }

  const updateRefreshInterval = async (interval: number) => {
    await saveSettings({ ...settings, refreshInterval: interval })
  }

  const updateMaxNewsCount = async (count: number) => {
    await saveSettings({ ...settings, maxNewsCount: count })
  }

  const saveSettings = async (newSettings: Settings) => {
    setSaving(true)
    setSaveMessage('')

    try {
      await setSettings(newSettings)
      onSettingsChange(newSettings)
      setSaveMessage('设置已保存')

      setTimeout(() => {
        setSaveMessage('')
      }, 2000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setSaveMessage('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* 新闻源设置 */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
          新闻源
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {Object.entries(NEWS_SOURCE_NAMES).map(([key, name]) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                userSelect: 'none'
              }}
            >
              <input
                type="checkbox"
                checked={settings.newsSources.includes(key)}
                onChange={() => toggleNewsSource(key)}
                disabled={saving}
                style={{ marginRight: '6px' }}
              />
              {name}
            </label>
          ))}
        </div>
      </div>

      {/* 刷新间隔 */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
          刷新间隔
        </h3>
        <select
          value={settings.refreshInterval}
          onChange={(e) => updateRefreshInterval(Number(e.target.value))}
          disabled={saving}
          style={{
            padding: '6px 8px',
            fontSize: '13px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '160px',
            width: '100%',
            boxSizing: 'border-box'
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
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
          最大新闻数量
        </h3>
        <input
          type="number"
          value={settings.maxNewsCount}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (value > 0 && value <= 200) {
              updateMaxNewsCount(value)
            }
          }}
          disabled={saving}
          min={1}
          max={200}
          style={{
            padding: '6px 8px',
            fontSize: '13px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '160px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 保存状态 */}
      {saveMessage && (
        <div
          style={{
            padding: '8px 12px',
            background: saveMessage === '设置已保存' ? '#e8f5e9' : '#ffebee',
            color: saveMessage === '设置已保存' ? '#2e7d32' : '#c62828',
            borderRadius: '4px',
            fontSize: '13px',
            marginBottom: '12px'
          }}
        >
          {saveMessage}
        </div>
      )}
    </div>
  )
}
