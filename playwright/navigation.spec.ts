import { expect, test } from '@playwright/test';

test('MatchZone navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Live Matches' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Standings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Teams' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Players' })).toBeVisible();

  await expect(page.getByPlaceholder('Search...')).toBeVisible();

  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});
