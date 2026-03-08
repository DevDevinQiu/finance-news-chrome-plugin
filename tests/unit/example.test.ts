import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NEWS_SOURCES, DEFAULT_SETTINGS, MESSAGE_TYPES } from '../../src/shared/constants'

describe('项目配置测试', () => {
  it('应该正确导入新闻源常量', () => {
    expect(NEWS_SOURCES.SINA).toBe('sina')
    expect(NEWS_SOURCES.EASTMONEY).toBe('eastmoney')
    expect(NEWS_SOURCES.TENCENT).toBe('tencent')
  })

  it('应该有正确的默认设置', () => {
    expect(DEFAULT_SETTINGS.refreshInterval).toBe(5)
    expect(DEFAULT_SETTINGS.maxNewsCount).toBe(50)
    expect(DEFAULT_SETTINGS.newsSources).toHaveLength(3)
  })

  it('应该定义正确的消息类型', () => {
    expect(MESSAGE_TYPES.GET_STATS).toBe('GET_STATS')
    expect(MESSAGE_TYPES.REFRESH_DATA).toBe('REFRESH_DATA')
    expect(MESSAGE_TYPES.UPDATE_STATS).toBe('UPDATE_STATS')
  })
})
