import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const pages = ['/', '/work', '/services', '/packages', '/about', '/faq', '/contact', '/collaborate'];
  const widths = [
    { width: 1280, height: 800, label: '1280' },
    { width: 375, height: 812, label: '375' }
  ];

  console.log('Capturing verification screenshots...\n');

  for (const width of widths) {
    for (const page of pages) {
      try {
        const context = await browser.newContext({ viewport: { width: width.width, height: width.height } });
        const p = await context.newPage();
        
        await p.goto(`http://localhost:3000${page}`, { waitUntil: 'networkidle', timeout: 10000 });
        
        const filename = `/tmp/${page === '/' ? 'home' : page.slice(1)}-${width.label}px.png`;
        await p.screenshot({ path: filename, fullPage: false });
        
        console.log(`✓ ${page.padEnd(15)} at ${width.width}px`);
        await context.close();
      } catch (e) {
        console.log(`✗ ${page} at ${width.width}px: ${e.message.split('\n')[0]}`);
      }
    }
  }

  console.log('\n✓ Screenshots captured to /tmp/');
  await browser.close();
})();
