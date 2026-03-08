/**
 * Content Script - 在页面上注入新闻面板
 */

console.log('Content Script loaded')

// 注入样式
const injectStyles = () => {
  const style = document.createElement('style')
  style.textContent = `
    #finance-news-panel {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica',
        'Arial', sans-serif;
    }

    #finance-news-panel::-webkit-scrollbar {
      width: 6px;
    }

    #finance-news-panel::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }

    #finance-news-panel::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  `
  document.head.appendChild(style)
}

injectStyles()

// 创建面板容器
const createPanel = () => {
  const panel = document.createElement('div')
  panel.id = 'finance-news-panel'
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    max-height: 80vh;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 9999;
    display: none;
  `
  return panel
}

// 创建面板头部
const createPanelHeader = () => {
  const header = document.createElement('div')
  header.style.cssText = `
    padding: 12px 16px;
    background: #f5f5f5;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `

  const title = document.createElement('span')
  title.textContent = '财经新闻'
  title.style.fontWeight = 'bold'

  const closeBtn = document.createElement('button')
  closeBtn.textContent = '×'
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
  `
  closeBtn.onclick = () => {
    const panel = document.getElementById('finance-news-panel')
    if (panel) {
      panel.style.display = 'none'
    }
  }

  header.appendChild(title)
  header.appendChild(closeBtn)

  return header
}

// 创建新闻列表容器
const createNewsList = () => {
  const list = document.createElement('div')
  list.id = 'finance-news-list'
  list.style.cssText = `
    padding: 12px;
    overflow-y: auto;
    max-height: calc(80vh - 50px);
  `
  return list
}

// 创建新闻项
const createNewsItem = (news: { title: string; source: string; publish_time: string }) => {
  const item = document.createElement('div')
  item.style.cssText = `
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.2s;
  `

  item.innerHTML = `
    <div style="font-weight: 500; margin-bottom: 4px;">${news.title}</div>
    <div style="font-size: 12px; color: #888; display: flex; justify-content: space-between;">
      <span>${news.source}</span>
      <span>${news.publish_time}</span>
    </div>
  `

  item.onmouseenter = () => {
    item.style.background = '#f9f9f9'
  }

  item.onmouseleave = () => {
    item.style.background = 'white'
  }

  return item
}

// 创建空状态
const createEmptyState = () => {
  const empty = document.createElement('div')
  empty.style.cssText = `
    padding: 40px 20px;
    text-align: center;
    color: #999;
  `
  empty.textContent = '暂无新闻数据'
  return empty
}

// 创建切换按钮
const createToggleBtn = () => {
  const btn = document.createElement('button')
  btn.textContent = '财经新闻'
  btn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 16px;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: background 0.2s;
  `

  btn.onmouseenter = () => {
    btn.style.background = '#1565c0'
  }

  btn.onmouseleave = () => {
    btn.style.background = '#1976d2'
  }

  btn.onclick = () => {
    const panel = document.getElementById('finance-news-panel')
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none'
    }
  }

  return btn
}

// 初始化面板
const initPanel = () => {
  const panel = createPanel()
  panel.appendChild(createPanelHeader())
  panel.appendChild(createNewsList())
  panel.appendChild(createEmptyState())

  document.body.appendChild(panel)
  document.body.appendChild(createToggleBtn())
}

// 从 Chrome Storage 加载新闻
const loadNews = async () => {
  try {
    const result = await chrome.storage.local.get('newsList')
    const newsList = result.newsList || []

    const listContainer = document.getElementById('finance-news-list')
    if (!listContainer) return

    listContainer.innerHTML = ''

    if (newsList.length === 0) {
      listContainer.appendChild(createEmptyState())
      return
    }

    newsList.slice(0, 20).forEach((news: { title: string; source: string; publish_time: string }) => {
      listContainer.appendChild(createNewsItem(news))
    })
  } catch (error) {
    console.error('Failed to load news:', error)
  }
}

// 监听存储变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.newsList) {
    loadNews()
  }
})

// 等待 DOM 加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPanel()
    loadNews()
  })
} else {
  initPanel()
  loadNews()
}
