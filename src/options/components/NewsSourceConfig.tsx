import { NEWS_SOURCE_NAMES } from '../../shared/constants'
import type { Settings } from '../../shared/types/news'

interface NewsSourceConfigProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  disabled?: boolean
}

export default function NewsSourceConfig({
  settings,
  onSettingsChange,
  disabled = false
}: NewsSourceConfigProps) {
  const toggleNewsSource = (source: string) => {
    const newSources = settings.newsSources.includes(source)
      ? settings.newsSources.filter((s) => s !== source)
      : [...settings.newsSources, source]
    onSettingsChange({ ...settings, newsSources: newSources })
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>
        新闻源配置
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(NEWS_SOURCE_NAMES).map(([key, name]) => (
          <label
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#f9f9f9',
              borderRadius: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              transition: 'background 0.2s',
              ...(disabled ? {} : { '&:hover': { background: '#f0f0f0' } })
            }}
          >
            <input
              type="checkbox"
              checked={settings.newsSources.includes(key)}
              onChange={() => toggleNewsSource(key)}
              disabled={disabled}
              style={{
                width: '18px',
                height: '18px',
                marginRight: '12px',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                来源 ID: {key}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
