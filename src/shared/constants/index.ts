/**
 * 项目常量定义
 */

// 新闻源配置
export const NEWS_SOURCES = {
  SINA: 'sina',
  EASTMONEY: 'eastmoney',
  TENCENT: 'tencent',
} as const

export const NEWS_SOURCE_NAMES = {
  [NEWS_SOURCES.SINA]: '新浪财经',
  [NEWS_SOURCES.EASTMONEY]: '东方财富网',
  [NEWS_SOURCES.TENCENT]: '和讯网',
} as const

// 默认设置
export const DEFAULT_SETTINGS = {
  newsSources: Object.values(NEWS_SOURCES),
  refreshInterval: 5, // 分钟
  maxNewsCount: 50,
} as const

// 存储键
export const STORAGE_KEYS = {
  NEWS_LIST: 'newsList',
  SETTINGS: 'settings',
  STATS: 'stats',
} as const

// 消息类型
export const MESSAGE_TYPES = {
  GET_STATS: 'GET_STATS',
  REFRESH_DATA: 'REFRESH_DATA',
  UPDATE_STATS: 'UPDATE_STATS',
  GET_NEWS: 'GET_NEWS',
} as const

// 定时任务名称
export const ALARM_NAMES = {
  REFRESH: 'refresh-alarm',
} as const
