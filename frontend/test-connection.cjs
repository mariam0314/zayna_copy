const http = require('http');

// Test connection to backend
const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/guest/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });
  res.on('end', () => {
    console.log('Request completed');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

const postData = JSON.stringify({
  name: 'Test User',
  phone: '1234567890',
  roomNumber: '101'
});

req.write(postData);
req.end();
