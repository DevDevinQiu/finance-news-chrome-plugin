/**
 * 新闻抓取服务
 * 模拟从各个新闻源获取财经新闻
 */

import type { News } from '../types/news'
import { NEWS_SOURCES } from '../constants'

/**
 * 生成唯一ID
 */
function generateId(): string {
  return `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 获取当前时间字符串
 */
function getCurrentTime(): string {
  return new Date().toISOString()
}

/**
 * 从新浪财经抓取新闻
 * @returns Promise<News[]> 新浪财经新闻列表
 */
export async function fetchNewsFromSina(): Promise<News[]> {
  // TODO: 切换到真实 API 数据
  // console.log('使用真实数据模式')
  // return []

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))

  const mockNews: News[] = [
    {
      id: generateId(),
      title: 'A股三大指数集体收涨，创业板指涨超1%',
      content:
        '今日A股三大指数集体收涨，其中创业板指涨超1%。两市成交额有所放大，市场情绪回暖。北向资金净流入超50亿元。',
      source: NEWS_SOURCES.SINA,
      url: 'https://finance.sina.com.cn/stock/20250308/example1.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 5,
    },
    {
      id: generateId(),
      title: '央行：保持流动性合理充裕，支持实体经济',
      content:
        '中国人民银行表示，将继续实施稳健的货币政策，保持流动性合理充裕，加大对实体经济的支持力度。',
      source: NEWS_SOURCES.SINA,
      url: 'https://finance.sina.com.cn/20250308/example2.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 4,
    },
    {
      id: generateId(),
      title: '券商观点：A股市场具备长期投资价值',
      content:
        '多家券商研报指出，当前A股市场估值处于历史低位，具备长期投资价值。建议关注优质蓝筹股和成长性标的。',
      source: NEWS_SOURCES.SINA,
      url: 'https://finance.sina.com.cn/20250308/example3.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 3,
    },
  ]

  return mockNews
}

/**
 * 从东方财富网抓取新闻
 * @returns Promise<News[]> 东方财富网新闻列表
 */
export async function fetchNewsFromEastmoney(): Promise<News[]> {
  // TODO: 切换到真实 API 数据
  // console.log('使用真实数据模式')
  // return []

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))

  const mockNews: News[] = [
    {
      id: generateId(),
      title: '沪指重回3000点上方，市场信心逐步恢复',
      content:
        '上证指数今日成功站上3000点关口，成交量明显放大。板块方面，科技股表现强势，新能源板块领涨。',
      source: NEWS_SOURCES.EASTMONEY,
      url: 'https://www.eastmoney.com/a/20250308/example1.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 5,
    },
    {
      id: generateId(),
      title: '北向资金连续5日净流入，外资看好中国市场',
      content:
        '数据显示，北向资金已连续5个交易日实现净流入，累计净流入金额超过200亿元，表明外资对中国市场的信心正在恢复。',
      source: NEWS_SOURCES.EASTMONEY,
      url: 'https://www.eastmoney.com/a/20250308/example2.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 4,
    },
    {
      id: generateId(),
      title: '基金调仓换股，科技板块受青睐',
      content:
        '最新数据显示，公募基金近期大幅调仓，科技板块成为重点配置方向。半导体、人工智能等细分领域获增持。',
      source: NEWS_SOURCES.EASTMONEY,
      url: 'https://www.eastmoney.com/a/20250308/example3.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 3,
    },
    {
      id: generateId(),
      title: '人民币汇率保持稳定，外汇市场运行平稳',
      content:
        '今日人民币对美元汇率基本稳定，在岸和离岸人民币汇率维持在7.2附近。市场人士预计，人民币汇率将继续保持基本稳定。',
      source: NEWS_SOURCES.EASTMONEY,
      url: 'https://www.eastmoney.com/a/20250308/example4.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 3,
    },
  ]

  return mockNews
}

/**
 * 模拟从和讯网抓取新闻
 * @returns Promise<News[]> 和讯网新闻列表
 */
/**
 * 模拟从和讯网抓取新闻
 * @returns Promise<News[]> 和讯网新闻列表
 */

export async function fetchNewsFromTencent(): Promise<News[]> {
  // TODO: 切换到真实 API 数据
  // console.log('使用真实数据模式')
  // return []

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))

  const mockNews: News[] = [
    {
      id: generateId(),
      title: '国务院：进一步优化营商环境，激发市场活力',
      content:
        '国务院印发通知，要求进一步优化营商环境，简化审批流程，降低企业成本，激发市场主体活力。',
      source: NEWS_SOURCES.TENCENT,
      url: 'https://www.hexun.com/20250308/example1.html',
      publish_time: getCurrentTime(),
      category: 'domestic',
      importance: 5,
    },
    {
      id: generateId(),
      title: '国际油价大幅波动，市场关注OPEC+减产计划',
      content:
        '受地缘政治因素影响，国际油价近日大幅波动。市场密切关注OPEC+即将召开的会议，预计将讨论延长减产计划。',
      source: NEWS_SOURCES.TENCENT,
      url: 'https://www.hexun.com/20250308/example2.html',
      publish_time: getCurrentTime(),
      category: 'international',
      importance: 4,
    },
    {
      id: generateId(),
      title: '科创板迎来开板五周年，注册制改革成效显著',
      content:
        '科创板即将迎来开板五周年，注册制改革成效显著，一批优质科技企业在科创板上市，为经济发展注入新动能。',
      source: NEWS_SOURCES.TENCENT,
      url: 'https://www.hexun.com/20250308/example3.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 4,
    },
    {
      id: generateId(),
      title: '统计局：2月CPI同比上涨0.7%，PPI同比下降2.7%',
      content:
        '国家统计局发布数据显示，2月份全国居民消费价格指数（CPI）同比上涨0.7%，工业生产者出厂价格指数（PPI）同比下降2.7%。',
      source: NEWS_SOURCES.TENCENT,
      url: 'https://www.hexun.com/20250308/example4.html',
      publish_time: getCurrentTime(),
      category: 'finance',
      importance: 4,
    },
  ]

  return mockNews
}

/**
 * 根据新闻源批量获取新闻
 * @param sources 新闻源数组，例如 ['sina', 'eastmoney', 'tencent']
 * @returns Promise<News[]> 合并后的新闻列表
 */
export async function fetchAllNews(sources: string[]): Promise<News[]> {
  const fetchPromises: Promise<News[]>[] = []

  if (sources.includes(NEWS_SOURCES.SINA)) {
    fetchPromises.push(fetchNewsFromSina())
  }

  if (sources.includes(NEWS_SOURCES.EASTMONEY)) {
    fetchPromises.push(fetchNewsFromEastmoney())
  }

  if (sources.includes(NEWS_SOURCES.TENCENT)) {
    fetchPromises.push(fetchNewsFromTencent())
  }

  try {
    const results = await Promise.all(fetchPromises)
    const allNews = results.flat()

    // 按发布时间倒序排序
    allNews.sort((a, b) => {
      return new Date(b.publish_time).getTime() - new Date(a.publish_time).getTime()
    })

    return allNews
  } catch (error) {
    console.error('获取新闻失败:', error)
    return []
  }
}

/**
 * 根据单个新闻源获取新闻
 * @param source 新闻源
 * @returns Promise<News[]> 新闻列表
 */
export async function fetchNewsBySource(source: string): Promise<News[]> {
  switch (source) {
    case NEWS_SOURCES.SINA:
      return fetchNewsFromSina()
    case NEWS_SOURCES.EASTMONEY:
      return fetchNewsFromEastmoney()
    case NEWS_SOURCES.TENCENT:
      return fetchNewsFromTencent()
    default:
      console.warn(`未知的新闻源: ${source}`)
      return []
  }
}
