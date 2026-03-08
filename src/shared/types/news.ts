/**
 * 新闻数据类型定义
 */

export interface News {
  id: string;
  title: string;
  content?: string;
  source: string;
  url?: string;
  publish_time: string;
  category?: 'finance' | 'domestic' | 'international' | 'general';
  importance?: number; // 1-5 重要性评分
}

export interface NewsFilter {
  keyword?: string;
  category?: 'finance' | 'domestic' | 'international' | 'general' | 'all';
  timeRange?: 'today' | 'week' | 'month' | 'all';
}

export interface Stats {
  newsCount: number;
  lastUpdate: string;
  updateInterval: number;
}

export interface Settings {
  newsSources: string[];
  refreshInterval: number;
  maxNewsCount: number;
}
