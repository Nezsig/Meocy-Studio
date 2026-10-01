import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const locales = ['en', 'it', 'fr'];
  const pages = ['/', '/work', '/services', '/packages', '/about', '/faq', '/contact', '/collaborate', '/privacy'];
  const results = {};
  
  for (const locale of locales) {
    console.log(`\n=== TESTING ${locale.toUpperCase()} ===`);
    const context = await browser.newContext({ 
      locale: locale === 'it' ? 'it-IT' : locale === 'fr' ? 'fr-FR' : 'en-US',
      viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`${msg.text()}`);
    });
    
    page.on('response', response => {
      if (response.status() === 404) errors.push(`404: ${response.url()}`);
    });
    
    for (const p of pages) {
      try {
        await page.goto(`http://localhost:3000${p}?lang=${locale}`, { waitUntil: 'networkidle', timeout: 10000 });
        console.log(`  ✓ ${p}`);
        
        if (p === '/work') {
          const images = await page.locator('img[src*="/work/"]').count();
          const fashion = await page.locator('img[src*="fashion"]').count();
          const portrait = await page.locator('img[src*="portrait"]').count();
          const city = await page.locator('img[src*="city"]').count();
          console.log(`    Images: ${images} (fashion: ${fashion}, portrait: ${portrait}, city: ${city})`);
        }
        
        if (p === '/') {
          const teaser = await page.locator('img[src*="/work/"]').count();
          console.log(`    Homepage teaser images: ${teaser} (should be 6)`);
        }
      } catch (e) {
        console.log(`  ✗ ${p}: ${e.message}`);
        errors.push(`Failed: ${p}`);
      }
    }
    
    if (errors.length > 0) {
      console.log(`\n  ERRORS (${locale}):`);
      errors.slice(0, 5).forEach(e => console.log(`    - ${e}`));
    } else {
      console.log(`  ✓ No errors`);
    }
    
    await context.close();
  }
  
  console.log('\n✓ All locale tests complete');
  await browser.close();
})();
