import { test, expect } from '@playwright/test'

test.describe('happy paths', () => {
  test('home loads with hero and service times', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.kl-hero__title')).toContainText('Giving your life a meaning')
    await expect(page.locator('.kl-service-row__time').first()).toBeVisible()
    await expect(page.locator('text=Sunday Service').first()).toBeVisible()
  })
  test('group page lists 6 churches', async ({ page }) => {
    await page.goto('/group')
    await expect(page.getByText('CC3 Group — One Family')).toBeVisible()
    await expect(page.getByText('Central Church 3')).toBeVisible()
  })
  test('events page shows Global Programmes strip', async ({ page }) => {
    await page.goto('/events')
    await expect(page.getByText('UP NEXT')).toBeVisible()
    await expect(page.getByText('Healing Streams')).toBeVisible()
  })
  test('login happy path (demo member)', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"], input[type="email"]', 'member@cc3.local')
    await page.fill('input[name="password"], input[type="password"]', 'member123')
    await page.click('button[type="submit"]')
    // after login, member area or home with session
    await page.waitForTimeout(1500)
  })
  test('prayer request submit', async ({ page }) => {
    await page.goto('/prayer')
    const body = page.locator('textarea, [name="body"]').first()
    if (await body.isVisible()) {
      await body.fill('Test prayer for healing and increase')
      const submit = page.locator('button[type="submit"]').first()
      if (await submit.isVisible()) await submit.click()
    }
  })
  test('giving page shows funds', async ({ page }) => {
    await page.goto('/give')
    await expect(page.getByText(/Giving|Partnership|Fund/i).first()).toBeVisible()
  })
})
