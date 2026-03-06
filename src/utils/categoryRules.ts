// News categorization rules
export interface NewsInput {
  title: string
  content?: string
}

// Keyword-based news categorization
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  '财经': [
    '股市',
    '股票',
    '基金',
    '债券',
    '指数',
    '上证',
    '深证',
    '创业板',
    '涨跌',
    '成交量',
    '行情',
    '大盘',
    '走势',
    '收盘',
    '开盘',
  ],
  '国内政治': [
    '政策',
    '两会',
    '政府',
    '央行',
    '银保监',
    '证监',
    '财政',
    '税收',
    '法规',
    '监管',
  ],
  '国际': [
    '美国',
    '欧盟',
    '日本',
    '韩国',
    '香港',
    '中美',
    '贸易战',
    '制裁',
    '汇率',
    '美联储',
  ],
  '科技': [
    '科技',
    '人工智能',
    'AI',
    '区块链',
    '数字货币',
    '比特币',
    '以太坊',
    '金融科技',
    'FinTech',
  ],
}

/**
 * Categorize news based on keywords in title and content
 */
export const categorizeNews = (news: NewsInput): string => {
  const text = `${news.title} ${news.content || ''}`.toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category
      }
    }
  }

  return '未分类'
}
