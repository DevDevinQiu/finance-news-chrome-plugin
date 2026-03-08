import { createRoot } from 'react-dom/client'

function App() {
  const handleRefresh = () => {
    // 发送消息给 background script 刷新新闻
    chrome.runtime.sendMessage({ type: 'REFRESH_DATA' })
  }

  const handleOpenSettings = () => {
    chrome.runtime.openOptionsPage()
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
          margin: '0 0 24px 0',
          color: '#666',
          fontSize: '13px'
        }}
      >
        自动聚合财经新闻和政治新闻
      </p>

      {/* 按钮区域 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={handleRefresh}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1565c0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1976d2'
          }}
        >
          🔄 立即刷新
        </button>

        <button
          onClick={handleOpenSettings}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: 'white',
            color: '#666',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f5f5f5'
            e.currentTarget.style.borderColor = '#d0d0d0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.borderColor = '#e0e0e0'
          }}
        >
          ⚙️ 打开完整设置
        </button>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
