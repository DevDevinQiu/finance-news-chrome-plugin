// Content Script
console.log('Content script injected')

// 监听来自background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_PANEL') {
    console.log('Panel update requested')
    // 可以在这里更新页面UI
    sendResponse({ success: true })
  }
  return true
})

// 示例：在页面上添加一个标识
console.log('AI金融信息推送 - 已注入')
