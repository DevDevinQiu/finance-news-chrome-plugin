import { test, expect } from '@playwright/test'

test.describe('Full User Flow', () => {
  test('should complete news viewing flow', async ({ page }) => {
    await page.goto('https://example.com')

    // Step 1: Panel should be collapsed initially
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'true')

    // Step 2: Expand panel
    await page.click('[data-testid="panel-toggle"]')
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'false')

    // Step 3: View news
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(10)

    // Step 4: Switch category
    await page.click('[data-testid="category-filter"]')
    await page.click('text=国内政治')
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(5)

    // Step 5: Search
    await page.fill('[data-testid="search-input"]', '股市')
    await expect(page.locator('[data-testid="news-item"]')).toHaveCount(2)

    // Step 6: View predictions
    await page.click('[data-testid="tab-predictions"]')
    await expect(page.locator('[data-testid="open-forecast"]')).toBeVisible()

    // Step 7: Collapse panel
    await page.click('[data-testid="panel-toggle"]')
    await expect(page.locator('[data-testid="finance-panel"]')).toHaveAttribute('data-collapsed', 'true')
  })

  test('should handle real-time updates', async ({ page }) => {
    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    const initialCount = await page.locator('[data-testid="news-item"]').count()

    // Simulate new news arrival
    await page.evaluate(() => {
      window.__MOCK_NEWS__.push({
        id: 999,
        title: 'Breaking News',
        category: '财经',
        publishTime: new Date().toISOString()
      })
    })

    // Wait for update
    await page.waitForTimeout(1000)
    await page.click('[data-testid="refresh-button"]')

    const newCount = await page.locator('[data-testid="news-item"]').count()
    expect(newCount).toBe(initialCount + 1)
  })
})
