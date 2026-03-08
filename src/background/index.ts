/**
 * Background Service Worker
 */

import { fetchAllNews } from '../shared/services/newsFetch'
import { setNewsList, setStats } from '../shared/utils/storage'

console.log('Background Service Worker initialized')

// 初始化统计数据
const initializeStats = async () => {
  const result = await chrome.storage.local.get('stats')
  if (!result.stats) {
    await chrome.storage.local.set({
      stats: {
        newsCount: 0,
        lastUpdate: new Date().toLocaleString(),
        updateInterval: 5
      }
    })
  }
}

// 消息监听器
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('Received message:', message)

  switch (message.type) {
    case 'GET_STATS':
      handleGetStats()
        .then((data) => sendResponse({ success: true, data }))
        .catch((error) => sendResponse({ success: false, error: error.message }))
      return true

    case 'REFRESH_DATA':
      handleRefreshData()
        .then(() => sendResponse({ success: true }))
        .catch((error) => sendResponse({ success: false, error: error.message }))
      return true

    case 'UPDATE_STATS':
      handleUpdateStats(message.data)
        .then(() => sendResponse({ success: true }))
        .catch((error) => sendResponse({ success: false, error: error.message }))
      return true

    default:
      console.log('Unknown message type:', message.type)
      sendResponse({ success: false, error: 'Unknown message type' })
      return false
  }
})

// 获取统计数据
async function handleGetStats() {
  const result = await chrome.storage.local.get('stats')
  return result.stats || { newsCount: 0, lastUpdate: '--' }
}

// 刷新数据
async function handleRefreshData() {
  console.log('Refresh data requested')

  try {
    // 获取用户设置
    const settingsResult = await chrome.storage.local.get('settings')
    const settings = settingsResult.settings || {
      newsSources: ['sina', 'eastmoney', 'tencent'],
      refreshInterval: 5,
      maxNewsCount: 50
    }

    // 从启用的新闻源抓取新闻
    const enabledSources = settings.newsSources
    console.log('Fetching news from sources:', enabledSources)

    const news = await fetchAllNews(enabledSources)
    console.log(`Fetched ${news.length} news items`)

    // 限制新闻数量
    const limitedNews = news.slice(0, settings.maxNewsCount)

    // 保存新闻到 storage
    await setNewsList(limitedNews)

    // 更新统计数据
    const stats = await handleGetStats()
    const now = new Date().toLocaleString()
    await setStats({
      ...stats,
      newsCount: limitedNews.length,
      lastUpdate: now
    })

    console.log('Refresh completed successfully')
  } catch (error) {
    console.error('Failed to refresh data:', error)
  }
}

// 更新统计数据
async function handleUpdateStats(data: Partial<{ newsCount: number; lastUpdate: string }>) {
  const currentStats = await handleGetStats()
  await chrome.storage.local.set({
    stats: {
      ...currentStats,
      ...data
    }
  })
}

// 扩展安装/更新监听器
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Extension installed/updated:', details.reason)
  await initializeStats()
  // 首次安装或更新时都抓取新闻
  if (details.reason === 'install' || details.reason === 'update') {
    console.log('Extension install/update - fetching initial news')
    await handleRefreshData()
  }
})

// 闹钟监听器
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refresh-alarm') {
    console.log('Refresh alarm triggered')
    handleRefreshData()
  }
})

// 设置定时刷新
const setupRefreshAlarm = async () => {
  const settings = await chrome.storage.local.get('settings')
  const interval = settings.settings?.refreshInterval || 5

  chrome.alarms.create('refresh-alarm', {
    when: Date.now() + interval * 60 * 1000,
    periodInMinutes: interval
  })
}

// 监听设置变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.settings) {
    console.log('Settings changed:', changes.settings)
    setupRefreshAlarm()
  }
})

// 初始化
initializeStats()
setupRefreshAlarm()
