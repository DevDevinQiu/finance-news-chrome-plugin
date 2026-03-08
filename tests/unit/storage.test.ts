import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getNewsList,
  setNewsList,
  getSettings,
  setSettings,
  getStats,
  setStats,
  clearAll,
} from '../../src/shared/utils/storage'
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../../src/shared/constants'
import type { News, Settings, Stats } from '../../src/shared/types/news'

describe('Storage 工具测试', () => {
  const mockChrome = global.chrome as typeof chrome

  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks()
    // 重置 runtime.lastError
    mockChrome.runtime.lastError = null
  })

  describe('getNewsList', () => {
    it('应该成功读取新闻列表', async () => {
      const mockNews: News[] = [
        {
          id: 'news_1',
          title: '测试新闻',
          source: 'sina',
          publish_time: new Date().toISOString(),
        },
      ]

      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({ newsList: mockNews })
      })

      const result = await getNewsList()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.NEWS_LIST],
        expect.any(Function)
      )
      expect(result).toEqual(mockNews)
    })

    it('当存储为空时应该返回空数组', async () => {
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      const result = await getNewsList()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.NEWS_LIST],
        expect.any(Function)
      )
      expect(result).toEqual([])
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      await expect(getNewsList()).rejects.toThrow()
    })
  })

  describe('setNewsList', () => {
    it('应该成功保存新闻列表', async () => {
      const mockNews: News[] = [
        {
          id: 'news_1',
          title: '测试新闻',
          source: 'sina',
          publish_time: new Date().toISOString(),
        },
      ]

      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await setNewsList(mockNews)

      expect(mockChrome.storage.local.set).toHaveBeenCalledWith(
        {
          [STORAGE_KEYS.NEWS_LIST]: mockNews,
        },
        expect.any(Function)
      )
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await expect(setNewsList([])).rejects.toThrow()
    })
  })

  describe('getSettings', () => {
    it('应该成功读取用户设置', async () => {
      const mockSettings: Settings = {
        newsSources: ['sina', 'eastmoney'],
        refreshInterval: 10,
        maxNewsCount: 30,
      }

      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({ settings: mockSettings })
      })

      const result = await getSettings()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.SETTINGS],
        expect.any(Function)
      )
      expect(result).toEqual(mockSettings)
    })

    it('当存储为空时应该返回默认设置', async () => {
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      const result = await getSettings()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.SETTINGS],
        expect.any(Function)
      )
      expect(result).toEqual(DEFAULT_SETTINGS)
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      await expect(getSettings()).rejects.toThrow()
    })
  })

  describe('setSettings', () => {
    it('应该成功保存用户设置', async () => {
      const mockSettings: Settings = {
        newsSources: ['sina'],
        refreshInterval: 15,
        maxNewsCount: 40,
      }

      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await setSettings(mockSettings)

      expect(mockChrome.storage.local.set).toHaveBeenCalledWith(
        {
          [STORAGE_KEYS.SETTINGS]: mockSettings,
        },
        expect.any(Function)
      )
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await expect(setSettings(DEFAULT_SETTINGS)).rejects.toThrow()
    })
  })

  describe('getStats', () => {
    it('应该成功读取统计数据', async () => {
      const mockStats: Stats = {
        newsCount: 100,
        lastUpdate: new Date().toISOString(),
        updateInterval: 5,
      }

      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({ stats: mockStats })
      })

      const result = await getStats()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.STATS],
        expect.any(Function)
      )
      expect(result).toEqual(mockStats)
    })

    it('当存储为空时应该返回默认统计数据', async () => {
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      const result = await getStats()

      expect(mockChrome.storage.local.get).toHaveBeenCalledWith(
        [STORAGE_KEYS.STATS],
        expect.any(Function)
      )
      expect(result).toEqual({
        newsCount: 0,
        lastUpdate: '',
        updateInterval: DEFAULT_SETTINGS.refreshInterval,
      })
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.get = vi.fn((keys, callback) => {
        callback({})
      })

      await expect(getStats()).rejects.toThrow()
    })
  })

  describe('setStats', () => {
    it('应该成功保存统计数据', async () => {
      const mockStats: Stats = {
        newsCount: 150,
        lastUpdate: new Date().toISOString(),
        updateInterval: 10,
      }

      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await setStats(mockStats)

      expect(mockChrome.storage.local.set).toHaveBeenCalledWith(
        {
          [STORAGE_KEYS.STATS]: mockStats,
        },
        expect.any(Function)
      )
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.set = vi.fn((data, callback) => {
        callback?.()
      })

      await expect(
        setStats({ newsCount: 0, lastUpdate: '', updateInterval: 5 })
      ).rejects.toThrow()
    })
  })

  describe('clearAll', () => {
    it('应该成功清空所有存储数据', async () => {
      mockChrome.storage.local.clear = vi.fn((callback) => {
        callback?.()
      })

      await clearAll()

      expect(mockChrome.storage.local.clear).toHaveBeenCalledWith(expect.any(Function))
    })

    it('当发生错误时应该 reject', async () => {
      const mockError = new Error('Storage error')
      mockChrome.runtime.lastError = mockError
      mockChrome.storage.local.clear = vi.fn((callback) => {
        callback?.()
      })

      await expect(clearAll()).rejects.toThrow()
    })
  })
})
