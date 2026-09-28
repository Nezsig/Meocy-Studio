const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  try {
    await page.goto('https://meocy.com/', { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    await page.locator('#about button').first().click();
    await page.waitForTimeout(800);

    await page.screenshot({ path: '/tmp/about_compact_light.png', fullPage: false });
    console.log('✅ Screenshot captured');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
