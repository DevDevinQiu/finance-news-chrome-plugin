// Messaging Utilities
export const sendMessage = async <T = any>(message: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(response)
      }
    })
  })
}

export const onMessage = (callback: (message: any, sender: chrome.runtime.MessageSender) => void) => {
  chrome.runtime.onMessage.addListener(callback)
}
