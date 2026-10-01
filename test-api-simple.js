const https = require('https');

// Get a date 60 days in the future to be safe
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 60);
const dateStr = futureDate.toISOString().slice(0, 10);

const body = {
  name: 'Test',
  email: 'test@test.com',
  packageId: 'signature',
  locations: ['duomo', 'galleria'],
  date: dateStr,
  time: '14:00',
  people: 2,
  country: 'IT'
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
    console.log('Status:', res.statusCode);
    console.log('Response:', data.slice(0, 500));
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
}).end(jsonData);
