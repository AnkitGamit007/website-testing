import { expect } from 'chai';         // Import expect from chai
import puppeteer from 'puppeteer';     // Import Puppeteer for browser automation

// Describe the E2E test suite
describe('Website Registration Form E2E Test', function () {
    let browser;
    let page;

    // Set a timeout because Puppeteer actions can take some time
    this.timeout(10000); // 10 seconds

    // Before all tests, launch the browser
    before(async () => {
        browser = await puppeteer.launch({
            headless: false,  // Run in headless mode (set to true for non-headless)
            slowMo: 50        // Slow down Puppeteer actions (optional)
        });
        page = await browser.newPage();
    });

    // After all tests, close the browser
    after(async () => {
        await browser.close();
    });

    // Define a test for the registration form
    it('should submit the registration form successfully', async () => {
        // Navigate to the local server (replace with your server URL)
        await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

        // Interact with the form fields
        await page.type('input[name="name"]', 'Ankit Gamit');  // Replace with actual form selectors
        await page.type('textarea[name="message"]', 'This is a test message.');

        // Click the submit button
        await page.click('button[type="submit"]');

        // Wait for the success message or form submission result
        await page.waitForSelector('#success-message');  // Replace with actual success message selector

        // Assert the success message or page behavior
        const successMessage = await page.$eval('#success-message', el => el.textContent);
        expect(successMessage).to.include('Thank you, Ankit Gamit'); // Example assertion
    });
});
