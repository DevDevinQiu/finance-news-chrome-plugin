import { NewsItem } from './news.js'
import { Prediction } from './prediction.js'

// Extension Types
export interface ExtensionStorage {
  news: NewsItem[]
  predictions: Prediction[]
  settings: ExtensionSettings
}

export interface ExtensionSettings {
  apiKey: string
  refreshInterval: number
  enableNotifications: boolean
  language: 'zh' | 'en'
}
