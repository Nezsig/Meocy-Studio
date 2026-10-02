#!/usr/bin/env node
const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();

  console.log('🧪 UI LOCATION COUNTER TESTS\n');

  // Test at 390px
  console.log('📱 390px VIEWPORT TESTS:\n');
  let page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('https://meocy.com/milan-photoshoot');
  await page.waitForLoadState('networkidle');

  const results390 = await page.evaluate(() => {
    const counterEl = document.querySelector('[aria-live="polite"]');
    return counterEl?.textContent || 'NOT FOUND';
  });
  console.log('Initial state:', results390.slice(0, 50));

  // Find and click a location card
  const cardAt390 = await page.evaluate(() => {
    const cards = document.querySelectorAll('button:has(> input[type="checkbox"])');
    if (cards.length > 2) {
      cards[2].click();
      return 'Clicked 3rd location';
    }
    return 'No cards found';
  });
  console.log(cardAt390);

  const counterAfterClick = await page.evaluate(() => {
    const counterEl = document.querySelector('[aria-live="polite"]');
    return counterEl?.textContent || 'NOT FOUND';
  });
  console.log('After clicking 3rd location:', counterAfterClick.slice(0, 50));
  await page.close();

  // Test at 1440px
  console.log('\n🖥️  1440px VIEWPORT TESTS:\n');
  page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://meocy.com/milan-photoshoot');
  await page.waitForLoadState('networkidle');

  const results1440 = await page.evaluate(() => {
    const counterEl = document.querySelector('[aria-live="polite"]');
    return counterEl?.textContent || 'NOT FOUND';
  });
  console.log('Initial state:', results1440.slice(0, 50));

  console.log('\n✓ UI tests complete');
  await browser.close();
})();
