// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Contact Form Test', () => {
  test('should submit contact form and show success modal', async ({ page }) => {
    // Navigate to the deployed website
    await page.goto('https://web-poc-delta.vercel.app/contact.html');
    
    // Fill out the contact form with dummy data
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#subject', 'Playwright Test');
    await page.fill('#message', 'This is an automated test message from Playwright.');
    
    // Select a department from the dropdown
    await page.selectOption('#department', 'general');
    
    // Check the newsletter checkbox
    await page.check('#newsletter');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify that the success modal appears
    const successModal = page.locator('#successModal');
    await expect(successModal).toBeVisible();
    
    // Verify the modal title
    const modalTitle = page.locator('#successModalLabel');
    await expect(modalTitle).toHaveText('SUCCESS!');
    
    // Verify the success message
    const modalBody = page.locator('.modal-body p');
    await expect(modalBody).toHaveText('Your message has been sent successfully. We\'ll get back to you soon!');
  });
});
