/**
 * Chrome Storage 封装工具
 * 提供对 chrome.storage.local 的便捷访问
 */

import type { News, Settings, Stats } from '../types/news'
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants'

/**
 * 从 Chrome Storage 读取新闻列表
 * @returns Promise<News[]> 新闻列表
 */
export async function getNewsList(): Promise<News[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['newsList'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('[Storage] Failed to get news:', chrome.runtime.lastError)
        reject(chrome.runtime.lastError)
      } else {
        const news = result.newsList || []
        console.log('[Storage] Retrieved news from storage:', news.length, 'items')
        resolve(news)
      }
    })
  })
}

/**
 * 保存新闻列表到 Chrome Storage
 * @param news 新闻列表
 */
export async function setNewsList(news: News[]): Promise<void> {
  console.log('[Storage] Saving news list:', news.length, 'items')
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ newsList: news }, () => {
      if (chrome.runtime.lastError) {
        console.error('[Storage] Failed to save news:', chrome.runtime.lastError)
        reject(chrome.runtime.lastError)
      } else {
        console.log('[Storage] News saved successfully')
        resolve()
      }
    })
  })
}

/**
 * 读取用户设置
 * @returns Promise<Settings> 用户设置
 */
export async function getSettings(): Promise<Settings> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([STORAGE_KEYS.SETTINGS], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result[STORAGE_KEYS.SETTINGS] || DEFAULT_SETTINGS)
      }
    })
  })
}

/**
 * 保存用户设置
 * @param settings 用户设置
 */
export async function setSettings(settings: Settings): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 读取统计数据
 * @returns Promise<Stats> 统计数据
 */
export async function getStats(): Promise<Stats> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([STORAGE_KEYS.STATS], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(
          result[STORAGE_KEYS.STATS] || {
            newsCount: 0,
            lastUpdate: '',
            updateInterval: DEFAULT_SETTINGS.refreshInterval,
          }
        )
      }
    })
  })
}

/**
 * 保存统计数据
 * @param stats 统计数据
 */
export async function setStats(stats: Stats): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [STORAGE_KEYS.STATS]: stats }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 清空所有存储数据
 */
export async function clearAll(): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.clear(() => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
      }
    })
  })
}
