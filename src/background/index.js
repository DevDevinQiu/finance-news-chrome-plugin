// Background Service Worker
console.log('Background Service Worker initialized')

// 初始化统计数据
const initializeStats = async () => {
  const stats = await chrome.storage.local.get('stats')
  if (!stats.stats) {
    await chrome.storage.local.set({
      stats: {
        newsCount: 0,
        predictionCount: 0,
        lastUpdate: new Date().toLocaleString()
      }
    })
  }
}

// 消息监听器
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message)

  switch (message.type) {
    case 'GET_STATS':
      handleGetStats()
        .then((data) => sendResponse({ success: true, data }))
        .catch((error) => sendResponse({ success: false, error: error.message }))
      return true // 异步响应

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
  const stats = await chrome.storage.local.get('stats')
  return stats.stats || { newsCount: 0, predictionCount: 0, lastUpdate: '--' }
}

// 刷新数据
async function handleRefreshData() {
  console.log('Refresh data requested')
  // 模拟数据刷新
  const stats = await handleGetStats()
  await chrome.storage.local.set({
    stats: {
      ...stats,
      lastUpdate: new Date().toLocaleString()
    }
  })
}

// 更新统计数据
async function handleUpdateStats(data) {
  const currentStats = await handleGetStats()
  await chrome.storage.local.set({
    stats: {
      ...currentStats,
      ...data
    }
  })
}

// 扩展安装监听器
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason)
  initializeStats()
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
  const interval = settings.settings?.updateInterval || 60

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
