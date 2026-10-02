#!/usr/bin/env node
const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();

  try {
    // Mobile 390px
    console.log('📱 Testing buttons at 390px...');
    let page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 2000 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    const buttonsMobile = await page.evaluate(() => {
      const buttons = document.querySelectorAll('a[href="/services"], a[href="/milan-photoshoot"]');
      if (buttons.length < 2) return { found: false, count: buttons.length };

      const commercialBtn = Array.from(buttons).find(b => b.href.includes('/services'));
      const milanBtn = Array.from(buttons).find(b => b.href.includes('/milan-photoshoot'));

      return {
        found: true,
        count: buttons.length,
        commercial: {
          height: commercialBtn?.getBoundingClientRect().height,
          width: commercialBtn?.getBoundingClientRect().width,
          hasArrow: commercialBtn?.textContent.includes('→') || commercialBtn?.querySelector('svg') !== null,
          classes: commercialBtn?.className
        },
        milan: {
          height: milanBtn?.getBoundingClientRect().height,
          width: milanBtn?.getBoundingClientRect().width,
          hasArrow: milanBtn?.textContent.includes('→') || milanBtn?.querySelector('svg') !== null,
          classes: milanBtn?.className
        }
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/buttons-390px.png', fullPage: true });
    console.log('✓ Saved: buttons-390px.png');
    console.log('  Buttons found:', buttonsMobile.found ? '✓' : '✗');
    if (buttonsMobile.found) {
      console.log('  Commercial button: ' + buttonsMobile.commercial.height + 'px high (≥48px:', buttonsMobile.commercial.height >= 48 ? '✓' : '✗' + '), full-width:', buttonsMobile.commercial.width > 300 ? '✓' : '✗');
      console.log('  Milan button: ' + buttonsMobile.milan.height + 'px high (≥48px:', buttonsMobile.milan.height >= 48 ? '✓' : '✗' + '), full-width:', buttonsMobile.milan.width > 300 ? '✓' : '✗');
      console.log('  Arrow icons:', (buttonsMobile.commercial.hasArrow && buttonsMobile.milan.hasArrow) ? '✓ both' : '✗ missing');
    }
    await page.close();

    // Desktop 1440px
    console.log('\n🖥️  Testing buttons at 1440px...');
    page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    const buttonsDesktop = await page.evaluate(() => {
      const buttons = document.querySelectorAll('a[href="/services"], a[href="/milan-photoshoot"]');
      if (buttons.length < 2) return { found: false };

      const commercialBtn = Array.from(buttons).find(b => b.href.includes('/services'));
      const milanBtn = Array.from(buttons).find(b => b.href.includes('/milan-photoshoot'));

      const commercialStyle = window.getComputedStyle(commercialBtn);
      const milanStyle = window.getComputedStyle(milanBtn);

      return {
        found: true,
        commercial: {
          height: commercialBtn?.getBoundingClientRect().height,
          borderColor: commercialStyle.borderColor,
          textColor: commercialStyle.color,
          hasArrow: commercialBtn?.querySelector('svg') !== null
        },
        milan: {
          height: milanBtn?.getBoundingClientRect().height,
          bgColor: milanStyle.backgroundColor,
          textColor: milanStyle.color,
          hasArrow: milanBtn?.querySelector('svg') !== null
        }
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/buttons-1440px.png' });
    console.log('✓ Saved: buttons-1440px.png');
    console.log('  Buttons found:', buttonsDesktop.found ? '✓' : '✗');
    if (buttonsDesktop.found) {
      console.log('  Commercial button: outlined, min-height ' + buttonsDesktop.commercial.height + 'px (≥48px:', buttonsDesktop.commercial.height >= 48 ? '✓' : '✗' + ')');
      console.log('  Milan button: filled lime, min-height ' + buttonsDesktop.milan.height + 'px (≥48px:', buttonsDesktop.milan.height >= 48 ? '✓' : '✗' + ')');
      console.log('  Both have arrow icons:', (buttonsDesktop.commercial.hasArrow && buttonsDesktop.milan.hasArrow) ? '✓' : '✗');
    }
    await page.close();

    console.log('\n✓ Button visibility tests complete');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
