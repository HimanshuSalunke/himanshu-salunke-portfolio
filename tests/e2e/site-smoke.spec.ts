import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/about',
  '/work',
  '/articles',
  '/services',
  '/developer',
  '/contact',
  '/not-a-real-page',
]

test.describe('Site-wide smoke (light + dark)', () => {
  for (const route of routes) {
    test(`loads ${route} in light and dark`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('#main-content')).toBeVisible()

      // Light
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        localStorage.setItem('theme', 'light')
      })
      await expect(page.locator('html')).not.toHaveClass(/dark/)

      // Dark
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      })
      await expect(page.locator('html')).toHaveClass(/dark/)
      await expect(page.locator('#main-content')).toBeVisible()
    })
  }

  test('Neura FAB is present and chat can open', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const fab = page.getByRole('button', { name: /Open Neura|Restore Neura/i })
    await expect(fab).toBeVisible({ timeout: 15000 })
    await fab.click()
    await expect(page.getByRole('dialog', { name: /Neura/i })).toBeVisible()
  })
})
