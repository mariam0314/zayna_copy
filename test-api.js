import axios from 'axios';

async function testAPI() {
  try {
    // Test registration
    console.log('Testing registration...');
    const registerResponse = await axios.post('http://localhost:5001/api/guest/register', {
      name: 'Test User',
      phone: '123456789' + Date.now(), // Use a unique phone number
      roomNumber: '101'
    });
    
    console.log('Registration response:', registerResponse.data);
    
    // Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post('http://localhost:5001/api/guest/login', {
      guestId: registerResponse.data.guestId,
      password: registerResponse.data.password
    });
    
    console.log('Login response:', loginResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testAPI();
