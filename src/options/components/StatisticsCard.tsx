import type { Stats } from '../../shared/types/news'

interface StatisticsCardProps {
  stats: Stats
  onRefresh: () => void
  refreshing?: boolean
}

export default function StatisticsCard({ stats, onRefresh, refreshing = false }: StatisticsCardProps) {
  return (
    <div
      style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: '#fff',
        marginBottom: '32px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 600 }}>
            统计信息
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>新闻总数</div>
              <div style={{ fontSize: '32px', fontWeight: 600 }}>{stats.newsCount}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>刷新间隔</div>
              <div style={{ fontSize: '32px', fontWeight: 600 }}>{stats.updateInterval} 分钟</div>
            </div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '14px', opacity: 0.9 }}>
            最后更新: {stats.lastUpdate || '--'}
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          style={{
            padding: '12px 20px',
            background: '#fff',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
            opacity: refreshing ? 0.6 : 1,
            ...(refreshing
              ? {}
              : {
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                })
          }}
        >
          {refreshing ? '刷新中...' : '立即刷新'}
        </button>
      </div>
    </div>
  )
}
