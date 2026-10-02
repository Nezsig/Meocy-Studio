#!/usr/bin/env node
const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {
  const dev = spawn('npm', ['run', 'dev'], { cwd: process.cwd(), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 8000));

  const browser = await chromium.launch();
  const results = [];

  for (const width of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/milan-photoshoot', { waitUntil: 'networkidle' });

    // Wait for counter element to exist
    await page.waitForSelector('p[aria-live="polite"]');

    // Get counter text
    const getCounter = async () => {
      const texts = await page.evaluate(() => {
        const paragraphs = document.querySelectorAll('p[aria-live="polite"]');
        const result = [];
        for (let p of paragraphs) {
          const text = p.textContent.trim();
          if (text.includes(' of ') && text.includes('included')) {
            result.push(text);
          }
        }
        return result;
      });
      return texts[0] || 'NOT FOUND';
    };

    results.push(`\n📱 ${width}px:`);

    // Get initial counter
    let counter = await getCounter();
    results.push(`Initial: "${counter}"`);

    // Scroll to location selector if needed
    await page.evaluate(() => {
      const selector = document.querySelector('p[aria-live="polite"]');
      selector?.scrollIntoView();
    });
    await page.waitForTimeout(500);

    // Try to find and click first location checkbox
    const clicked1 = await page.evaluate(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      if (checkboxes.length > 0) {
        // Find the parent button and click it
        const button = checkboxes[0].closest('button[aria-pressed]');
        if (button) {
          button.click();
          return true;
        }
      }
      return false;
    });

    if (clicked1) {
      await page.waitForTimeout(300);
      counter = await getCounter();
      results.push(`After +1 location: "${counter}"`);

      const clicked2 = await page.evaluate(() => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length > 1) {
          const button = checkboxes[1].closest('button[aria-pressed]');
          if (button) {
            button.click();
            return true;
          }
        }
        return false;
      });

      if (clicked2) {
        await page.waitForTimeout(300);
        counter = await getCounter();
        results.push(`After +2 locations: "${counter}"`);
      }
    } else {
      results.push(`  (Could not find location buttons)`);
    }

    await page.close();
  }

  console.log(results.join('\n'));
  dev.kill();
  await browser.close();
  process.exit(0);
})().catch(e => {
  console.error('Test error:', e.message);
  process.exit(1);
});
