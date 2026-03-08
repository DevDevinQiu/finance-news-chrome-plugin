import type { Settings } from '../../shared/types/news'

interface RefreshIntervalConfigProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  disabled?: boolean
}

const INTERVAL_OPTIONS = [
  { value: 1, label: '1 分钟' },
  { value: 5, label: '5 分钟' },
  { value: 10, label: '10 分钟' },
  { value: 30, label: '30 分钟' },
  { value: 60, label: '1 小时' }
]

export default function RefreshIntervalConfig({
  settings,
  onSettingsChange,
  disabled = false
}: RefreshIntervalConfigProps) {
  const updateRefreshInterval = (interval: number) => {
    onSettingsChange({ ...settings, refreshInterval: interval })
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>
        刷新间隔设置
      </h2>
      <div style={{ marginBottom: '12px', color: '#666', fontSize: '14px' }}>
        设置自动刷新新闻数据的时间间隔
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {INTERVAL_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => updateRefreshInterval(option.value)}
            disabled={disabled}
            style={{
              padding: '16px',
              background: settings.refreshInterval === option.value ? '#1976d2' : '#fff',
              color: settings.refreshInterval === option.value ? '#fff' : '#333',
              border: '2px solid',
              borderColor: settings.refreshInterval === option.value ? '#1976d2' : '#ddd',
              borderRadius: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.2s',
              ...(disabled
                ? { opacity: 0.5 }
                : {
                    ':hover': {
                      background: settings.refreshInterval === option.value ? '#1565c0' : '#f5f5f5'
                    }
                  })
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
