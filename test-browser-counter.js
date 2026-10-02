#!/usr/bin/env node
const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {
  // Start dev server
  const dev = spawn('npm', ['run', 'dev'], { cwd: process.cwd(), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 8000));

  const browser = await chromium.launch();
  const results = [];

  for (const width of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/milan-photoshoot', { waitUntil: 'networkidle' });

    // Find counter element (p tag with aria-live that contains "of" and "included")
    const getCounter = async () => {
      return await page.evaluate(() => {
        const paragraphs = document.querySelectorAll('p[aria-live="polite"]');
        for (let p of paragraphs) {
          const text = p.textContent;
          if (text.includes(' of ') && text.includes('included')) {
            return text.trim();
          }
        }
        return 'NOT FOUND';
      });
    };

    const clickLocation = async (index) => {
      return await page.evaluate((idx) => {
        const buttons = document.querySelectorAll('button[aria-pressed]');
        if (buttons[idx]) {
          buttons[idx].click();
          return `Clicked location ${idx}`;
        }
        return 'No button found';
      }, index);
    };

    results.push(`\n📱 ${width}px WIDTH:`);
    results.push('');

    // Test Memory package
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button[role="radio"]');
      buttons[0].click(); // Memory is first
    });
    await page.waitForTimeout(600);

    let counter = await getCounter();
    results.push(`Memory init: "${counter}"`);

    await clickLocation(0);
    await page.waitForTimeout(300);
    counter = await getCounter();
    results.push(`  +1: "${counter}"`);

    await clickLocation(1);
    await page.waitForTimeout(300);
    counter = await getCounter();
    results.push(`  +2: "${counter}"`);

    const before3 = counter;
    await clickLocation(2);
    await page.waitForTimeout(300);
    const after3 = await getCounter();
    results.push(`  +3: "${after3}" ${before3 === after3 ? '✓ blocked' : '✗ NOT blocked'}`);

    // Test Experience
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button[role="radio"]');
      buttons[1].click(); // Experience is second
    });
    await page.waitForTimeout(600);

    counter = await getCounter();
    results.push(`\nExperience init: "${counter}"`);

    await clickLocation(0);
    await page.waitForTimeout(300);
    counter = await getCounter();
    results.push(`  +1: "${counter}"`);

    await clickLocation(1);
    await page.waitForTimeout(300);
    await clickLocation(2);
    await page.waitForTimeout(300);
    counter = await getCounter();
    results.push(`  +3: "${counter}"`);

    const before4 = counter;
    await clickLocation(3);
    await page.waitForTimeout(300);
    const after4 = await getCounter();
    results.push(`  +4: "${after4}" ${before4 === after4 ? '✓ blocked' : '✗ NOT blocked'}`);

    // Test Signature
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button[role="radio"]');
      buttons[2].click(); // Signature is third
    });
    await page.waitForTimeout(600);

    counter = await getCounter();
    results.push(`\nSignature init: "${counter}"`);

    for (let i = 0; i < 4; i++) {
      await clickLocation(i);
      await page.waitForTimeout(300);
    }
    counter = await getCounter();
    results.push(`  +4: "${counter}"`);

    // Try 5th (should show €50 confirmation modal, not auto-add)
    const before5 = await page.evaluate(() => {
      const modal = document.querySelector('.bg-ink.text-chalk');
      return modal ? 'modal shown' : 'no modal';
    });
    await clickLocation(4);
    await page.waitForTimeout(300);
    const after5 = await page.evaluate(() => {
      const modal = document.querySelector('.bg-ink.text-chalk');
      return modal ? 'modal shown' : 'no modal';
    });
    results.push(`  +5 attempt: modal ${after5} (was: ${before5})`);

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
