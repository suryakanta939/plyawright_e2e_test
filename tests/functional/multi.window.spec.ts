import { test, expect } from '@playwright/test';

test.describe("Multi-Window Functionality", () => {

  test('Should handle multiple windows', async ({ page, context }) => {
    // Navigate directly to the multi-window page
    await page.goto('https://the-internet.herokuapp.com/windows');

    // Assert we're on the windows page
    await expect(page).toHaveTitle('The Internet');
    const header = await page.locator('h1').textContent();
    console.log('Main window header:', header);
    expect(header).toContain('Windows');

    // Click on "Click Here" link to open new window
    const [newPage1] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a:has-text("Click Here")').click()
    ]);
    await newPage1.waitForLoadState();

    // Navigate to newly opened window and assert header
    const newWindowTitle = await newPage1.title();
    console.log('New window 1 title:', newWindowTitle);
    expect(newWindowTitle).toBeTruthy();

    // New window URL
    const newWindowUrl = newPage1.url();
    console.log('New window 1 URL:', newWindowUrl);

    // Come back to parent window
    await page.bringToFront();
    const parentTitle = await page.title();
    console.log('Parent window title:', parentTitle);
    expect(parentTitle).toContain('The Internet');

    // Close new window
    await newPage1.close();
  });

});
