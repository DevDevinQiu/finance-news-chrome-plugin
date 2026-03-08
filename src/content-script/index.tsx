/**
 * Content Script - 在页面上注入新闻面板（React 版本）
 */

import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getNewsList } from '../shared/utils/storage'
import { FinancePanel } from './components'
import type { News } from '../shared/types/news'

// 注入全局样式
const injectStyles = () => {
  // 检查是否已注入
  if (document.getElementById('finance-news-styles')) {
    return
  }

  const style = document.createElement('style')
  style.id = 'finance-news-styles'
  style.textContent = `
    #finance-news-panel-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica',
        'Arial', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    #finance-news-panel-container::-webkit-scrollbar {
      width: 6px;
    }

    #finance-news-panel-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }

    #finance-news-panel-container::-webkit-scrollbar-thumb {
      background: rgba(102, 102, 102, 0.5);
      border-radius: 3px;
    }

    #finance-news-panel-container::-webkit-scrollbar-thumb:hover {
      background: rgba(102, 102, 102, 0.7);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}

// 主应用组件
function App() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  // 从 Storage 加载新闻数据
  const loadNews = async () => {
    try {
      setLoading(true)
      const news = await getNewsList()
      console.log('[Content Script] Loaded news from storage:', news)
      console.log('[Content Script] News count:', news.length)
      setNewsList(news)
    } catch (error) {
      console.error('[Content Script] Failed to load news:', error)
      setNewsList([])
    } finally {
      setLoading(false)
    }
  }

  // 初始加载
  useEffect(() => {
    loadNews()
  }, [])

  // 监听 Storage 变化
  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === 'local' && changes.newsList) {
        const newNews = changes.newsList.newValue || []
        setNewsList(newNews)
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  // 刷新数据
  const handleRefresh = () => {
    loadNews()
  }

  // 处理新闻点击
  const handleNewsClick = (news: News) => {
    if (news.url) {
      window.open(news.url, '_blank')
    }
  }

  // 创建切换按钮
  const ToggleButton = () => {
    const buttonStyles = {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      zIndex: 9998,
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    } as React.CSSProperties

    return (
      <button
        style={buttonStyles}
        onClick={() => setVisible(!visible)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.4)'
        }}
      >
        📊 财经新闻
      </button>
    )
  }

  return (
    <>
      <ToggleButton />
      {visible && (
        <FinancePanel
          newsList={newsList}
          loading={loading}
          onRefresh={handleRefresh}
          onNewsClick={handleNewsClick}
        />
      )}
    </>
  )
}

// 初始化 React 应用
const initApp = () => {
  // 注入样式
  injectStyles()

  // 创建容器
  const container = document.createElement('div')
  container.id = 'finance-news-panel-container'
  document.body.appendChild(container)

  // 渲染 React 应用
  const root = createRoot(container)
  root.render(<App />)
}

// 等待 DOM 加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

console.log('Content Script loaded (React version)')
