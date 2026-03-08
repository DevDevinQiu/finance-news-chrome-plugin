/**
 * NewsList - 新闻列表组件
 * 处理加载状态、空状态和新闻列表显示
 */

import { NewsItem } from './NewsItem'
import type { News } from '../../shared/types/news'

interface NewsListProps {
  newsList: News[]
  loading: boolean
  onNewsClick?: (news: News) => void
}

export function NewsList({ newsList, loading, onNewsClick }: NewsListProps) {
  const styles = {
    container: {
      padding: '12px',
      maxHeight: '60vh',
      overflowY: 'auto',
      overflowX: 'hidden',
    } as React.CSSProperties,
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      color: '#666',
      textAlign: 'center' as const,
    } as React.CSSProperties,
    loadingSpinner: {
      width: '32px',
      height: '32px',
      border: '3px solid rgba(25, 118, 210, 0.3)',
      borderTop: '3px solid #1976d2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '12px',
    } as React.CSSProperties,
    empty: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      color: '#999',
      textAlign: 'center' as const,
    } as React.CSSProperties,
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '12px',
      opacity: '0.5',
    } as React.CSSProperties,
  }

  // 加载中状态
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.loadingSpinner} />
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  // 空状态
  if (newsList.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📭</div>
          <p>暂无新闻数据</p>
        </div>
      </div>
    )
  }

  // 显示新闻列表
  const displayNews = newsList.slice(0, 20)

  return (
    <div style={styles.container}>
      {displayNews.map((news) => (
        <NewsItem key={news.id} news={news} onClick={onNewsClick} />
      ))}
    </div>
  )
}
