import { test, expect } from '@playwright/test';

test('should shorten a URL', async ({ page }) => {
  await page.goto('https://url.kawin.dev/');

  // Fill in the URL input
  await page.fill('input[placeholder="Enter your URL"]', 'https://www.example.com');

  // Click the Shorten button
  await page.click('button:has-text("Shorten")');

  // Expect the shortened URL to be displayed
  await expect(page.locator('.shortened-link')).toBeVisible();
  await expect(page.locator('.shortened-link')).toContainText('https://url.kawin.dev/');
});