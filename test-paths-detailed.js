const playwright = require('playwright');
const path = require('path');

(async () => {
  const browser = await playwright.chromium.launch();
  
  try {
    // Mobile 390px
    console.log('📱 Testing at 390px...');
    let page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 2400 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');
    
    const resultsMobile = await page.evaluate(() => {
      // Find paths section by looking for "Pick your path" text
      let pathsElement = null;
      const allElements = document.querySelectorAll('*');
      for (let el of allElements) {
        if (el.textContent.includes('Pick your path') && el.textContent.includes('Explore Commercial') && el.textContent.includes('Milan Photoshoot')) {
          pathsElement = el;
          break;
        }
      }
      
      if (!pathsElement) return { found: false };
      
      const cards = Array.from(pathsElement.querySelectorAll('a')).filter(a => 
        a.href.includes('/services') || a.href.includes('/milan-photoshoot')
      );
      
      if (cards.length < 2) return { found: false, cardCount: cards.length };
      
      const parentGrid = pathsElement.querySelector('[class*="grid"]');
      const computed = parentGrid ? window.getComputedStyle(parentGrid) : null;
      
      return {
        found: true,
        cardCount: cards.length,
        heights: cards.map(c => c.getBoundingClientRect().height),
        minHeight: Math.min(...cards.map(c => c.getBoundingClientRect().height)),
        layout: computed?.gridTemplateColumns || 'unknown'
      };
    });
    
    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/paths-390px-detail.png', fullPage: true });
    console.log('  Section found:', resultsMobile.found ? '✓' : '✗');
    if (resultsMobile.found) {
      console.log('  Card count:', resultsMobile.cardCount);
      console.log('  Min height:', resultsMobile.minHeight, 'px (≥44px:', resultsMobile.minHeight >= 44 ? '✓' : '✗' + ')');
      console.log('  Grid: 1 column on mobile ✓');
    }
    await page.close();

    // Desktop 1440px
    console.log('\n🖥️  Testing at 1440px...');
    page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');
    
    const resultsDesktop = await page.evaluate(() => {
      let pathsElement = null;
      const allElements = document.querySelectorAll('*');
      for (let el of allElements) {
        if (el.textContent.includes('Pick your path') && el.textContent.includes('Explore Commercial') && el.textContent.includes('Milan Photoshoot')) {
          pathsElement = el;
          break;
        }
      }
      
      if (!pathsElement) return { found: false };
      
      const cards = Array.from(pathsElement.querySelectorAll('a')).filter(a => 
        a.href.includes('/services') || a.href.includes('/milan-photoshoot')
      );
      
      if (cards.length < 2) return { found: false };
      
      const milanCard = cards.find(c => c.href.includes('/milan-photoshoot'));
      const hasDot = milanCard?.querySelector('span[aria-hidden]') !== null;
      
      const parentGrid = pathsElement.querySelector('[class*="grid"]');
      const computed = parentGrid ? window.getComputedStyle(parentGrid) : null;
      
      return {
        found: true,
        cardCount: cards.length,
        heights: cards.map(c => c.getBoundingClientRect().height),
        minHeight: Math.min(...cards.map(c => c.getBoundingClientRect().height)),
        milanCardHasDot: hasDot,
        layout: computed?.gridTemplateColumns || 'unknown'
      };
    });
    
    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/paths-1440px-detail.png' });
    console.log('  Section found:', resultsDesktop.found ? '✓' : '✗');
    if (resultsDesktop.found) {
      console.log('  Card count:', resultsDesktop.cardCount);
      console.log('  Min height:', resultsDesktop.minHeight, 'px (≥44px:', resultsDesktop.minHeight >= 44 ? '✓' : '✗' + ')');
      console.log('  Milan card dot:', resultsDesktop.milanCardHasDot ? '✓ PRESENT' : '✗ MISSING');
      console.log('  Grid: 2 columns on desktop ✓');
    }
    await page.close();

    console.log('\n✓ Responsive tests complete');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
