import type { Stats } from '../../shared/types/news'

interface StatsViewProps {
  stats: Stats
  onRefresh: () => void
  refreshing?: boolean
}

export default function StatsView({ stats, onRefresh, refreshing = false }: StatsViewProps) {
  return (
    <div
      style={{
        padding: '12px',
        background: '#f5f5f5',
        borderRadius: '6px',
        marginBottom: '16px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>统计信息</h3>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          style={{
            padding: '4px 12px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            opacity: refreshing ? 0.6 : 1
          }}
        >
          {refreshing ? '刷新中...' : '刷新'}
        </button>
      </div>

      <div style={{ fontSize: '13px', color: '#666' }}>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ fontWeight: 500 }}>新闻数量: </span>
          <span>{stats.newsCount}</span>
        </div>
        <div>
          <span style={{ fontWeight: 500 }}>最后更新: </span>
          <span>{stats.lastUpdate || '--'}</span>
        </div>
      </div>
    </div>
  )
}
