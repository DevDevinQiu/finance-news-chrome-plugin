import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fetchNewsFromSina,
  fetchNewsFromEastmoney,
  fetchNewsFromTencent,
  fetchAllNews,
  fetchNewsBySource,
} from '../../src/shared/services/newsFetch'
import { NEWS_SOURCES } from '../../src/shared/constants'
import type { News } from '../../src/shared/types/news'

describe('新闻抓取服务测试', () => {
  // 不使用 fake timers，让实际的 setTimeout 工作
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchNewsFromSina', () => {
    it('应该返回新浪财经新闻列表', async () => {
      const news = await fetchNewsFromSina()

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBeGreaterThan(0)
    })

    it('返回的新闻应该包含必要的字段', async () => {
      const news = await fetchNewsFromSina()

      news.forEach((item: News) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('title')
        expect(item).toHaveProperty('source')
        expect(item).toHaveProperty('publish_time')
        expect(item).toHaveProperty('content')
        expect(item).toHaveProperty('url')
        expect(item).toHaveProperty('category')
        expect(item).toHaveProperty('importance')
      })
    })

    it('新浪新闻的 source 应该是 sina', async () => {
      const news = await fetchNewsFromSina()

      news.forEach((item: News) => {
        expect(item.source).toBe(NEWS_SOURCES.SINA)
      })
    })

    it('新闻标题应该非空', async () => {
      const news = await fetchNewsFromSina()

      news.forEach((item: News) => {
        expect(item.title).toBeTruthy()
        expect(typeof item.title).toBe('string')
        expect(item.title.length).toBeGreaterThan(0)
      })
    })

    it('重要性评分应该在 1-5 范围内', async () => {
      const news = await fetchNewsFromSina()

      news.forEach((item: News) => {
        expect(item.importance).toBeGreaterThanOrEqual(1)
        expect(item.importance).toBeLessThanOrEqual(5)
      })
    })
  })

  describe('fetchNewsFromEastmoney', () => {
    it('应该返回东方财富网新闻列表', async () => {
      const news = await fetchNewsFromEastmoney()

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBeGreaterThan(0)
    })

    it('返回的新闻应该符合 News 接口', async () => {
      const news = await fetchNewsFromEastmoney()

      news.forEach((item: News) => {
        expect(item).toMatchObject({
          id: expect.any(String),
          title: expect.any(String),
          source: expect.any(String),
          publish_time: expect.any(String),
        })
        expect(item.source).toBe(NEWS_SOURCES.EASTMONEY)
      })
    })

    it('东方财富网新闻应该有 4 条', async () => {
      const news = await fetchNewsFromEastmoney()

      expect(news.length).toBe(4)
    })
  })

  describe('fetchNewsFromTencent', () => {
    it('应该返回和讯网新闻列表', async () => {
      const news = await fetchNewsFromTencent()

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBeGreaterThan(0)
    })

    it('和讯网新闻应该有不同分类', async () => {
      const news = await fetchNewsFromTencent()

      const categories = news.map((item: News) => item.category)
      expect(categories).toContain('domestic')
      expect(categories).toContain('international')
      expect(categories).toContain('finance')
    })

    it('和讯网新闻应该有 4 条', async () => {
      const news = await fetchNewsFromTencent()

      expect(news.length).toBe(4)
    })
  })

  describe('fetchAllNews', () => {
    it('应该从所有新闻源获取新闻', async () => {
      const allNews = await fetchAllNews([
        NEWS_SOURCES.SINA,
        NEWS_SOURCES.EASTMONEY,
        NEWS_SOURCES.TENCENT,
      ])

      expect(allNews.length).toBe(11) // 3 (sina) + 4 (eastmoney) + 4 (tencent) = 11
    })

    it('应该只从指定的新闻源获取新闻', async () => {
      const news = await fetchAllNews([NEWS_SOURCES.SINA])

      expect(news.length).toBe(3)
      news.forEach((item: News) => {
        expect(item.source).toBe(NEWS_SOURCES.SINA)
      })
    })

    it('新闻应该按发布时间倒序排序', async () => {
      vi.setSystemTime(new Date('2024-01-01T10:00:00.000Z'))

      const news = await fetchAllNews([NEWS_SOURCES.SINA, NEWS_SOURCES.EASTMONEY])

      for (let i = 0; i < news.length - 1; i++) {
        const timeA = new Date(news[i].publish_time).getTime()
        const timeB = new Date(news[i + 1].publish_time).getTime()
        expect(timeA).toBeGreaterThanOrEqual(timeB)
      }
    })

    it('当传入空数组时应该返回空数组', async () => {
      const news = await fetchAllNews([])

      expect(news).toEqual([])
    })

    it('应该合并多个新闻源的新闻', async () => {
      const news = await fetchAllNews([NEWS_SOURCES.SINA, NEWS_SOURCES.EASTMONEY])

      const sources = [...new Set(news.map((item: News) => item.source))]
      expect(sources).toContain(NEWS_SOURCES.SINA)
      expect(sources).toContain(NEWS_SOURCES.EASTMONEY)
    })

    it('每条新闻都应该有唯一的 ID', async () => {
      const news = await fetchAllNews([
        NEWS_SOURCES.SINA,
        NEWS_SOURCES.EASTMONEY,
        NEWS_SOURCES.TENCENT,
      ])

      const ids = news.map((item: News) => item.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('fetchNewsBySource', () => {
    it('应该正确获取新浪财经新闻', async () => {
      const news = await fetchNewsBySource(NEWS_SOURCES.SINA)

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBe(3)
      news.forEach((item: News) => {
        expect(item.source).toBe(NEWS_SOURCES.SINA)
      })
    })

    it('应该正确获取东方财富网新闻', async () => {
      const news = await fetchNewsBySource(NEWS_SOURCES.EASTMONEY)

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBe(4)
      news.forEach((item: News) => {
        expect(item.source).toBe(NEWS_SOURCES.EASTMONEY)
      })
    })

    it('应该正确获取和讯网新闻', async () => {
      const news = await fetchNewsBySource(NEWS_SOURCES.TENCENT)

      expect(Array.isArray(news)).toBe(true)
      expect(news.length).toBe(4)
      news.forEach((item: News) => {
        expect(item.source).toBe(NEWS_SOURCES.TENCENT)
      })
    })

    it('对于未知新闻源应该返回空数组', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn')

      const news = await fetchNewsBySource('unknown_source')

      expect(news).toEqual([])
      expect(consoleWarnSpy).toHaveBeenCalledWith('未知的新闻源: unknown_source')

      consoleWarnSpy.mockRestore()
    })
  })

  describe('数据结构验证', () => {
    it('所有新闻都应该符合 News 接口', async () => {
      const allNews = await fetchAllNews([
        NEWS_SOURCES.SINA,
        NEWS_SOURCES.EASTMONEY,
        NEWS_SOURCES.TENCENT,
      ])

      allNews.forEach((item: News) => {
        // 必需字段
        expect(typeof item.id).toBe('string')
        expect(typeof item.title).toBe('string')
        expect(typeof item.source).toBe('string')
        expect(typeof item.publish_time).toBe('string')

        // 可选字段
        if (item.content !== undefined) {
          expect(typeof item.content).toBe('string')
        }
        if (item.url !== undefined) {
          expect(typeof item.url).toBe('string')
        }
        if (item.category !== undefined) {
          expect(['finance', 'domestic', 'international', 'general']).toContain(
            item.category
          )
        }
        if (item.importance !== undefined) {
          expect(item.importance).toBeGreaterThanOrEqual(1)
          expect(item.importance).toBeLessThanOrEqual(5)
        }

        // ID 格式验证
        expect(item.id).toMatch(/^news_\d+_[a-z0-9]+$/)

        // 时间格式验证
        expect(() => new Date(item.publish_time)).not.toThrow()
      })
    })

    it('所有 URL 都应该是有效的 HTTP/HTTPS URL', async () => {
      const allNews = await fetchAllNews([
        NEWS_SOURCES.SINA,
        NEWS_SOURCES.EASTMONEY,
        NEWS_SOURCES.TENCENT,
      ])

      allNews.forEach((item: News) => {
        if (item.url) {
          expect(item.url).toMatch(/^https?:\/\//)
        }
      })
    })
  })
})
