#!/usr/bin/env node
/**
 * Test STEP 08: Duration-aware time slot filtering
 */

// Simulate the config
const milanPackages = [
  { id: 'memory', durationHours: 2, includedLocations: 2, extraLocationPrice: null, price: 200 },
  { id: 'experience', durationHours: 3, includedLocations: 3, extraLocationPrice: null, price: 300 },
  { id: 'signature', durationHours: 5, includedLocations: 4, extraLocationPrice: 50, price: 600 },
];

const availabilityEndTime = '22:00';
const slotStartTimes = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

function selectableSlots(packageId) {
  const [endHour, endMin] = availabilityEndTime.split(':').map(Number);
  const endMinutes = endHour * 60 + endMin;
  const pkg = milanPackages.find((p) => p.id === packageId);
  const durationMinutes = pkg.durationHours * 60;

  return slotStartTimes.filter((time) => {
    const [hour, min] = time.split(':').map(Number);
    const startMinutes = hour * 60 + min;
    const endMinutes_ = startMinutes + durationMinutes;
    return endMinutes_ <= endMinutes;
  });
}

console.log('🧪 STEP 08: DURATION-AWARE TIME FILTERING\n');

const tests = [
  { pkg: 'memory', name: 'Memory (2h)', expectedLatest: '20:00', expectedFirst: '06:00' },
  { pkg: 'experience', name: 'Experience (3h)', expectedLatest: '19:00', expectedFirst: '06:00' },
  { pkg: 'signature', name: 'Signature (5h)', expectedLatest: '17:00', expectedFirst: '06:00' },
];

let passed = 0;
let failed = 0;

tests.forEach((test) => {
  const slots = selectableSlots(test.pkg);
  const latest = slots[slots.length - 1];
  const first = slots[0];

  const latestOk = latest === test.expectedLatest;
  const firstOk = first === test.expectedFirst;
  const countOk = slots.length > 0;

  const status = latestOk && firstOk && countOk ? '✓' : '✗';
  console.log(`${status} ${test.name}`);
  console.log(`  Available slots: ${slots.length}`);
  console.log(`  First: ${first}, Latest: ${latest}`);

  if (latestOk && firstOk && countOk) {
    passed++;
    console.log(`  ✓ Latest start ${test.expectedLatest} is correct`);
  } else {
    failed++;
    if (!latestOk) console.log(`  ✗ Latest start should be ${test.expectedLatest}, got ${latest}`);
    if (!firstOk) console.log(`  ✗ First start should be ${test.expectedFirst}, got ${first}`);
  }
  console.log('');
});

console.log(`📊 Results: ${passed}/${tests.length} passed\n`);

if (failed > 0) {
  console.log(`❌ ${failed} test(s) FAILED`);
  process.exit(1);
} else {
  console.log('✅ All tests PASSED');
  process.exit(0);
}
