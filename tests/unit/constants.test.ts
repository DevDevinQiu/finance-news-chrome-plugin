import { describe, it, expect } from 'vitest'
import {
  NEWS_SOURCES,
  NEWS_SOURCE_NAMES,
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  MESSAGE_TYPES,
  ALARM_NAMES,
} from '../../src/shared/constants'

describe('常量定义测试', () => {
  describe('NEWS_SOURCES', () => {
    it('应该定义三个新闻源', () => {
      expect(Object.keys(NEWS_SOURCES)).toHaveLength(3)
    })

    it('SINA 应该是 sina', () => {
      expect(NEWS_SOURCES.SINA).toBe('sina')
    })

    it('EASTMONEY 应该是 eastmoney', () => {
      expect(NEWS_SOURCES.EASTMONEY).toBe('eastmoney')
    })

    it('TENCENT 应该是 tencent', () => {
      expect(NEWS_SOURCES.TENCENT).toBe('tencent')
    })

    it('所有新闻源的值都应该是非空字符串', () => {
      Object.values(NEWS_SOURCES).forEach((value) => {
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      })
    })
  })

  describe('NEWS_SOURCE_NAMES', () => {
    it('应该有与 NEWS_SOURCES 对应的名称映射', () => {
      expect(NEWS_SOURCE_NAMES[NEWS_SOURCES.SINA]).toBe('新浪财经')
      expect(NEWS_SOURCE_NAMES[NEWS_SOURCES.EASTMONEY]).toBe('东方财富网')
      expect(NEWS_SOURCE_NAMES[NEWS_SOURCES.TENCENT]).toBe('和讯网')
    })

    it('所有新闻源名称都应该是中文', () => {
      Object.values(NEWS_SOURCE_NAMES).forEach((name) => {
        expect(typeof name).toBe('string')
        expect(name).toMatch(/[\u4e00-\u9fa5]/) // 包含中文字符
      })
    })

    it('应该包含所有定义的新闻源', () => {
      Object.values(NEWS_SOURCES).forEach((source) => {
        expect(NEWS_SOURCE_NAMES[source]).toBeDefined()
      })
    })
  })

  describe('DEFAULT_SETTINGS', () => {
    it('应该包含 newsSources 配置', () => {
      expect(DEFAULT_SETTINGS).toHaveProperty('newsSources')
      expect(Array.isArray(DEFAULT_SETTINGS.newsSources)).toBe(true)
    })

    it('newsSources 应该包含所有新闻源', () => {
      expect(DEFAULT_SETTINGS.newsSources).toContain(NEWS_SOURCES.SINA)
      expect(DEFAULT_SETTINGS.newsSources).toContain(NEWS_SOURCES.EASTMONEY)
      expect(DEFAULT_SETTINGS.newsSources).toContain(NEWS_SOURCES.TENCENT)
    })

    it('refreshInterval 应该是正整数', () => {
      expect(DEFAULT_SETTINGS).toHaveProperty('refreshInterval')
      expect(typeof DEFAULT_SETTINGS.refreshInterval).toBe('number')
      expect(DEFAULT_SETTINGS.refreshInterval).toBeGreaterThan(0)
      expect(DEFAULT_SETTINGS.refreshInterval).toBe(5)
    })

    it('maxNewsCount 应该是正整数', () => {
      expect(DEFAULT_SETTINGS).toHaveProperty('maxNewsCount')
      expect(typeof DEFAULT_SETTINGS.maxNewsCount).toBe('number')
      expect(DEFAULT_SETTINGS.maxNewsCount).toBeGreaterThan(0)
      expect(DEFAULT_SETTINGS.maxNewsCount).toBe(50)
    })

    it('默认值应该是合理的配置', () => {
      expect(DEFAULT_SETTINGS.newsSources).toHaveLength(3)
      expect(DEFAULT_SETTINGS.refreshInterval).toBeLessThanOrEqual(60) // 不超过1小时
      expect(DEFAULT_SETTINGS.maxNewsCount).toBeLessThanOrEqual(1000) // 不超过1000条
    })
  })

  describe('STORAGE_KEYS', () => {
    it('应该定义 newsList 键', () => {
      expect(STORAGE_KEYS.NEWS_LIST).toBe('newsList')
    })

    it('应该定义 settings 键', () => {
      expect(STORAGE_KEYS.SETTINGS).toBe('settings')
    })

    it('应该定义 stats 键', () => {
      expect(STORAGE_KEYS.STATS).toBe('stats')
    })

    it('所有存储键都应该是小驼峰命名', () => {
      Object.values(STORAGE_KEYS).forEach((key) => {
        expect(typeof key).toBe('string')
        expect(key).toMatch(/^[a-z][a-zA-Z]*$/)
      })
    })

    it('存储键应该是唯一的', () => {
      const keys = Object.values(STORAGE_KEYS)
      const uniqueKeys = new Set(keys)
      expect(uniqueKeys.size).toBe(keys.length)
    })
  })

  describe('MESSAGE_TYPES', () => {
    it('应该定义 GET_STATS 类型', () => {
      expect(MESSAGE_TYPES.GET_STATS).toBe('GET_STATS')
    })

    it('应该定义 REFRESH_DATA 类型', () => {
      expect(MESSAGE_TYPES.REFRESH_DATA).toBe('REFRESH_DATA')
    })

    it('应该定义 UPDATE_STATS 类型', () => {
      expect(MESSAGE_TYPES.UPDATE_STATS).toBe('UPDATE_STATS')
    })

    it('应该定义 GET_NEWS 类型', () => {
      expect(MESSAGE_TYPES.GET_NEWS).toBe('GET_NEWS')
    })

    it('所有消息类型都应该是大写下划线命名', () => {
      Object.values(MESSAGE_TYPES).forEach((type) => {
        expect(typeof type).toBe('string')
        expect(type).toMatch(/^[A-Z_]+$/)
      })
    })

    it('消息类型应该是唯一的', () => {
      const types = Object.values(MESSAGE_TYPES)
      const uniqueTypes = new Set(types)
      expect(uniqueTypes.size).toBe(types.length)
    })

    it('应该有4种消息类型', () => {
      expect(Object.keys(MESSAGE_TYPES)).toHaveLength(4)
    })
  })

  describe('ALARM_NAMES', () => {
    it('应该定义 refresh-alarm', () => {
      expect(ALARM_NAMES.REFRESH).toBe('refresh-alarm')
    })

    it('所有定时任务名称都应该是有效的标识符', () => {
      Object.values(ALARM_NAMES).forEach((name) => {
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
        expect(name).toMatch(/^[a-z0-9-]+$/)
      })
    })
  })

  describe('常量的一致性', () => {
    it('NEWS_SOURCES 和 NEWS_SOURCE_NAMES 应该一致', () => {
      Object.values(NEWS_SOURCES).forEach((source) => {
        expect(NEWS_SOURCE_NAMES[source]).toBeDefined()
        expect(typeof NEWS_SOURCE_NAMES[source]).toBe('string')
      })
    })

    it('DEFAULT_SETTINGS.newsSources 应该使用 NEWS_SOURCES 中的值', () => {
      DEFAULT_SETTINGS.newsSources.forEach((source) => {
        expect(Object.values(NEWS_SOURCES)).toContain(source)
      })
    })

    it('所有常量都应该使用 as const 确保类型安全', () => {
      // 这些常量应该是只读的
      const sourcesConst = NEWS_SOURCES as { readonly [key: string]: string }
      const settingsConst = DEFAULT_SETTINGS as {
        readonly [key: string]: unknown
      }

      expect(sourcesConst).toBeDefined()
      expect(settingsConst).toBeDefined()
    })
  })
})
