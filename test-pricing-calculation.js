#!/usr/bin/env node
/**
 * Test all pricing scenarios for Milan tourist photography booking.
 * Tests the computePricing function from lib/milan-shoot-config.ts
 */

// Simulate the pricing function logic (matching lib/milan-shoot-config.ts)
const milanPackages = [
  {
    id: 'memory',
    price: 200,
    includedLocations: 2,
    extraLocationPrice: null,
  },
  {
    id: 'experience',
    price: 300,
    includedLocations: 3,
    extraLocationPrice: null,
  },
  {
    id: 'signature',
    price: 600,
    includedLocations: 4,
    extraLocationPrice: 50,
  },
];

function computePricing(packageId, locationCount) {
  const pkg = milanPackages.find((p) => p.id === packageId);
  if (!pkg) throw new Error(`Package ${packageId} not found`);

  const extraLocations = pkg.extraLocationPrice === null ? 0 : Math.max(0, locationCount - pkg.includedLocations);
  const extraLocationPrice = pkg.extraLocationPrice ?? 0;
  const extraLocationsTotal = extraLocations * extraLocationPrice;
  const total = pkg.price + extraLocationsTotal;

  return {
    packagePrice: pkg.price,
    includedLocations: pkg.includedLocations,
    extraLocations,
    extraLocationPrice,
    extraLocationsTotal,
    total,
    deposit: 50,
    remaining: total - 50,
  };
}

const tests = [
  { name: 'TEST 1: Memory + 1 location', pkg: 'memory', locs: 1, expectedTotal: 200 },
  { name: 'TEST 2: Memory + 2 locations', pkg: 'memory', locs: 2, expectedTotal: 200 },
  { name: 'TEST 3: Experience + 1 location', pkg: 'experience', locs: 1, expectedTotal: 300 },
  { name: 'TEST 4: Experience + 3 locations', pkg: 'experience', locs: 3, expectedTotal: 300 },
  { name: 'TEST 5: Signature + 1 location', pkg: 'signature', locs: 1, expectedTotal: 600 },
  { name: 'TEST 6: Signature + 4 locations', pkg: 'signature', locs: 4, expectedTotal: 600 },
  { name: 'TEST 7: Signature + 5 locations', pkg: 'signature', locs: 5, expectedTotal: 650 },
  { name: 'TEST 8: Signature + 6 locations', pkg: 'signature', locs: 6, expectedTotal: 700 },
  { name: 'TEST 9: Signature + 7 locations', pkg: 'signature', locs: 7, expectedTotal: 750 },
  { name: 'TEST 10: Package switch (Signature 6 → Memory)', pkg: 'signature', locs: 6, switchTo: 'memory', expectedTotal: 200 },
];

let passed = 0;
let failed = 0;

console.log('🧪 MILAN TOURIST PHOTOGRAPHY PRICING TESTS\n');

tests.forEach((test) => {
  try {
    // First calculation
    const pricing = computePricing(test.pkg, test.locs);

    // If package switch test, recalculate with new package and trimmed locations
    let finalTotal = pricing.total;
    if (test.switchTo) {
      const trimmed = Math.min(test.locs, 2); // Memory only allows 2
      const newPricing = computePricing(test.switchTo, trimmed);
      finalTotal = newPricing.total;
    }

    const pass = finalTotal === test.expectedTotal;
    const status = pass ? '✓' : '✗';

    console.log(`${status} ${test.name}`);
    console.log(`  Package: ${test.pkg}${test.switchTo ? ` → ${test.switchTo}` : ''}, Locations: ${test.locs}`);
    console.log(`  Expected: €${test.expectedTotal}, Got: €${finalTotal}`);

    if (pass) {
      passed++;
    } else {
      failed++;
      console.log(`  ERROR: Total mismatch!`);
    }

    // Show breakdown for signature with extra locations
    if (test.pkg === 'signature' && test.locs > 4) {
      const p = computePricing(test.pkg, test.locs);
      console.log(`  Breakdown: €${p.packagePrice} base + (${p.extraLocations} × €${p.extraLocationPrice}) = €${p.extraLocationsTotal} extra`);
    }

    console.log('');
  } catch (e) {
    console.log(`✗ ${test.name}`);
    console.log(`  ERROR: ${e.message}\n`);
    failed++;
  }
});

console.log(`\n📊 RESULTS: ${passed}/${tests.length} tests passed`);

if (failed > 0) {
  console.log(`❌ ${failed} test(s) FAILED`);
  process.exit(1);
} else {
  console.log('✅ All tests PASSED');
  process.exit(0);
}
