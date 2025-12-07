import { test, expect } from '@playwright/test';

const mockedPrompt = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  text: 'Where did you notice growth in yourself today?',
  dimension: 'identity',
  dayNumber: 7,
};

test.describe('Reflect page daily prompt experience', () => {
  test('shows the daily prompt after loading', async ({ page }) => {
    await page.route('**/api/prompts/daily', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedPrompt),
      });
    });

    await page.goto('/app/reflect');

    await expect(
      page.getByText(/loading today's prompt/i)
    ).toBeVisible();
    await expect(page.getByText(mockedPrompt.text)).toBeVisible();
    await expect(
      page.getByText(`Day ${mockedPrompt.dayNumber} • ${mockedPrompt.dimension}`)
    ).toBeVisible();
  });

  test('surfaces an error state when the API request fails', async ({ page }) => {
    await page.route('**/api/prompts/daily', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/app/reflect');

    await expect(
      page.getByText(/could not load today's prompt/i)
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
  });
});
