const fetch = require('node-fetch');

// The URL to test
const apiUrl = 'https://todo-deploy-iota.vercel.app/api/todos';

console.log(`Testing API endpoint: ${apiUrl}`);

// Function to test the API
async function testApi() {
  try {
    console.log('Sending request...');
    const response = await fetch(apiUrl);
    console.log(`Response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
      console.log('✅ API is working properly!');
    } else {
      console.error(`❌ API returned error status: ${response.status}`);
      const text = await response.text();
      console.error('Error details:', text);
    }
  } catch (error) {
    console.error('❌ Failed to connect to API:', error.message);
  }
}

// Run the test
testApi(); 