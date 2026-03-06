import { test, expect } from '@playwright/test'

test.describe('Popup Page', () => {
  test.beforeEach(async ({ context }) => {
    // Load extension
    await context.addInitScript(() => {
      window.chrome = {
        runtime: {
          getURL: (path: string) => `chrome-extension://test/${path}`
        }
      }
    })
  })

  test('should load popup page', async ({ page }) => {
    await page.goto('chrome-extension://test/src/popup/index.html')

    await expect(page.locator('[data-testid="settings-form"]')).toBeVisible()
    await expect(page.locator('[data-testid="history-list"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-view"]')).toBeVisible()
  })

  test('should save settings', async ({ page }) => {
    await page.goto('chrome-extension://test/src/popup/index.html')

    // Update settings
    await page.fill('[data-testid="news-sources"]', 'source1,source2')
    await page.click('[data-testid="save-button"]')

    // Check success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })

  test('should display history', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_HISTORY__ = [
        { date: '2026-03-06', type: 'open_forecast', result: '看涨', accuracy: true },
        { date: '2026-03-05', type: 'close_advice', result: '加仓', accuracy: false }
      ]
    })

    await page.goto('chrome-extension://test/src/popup/index.html')

    const historyItems = page.locator('[data-testid="history-item"]')
    await expect(historyItems).toHaveCount(2)
  })
})
