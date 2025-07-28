// Simple test to check if environment variables are loaded
globalThis.testEnv = () => {
  console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
  console.log('All env vars:', import.meta.env);
  
  // Try a simple fetch
  if (import.meta.env.VITE_BACKEND_URL) {
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then(response => {
        console.log('Fetch successful:', response.status);
      })
      .catch(error => {
        console.error('Fetch failed:', error);
      });
  }
};

testEnv();
