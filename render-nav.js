#!/usr/bin/env node
const playwright = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();

  try {
    // Render at 390px (mobile)
    console.log('📱 Rendering at 390px viewport...');
    let page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    // Get nav element dimensions
    const navMobile = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Primary"]');
      if (!nav) return 'NAV NOT FOUND';
      const rect = nav.getBoundingClientRect();
      const logo = nav.querySelector('img');
      const logoRect = logo.getBoundingClientRect();
      return {
        navHeight: rect.height,
        navWidth: rect.width,
        logoHeight: logoRect.height,
        logoWidth: logoRect.width,
        logoOverflow: logoRect.height > rect.height
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/nav-390px.png' });
    console.log('✓ Saved: nav-390px.png');
    console.log('  Nav height:', navMobile.navHeight, 'px');
    console.log('  Logo height:', navMobile.logoHeight, 'px');
    console.log('  Logo width:', navMobile.logoWidth, 'px');
    console.log('  Logo overflows nav?', navMobile.logoOverflow);
    await page.close();

    // Render at 1440px (desktop)
    console.log('\n🖥️  Rendering at 1440px viewport...');
    page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://meocy.com/');
    await page.waitForLoadState('networkidle');

    const navDesktop = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Primary"]');
      if (!nav) return 'NAV NOT FOUND';
      const rect = nav.getBoundingClientRect();
      const logo = nav.querySelector('img');
      const logoRect = logo.getBoundingClientRect();
      return {
        navHeight: rect.height,
        navWidth: rect.width,
        logoHeight: logoRect.height,
        logoWidth: logoRect.width,
        logoOverflow: logoRect.height > rect.height
      };
    });

    await page.screenshot({ path: '/private/tmp/claude-501/-Users-chamilaprasanna-Desktop-meocy-studio/713681b0-4ce1-4f1e-a093-6bb227a7a5ce/scratchpad/nav-1440px.png' });
    console.log('✓ Saved: nav-1440px.png');
    console.log('  Nav height:', navDesktop.navHeight, 'px');
    console.log('  Logo height:', navDesktop.logoHeight, 'px');
    console.log('  Logo width:', navDesktop.logoWidth, 'px');
    console.log('  Logo overflows nav?', navDesktop.logoOverflow);
    await page.close();

    console.log('\n✓ Rendering complete');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
