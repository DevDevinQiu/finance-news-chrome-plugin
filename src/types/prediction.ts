// Prediction Types
export interface Prediction {
  id: string
  date: Date
  trend: MarketTrend
  confidence: number
  factors: string[]
  recommendations: string[]
  riskLevel: RiskLevel
}

export enum MarketTrend {
  UP = 'up',
  DOWN = 'down',
  NEUTRAL = 'neutral',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
