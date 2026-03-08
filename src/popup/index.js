// Popup JS
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded')

  // 获取统计数据
  const stats = await chrome.storage.local.get('stats')
  if (stats.stats) {
    document.getElementById('news-count').textContent = stats.stats.newsCount || 0
    document.getElementById('prediction-count').textContent = stats.stats.predictionCount || 0
    document.getElementById('last-update').textContent = stats.stats.lastUpdate || '--'
  }

  // 刷新数据按钮
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    await sendMessage({ type: 'REFRESH_DATA' })
    alert('数据刷新请求已发送')
  })

  // 打开设置按钮
  document.getElementById('open-options').addEventListener('click', () => {
    chrome.runtime.openOptionsPage()
  })
})

// 发送消息到background
async function sendMessage(message) {
  try {
    const response = await chrome.runtime.sendMessage(message)
    if (response && response.success) {
      console.log('Message sent successfully:', response)
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}
