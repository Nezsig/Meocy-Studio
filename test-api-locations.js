#!/usr/bin/env node
const https = require('https');

// Get future date (30 days from now)
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 30);
const dateStr = futureDate.toISOString().slice(0, 10);

const testCases = [
  {
    name: 'Memory + 3 locations (should FAIL: max 2)',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      packageId: 'memory',
      locations: ['duomo', 'galleria', 'scala'],
      date: dateStr,
      time: '10:00',
      people: 2,
      country: 'Italy',
      locale: 'en'
    },
    expectedStatus: 400
  },
  {
    name: 'Experience + 4 locations (should FAIL: max 3)',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      packageId: 'experience',
      locations: ['duomo', 'galleria', 'scala', 'brera'],
      date: dateStr,
      time: '10:00',
      people: 2,
      country: 'Italy',
      locale: 'en'
    },
    expectedStatus: 400
  },
  {
    name: 'Signature + 4 locations (should PASS: included, no extra fee)',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      packageId: 'signature',
      locations: ['duomo', 'galleria', 'scala', 'brera'],
      date: dateStr,
      time: '10:00',
      people: 2,
      country: 'Italy',
      locale: 'en'
    },
    expectedStatus: 200,
    expectPrice: 600
  },
  {
    name: 'Signature + 5 locations (should PASS: +1 extra at €50, total €650)',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      packageId: 'signature',
      locations: ['duomo', 'galleria', 'scala', 'brera', 'castello'],
      date: dateStr,
      time: '10:00',
      people: 2,
      country: 'Italy',
      locale: 'en'
    },
    expectedStatus: 200,
    expectPrice: 650
  },
  {
    name: 'Signature + 6 locations (should PASS: +2 extra at €50 each, total €700)',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      packageId: 'signature',
      locations: ['duomo', 'galleria', 'scala', 'brera', 'castello', 'sempione'],
      date: dateStr,
      time: '10:00',
      people: 2,
      country: 'Italy',
      locale: 'en'
    },
    expectedStatus: 200,
    expectPrice: 700
  }
];

let passed = 0;
let failed = 0;

async function runTest(testCase) {
  return new Promise((resolve) => {
    const jsonData = JSON.stringify(testCase.body);

    const options = {
      hostname: 'meocy.com',
      port: 443,
      path: '/api/milan/request',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const isCorrect = res.statusCode === testCase.expectedStatus;
        const status = isCorrect ? '✓' : '✗';
        console.log(`${status} [${res.statusCode}] ${testCase.name}`);

        if (!isCorrect) {
          console.log(`   Expected: ${testCase.expectedStatus}, Got: ${res.statusCode}`);
          failed++;
        } else {
          passed++;
        }

        // Try to parse response
        try {
          const response = JSON.parse(data);
          if (response.error) console.log(`   Error: ${response.error}`);
          if (response.pricing) {
            console.log(`   Pricing: €${response.pricing.total} (base: €${response.pricing.packagePrice}, extras: €${response.pricing.extraLocationsTotal})`);
          }
        } catch (e) {}

        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`✗ ERROR: ${testCase.name} - ${e.message}`);
      failed++;
      resolve();
    });

    req.write(jsonData);
    req.end();
  });
}

(async () => {
  console.log('🧪 API LOCATION LIMIT & PRICING TESTS\n');

  for (const testCase of testCases) {
    await runTest(testCase);
  }

  console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed (${passed + failed} total)`);
  process.exit(failed > 0 ? 1 : 0);
})();
