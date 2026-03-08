/**
 * FinancePanel - 主面板组件
 * 整合所有子组件，管理整体布局
 */

import { useState } from 'react'
import { PanelHeader } from './PanelHeader'
import { NewsList } from './NewsList'
import type { News } from '../../shared/types/news'

interface FinancePanelProps {
  newsList: News[]
  loading: boolean
  onRefresh: () => void
  onNewsClick?: (news: News) => void
}

export function FinancePanel({
  newsList,
  loading,
  onRefresh,
  onNewsClick,
}: FinancePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const styles = {
    panel: {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      width: '340px',
      maxHeight: '80vh',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      zIndex: 9999,
      border: '1px solid rgba(255, 255, 255, 0.4)',
      overflow: 'visible',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,
    collapsedPanel: {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      width: 'auto',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      zIndex: 9999,
      border: '1px solid rgba(255, 255, 255, 0.4)',
      overflow: 'visible',
    } as React.CSSProperties,
  }

  if (!isExpanded) {
    return <div style={styles.collapsedPanel}>{<PanelHeader isExpanded={false} onToggle={handleToggle} onRefresh={onRefresh} />}</div>
  }

  return (
    <div style={styles.panel}>
      <PanelHeader isExpanded={true} onToggle={handleToggle} onRefresh={onRefresh} />
      <NewsList newsList={newsList} loading={loading} onNewsClick={onNewsClick} />
    </div>
  )
}
