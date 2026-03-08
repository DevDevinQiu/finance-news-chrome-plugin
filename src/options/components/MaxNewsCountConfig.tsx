import { useState } from 'react'
import type { Settings } from '../../shared/types/news'

interface MaxNewsCountConfigProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  disabled?: boolean
}

export default function MaxNewsCountConfig({
  settings,
  onSettingsChange,
  disabled = false
}: MaxNewsCountConfigProps) {
  const [value, setValue] = useState(settings.maxNewsCount.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  const handleBlur = () => {
    const numValue = Number(value)
    if (numValue > 0 && numValue <= 200) {
      onSettingsChange({ ...settings, maxNewsCount: numValue })
    } else {
      setValue(settings.maxNewsCount.toString())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const presetValues = [20, 50, 100, 150, 200]

  return (
    <div>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>
        最大新闻数量设置
      </h2>
      <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
        设置保存的最大新闻条数，建议根据存储空间调整
      </div>

      {/* 快捷预设值 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>快速选择:</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presetValues.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setValue(preset.toString())
                onSettingsChange({ ...settings, maxNewsCount: preset })
              }}
              disabled={disabled}
              style={{
                padding: '8px 16px',
                background: settings.maxNewsCount === preset ? '#1976d2' : '#fff',
                color: settings.maxNewsCount === preset ? '#fff' : '#333',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s',
                ...(disabled
                  ? { opacity: 0.5 }
                  : {
                      ':hover': {
                        background: settings.maxNewsCount === preset ? '#1565c0' : '#f5f5f5'
                      }
                    })
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* 自定义输入 */}
      <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          自定义数量:
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            min={1}
            max={200}
            style={{
              padding: '10px 14px',
              fontSize: '16px',
              border: '2px solid',
              borderColor: Number(value) > 0 && Number(value) <= 200 ? '#1976d2' : '#ff5252',
              borderRadius: '6px',
              width: '200px',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ fontSize: '14px', color: '#666' }}>
            范围: 1 - 200
          </div>
        </div>
      </div>
    </div>
  )
}
