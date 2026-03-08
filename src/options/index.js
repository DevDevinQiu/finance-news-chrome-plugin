// Options JS
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Options loaded')

  // 加载当前设置
  const settings = await chrome.storage.local.get('settings')
  if (settings.settings) {
    document.getElementById('update-interval').value = settings.settings.updateInterval || 60
    document.getElementById('auto-refresh').checked = settings.settings.autoRefresh !== false
    document.getElementById('show-notifications').checked = settings.settings.showNotifications !== false
  }

  // 保存设置
  document.getElementById('save-btn').addEventListener('click', async () => {
    const newSettings = {
      updateInterval: parseInt(document.getElementById('update-interval').value) || 60,
      autoRefresh: document.getElementById('auto-refresh').checked,
      showNotifications: document.getElementById('show-notifications').checked
    }

    await chrome.storage.local.set({ settings: newSettings })
    showMessage('设置已保存！', 'success')
  })

  // 清除数据
  document.getElementById('clear-data-btn').addEventListener('click', async () => {
    if (confirm('确定要清除所有数据吗？')) {
      await chrome.storage.local.remove(['news', 'predictions', 'stats'])
      showMessage('数据已清除！', 'success')
    }
  })
})

// 显示消息
function showMessage(text, type = 'info') {
  const messageEl = document.getElementById('status-message')
  messageEl.textContent = text
  messageEl.className = `message message-${type}`

  setTimeout(() => {
    messageEl.textContent = ''
    messageEl.className = 'message'
  }, 3000)
}
