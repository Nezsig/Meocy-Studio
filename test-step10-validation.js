#!/usr/bin/env node
/**
 * STEP 10: Final Booking Payload Validation Tests
 *
 * Tests that the Milan booking API correctly validates and rejects manipulated payloads
 * while allowing legitimate bookings through.
 *
 * Note: These are designed to be run against the test/staging environment.
 * Do NOT run against production without careful review.
 */

const BASE_URL = 'https://meocy.com/api/milan/request';

// Utility to make API requests
async function testRequest(testName, payload, expectedStatus) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const isSuccess = response.status === expectedStatus;
    const status = isSuccess ? '✓ PASS' : '✗ FAIL';
    console.log(`${status} ${testName} — Expected ${expectedStatus}, got ${response.status}`);

    return { success: isSuccess, status: response.status, response };
  } catch (error) {
    console.log(`✗ FAIL ${testName} — Network error: ${error.message}`);
    return { success: false, error };
  }
}

// Valid base payload for comparison
const validPayload = {
  submissionId: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  packageId: 'signature',
  date: '2026-10-15',
  time: '15:00',
  locations: ['duomo', 'galleria', 'scala', 'brera'],
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '+39 123 456 7890',
  people: 2,
  country: 'Italy',
  notes: 'Test booking',
  locale: 'en',
};

const tests = [
  // TEST A — Fake Price (should be ignored, recalculated server-side)
  {
    name: 'A. Fake manipulated price field — should be rejected (unknown field)',
    payload: { ...validPayload, price: '€1', total: 1, deposit: 0 },
    expectedStatus: 400, // Strict mode rejects unknown fields
  },

  // TEST B — Invalid Location Count
  {
    name: 'B. Memory + 3 locations (exceeds limit of 2) — should be rejected',
    payload: { ...validPayload, packageId: 'memory', locations: ['duomo', 'galleria', 'scala'] },
    expectedStatus: 400,
  },

  // TEST C — Fake Location
  {
    name: 'C. Unknown location ID "fake-location" — should be rejected',
    payload: { ...validPayload, locations: ['duomo', 'fake-location'] },
    expectedStatus: 400,
  },

  // TEST D — Duplicate Location
  {
    name: 'D. Duplicate location "duomo" twice — should be rejected',
    payload: { ...validPayload, locations: ['duomo', 'duomo', 'galleria'] },
    expectedStatus: 400,
  },

  // TEST E — Past Date
  {
    name: 'E. Past date 2020-01-01 — should be rejected',
    payload: { ...validPayload, date: '2020-01-01' },
    expectedStatus: 409,
  },

  // TEST F — Invalid Time Format
  {
    name: 'F. Invalid time "13:37" (not in configured slots) — should be rejected',
    payload: { ...validPayload, time: '13:37' },
    expectedStatus: 400,
  },

  // TEST G — Duration Overflow (Signature 20:00 exceeds 22:00 availability)
  {
    name: 'G. Signature + 20:00 (5h would end past 22:00) — should be rejected',
    payload: { ...validPayload, packageId: 'signature', time: '20:00' },
    expectedStatus: 400,
  },

  // TEST H — Invalid People Count (Zero)
  {
    name: 'H. People count = 0 — should be rejected',
    payload: { ...validPayload, people: 0 },
    expectedStatus: 400,
  },

  // TEST I — Invalid People Count (Negative)
  {
    name: 'I. People count = -1 — should be rejected',
    payload: { ...validPayload, people: -1 },
    expectedStatus: 400,
  },

  // TEST J — Invalid People Count (Too large)
  {
    name: 'J. People count = 999 (exceeds max) — should be rejected',
    payload: { ...validPayload, people: 999 },
    expectedStatus: 400,
  },

  // TEST K — Empty Name (whitespace only)
  {
    name: 'K. Name = "   " (whitespace only) — should be rejected',
    payload: { ...validPayload, name: '   ' },
    expectedStatus: 400,
  },

  // TEST L — Invalid Email
  {
    name: 'L. Email = "not-an-email" — should be rejected',
    payload: { ...validPayload, email: 'not-an-email' },
    expectedStatus: 400,
  },

  // TEST M — Invalid Phone (too short)
  {
    name: 'M. Phone = "12345" (too short, < 6 digits) — should be rejected',
    payload: { ...validPayload, phone: '12345' },
    expectedStatus: 400,
  },

  // TEST N — Oversized Notes Field
  {
    name: 'N. Notes field > 1000 chars — should be rejected',
    payload: { ...validPayload, notes: 'x'.repeat(1001) },
    expectedStatus: 400,
  },

  // TEST O — Manipulated Booking Reference
  {
    name: 'O. Client-supplied bookingReference field — should be rejected (unknown field)',
    payload: { ...validPayload, bookingReference: 'MEO-261002-HACK' },
    expectedStatus: 400,
  },

  // TEST P — Unknown Field "profit"
  {
    name: 'P. Unknown field "profit" — should be rejected by strict mode',
    payload: { ...validPayload, profit: 1000 },
    expectedStatus: 400,
  },

  // TEST Q — Manipulated Package Duration
  {
    name: 'Q. Client-supplied duration field — should be rejected (unknown field)',
    payload: { ...validPayload, duration: '2h' },
    expectedStatus: 400,
  },

  // TEST R — Memory with too many locations
  {
    name: 'R. Memory + 4 locations (exceeds max of 2) — should be rejected',
    payload: { ...validPayload, packageId: 'memory', locations: ['duomo', 'galleria', 'scala', 'brera'] },
    expectedStatus: 400,
  },

  // TEST S — Experience with too many locations
  {
    name: 'S. Experience + 4 locations (exceeds max of 3) — should be rejected',
    payload: { ...validPayload, packageId: 'experience', locations: ['duomo', 'galleria', 'scala', 'brera'] },
    expectedStatus: 400,
  },

  // TEST T — Valid Signature with 4 included locations
  {
    name: 'T. VALID: Signature + 4 locations (included limit) — should succeed',
    payload: { ...validPayload, packageId: 'signature', locations: ['duomo', 'galleria', 'scala', 'brera'] },
    expectedStatus: 200,
  },

  // TEST U — Valid Signature with 5 locations (1 extra at €50)
  {
    name: 'U. VALID: Signature + 5 locations (1 extra @ €50) — should succeed',
    payload: { ...validPayload, packageId: 'signature', locations: ['duomo', 'galleria', 'scala', 'brera', 'castello'] },
    expectedStatus: 200,
  },

  // TEST V — Valid Memory with 2 locations
  {
    name: 'V. VALID: Memory + 2 locations (at limit) — should succeed',
    payload: { ...validPayload, packageId: 'memory', locations: ['duomo', 'galleria'] },
    expectedStatus: 200,
  },

  // TEST W — Valid Experience with 3 locations
  {
    name: 'W. VALID: Experience + 3 locations (at limit) — should succeed',
    payload: { ...validPayload, packageId: 'experience', locations: ['duomo', 'galleria', 'scala'] },
    expectedStatus: 200,
  },

  // TEST X — Invalid Date Format
  {
    name: 'X. Invalid date format "2026/10/15" — should be rejected',
    payload: { ...validPayload, date: '2026/10/15' },
    expectedStatus: 400,
  },

  // TEST Y — No Locations Submitted
  {
    name: 'Y. Empty locations array — should be rejected',
    payload: { ...validPayload, locations: [] },
    expectedStatus: 400,
  },
];

async function runTests() {
  console.log('━'.repeat(70));
  console.log('STEP 10: Final Booking Payload Validation Tests');
  console.log('━'.repeat(70));
  console.log('');
  console.log('Testing that the Milan booking API correctly validates payloads.');
  console.log('');

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testRequest(test.name, test.payload, test.expectedStatus);
    if (result.success) {
      passed++;
    } else {
      failed++;
    }
    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('');
  console.log('━'.repeat(70));
  console.log(`Results: ${passed}/${tests.length} passed`);
  console.log('━'.repeat(70));

  if (failed > 0) {
    console.log(`❌ ${failed} test(s) FAILED`);
    process.exit(1);
  } else {
    console.log('✅ All validation tests PASSED');
    process.exit(0);
  }
}

// Run tests
runTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
