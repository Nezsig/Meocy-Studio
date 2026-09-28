const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  try {
    await page.goto('https://meocy.com/', { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1500);

    // Scroll to About
    await page.evaluate(() => {
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    // Click to expand
    await page.locator('#about button').first().click();
    await page.waitForTimeout(1000);

    // Screenshot dark card
    await page.screenshot({ path: '/tmp/about_dark_card.png', fullPage: false });
    console.log('✅ Dark background card screenshot captured');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
