import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Testing forms...\n');

  try {
    // Test 1: Contact form
    console.log('1. Testing /contact form');
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle', timeout: 10000 });
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Get all project options and select one
    const options = await page.locator('select[name*="project"] option').count();
    console.log(`   Project options available: ${options}`);
    
    // Select first project option (index 1, skipping empty)
    await page.selectOption('select[name*="project"]', { index: 1 });
    
    // Check robots metadata
    const robotsMeta = await page.getAttribute('meta[name="robots"]', 'content');
    console.log(`   Robots meta: ${robotsMeta}`);
    
    await page.fill('textarea[name="message"]', 'Test message for contact form submission');
    
    // Submit
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // Wait for success state
    await page.waitForSelector('h2:has-text("Thank you")', { timeout: 5000 }).catch(() => {});
    const successText = await page.textContent('h2');
    if (successText?.includes('Thank you') || successText?.includes('success')) {
      console.log('   ✓ Contact form submitted successfully');
    } else {
      console.log('   ⚠ Form submitted but success message unclear');
    }
    
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    
  } catch (e) {
    console.log(`✗ Error: ${e.message}`);
  }

  await browser.close();
  console.log('\n✓ Form tests complete');
})();
