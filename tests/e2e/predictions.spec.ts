import { test, expect } from '@playwright/test'

test.describe('Predictions Display', () => {
  test('should display open forecast', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_PREDICTIONS__ = {
        open_forecast: {
          result: '看涨',
          confidence: 0.75,
          reason: '市场情绪积极',
          time: '09:30'
        }
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Switch to predictions tab
    await page.click('[data-testid="tab-predictions"]')

    const forecast = page.locator('[data-testid="open-forecast"]')
    await expect(forecast).toBeVisible()
    await expect(forecast).toContainText('看涨')
    await expect(forecast).toContainText('09:30')

    const confidenceBar = page.locator('[data-testid="confidence-bar"]')
    await expect(confidenceBar).toHaveAttribute('data-value', '75')
  })

  test('should display close advice', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_PREDICTIONS__ = {
        close_advice: {
          result: '加仓',
          confidence: 0.6,
          reason: '尾盘有机会',
          time: '14:30'
        }
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')
    await page.click('[data-testid="tab-predictions"]')

    const advice = page.locator('[data-testid="close-advice"]')
    await expect(advice).toBeVisible()
    await expect(advice).toContainText('加仓')
    await expect(advice).toContainText('14:30')
  })

  test('should display accuracy stats', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_STATS__ = {
        totalPredictions: 100,
        accuratePredictions: 75,
        accuracy: 0.75
      }
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')
    await page.click('[data-testid="tab-predictions"]')

    const stats = page.locator('[data-testid="accuracy-stats"]')
    await expect(stats).toBeVisible()
    await expect(stats).toContainText('75%')
    await expect(stats).toContainText('100')
  })
})
