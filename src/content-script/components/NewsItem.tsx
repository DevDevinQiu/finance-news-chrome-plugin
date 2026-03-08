/**
 * NewsItem - 新闻项组件
 * 显示单条新闻，使用 Glassmorphism 样式
 */

import type { News } from '../../shared/types/news'
import { useState } from 'react'

interface NewsItemProps {
  news: News
  onClick?: (news: News) => void
}

export function NewsItem({ news, onClick }: NewsItemProps) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick(news)
    }
    // 切换内容展开状态
    setExpanded(!expanded)
  }

  const styles = {
    item: {
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    } as React.CSSProperties,
    title: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px',
      lineHeight: '1.4',
    } as React.CSSProperties,
    meta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#666',
    } as React.CSSProperties,
    source: {
      padding: '2px 8px',
      borderRadius: '4px',
      background: 'rgba(25, 118, 210, 0.1)',
      color: '#1976d2',
    } as React.CSSProperties,
    time: {
      color: '#999',
    } as React.CSSProperties,
    content: {
      marginTop: '8px',
      paddingTop: '8px',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      padding: '8px',
      fontSize: '13px',
      lineHeight: '1.6',
      color: '#555',
      maxHeight: expanded ? '200px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
    } as React.CSSProperties,
    expandIcon: {
      fontSize: '12px',
      marginLeft: '4px',
      transition: 'transform 0.2s ease',
    } as React.CSSProperties,
  }

  return (
    <div
      style={styles.item}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={styles.title}>
        {news.title}
        <span style={styles.expandIcon}>{expanded ? '▼' : '▶'}</span>
      </div>
      <div style={styles.meta}>
        <span style={styles.source}>{news.source}</span>
        <span style={styles.time}>{news.publish_time}</span>
      </div>
      {news.content && (
        <div style={styles.content}>
          {news.content}
        </div>
      )}
    </div>
  )
}
