// News Types
export interface NewsItem {
  id: string
  title: string
  content: string
  source: string
  publishedAt: Date
  category: NewsCategory
  url: string
  importance: number
  tags: string[]
  summary?: string
}

export enum NewsCategory {
  MARKET = 'market',
  POLICY = 'policy',
  COMPANY = 'company',
  GLOBAL = 'global',
  TECHNOLOGY = 'technology',
}

export interface NewsFilter {
  category?: NewsCategory
  dateFrom?: Date
  dateTo?: Date
  importance?: number
  keyword?: string
}
