import { test, expect } from '@playwright/test'

test.describe('News Display', () => {
  test('should display news items', async ({ page, context }) => {
    // Setup mock data
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        {
          id: 1,
          title: 'Test News 1',
          source: 'Test Source',
          category: '财经',
          publishTime: '2026-03-06T10:00:00',
          url: 'https://example.com/1'
        },
        {
          id: 2,
          title: 'Test News 2',
          source: 'Test Source',
          category: '国内政治',
          publishTime: '2026-03-06T09:00:00',
          url: 'https://example.com/2'
        }
      ]
    })

    await page.goto('https://example.com')

    // Expand panel
    await page.click('[data-testid="panel-toggle"]')

    // Check news items
    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(2)

    // Check first news item
    const firstNews = newsItems.first()
    await expect(firstNews).toContainText('Test News 1')
    await expect(firstNews).toContainText('10:00')
    await expect(firstNews).toContainText('财经')
  })

  test('should filter news by category', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        { id: 1, title: 'Finance', category: '财经', publishTime: '2026-03-06T10:00:00' },
        { id: 2, title: 'Politics', category: '国内政治', publishTime: '2026-03-06T09:00:00' }
      ]
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Select finance category
    await page.click('[data-testid="category-filter"]')
    await page.click('text=财经')

    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(1)
    await expect(newsItems.first()).toContainText('Finance')
  })

  test('should search news by keyword', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.__MOCK_NEWS__ = [
        { id: 1, title: '股市大涨', category: '财经', publishTime: '2026-03-06T10:00:00' },
        { id: 2, title: '政策发布', category: '国内政治', publishTime: '2026-03-06T09:00:00' }
      ]
    })

    await page.goto('https://example.com')
    await page.click('[data-testid="panel-toggle"]')

    // Search for '股市'
    await page.fill('[data-testid="search-input"]', '股市')

    const newsItems = page.locator('[data-testid="news-item"]')
    await expect(newsItems).toHaveCount(1)
    await expect(newsItems.first()).toContainText('股市大涨')
  })
})
