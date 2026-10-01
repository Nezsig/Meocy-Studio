#!/usr/bin/env node
const https = require('https');

// Get a date 60 days in the future
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 60);
const dateStr = futureDate.toISOString().slice(0, 10);

const testCases = [
  {
    name: 'TEST 1: Memory + 3 locations (FAIL: max 2)',
    packageId: 'memory',
    locationCount: 3,
    expectedStatus: 400
  },
  {
    name: 'TEST 2: Experience + 4 locations (FAIL: max 3)',
    packageId: 'experience',
    locationCount: 4,
    expectedStatus: 400
  },
  {
    name: 'TEST 3: Signature + 4 locations (PASS: no extra)',
    packageId: 'signature',
    locationCount: 4,
    expectedStatus: 200,
    expectedPrice: 600
  },
  {
    name: 'TEST 4: Signature + 5 locations (PASS: +€50)',
    packageId: 'signature',
    locationCount: 5,
    expectedStatus: 200,
    expectedPrice: 650
  },
  {
    name: 'TEST 5: Signature + 6 locations (PASS: +€100)',
    packageId: 'signature',
    locationCount: 6,
    expectedStatus: 200,
    expectedPrice: 700
  }
];

const locationIds = ['duomo', 'galleria', 'scala', 'brera', 'castello', 'sempione', 'navigli', 'portaNuova', 'gaeAulenti', 'arcoPace'];

let passed = 0;
let failed = 0;

async function runTest(testCase) {
  return new Promise((resolve) => {
    const body = {
      name: 'Test User',
      email: 'test@example.com',
      packageId: testCase.packageId,
      locations: locationIds.slice(0, testCase.locationCount),
      date: dateStr,
      time: '14:00',
      people: 2,
      country: 'IT',
      phone: '+39 379 105 1000',
      locale: 'en'
    };

    const jsonData = JSON.stringify(body);
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

    https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const statusOk = res.statusCode === testCase.expectedStatus;
        let priceOk = true;
        let priceInfo = '';

        try {
          const response = JSON.parse(data);
          if (testCase.expectedPrice !== undefined && response.pricing) {
            priceOk = response.pricing.total === testCase.expectedPrice;
            priceInfo = ` — Price: €${response.pricing.total} ${priceOk ? '✓' : `(expected €${testCase.expectedPrice})`}`;
          }
        } catch (e) {}

        if (statusOk && priceOk) {
          console.log(`✓ ${testCase.name}${priceInfo}`);
          passed++;
        } else {
          console.log(`✗ ${testCase.name} [${res.statusCode}]${priceInfo}`);
          failed++;
        }

        resolve();
      });
    }).on('error', (e) => {
      console.log(`✗ ${testCase.name} — ERROR: ${e.message}`);
      failed++;
      resolve();
    }).end(jsonData);
  });
}

(async () => {
  console.log('🧪 API LOCATION LIMIT & PRICING VALIDATION\n');
  console.log('Test date:', dateStr, '| Time: 14:00\n');

  for (const testCase of testCases) {
    await runTest(testCase);
  }

  console.log(`\n📊 Results: ${passed}/${testCases.length} passed`);
  process.exit(failed > 0 ? 1 : 0);
})();
