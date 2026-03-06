import { test, expect } from '@playwright/test'

test.describe('Content Script Injection', () => {
  test('should inject finance panel on page load', async ({ page }) => {
    await page.goto('https://example.com')

    // Check if panel exists
    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toBeVisible()

    // Check if panel is positioned on right side
    const boundingBox = await panel.boundingBox()
    expect(boundingBox?.x).toBeGreaterThan(500)
  })

  test('should show collapsed panel initially', async ({ page }) => {
    await page.goto('https://example.com')

    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toHaveAttribute('data-collapsed', 'true')

    const content = page.locator('[data-testid="panel-content"]')
    await expect(content).not.toBeVisible()
  })

  test('should expand panel on toggle click', async ({ page }) => {
    await page.goto('https://example.com')

    const toggleButton = page.locator('[data-testid="panel-toggle"]')
    await toggleButton.click()

    const panel = page.locator('[data-testid="finance-panel"]')
    await expect(panel).toHaveAttribute('data-collapsed', 'false')

    const content = page.locator('[data-testid="panel-content"]')
    await expect(content).toBeVisible()
  })
})
