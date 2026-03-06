import { describe, it, expect } from 'vitest'
import { categorizeNews } from '@/utils/categoryRules'

describe('Category Rules', () => {
  it('should categorize finance news correctly', () => {
    const news = {
      title: '股市今日大涨，投资者信心提升',
      content: '经济数据显示...',
    }
    expect(categorizeNews(news)).toBe('财经')
  })

  it('should categorize domestic politics news correctly', () => {
    const news = {
      title: '政府发布新的经济政策',
      content: '两会期间...',
    }
    expect(categorizeNews(news)).toBe('国内政治')
  })

  it('should categorize international news correctly', () => {
    const news = {
      title: '美国对华实施新制裁',
      content: '中美关系...',
    }
    expect(categorizeNews(news)).toBe('国际')
  })

  it('should return uncategorized for unknown content', () => {
    const news = {
      title: '美食新闻：新餐厅开业',
      content: '菜品介绍...',
    }
    expect(categorizeNews(news)).toBe('未分类')
  })
})
