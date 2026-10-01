#!/usr/bin/env node
const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();

  try {
    // Test at 390px (mobile)
    console.log('📱 Testing at 390px viewport...');
    let page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    const pathsSection390 = await page.evaluate(() => {
      const pathsDiv = Array.from(document.querySelectorAll('div')).find(d =>
        d.textContent.includes('Pick your path') || d.textContent.includes('Scegli il tuo percorso') || d.textContent.includes('Choisissez votre chemin')
      );
      if (!pathsDiv) return { found: false };
      const rect = pathsDiv.getBoundingClientRect();
      const cards = pathsDiv.querySelectorAll('a[href*="/services"], a[href*="/milan-photoshoot"]');
      const cardHeights = Array.from(cards).map(c => c.getBoundingClientRect().height);
      const hasOverflow = document.body.scrollWidth > 390;
      return {
        found: true,
        pathsHeight: rect.height,
        cardCount: cards.length,
        minCardHeight: Math.min(...cardHeights),
        hasHorizontalOverflow: hasOverflow,
        viewportWidth: window.innerWidth
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/homepage-paths-390px.png' });
    console.log('✓ Saved: homepage-paths-390px.png');
    console.log('  Two-path section found:', pathsSection390.found);
    if (pathsSection390.found) {
      console.log('  Cards:', pathsSection390.cardCount);
      console.log('  Min card height:', pathsSection390.minCardHeight, 'px (target ≥44px):', pathsSection390.minCardHeight >= 44 ? '✓' : '✗');
      console.log('  Horizontal overflow:', pathsSection390.hasHorizontalOverflow ? '✗ YES' : '✓ NO');
    }
    await page.close();

    // Test at 1440px (desktop)
    console.log('\n🖥️  Testing at 1440px viewport...');
    page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    const pathsSection1440 = await page.evaluate(() => {
      const pathsDiv = Array.from(document.querySelectorAll('div')).find(d =>
        d.textContent.includes('Pick your path') || d.textContent.includes('Scegli il tuo percorso') || d.textContent.includes('Choisissez votre chemin')
      );
      if (!pathsDiv) return { found: false };
      const rect = pathsDiv.getBoundingClientRect();
      const cards = pathsDiv.querySelectorAll('a[href*="/services"], a[href*="/milan-photoshoot"]');
      const cardHeights = Array.from(cards).map(c => c.getBoundingClientRect().height);
      const milanoCard = Array.from(cards).find(c => c.href.includes('/milan-photoshoot'));
      const hasDot = milanoCard?.querySelector('span[aria-hidden]') !== null;
      const hasOverflow = document.body.scrollWidth > 1440;
      return {
        found: true,
        pathsHeight: rect.height,
        cardCount: cards.length,
        cardsInTwoColumns: cards.length === 2,
        minCardHeight: Math.min(...cardHeights),
        milanCardHasDot: hasDot,
        hasHorizontalOverflow: hasOverflow,
        viewportWidth: window.innerWidth
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/homepage-paths-1440px.png' });
    console.log('✓ Saved: homepage-paths-1440px.png');
    console.log('  Two-path section found:', pathsSection1440.found);
    if (pathsSection1440.found) {
      console.log('  Cards:', pathsSection1440.cardCount);
      console.log('  Two-column layout:', pathsSection1440.cardsInTwoColumns ? '✓ YES' : '✗ NO');
      console.log('  Min card height:', pathsSection1440.minCardHeight, 'px (target ≥44px):', pathsSection1440.minCardHeight >= 44 ? '✓' : '✗');
      console.log('  Milan card lime dot:', pathsSection1440.milanCardHasDot ? '✓ PRESENT' : '✗ MISSING');
      console.log('  Horizontal overflow:', pathsSection1440.hasHorizontalOverflow ? '✗ YES' : '✓ NO');
    }
    await page.close();

    console.log('\n✓ Responsive layout tests complete');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
