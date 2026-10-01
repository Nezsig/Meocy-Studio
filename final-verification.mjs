import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('=== FINAL VERIFICATION ===\n');

  // Test 1: Work page filters
  console.log('1. Work portfolio page:');
  await page.goto('http://localhost:3000/work', { waitUntil: 'networkidle', timeout: 10000 });
  
  // Get all work images
  const allImgs = await page.locator('figure img').count();
  console.log(`   All images loaded: ${allImgs}`);
  
  // Test filters by clicking tabs
  const tabs = await page.locator('[role="tab"]').all();
  console.log(`   Filter tabs: ${tabs.length}`);
  
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await page.waitForTimeout(300);
    const count = await page.locator('figure img').count();
    const tabText = await tabs[i].textContent();
    console.log(`   - ${tabText.trim()}: ${count} items`);
  }

  // Test 2: Homepage teasers
  console.log('\n2. Homepage teasers:');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });
  const teaserImages = await page.locator('section img[src*="/work/"]').count();
  console.log(`   Work portfolio teaser images: ${teaserImages}`);

  // Test 3: Navigation links
  console.log('\n3. Navigation verification:');
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Work', href: '/work' },
    { text: 'Services', href: '/services' },
    { text: 'Packages', href: '/packages' },
  ];
  
  for (const link of navLinks) {
    const status = await page.evaluate(
      (href) => fetch(href).then(r => r.status),
      link.href
    ).catch(() => 'error');
    console.log(`   ${link.href.padEnd(15)}: ${status === 200 ? '✓' : '✗'} ${status}`);
  }

  // Test 4: Robots metadata
  console.log('\n4. Robots metadata:');
  const pages = ['/', '/work', '/services', '/packages', '/about', '/faq', '/contact', '/collaborate', '/privacy'];
  for (const p of pages) {
    await page.goto(`http://localhost:3000${p}`, { waitUntil: 'domcontentloaded', timeout: 5000 });
    const robots = await page.getAttribute('meta[name="robots"]', 'content') || 'not found';
    const hasNoindex = robots.includes('noindex');
    console.log(`   ${p.padEnd(15)}: ${hasNoindex ? '❌ noindex' : '✓ ' + robots}`);
  }

  console.log('\n✓ Verification complete');
  await browser.close();
})();
