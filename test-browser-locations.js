#!/usr/bin/env node
const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {
  // Start dev server
  const dev = spawn('npm', ['run', 'dev'], { cwd: process.cwd(), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 8000)); // Wait for server

  const browser = await chromium.launch();

  const testViewports = [390, 1440];
  const results = [];

  for (const width of testViewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/milan-photoshoot', { waitUntil: 'networkidle' });

    // Find counter element
    const getCounter = async () => {
      const text = await page.evaluate(() => {
        const el = document.evaluate("//p[contains(text(), 'of')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return el?.textContent || 'NOT FOUND';
      });
      return text.trim();
    };

    // Find location checkboxes
    const getCheckboxes = async () => {
      return await page.evaluate(() => {
        const boxes = document.querySelectorAll('input[type="checkbox"][name="location"]');
        return boxes.length;
      });
    };

    const clickCheckbox = async (index) => {
      await page.evaluate((idx) => {
        const boxes = document.querySelectorAll('input[type="checkbox"][name="location"]');
        if (boxes[idx]) boxes[idx].click();
      }, index);
      await page.waitForTimeout(300);
    };

    // Test Memory
    await page.click('button[role="radio"]:has-text("Memory")');
    await page.waitForTimeout(500);
    results.push(`${width}px Memory:`);
    results.push(`  init: "${await getCounter()}"`);

    await clickCheckbox(0);
    results.push(`  +1: "${await getCounter()}"`);

    await clickCheckbox(1);
    results.push(`  +2: "${await getCounter()}"`);

    // Try to click 3rd (should be blocked)
    const before = await getCounter();
    await clickCheckbox(2);
    const after = await getCounter();
    results.push(`  +3 attempt: "${after}" ${before === after ? '(blocked ✓)' : '(NOT BLOCKED ✗)'}`);

    results.push('');
    page.close();
  }

  console.log(results.join('\n'));
  dev.kill();
  await browser.close();
  process.exit(0);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
