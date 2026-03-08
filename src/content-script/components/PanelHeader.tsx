/**
 * PanelHeader - 面板头部组件
 * 包含标题、展开/收起按钮、刷新按钮
 */

interface PanelHeaderProps {
  isExpanded: boolean
  onToggle: () => void
  onRefresh: () => void
}

export function PanelHeader({ isExpanded, onToggle, onRefresh }: PanelHeaderProps) {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px 12px 0 0',
    } as React.CSSProperties,
    title: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1976d2',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    } as React.CSSProperties,
    titleIcon: {
      fontSize: '20px',
    } as React.CSSProperties,
    buttons: {
      display: 'flex',
      gap: '8px',
    } as React.CSSProperties,
    button: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#666',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } as React.CSSProperties,
  }

  return (
    <div style={styles.header}>
      <h2 style={styles.title}>
        <span style={styles.titleIcon}>📊</span>
        <span>财经新闻</span>
      </h2>
      <div style={styles.buttons}>
        <button
          style={styles.button}
          onClick={onRefresh}
          title="刷新"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1976d2'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.color = '#666'
          }}
        >
          🔄
        </button>
        <button
          style={styles.button}
          onClick={onToggle}
          title={isExpanded ? '收起' : '展开'}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1976d2'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.color = '#666'
          }}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
    </div>
  )
}
