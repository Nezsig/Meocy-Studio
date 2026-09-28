const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  try {
    // Force no-cache
    await page.goto('https://meocy.com/?nocache=' + Date.now(), { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await page.locator('#about button').first().click();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: '/tmp/about_final.png', fullPage: false });
    console.log('✅ Final screenshot captured');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
