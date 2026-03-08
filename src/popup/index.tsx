import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div style={{ width: '320px', padding: '16px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>财经新闻</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        自动聚合财经新闻和政治新闻
      </p>
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
        <button
          onClick={() => chrome.runtime.openOptionsPage()}
          style={{
            width: '100%',
            padding: '8px 16px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          打开设置
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
