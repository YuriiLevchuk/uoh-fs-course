const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')

    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').first().fill('123')
    await page.getByTestId('password').last().fill('123')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('123 logged in')).toBeVisible()
  })
})